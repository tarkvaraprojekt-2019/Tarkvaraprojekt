<?php

require "verify_token.php";

//Only accepts GET requests
//Requires valid token
//Requires incident_id parameter

if (!isset($_GET["id"])) {
	http_response_code(400);
	echo "Missing id";
	exit();
}

echo get_sessions($_GET["id"]);

function get_sessions($id) {
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM sessions WHERE id = ?");
	$stmt->bind_param("i", $id);
	$stmt->execute() or trigger_error($db->error);
	$json = json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
	$db->close();
	return $json;
}