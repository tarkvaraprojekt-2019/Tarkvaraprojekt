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

echo substr($body["dump"],0,1000);

$dump = `echo {$body["dump"]} | mysql -h {$conf["DB_ADDR"]} -u {$conf["DB_USER"]} -p{$conf["DB_PASS"]}`;

echo $dump;