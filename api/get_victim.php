<?php

require "verify_token.php";

$where_fields = array();
$where_params = array();
$params = array("first_name", "last_name", "national_id", "phone", "email", "id");

foreach ($params as $param) {
	if ($_GET[$param] !== "") {
		$where_fields[] = $param;
		$where_params[] = $_GET[$param];
	}
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
$where_query = str_replace("first_name = ?", "MATCH(first_name) AGAINST(?)", $where_query);
$where_query = str_replace("last_name = ?", "MATCH(last_name) AGAINST(?)", $where_query);
$final_query = "SELECT * FROM clients" . $where_query;
if ($_GET["first_name"] == "" && $_GET["last_name"] == "") {
	$final_query .= " ORDER BY id DESC";
}

$db = get_db();
$stmt = mysqli_prepare($db, $final_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
mysqli_stmt_execute($stmt);
$res = mysqli_fetch_all(mysqli_stmt_get_result($stmt), MYSQLI_ASSOC);

echo json_encode($res);