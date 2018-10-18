<?php

require "db_connect.php";

//Returns password and admin status from database as an array("pass" => (), "is_admin" => ())
function get_user($username) {
	$db = get_db();
	$pass = NULL;
	$is_admin = NULL;
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
	$user = get_user($username);
	$is_admin = $user["is_admin"];
	if (!verify($username, $pass, $is_admin)) {
		return NULL;
	}
	if ($is_admin) {
		$admin_str = "1";
	} else {
		$admin_str = "0";
	}
	$conf = get_conf();
	$token_base = $expiry.":".$admin_str.":".$username;
	$key = $user["pass"].$conf["SECRET"];
	$hash = hash_hmac("sha512", $token_base, $key);
	$token = base64_encode($token_base.":".$hash);
	return $token;
}

function verify_token($token_enc, $is_admin) {
	$token = base64_decode($token_enc);
	$token_exploded = explode(":", $token);
	if (count($token_exploded) !== 4) {
		return false;
	}
	list($expiry, $admin_str, $username, $hash) = $token_exploded;
	if ($is_admin && !$admin_str) {
		return false;
	}
	$conf = get_conf();
	$token_base = $expiry.":".$admin_str.":".$username;
	$user = get_user($username);
	$key = $user["pass"].$conf["SECRET"];
	$new_hash = hash_hmac("sha512", $token_base, $key);
	if (hash_equals($new_hash, $hash)) {
		return true;
	} else {
		return false;
	}
}