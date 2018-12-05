<?php

require "verify_token.php";

//Only accepts GET requests
//Requires valid token
//Requires incident_id parameter

if (!isset($_GET["incident_id"])) {
	http_response_code(400);
	echo "Missing incient_id";
	exit();
}

echo get_sessions($_GET["incident_id"]);

function get_sessions($incident_id) {
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM sessions WHERE incident_id = ? ORDER BY kuupaev DESC");
	$stmt->bind_param("i", $incident_id);
	$stmt->execute() or trigger_error($db->error);
	$json = json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
	$db->close();
	return $json;
}