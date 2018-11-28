<?php

//Feeds sent SQL statements into database, to be used with statements retrieved from db_dump.php
//Requires "dump" parameter

require "verify_token.php";

if (!is_admin()) {
	http_response_code(403);
	echo "Unauthorized action";
	exit();
}

$body = json_decode(file_get_contents("php://input"), true);

if (!isset($body["dump"])) {
	http_response_code(400);
	echo "Missing dump parameter";
	exit();
}

$conf = parse_ini_file("../.htconf");

$dump = shell_exec(sprintf("mysql -h %s -u %s -p%s %s -e '%s'", $conf["DB_ADDR"], $conf["DB_USER"], $conf["DB_PASS"], $conf["DB_NAME"], $body["dump"]));

echo $dump;