<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Insert all data into the database
$date = date("Y-m-d");
$db = get_db();
$stmt = mysqli_prepare($db, "INSERT INTO incidents (piirkond, kliendi_nr, keel, vanus, puue, lapsed, rasedus, elukoht, fuusiline_vagivald, vaimne_vagivald, majanduslik_vagivald, seksuaalne_vagivald, inimkaubandus, teadmata_vagivald, partner_vagivallatseja, ekspartner_vagivallatseja, vanem_vagivallatseja, laps_vagivallatseja, sugulane_vagivallatseja, tookaaslane_vagivallatseja, muu_vagivallatseja, vagivallatseja_vanus, vagivallatseja_sugu, laps_ohver, vana_ohver, muu_ohver, politsei, rahastus, muutja, muutmisaeg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "sissiiisiiiiiiiiiiiiissiiiisss", $body["piirkond"], $body["kliendi_nr"], $body["keel"], $body["vanus"], $body["puue"], $body["lapsed"], $body["rasedus"], $body["elukoht"], $body["fuusiline_vagivald"], $body["vaimne_vagivald"], $body["majanduslik_vagivald"], $body["seksuaalne_vagivald"], $body["inimkaubandus"], $body["teadmata_vagivald"], $body["partner_vagivallatseja"], $body["ekspartner_vagivallatseja"], $body["vanem_vagivallatseja"], $body["laps_vagivallatseja"], $body["sugulane_vagivallatseja"], $body["tookaaslane_vagivallatseja"], $body["muu_vagivallatseja"], $body["vagivallatseja_vanus"], $body["vagivallatseja_sugu"], $body["laps_ohver"], $body["vana_ohver"], $body["muu_ohver"], $body["politsei"], $body["rahastus"], $username, $date);
if (mysqli_stmt_execute($stmt)) {
	echo mysqli_fetch_row(mysqli_query($db, "SELECT LAST_INSERT_ID()"))[0];
}
