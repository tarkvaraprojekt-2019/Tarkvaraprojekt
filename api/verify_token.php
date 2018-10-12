<?php

require "auth.php";

if (!isset($_SERVER["HTTP_AUTH_TOKEN"])) {
	http_response_code(401);
	echo "Missing auth-token";
	exit();
}

$auth_token_exploded = explode(":", $_SERVER["HTTP_AUTH_TOKEN"]);
if (count($auth_token_exploded) !== 2) {
	http_response_code(401);
	echo "Invalid token";
	exit();
}

list($token, $timestamp) = $auth_token_exploded;

if ($timestamp < time()) {
	http_response_code(401);
	echo "Timestamp expired!";
	exit();
}

function verify_access($is_admin) {
	$token = $_SERVER["HTTP_AUTH_TOKEN"];
	return verify_token($token, $is_admin);
}