<?php

require "verify_token.php";
require_once "db_connect.php"

//Only accepts GET requests
//Requires valid token
//Requires kliendi_nr parameter

if (!isset($_GET["kliendi_nr"])) {
	http_response_code(400);
	echo("Missing kliendi_nr");
	exit();
}

echo get_incidents($_GET["kliendi_nr"]);

function get_incidents($kliendi_nr) {
	if (!verify_access(false)) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM incidents WHERE kliendi_nr = ?");
	$stmt->bind_param("i", $kliendi_nr);
	$stmt->execute() or trigger_error($db->error);
	return json_encode(mysqli_fetch_all(mysqli_stmt_get_result($stmt)));
	$db->close;
}