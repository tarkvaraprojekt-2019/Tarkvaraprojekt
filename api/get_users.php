<?php

require "verify_token.php";

if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

echo json_encode(mysqli_fetch_all(mysqli_query(get_db(), "SELECT name, is_admin FROM users"), MYSQLI_ASSOC));