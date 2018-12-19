<?php

require "verify_token.php";

if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

//Construct where query
$where_fields = array();
$where_params = array();
if (isset($_GET["piirkond"]) && $_GET["piirkond"] != "all") {
	$where_fields[] = "piirkond = ?";
	$where_params[] = $_GET["piirkond"];
}
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
$incident_params = array(
"piirkond" => "piirkond",
"incident_id" => "COUNT(id) AS 'Juhtumite arv'",
"kliendi_nr" => "COUNT(DISTINCT(kliendi_nr)) AS 'Klientide arv'",
"eesti_keel" => "COUNT(IF(keel='eesti', 1, NULL)) AS 'Eestikeelseid'",
"vene_keel" => "COUNT(IF(keel='vene', 1, NULL)) AS 'Venekeelseid'",
"inglise_keel" => "COUNT(IF(keel='inglise', 1, NULL)) AS 'Ingliskeelseid'",
"muu_keel" => "COUNT(IF(keel='muu', 1, NULL)) AS 'Muukeelseid'",
"vanus_18" => "COUNT(IF(vanus='alla 18', 1, NULL)) AS 'Klient alla 18'",
"vanus_24" => "COUNT(IF(vanus='18-24', 1, NULL)) AS 'Klient 18-24'",
"vanus_49" => "COUNT(IF(vanus='25-49', 1, NULL)) AS 'Klient 25-49'",
"vanus_64" => "COUNT(IF(vanus='50-64', 1, NULL)) AS 'Klient 50-64'",
"vanus_99" => "COUNT(IF(vanus='65+', 1, NULL)) AS 'Klient 65+'",
"puue" => "SUM(puue) AS 'Puudega'",
"lapsed" => "SUM(lapsed) AS 'Alaealisi lapsi'",
"rasedus" => "SUM(rasedus) AS 'Rasedaid'",
"fuusiline_vagivald" => "SUM(fuusiline_vagivald) AS 'Füüsiline vägivald'",
"vaimne_vagivald" => "SUM(vaimne_vagivald) AS 'Vaimne vägivald'",
"majanduslik_vagivald" => "SUM(majanduslik_vagivald) AS 'Majanduslik vägivald'",
"seksuaalne_vagivald" => "SUM(seksuaalne_vagivald) AS 'Seksuaalne vägivald'",
"inimkaubandus" => "SUM(inimkaubandus) AS 'Inimkaubandus'",
"teadmata_vagivald" => "SUM(teadmata_vagivald) AS 'Teadmata vägivald'",
"partner_vagivallatseja" => "SUM(partner_vagivallatseja) AS 'Partner vägivallatseja'",
"ekspartner_vagivallatseja" => "SUM(ekspartner_vagivallatseja) AS 'Ekspartner vägivallatseja'",
"vanem_vagivallatseja" => "SUM(vanem_vagivallatseja) AS 'Vanem vägivallatseja'",
"laps_vagivallatseja" => "SUM(laps_vagivallatseja) AS 'Laps vägivallatseja'",
"sugulane_vagivallatseja" => "SUM(sugulane_vagivallatseja) AS 'Sugulane vagivallatseja'",
"tookaaslane_vagivallatseja" => "SUM(tookaaslane_vagivallatseja) AS 'Töökaaslane vägivallatseja'",
"muu_vagivallatseja" => "SUM(muu_vagivallatseja) AS 'Muu vägivallatseja'",
"vagivallatseja_vanus_18" => "COUNT(IF(vagivallatseja_vanus='alla 18', 1, NULL)) AS 'Vägivallatseja alla 18'",
"vagivallatseja_vanus_24" => "COUNT(IF(vagivallatseja_vanus='18-24', 1, NULL)) AS 'Vägivallatseja 18-24'",
"vagivallatseja_vanus_49" => "COUNT(IF(vagivallatseja_vanus='25-49', 1, NULL)) AS 'Vägivallatseja 25-49'",
"vagivallatseja_vanus_64" => "COUNT(IF(vagivallatseja_vanus='50-64', 1, NULL)) AS 'Vägivallatseja 50-64'",
"vagivallatseja_vanus_99" => "COUNT(IF(vagivallatseja_vanus='65+', 1, NULL)) AS 'Vägivallatseja 65+'",
"vagivallatseja_sugu_mees" => "COUNT(IF(vagivallatseja_sugu='Mees', 1, NULL)) AS 'Mees vägivallatseja'",
"vagivallatseja_sugu_naine" => "COUNT(IF(vagivallatseja_sugu='Naine', 1, NULL)) AS 'Naine vägivallatseja'",
"laps_ohver" => "SUM(laps_ohver) AS 'Alaealine lisaohvriks'",
"vana_ohver" => "SUM(vana_ohver) AS 'Eakas lisaohvriks'",
"muu_ohver" => "SUM(muu_ohver) AS 'Muu lisaohver'",
"politsei" => "SUM(politsei) AS 'Politsei kaasatud'",
"rahastus" => "COUNT(IF(rahastus='NTK rahastus', 1, NULL)) AS 'NTK rahastanud'"
);

$incident_query = "SELECT";
foreach ($incident_params as $param => $value) {
	if (isset($_GET[$param])) {
		$incident_query .= " " . $value . ",";
	}
}
$use_incident_query = !($incident_query == "SELECT");
$incident_query = substr($incident_query, 0, -1) . " FROM (SELECT piirkond, incidents.id, kliendi_nr, keel, vanus, puue, lapsed, rasedus, fuusiline_vagivald, majanduslik_vagivald, vaimne_vagivald, seksuaalne_vagivald, inimkaubandus, teadmata_vagivald, partner_vagivallatseja, ekspartner_vagivallatseja, vanem_vagivallatseja, laps_vagivallatseja, sugulane_vagivallatseja, tookaaslane_vagivallatseja, muu_vagivallatseja, vagivallatseja_vanus, vagivallatseja_sugu, laps_ohver, vana_ohver, muu_ohver, politsei, rahastus FROM incidents, sessions WHERE sessions.incident_id=incidents.id {$where_query} GROUP BY incidents.id) AS new_incidents";
if (isset($_GET["piirkond"])) {
	$incident_query .= " GROUP BY piirkond";
}

//Construct session query
$session_params = array(
"piirkond" => "piirkond",
"session_id" => "COUNT(id) AS 'Nõustamisi'",
"sidevahendid" => "SUM(sidevahendid) AS 'Nõustamisi sidevahenditega'",
"kriisinoustamine" => "SUM(kriisinoustamine) AS 'Kriisinõustamiste aeg'",
"kriisinoustamine_paeval" => "COUNT(IF(kriisinoustamise_aeg='08:00-22:00', 1, NULL)) AS 'Kriisinõustamisi päeval'",
"kriisinoustamine_oosel" => "COUNT(IF(kriisinoustamise_aeg='22:00-08:00', 1, NULL)) AS 'Kriisinõustamisi öösel'",
"juhtuminoustamine" => "SUM(juhtuminoustamine) AS 'Juhtuminõustamiste aeg'",
"vorgustikutoo" => "SUM(vorgustikutoo) AS 'Võrgustikutöö aeg'",
"psuhhonoustamine" => "SUM(psuhhonoustamine) AS 'Psühhonõustamiste aeg'",
"juuranoustamine" => "SUM(juuranoustamine) AS 'Juuranõustamiste aeg'",
"tegevused_lapsega" => "SUM(tegevused_lapsega) AS 'Lastega tegevuste aeg'",
"tugiteenused" => "SUM(tugiteenused) AS 'Tugiteenuste aeg'",
"naise_majutus" => "SUM(naise_majutus) AS 'Naise majutuspäevade arv'",
"laste_arv" => "SUM(laste_arv) AS 'Laste arv majutuses'",
"laste_majutus" => "SUM(laste_majutus) AS 'Laste majutuspäevade arv'",
"umarlaud" => "SUM(umarlaud) AS 'Ümarlauad'",
"marac" => "SUM(marac) AS 'MARAC'",
"perearst_kaasatud" => "SUM(perearst_kaasatud) AS 'Perearst'",
"emo_kaasatud" => "SUM(emo_kaasatud) AS 'EMO'",
"naistearst_kaasatud" => "SUM(naistearst_kaasatud) AS 'Naistearst'",
"politsei_kaasatud" => "SUM(politsei_kaasatud) AS 'Politsei'",
"prokuratuur_kaasatud" => "SUM(prokuratuur_kaasatud) AS 'Prokuratuur'",
"ohvriabi_kaasatud" => "SUM(ohvriabi_kaasatud) AS 'Riiklik ohvriabi'",
"lastekaitse_kaasatud" => "SUM(lastekaitse_kaasatud) AS 'Lastekaitse'",
"kov_kaasatud" => "SUM(kov_kaasatud) AS 'KOV sotsiaalabi'",
"tsiviilkohus_kaasatud" => "SUM(tsiviilkohus_kaasatud) AS 'Kohus (tsiviilasjas)'",
"kriminaalkohus_kaasatud" => "SUM(kriminaalkohus_kaasatud) AS 'Kohus (kriminaalasjas)'",
"haridusasutus_kaasatud" => "SUM(haridusasutus_kaasatud) AS 'Haridusasutus'",
"mtu_kaasatud" => "SUM(mtu_kaasatud) AS 'MTÜ-d'",
"tuttavad_kaasatud" => "SUM(tuttavad_kaasatud) AS 'Sõbrad, sugulased'"
);

$session_query = "SELECT";
foreach ($session_params as $param => $value) {
	if (isset($_GET[$param])) {
		$session_query .= " " . $value . ",";
	}
}
$use_session_query = !($session_query == "SELECT");
$session_query = substr($session_query, 0, -1) . " FROM (SELECT piirkond, sessions.id, sidevahendid, kriisinoustamine, kriisinoustamise_aeg, juhtuminoustamine, vorgustikutoo, psuhhonoustamine, juuranoustamine, tegevused_lapsega, tugiteenused, naise_majutus, laste_arv, laste_majutus, umarlaud, marac, perearst_kaasatud, emo_kaasatud, naistearst_kaasatud, politsei_kaasatud, prokuratuur_kaasatud, ohvriabi_kaasatud, lastekaitse_kaasatud, kov_kaasatud, tsiviilkohus_kaasatud, kriminaalkohus_kaasatud, haridusasutus_kaasatud, mtu_kaasatud, tuttavad_kaasatud FROM incidents, sessions WHERE sessions.incident_id=incidents.id {$where_query}) AS new_sessions";
if (isset($_GET["piirkond"])) {
	$session_query .= " GROUP BY piirkond";
}

//Construct final query

$final_query = "SELECT * FROM ";
if ($use_incident_query) {
	$final_query .= "({$incident_query}) AS inci";
}
if ($use_incident_query && $use_session_query) {
	$final_query .= " JOIN ";
	$c *= 2;
	$where_params = array_merge($where_params, $where_params);
}
if ($use_session_query) {
	$final_query .= "({$session_query}) AS sess";
}
if (isset($_GET["piirkond"]) && $use_incident_query && $use_session_query) {
	$final_query .= " USING (piirkond)";
}
if ($final_query == "SELECT * FROM ") {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}

$db = get_db();
if ($c == 0) {
	$query_res = mysqli_query($db, $final_query);
} else {
	$stmt = mysqli_prepare($db, $final_query);
	mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
	mysqli_stmt_execute($stmt);
	$query_res = mysqli_stmt_get_result($stmt);
}
$res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

//Construct csv
$csv = "";
//Title row
foreach ($res[0] as $head => $value) {
	$csv .= $head . "\t";
}
$csv .= "\n";
//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}

echo $csv;
