<?php

require "verify_token.php";

//Only accepts POST requests
//All actions require admin token
//Request is specified in the "action" parameter
//Actions are "create", "set_admin", or "delete"
//"create" requires "username" and "password"
//"set_admin" requires "username" and "admin_status"
//"delete" requires "username"

//TODO: Fix scope issues. $username is defined in verify_token.php, should rewrite to a function

if (!isset($_POST["action"])) {
	http_response_code(400);
	echo "Missing action parameter";
	exit();
}

$action = $_POST["action"];

if ($action === "create") {
	if (!is_admin()) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	if (!isset($_POST["username"]) || !isset($_POST["password"])) {
		http_response_code(400);
		echo "Missing parameters";
		exit();
	}
	create_user($_POST["username"], $_POST["password"]);
} else if ($action === "set_admin") {
	if (!is_admin()) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	if (!isset($_POST["username"]) || !isset($_POST["admin_status"])) {
		http_response_code(400);
		echo "Missing parameters";
		exit();
	}
	set_admin($_POST["username"], $_POST["admin_status"], $username);
} else if ($action === "delete") {
	if (!is_admin()) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	if (!isset($_POST["username"])) {
		http_response_code(400);
		echo "Missing parameters";
		exit();
	}
	delete_user($_POST["username"], $username);
} else {
	http_response_code(400);
	echo "Invalid action";
	exit();
}

//create a non-admin user with given username and password
function create_user($username, $pass) {
	$db = get_db();
	$pass_hashed = password_hash($pass, PASSWORD_DEFAULT);
	$stmt = $db->prepare("CALL create_user(?, ?)");
	$stmt->bind_param("ss", $username, $pass_hashed);
	$stmt->execute() or trigger_error($db->error);
	$db->close();
}

//Sets a user's admin status to selected value
function set_admin($modified_username, $admin_status, $caller_username) {
	if ($modified_username == $caller_username) {
		http_response_code(400);
		echo "Cannot change own admin status";
		exit();
	}
	$db = get_db();
	$stmt = $db->prepare("CALL set_user_admin(?, ?)");
	$stmt->bind_param("ss", $modified_username, $admin_status);
	$stmt->execute() or trigger_error($db->error);
	$db->close();
}

//Deletes the user
function delete_user($deleted_username, $caller_username) {
	if ($deleted_username == $caller_username) {
		http_response_code(400);
		echo "Cannot delete own account";
		exit();
	}
	$db = get_db();
	$stmt = $db->prepare("CALL delete_user(?)");
	$stmt->bind_param("s", $deleted_username);
	$stmt->execute() or trigger_error($db->error);
	$db->close();
}