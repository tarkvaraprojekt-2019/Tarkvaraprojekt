<?php

require "verify_token.php";

if (!verify_access(false)) {
	http_response_code(401);
	echo "Unauthorized action";
	exit();
}

//Unpack post body
$body = json_decode($_POST["body"], true);

$insert_fields = array();
$insert_params = array();
$params = array("first_name", "last_name", "national_id", "phone", "email");

//Loop through all parameters to see if they were asked to be inserted
foreach ($params as $param) {
	if (isset($body[$param]) && $body[$param] !== "") {
		$insert_fields[] = $param;
		$insert_params[] = $body[$param];
	}
}

$c = count($insert_fields);
if ($c == 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}
$insert_query = "INSERT INTO clients SET ";
for ($i = 0; $i < $c; $i++) {
	if ($i != 0) {
		$insert_query .= ", ";
	}
	$insert_query .= $insert_fields[$i] . "=?";
}

$db = get_db();
$stmt = mysqli_prepare($db, $insert_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$insert_params);
echo mysqli_stmt_execute($stmt);