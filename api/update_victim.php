<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Update all data in the database
$db = get_db();
$stmt = mysqli_prepare($db, "UPDATE clients SET first_name=?, last_name=?, national_id=?, phone=?, email=?, muutja=?, muutmisaeg=? WHERE id=?");
mysqli_stmt_bind_param($stmt, "sssssssi", $body["first_name"], $body["last_name"], $body["national_id"], $body["phone"], $body["email"], $username, date("Y-m-d"), $body["id"]);
echo mysqli_stmt_execute($stmt);
