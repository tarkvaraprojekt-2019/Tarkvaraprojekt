<?php

include "auth.php";

if (!isset($_SERVER["HTTP_AUTH_TOKEN"])) {
	echo "Auth-token not supplied";
	http_response_code(401)
	exit();
}

$auth_token_exploded = explode(":", $_SERVER["HTTP_AUTH_TOKEN"]);
if (count($auth_token_exploded) !== 2) {
	echo "Invalid token";
	http_response_code(401)
	exit();
}

list($token, $timestamp) = $auth_token_exploded;

if ($timestamp < time()) {
	echo "Timestamp expired!";
	http_response_code(401)
	exit();
}

function verify_access($is_admin) {
	$token = $_SERVER["HTTP_AUTH_TOKEN"];
	return verify_token($token, $is_admin);
}

if (verify_access(true)) {
	echo "Verified for admin";
} else if (verify_access(false)) {
	echo "Verified for regular";
} else {
	echo "Access denied";
	http_response_code(401)
}