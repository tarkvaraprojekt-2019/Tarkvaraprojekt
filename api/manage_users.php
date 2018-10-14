<?php

require "verify_token.php";

//Only accepts POST requests
//All actions require admin token
//Request is specified in the "action" parameter
//Actions are "create", "set_admin", or "delete"
//"create" requires "username" and "password"
//"set_admin" requires "username" and "admin_status"
//"delete" requires "username"

if (!isset($_POST["action"])) {
	http_response_code(400);
	echo "Missing action parameter";
	exit();
}

$action = $_POST["action"];

if ($action === "create") {
	if (!verify_access(true)) {
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
	if (!verify_access(true)) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	if (!isset($_POST["username"]) || !isset($_POST["admin_status"])) {
		http_response_code(400);
		echo "Missing parameters";
		exit();
	}
	set_admin($_POST["username"], $_POST["admin_status"]);
} else if ($action === "delete") {
	if (!verify_access(true)) {
		http_response_code(401);
		echo "Unauthorized action";
		exit();
	}
	if (!isset($_POST["username"])) {
		http_response_code(400);
		echo "Missing parameters";
		exit();
	}
	delete_user($_POST["username"]);
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
//TODO: Make sure user can't set own status
function set_admin($username, $admin_status) {
	$db = get_db();
	$stmt = $db->prepare("CALL set_user_admin(?, ?)");
	$stmt->bind_param("ss", $username, $admin_status);
	$stmt->execute() or trigger_error($db->error);
	$db->close();
}

//Deletes the user
//TODO: Make sure user can't delete themselves (?)
function delete_user($username) {
	$db = get_db();
	$stmt = $db->prepare("CALL delete_user(?)");
	$stmt->bind_param("s", $username);
	$stmt->execute() or trigger_error($db->error);
	$db->close();
}