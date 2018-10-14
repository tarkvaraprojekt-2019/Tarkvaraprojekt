<?php

require "verify_token.php";

if (!verify_access(false)) {
	http_response_code(401);
	echo "Unauthorized action";
	exit();
}

$insert_fields = array();
$insert_params = array();

//First name
if (isset($_POST["firstname"])) {
	$insert_fields[] = "first_name";
	$insert_params[] = $_POST["firstname"];
}
//Last name
if (isset($_POST["lastname"])) {
	$insert_fields[] = "last_name";
	$insert_params[] = $_POST["lastname"];
}
//National id
if (isset($_POST["nid"])) {
	$insert_fields[] = "national_id";
	$insert_params[] = $_POST["nid"];	
}
//Phone
if (isset($_POST["phone"])) {
	$insert_fields[] = "phone";
	$insert_params[] = $_POST["phone"];
}
//Email
if (isset($_POST["mail"])) {
	$insert_fields[] = "email";
	$insert_params[] = $_POST["mail"];
}

$c = count($insert_fields);
if ($c == 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}
$insert_query = "INSERT INTO clients SET ";
for ($i = 0; $i < $c; $i++) {
	if ($i != 0) {
		$insert_query .= ", ";
	}
	$insert_query .= $insert_fields[$i] . "=?";
}

$db = get_db();
$stmt = mysqli_prepare($db, $insert_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$insert_params);
echo mysqli_stmt_execute($stmt);