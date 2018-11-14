<?php

require "verify_token.php";

//Only accepts GET requests
//Requires valid token
//Requires kliendi_nr parameter

if (!isset($_GET["id"])) {
	http_response_code(400);
	echo("Missing id");
	exit();
}

echo get_incidents($_GET["id"]);

function get_incidents($id) {
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM incidents WHERE incident_id = ?");
	$stmt->bind_param("i", $id);
	$stmt->execute() or trigger_error($db->error);
	$json = json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
	$db->close();
	return $json;
}