<?php

require "verify_token.php";

if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

$db = get_db();

//Construct where query
$where_fields = array();
$where_params = array();
if (isset($_GET["alates"])) {
	$where_fields[] = "kuupaev >= ?";
	$where_params[] = $_GET["alates"];
}
if (isset($_GET["kuni"])) {
	$where_fields[] = "kuupaev <= ?";
	$where_params[] = $_GET["kuni"];
}

$where_query = "";
$c = count($where_fields);
for ($i = 0; $i < $c; $i++) {
	$where_query .= " AND " . $where_fields[$i];
}

//Construct incident query
$incident_query = "SELECT incidents.id, piirkond, kliendi_nr, keel, vanus, puue, lapsed, rasedus, elukoht, fuusiline_vagivald, vaimne_vagivald, majanduslik_vagivald, seksuaalne_vagivald, inimkaubandus, teadmata_vagivald, partner_vagivallatseja, ekspartner_vagivallatseja, vanem_vagivallatseja, laps_vagivallatseja, sugulane_vagivallatseja, tookaaslane_vagivallatseja, muu_vagivallatseja, vagivallatseja_vanus, vagivallatseja_sugu, laps_ohver, vana_ohver, muu_ohver, politsei, rahastus FROM incidents, sessions WHERE sessions.incident_id=incidents.id {$where_query} GROUP BY incidents.id";

if ($c == 0) {
	$query_res = mysqli_query($db, $incident_query);
} else {
	$stmt = mysqli_prepare($db, $incident_query);
	mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
	mysqli_stmt_execute($stmt);
	$query_res = mysqli_stmt_get_result($stmt);
}
$incident_res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

//Construct CSV line by line
$csv = "Tugikeskuse piirkond	Kliendi nr	Kuupäev	Korduvus	Juhtumi lühikirjeldus	Suhtluskeel	Vanus	Puue	Alaealiste laste arv	Rasedus	Elukoht	Füüsiline vägivald	Vaimne vägivald	Majanduslik vägivald	Seksuaalne vägivald	Inimkaubandus	Teadmata vägivald	Vägivallatseja partner	Vägivallatseja ekspartner	Vägivallatseja isa/ema	Vägivallatseja poeg/tütar	Vägivallatseja sugulane/hõimlane	Vägivallatseja töö- või õpingukaaslane	Vägivallatseja muu	Vägivallatseja vanus	Vägivallatseja sugu	Lisaohver - Alaealine laps	Lisaohver - Eakas (üle 65)	Lisaohver - Muu	Kas on pöördunud politseisse	Kas nõustamine toimus sidevahendite abil	Kriisinõustamine	Kriisinõustamise aeg	Juhtumipõhine nõustamine	Võrgustikutöö	Psühholoogiline nõustamine, psühhoteraapia	Juriidiline nõustamine	Tegevused lapsega	Tugiteenused (transport, toidu- ja riideabi jm)	Naise majutuspäevade arv	Kaasasolevate laste arv	Laste majutuspäevade arv	Juhtumipõhine ümarlaud	Suunatud MARACi	Perearst	EMO	Naistearst	Politsei	Prokuratuur	Riiklik ohvriabi	Lastekaitse	KOV sotsiaalabi	Kohus (tsiviilasjas)	Kohus (kriminaalasjas)	Haridusasutus	MTÜ-d	Sõbrad, sugulased	Rahastus	Märkused\n";
foreach ($incident_res as $incident) {
	//Construct session query
	$session_query = "SELECT * FROM sessions WHERE incident_id={$incident["id"]}" . $where_query;
	$incidents_query = "SELECT MIN(id) FROM incidents WHERE kliendi_nr={$incident["kliendi_nr"]}";
	
	if ($c == 0) {
		$query_res = mysqli_query($db, $session_query);
	} else {
		$stmt = mysqli_prepare($db, $session_query);
		mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
		mysqli_stmt_execute($stmt);
		$query_res = mysqli_stmt_get_result($stmt);
	}
	$session_res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);
	
	$query_inc_res = mysqli_query($db, $incidents_query);
	$row1 = null;
	$value1 = false;
	if (mysqli_num_rows($query_inc_res) == 1) {
		$row = mysqli_fetch_assoc($query_inc_res);
		$value = $row["MIN(id)"] == $incident["id"];
		if ($value) {
				$first_session_query = "SELECT MIN(id) FROM sessions WHERE incident_id={$row["MIN(id)"]}";
				$query_session_res = mysqli_query($db, $first_session_query);
				if (mysqli_num_rows($query_session_res) == 1) {
					$row1 = mysqli_fetch_assoc($query_session_res);
			}	
		}
	}
	$session_count = count($session_res);
	for ($i = 0; $i < $session_count; $i++) {
		$session = $session_res[$i];
		if (!empty($row1)) {
			$value1 = $row1["MIN(id)"] == $session["id"];
		}
		//First row of the incident
		if ($value1) {
			$csv .= $incident["piirkond"] . "\t" . $incident["kliendi_nr"] . "\t" . $session["kuupaev"] . "\t" . "Esmakordne" . "\t\"" . $session["kirjeldus"] . "\"\t" . $incident["keel"] . "\t" . $incident["vanus"] . "\t" . z($incident["puue"]) . "\t" . z($incident["lapsed"]) . "\t" . z($incident["rasedus"]) . "\t" . $incident["elukoht"] . "\t" . z($incident["fuusiline_vagivald"]) . "\t" . z($incident["vaimne_vagivald"]) . "\t" . z($incident["majanduslik_vagivald"]) . "\t" . z($incident["seksuaalne_vagivald"]) . "\t" . z($incident["inimkaubandus"]) . "\t" . z($incident["teadmata_vagivald"]) . "\t" . z($incident["partner_vagivallatseja"]) . "\t" . z($incident["ekspartner_vagivallatseja"]) . "\t" . z($incident["vanem_vagivallatseja"]) . "\t" . z($incident["laps_vagivallatseja"]) . "\t" . z($incident["sugulane_vagivallatseja"]) . "\t" . z($incident["tookaaslane_vagivallatseja"]) . "\t" . z($incident["muu_vagivallatseja"]) . "\t" . $incident["vagivallatseja_vanus"] . "\t" . $incident["vagivallatseja_sugu"] . "\t" . z($incident["laps_ohver"]) . "\t" . z($incident["vana_ohver"]) . "\t" . z($incident["muu_ohver"]) . "\t" . z($incident["politsei"]) . "\t" . z($session["sidevahendid"]) . "\t" . z($session["kriisinoustamine"]) . "\t" . $session["kriisinoustamise_aeg"] . "\t" . z($session["juhtuminoustamine"]) . "\t" . z($session["vorgustikutoo"]) . "\t" . z($session["psuhhonoustamine"]) . "\t" . z($session["juuranoustamine"]) . "\t" . z($session["tegevused_lapsega"]) . "\t" . z($session["tugiteenused"]) . "\t" . z($session["naise_majutus"]) . "\t" . z($session["laste_arv"]) . "\t" . z($session["laste_majutus"]) . "\t" . z($session["umarlaud"]) . "\t" . z($session["marac"]) . "\t" . z($session["perearst_kaasatud"]) . "\t" . z($session["emo_kaasatud"]) . "\t" . z($session["naistearst_kaasatud"]) . "\t" . z($session["politsei_kaasatud"]) . "\t" . z($session["prokuratuur_kaasatud"]) . "\t" . z($session["ohvriabi_kaasatud"]) . "\t" . z($session["lastekaitse_kaasatud"]) . "\t" . z($session["kov_kaasatud"]) . "\t" . z($session["tsiviilkohus_kaasatud"]) . "\t" . z($session["kriminaalkohus_kaasatud"]) . "\t" . z($session["haridusasutus_kaasatud"]) . "\t" . z($session["mtu_kaasatud"]) . "\t" . z($session["tuttavad_kaasatud"]) . "\t" . $incident["rahastus"] . "\t\"" . $session["markused"] . "\"\n";
		}
		//Following rows of one session each
		else {
			$csv .= $incident["piirkond"] . "\t" . $incident["kliendi_nr"] . "\t" . $session["kuupaev"] . "\t" . "Korduv" . "\t\"" . $session["kirjeldus"] . "\"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" . z($session["sidevahendid"]) . "\t" . z($session["kriisinoustamine"]) . "\t" . $session["kriisinoustamise_aeg"] . "\t" . z($session["juhtuminoustamine"]) . "\t" . z($session["vorgustikutoo"]) . "\t" . z($session["psuhhonoustamine"]) . "\t" . z($session["juuranoustamine"]) . "\t" . z($session["tegevused_lapsega"]) . "\t" . z($session["tugiteenused"]) . "\t" . z($session["naise_majutus"]) . "\t" . z($session["laste_arv"]) . "\t" . z($session["laste_majutus"]) . "\t" . z($session["umarlaud"]) . "\t" . z($session["marac"]) . "\t" . z($session["perearst_kaasatud"]) . "\t" . z($session["emo_kaasatud"]) . "\t" . z($session["naistearst_kaasatud"]) . "\t" . z($session["politsei_kaasatud"]) . "\t" . z($session["prokuratuur_kaasatud"]) . "\t" . z($session["ohvriabi_kaasatud"]) . "\t" . z($session["lastekaitse_kaasatud"]) . "\t" . z($session["kov_kaasatud"]) . "\t" . z($session["tsiviilkohus_kaasatud"]) . "\t" . z($session["kriminaalkohus_kaasatud"]) . "\t" . z($session["haridusasutus_kaasatud"]) . "\t" . z($session["mtu_kaasatud"]) . "\t" . z($session["tuttavad_kaasatud"]) . "\t\t\"" . $session["markused"] . "\"\n";
		}
	}
}

echo $csv;

function z($string) {
	if ($string === "0" || $string === "0.00" || $string === 0 || $string === 0.00) {
		return "";
	} else {
		return $string;
	}
}