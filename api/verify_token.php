<?php

include "auth.php";

if (!isset($_SERVER["HTTP_AUTH_TOKEN"])) {
	echo "Auth-token not supplied";
	exit();
}

$auth_token_exploded = explode(":", $_SERVER["HTTP_AUTH_TOKEN"]);
if (count($auth_token_exploded) !== 2) {
	echo "Invalid token";
	exit();
}

list($token, $timestamp) = $auth_token_exploded;

if ($timestamp < time()) {
	echo "Timestamp expired!";
	exit();
}

function verify_access($is_admin) {
	list($token, $timestamp) = explode(":", $_SERVER["HTTP_AUTH_TOKEN"]);
	return verify_token($token, $timestamp, $is_admin);
}

if (verify_access(true)) {
	echo "Verified for admin";
} else if (verify_access(false)) {
	echo "Verified for regular";
}