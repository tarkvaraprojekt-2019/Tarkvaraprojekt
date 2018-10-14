<?php

require "verify_token.php";

if (!verify_access(false)) {
	http_response_code(401);
	echo "Unauthorized action";
	exit();
}

$where_fields = array();
$where_params = array();

//First name
if (isset($_GET["firstname"])) {
	$where_fields[] = "first_name";
	$where_params[] = $_GET["firstname"];
}
//Last name
if (isset($_GET["lastname"])) {
	$where_fields[] = "last_name";
	$where_params[] = $_GET["lastname"];
}
//National id
if (isset($_GET["nid"])) {
	$where_fields[] = "national_id";
	$where_params[] = $_GET["nid"];	
}
//Phone
if (isset($_GET["phone"])) {
	$where_fields[] = "phone";
	$where_params[] = $_GET["phone"];
}
//Email
if (isset($_GET["mail"])) {
	$where_fields[] = "email";
	$where_params[] = $_GET["mail"];
}
//id
if (isset($_GET["id"])) {
	$where_fields[] = "id";
	$where_params[] = $_GET["id"];
}

$where_query = "";
$c = count($where_fields);
if ($c == 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}
for ($i = 0; $i < $c; $i++) {
	if ($i == 0) {
		$where_query .= " WHERE ";
	} else {
		$where_query .= " AND ";
	}
	$where_query .= $where_fields[$i] . " = ?";
}

$db = get_db();
$stmt = mysqli_prepare($db, "SELECT * FROM clients" . $where_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
mysqli_stmt_execute($stmt);
$res = mysqli_fetch_all(mysqli_stmt_get_result($stmt));

echo json_encode($res);