<?php

require "verify_token.php";

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

$update_fields = array();
$update_params = array();
$params = array("first_name", "last_name", "national_id", "phone", "email");

//Loop through all parameters to see if they were asked to be updated
$c = 5; //Update field count if everything was to be updated
foreach ($params as $param) {
	$update_fields[] = $param;
	if ($body[$param] !== "") {
		$update_params[] = $body[$param];
	} else {
		$c--;
		$update_params[] = null;
	}
}

//Add editing user and current date
$update_fields[] = "muutja";
$update_params[] = $username;
$update_fields[] = "muutmisaeg";
$update_params[] = date("Y-m-d");

//At least some info has to exist about the victim
if ($c <= 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}

//Construct the query
$update_query = "UPDATE clients SET ";
for ($i = 0; $i < 7; $i++) {
	if ($i != 0) {
		$update_query .= ", ";
	}
	$update_query .= $update_fields[$i] . "=?";
}
$update_query .= " WHERE id=?";
$update_params[] = $body["id"];

//Execute the query
$db = get_db();
$stmt = mysqli_prepare($db, $update_query);
mysqli_stmt_bind_param($stmt, "sssssssi", ...$update_params);
echo mysqli_stmt_execute($stmt);
