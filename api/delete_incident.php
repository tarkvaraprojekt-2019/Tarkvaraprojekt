<?php

require "verify_token.php";

//Only admins may access
if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Check if id exists
if (!isset($body["id"])) {
	http_response_code(400);
	echo "Missing id";
	exit();
}

//Execute the query
$db = get_db();
$stmt = mysqli_prepare($db, "DELETE FROM incidents WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $body["id"]);
echo mysqli_stmt_execute($stmt);