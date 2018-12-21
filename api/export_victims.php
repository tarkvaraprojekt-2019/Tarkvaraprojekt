<?php

require "verify_token.php";

if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

$db = get_db();

//Construct where query
$where_fields = array();
$where_params = array();
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

//Construct victim query
$victim_query = "SELECT clients.id, first_name, last_name, national_id FROM incidents, sessions, clients WHERE sessions.incident_id=incidents.id AND kliendi_nr=clients.id {$where_query} GROUP BY clients.id";

if ($c == 0) {
	$query_res = mysqli_query($db, $victim_query);
} else {
	$stmt = mysqli_prepare($db, $victim_query);
	mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
	mysqli_stmt_execute($stmt);
	$query_res = mysqli_stmt_get_result($stmt);
}
$victim_res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

//Construct CSV line by line
$csv = "Kliendi nr.	Eesnimi	Perenimi	Isikukood\n";
foreach ($victim_res as $victim) {
	$csv .= $victim["id"] . "\t" . $victim["first_name"] . "\t" . $victim["last_name"] . "\t" . $victim["national_id"] . "\n";
}

echo $csv;