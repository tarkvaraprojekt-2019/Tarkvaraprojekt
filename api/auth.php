<?php

require "db_connect.php";

function get_user($username, $db) {
	$stmt = mysqli_prepare($db, "CALL get_user(?, @pass, @is_admin, @token)");
	mysqli_stmt_bind_param($stmt, "s", $username);
	mysqli_stmt_execute($stmt);
	return mysqli_fetch_assoc(mysqli_query($db, "SELECT @pass, @is_admin, @token"));
}

function login($username, $password) {
	$db = get_db();
	//Get user details (pass, is_admin, token) from database
	$res = get_user($username, $db);
	
	//Check for validity
	if (!password_verify($password, $res["@pass"])) {
		return false;
	}
	
	//Save and send back token
	$token = base64_encode(random_bytes(24));
	$stmt = mysqli_prepare($db, "CALL replace_user_token(?, '{$token}')");
	mysqli_stmt_bind_param($stmt, "s", $username);
	mysqli_stmt_execute($stmt);
	
	return base64_encode($username) . ":" . $token . ":" . (int) $res["@is_admin"];
}

function logout($username) {
	$db = get_db();
	$stmt = mysqli_prepare($db, "CALL log_user_out(?)");
	mysqli_stmt_bind_param($stmt, "s", $username);
	return mysqli_stmt_execute($stmt);
}