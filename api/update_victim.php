<?php

require "verify_token.php";

if (!verify_access(false)) {
	http_response_code(401);
	echo "Unauthorized action";
	exit();
}

//id
if (!isset($_POST["id"])) {
	http_response_code(400);
	echo "Missing victim id";
	exit();
}

$update_fields = array();
$update_params = array();
$params = array("first_name", "last_name", "national_id", "phone", "email");

foreach ($params as $param) {
	if (isset($_POST[$param]) && $_POST[$param] !== "") {
		$update_fields[] = $param;
		$update_params[] = $_POST[$param];
	}
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