<?php

require "verify_token.php";

if (!verify_access(false)) {
	http_response_code(401);
	echo "Unauthorized action";
	exit();
}

$update_fields = array();
$update_params = array();

//id
if (!isset($_POST["id"])) {
	http_response_code(400);
	echo "Missing victim id";
	exit();
}
//First name
if (isset($_POST["firstname"])) {
	$update_fields[] = "first_name";
	$update_params[] = $_POST["firstname"];
}
//Last name
if (isset($_POST["lastname"])) {
	$update_fields[] = "last_name";
	$update_params[] = $_POST["lastname"];
}
//National id
if (isset($_POST["nid"])) {
	$update_fields[] = "national_id";
	$update_params[] = $_POST["nid"];	
}
//Phone
if (isset($_POST["phone"])) {
	$update_fields[] = "phone";
	$update_params[] = $_POST["phone"];
}
//Email
if (isset($_POST["mail"])) {
	$update_fields[] = "email";
	$update_params[] = $_POST["mail"];
}

$c = count($update_fields);
if ($c == 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}
$update_query = "UPDATE clients SET ";
for ($i = 0; $i < $c; $i++) {
	if ($i != 0) {
		$update_query .= ", ";
	}
	$update_query .= $update_fields[$i] . "=?";
}
$update_query .= " WHERE id=?";
$update_params[] = $_POST["id"];

$db = get_db();
$stmt = mysqli_prepare($db, $update_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c + 1), ...$update_params);
echo mysqli_stmt_execute($stmt);