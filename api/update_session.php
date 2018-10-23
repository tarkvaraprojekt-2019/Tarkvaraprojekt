<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Insert all data into the database
$db = get_db();
$stmt = mysqli_prepare($db, "UPDATE sessions SET kuupaev=?, kirjeldus=?, sidevahendid=?, kriisinoustamine=?, kriisinoustamise_aeg=?, juhutuminoustamine=?, vorgustikutoo=?, psuhhonoustamine=?, juuranoustamine=?, tegevused_lapsega=?, tugiteenused=?, naise_majutus=?, laste_arv=?, laste_majutus=?, umarlaud=?, marac=?, perearst_kaasatud=?, emo_kaasatud=?, naistearst_kaasatud=?, politsei_kaasatud=?, prokuratuur_kaasatud=?, lastekaitse_kaasatud=?, kov_kaasatud=?, tsiviilkohus_kaasatud=?, kriminaalkohus_kaasatud=?, haridusasutus_kaasatud=?, mtu_kaasatud=?, tuttavad_kaasatud=?, markused=?, muutja=?, muutmisaeg=? WHERE id=?");
mysqli_stmt_bind_param($stmt, "ssidsddddddiiiiiiiiiiiiiiiiisssi", $body["kuupaev"], $body["kirjeldus"], $body["sidevahendid"], $body["kriisinoustamine"], $body["kriisinoustamise_aeg"], $body["juhutuminoustamine"], $body["vorgustikutoo"], $body["psuhhonoustamine"], $body["juuranoustamine"], $body["tegevused_lapsega"], $body["tugiteenused"], $body["naise_majutus"], $body["laste_arv"], $body["laste_majutus"], $body["umarlaud"], $body["marac"], $body["perearst_kaasatud"], $body["emo_kaasatud"], $body["naistearst_kaasatud"], $body["politsei_kaasatud"], $body["prokuratuur_kaasatud"], $body["lastekaitse_kaasatud"], $body["kov_kaasatud"], $body["tsiviilkohus_kaasatud"], $body["kriminaalkohus_kaasatud"], $body["haridusasutus_kaasatud"], $body["mtu_kaasatud"], $body["tuttavad_kaasatud"], $body["markused"], $username, date("Y-m-d"), $body["id"]);
echo mysqli_stmt_execute($stmt);
