<?php

require "auth.php";

if (!isset($_SERVER["HTTP_AUTH_TOKEN"])) {
	http_response_code(401);
	echo "Missing auth-token";
	exit();
}

$auth_token = explode(":", base64_decode($_SERVER["HTTP_AUTH_TOKEN"]), 3);

if (count($auth_token) < 2) {
	http_response_code(401);
	echo "Invalid token";
	exit();
}

list($username, $token, ) = $auth_token;
$db = get_db()
$user = get_user($username, $db);
if ($user["@token"] !== $token) {
	http_response_code(401);
	echo "Invalid username/password";
	exit();
}
$is_admin = $user["@is_admin"];
mysqli_close($db);

function is_admin() {
	global $is_admin;
	return $is_admin;
}