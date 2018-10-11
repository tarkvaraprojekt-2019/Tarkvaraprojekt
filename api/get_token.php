<?php

include "auth.php";

if (!isset($_SERVER["HTTP_AUTH"])) {
	echo "Auth not supplied";
	exit();
}

$auth_exploded = explode(":", base64_decode($_SERVER["HTTP_AUTH"]));

if (count($auth_exploded) !== 2) {
	echo "Invalid authentication data";
	exit();
}

list($username, $password) = $auth_exploded;

$timestamp = time() + 30 * 60;
if (isset($_SERVER["HTTP_TIMESTAMP"]) && $_SERVER["HTTP_TIMESTAMP"] < time() + 5 * 24 * 3600) {
	$timestamp = $_SERVER["HTTP_TIMESTAMP"];
}

$token = create_token($username, $password, $timestamp);
if (!$token) {
	http_response_code(401);
	echo "Invalid username/password";
} else {
	echo $token;
}