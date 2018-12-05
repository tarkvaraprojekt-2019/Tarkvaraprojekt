<?php

require "verify_token.php";

//Only accepts GET requests
//Requires valid token
//Requires kliendi_nr parameter

if (!isset($_GET["kliendi_nr"])) {
	http_response_code(400);
	echo "Missing kliendi_nr";
	exit();
}

echo get_incidents($_GET["kliendi_nr"]);

function get_incidents($kliendi_nr) {
	$db = get_db();
	$stmt = $db->prepare("SELECT * FROM incidents WHERE kliendi_nr = ? ORDER BY id DESC");
	$stmt->bind_param("i", $kliendi_nr);
	$stmt->execute() or trigger_error($db->error);
	$json = json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
	$db->close();
	return $json;
}