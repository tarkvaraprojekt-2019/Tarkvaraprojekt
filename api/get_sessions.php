<?php

require "verify_token.php";
require_once "db_connect.php"

//Only accepts GET requests
//Requires valid token
//Requires incident_id parameter

if (!isset($_GET["incident_id"])) {
	http_response_code(400);
	echo("Missing incient_id");
	exit();
}

echo get_sessions($_GET["incident_id"]);

function get_sessions($incident_id) {
	if (!verify_access(false)) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM sessions WHERE incident_id = ?");
	$stmt->bind_param("i", $incident_id);
	$stmt->execute() or trigger_error($db->error);
	return json_encode(mysqli_fetch_all(mysqli_stmt_get_result($stmt)));
	$db->close;
}