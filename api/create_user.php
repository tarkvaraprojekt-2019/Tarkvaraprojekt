<?php

/*print base64_encode("admin2:password2");
print "<br />";
if (verify_token("JDJ5JDEwJEJ5Ty9xdHdkOEo4em44MU5nMlMuNU9MUEc5MGNESkFHSHUyaEVKT01waTh5dmJBUnNnL0ku", 818941897, true)) {
	print "Verified :)";
} else {
	print "Not verified :(";
}*/

//create_user("admin", "password");
//set_admin("admin", true);

//create a non-admin user with given username and password
function create_user($username, $pass) {
	$db_info = parse_ini_file("../config.ini");
	$pass_hashed = password_hash($pass, PASSWORD_DEFAULT);
	$db = new mysqli($db_info["DB_ADDR"], $db_info["DB_USER"], $db_info["DB_PASS"], $db_info["DB_NAME"], $db_info["DB_PORT"]);
	$stmt = $db->prepare("CALL create_user(?, ?)");
	$stmt->bind_param("ss", $username, $pass_hashed);
	$stmt->execute() or trigger_error($db->error);
}

//Sets a user's admin status to selected value
//TODO: Make sure user can't set own status
function set_admin($username, $admin_status) {
	$db_info = parse_ini_file("../config.ini");
	$db = new mysqli($db_info["DB_ADDR"], $db_info["DB_USER"], $db_info["DB_PASS"], $db_info["DB_NAME"], $db_info["DB_PORT"]);
	$stmt = $db->prepare("CALL set_user_admin(?, ?)");
	$stmt->bind_param("ss", $username, $admin_status);
	$stmt->execute() or trigger_error($db->error);
}

function verify_token($token, $expiry, $is_admin) {
	$info = parse_ini_file("../config.ini");
	$token_str = $expiry.(bool)$is_admin.$info["SECRET"];
	$token_dec = base64_decode($token);
	if (password_verify($token_str, $token_dec)) {
		return true;
	} else if (!$is_admin) {
		return verify_token($token, $expiry, true);
	}
}