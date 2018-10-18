<?php

require "auth.php";

if (!isset($_SERVER["HTTP_AUTH_TOKEN"])) {
	http_response_code(401);
	echo "Missing auth-token";
	exit();
}

$auth_token = base64_decode($_SERVER["HTTP_AUTH_TOKEN"]);
$auth_token_exploded = explode(":", $auth_token);

if (count($auth_token_exploded) !== 4) {
	http_response_code(401);
	echo "Invalid token";
	exit();
}

list($expiry, $admin_str, $username, $hash) = $auth_token_exploded;

if ($expiry < time()) {
	http_response_code(401);
	echo "Token expired!";
	exit();
}

function verify_access($is_admin) {
	$token = $_SERVER["HTTP_AUTH_TOKEN"];
	return verify_token($token, $is_admin); //This is a function from auth.php
}