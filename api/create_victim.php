<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Insert all the data into the database
$db = get_db();
$stmt = mysqli_prepare($db, "INSERT INTO clients (first_name, last_name, national_id, phone, email, muutja, muutmisaeg) VALUES (?, ?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "sssssss", $body["first_name"], $body["last_name"], $body["national_id"], $body["phone"], $body["email"], $username, date("Y-m-d"));
if (mysqli_stmt_execute($stmt)) {
	echo mysqli_fetch_row(mysqli_query("SELECT LAST_INSERT_ID()"))[0];
}
