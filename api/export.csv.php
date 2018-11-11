<?php

require "verify_token.php";

if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

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

$where_query = " WHERE ";
$c = count($where_fields);
for ($i = 0; $i < $c; $i++) {
	if ($i == 1) {
		$where_query .= " AND " . $where_fields[$i];
	} else {
		$where_query .= $where_fields[$i];
	}
}

//Construct final query
$final_query = "SELECT * FROM incidents JOIN sessions ON incidents.id = incident_id";

$db = get_db();
if ($c == 0) {
	$query_res = mysqli_query($db, $final_query);
} else {
	$stmt = mysqli_prepare($db, $final_query . $where_query);
	mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$where_params);
	mysqli_stmt_execute($stmt);
	$query_res = mysqli_stmt_get_result($stmt);
}
$res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

//Construct csv
$csv = "";
//Title row
foreach ($res[0] as $head => $value) {
	$csv .= $head . "\t";
}
$csv .= "\n";
//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}

echo $csv;
