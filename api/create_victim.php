<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

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

//Add editing user and current date
$insert_fields[] = "muutja";
$insert_params[] = $username;
$insert_fields[] = "muutmisaeg";
$insert_params[] = date("Y-m-d");

//At least some info has to exist about the victim
$c = count($insert_fields);
if ($c <= 2) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}

//Construct the query
$insert_query = "INSERT INTO clients SET ";
for ($i = 0; $i < $c; $i++) {
	if ($i != 0) {
		$insert_query .= ", ";
	}
	$insert_query .= $insert_fields[$i] . "=?";
}

//Execute the query
$db = get_db();
$stmt = mysqli_prepare($db, $insert_query);
mysqli_stmt_bind_param($stmt, str_repeat("s", $c), ...$insert_params);
if (mysqli_stmt_execute($stmt)) {
	echo mysqli_fetch_row(mysqli_query("SELECT LAST_INSERT_ID()"))[0];
}
