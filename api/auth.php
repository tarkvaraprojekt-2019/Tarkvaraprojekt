<?php

/*if (!isset($_SERVER["HTTP_AUTH"])) {
	print "Access denied";
	exit();
}

$auth_header = $_SERVER["HTTP_AUTH"];
$auth_decoded = base64_decode($auth_header);
$auth_array = explode(":", $auth_decoded);
$username = $auth_array[0];
$pass = $auth_array[1];
if (verify($username, $pass, false)) {
	$timestamp = 818941897;
	print create_token($username, $pass, $timestamp);
} else {
	print "Not verified :(";
}*/

/*if (verify("admin", "password", false)) {
	print "Verified!";
} else {
	print "Not verified!";
}*/

//Returns password and admin status from database as an array("pass" => (), "is_admin" => ())
function get_user($username) {
	$pass = NULL;
	$is_admin = NULL;
	$db_info = parse_ini_file("./.conf/config.ini");
	$db = new mysqli($db_info["DB_ADDR"], $db_info["DB_USER"], $db_info["DB_PASS"], $db_info["DB_NAME"], $db_info["DB_PORT"]);
	$stmt = $db->prepare("CALL get_user(?, @pass, @is_admin)");
	$stmt->bind_param("s", $username);
	$stmt->execute() or trigger_error($db->error);
	$result = $db->query("SELECT @pass, @is_admin")->fetch_assoc() or trigger_error($db->error);
	$pass = $result["@pass"];
	$is_admin = $result["@is_admin"];
	$stmt->close();
	$db->close();
	return array("pass" => $pass, "is_admin" => (bool)$is_admin);
}

//Checks whether user input matches database, returning true or false
function verify($username, $pass, $is_admin) {
	$db_user = get_user($username);
	if(!password_verify($pass, $db_user["pass"])) {
		return false;
	} 
	if ($is_admin) {
		if (!$db_user["is_admin"])
			return false;
	}
	return true;
}

function create_token($username, $pass, $expiry) {
	$is_admin = get_user($username)["is_admin"];
	if (!verify($username, $pass, $is_admin)) {
		return NULL;
	}
	$info = parse_ini_file("./.conf/config.ini");
	$token_str = $expiry.(bool)$is_admin.$info["SECRET"];
	$token = password_hash($token_str, PASSWORD_DEFAULT);
	$token_enc = base64_encode($token);
	return $token_enc.":".$expiry;
}

function verify_token($token, $is_admin) {
	$token_exploded = explode(":", $token);
	if (count($token_exploded) !== 2) {
		return false;
	}
	list($base, $expiry) = $token_exploded;
	$info = parse_ini_file("./.conf/config.ini");
	$token_str = $expiry.(bool)$is_admin.$info["SECRET"];
	$token_dec = base64_decode($base);
	if (password_verify($token_str, $token_dec)) {
		return true;
	} else if (!$is_admin) {
		return verify_token($token, $expiry, true);
	}
	return false;
}