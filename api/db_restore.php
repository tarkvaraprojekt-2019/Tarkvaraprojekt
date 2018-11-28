<?php

//Feeds sent SQL statements into database to restore tables, to be used with statements retrieved from db_dump.php
//Requires "dump" parameter

require "verify_token.php";

if (!is_admin()) {
	http_response_code(403);
	echo "Unauthorized action";
	exit();
}

$body = file_get_contents("php://input");

$conf = parse_ini_file("../.htconf");

$dump = `mysql -h {$conf["DB_ADDR"]} -u {$conf["DB_USER"]} -p{$conf["DB_PASS"]} {$conf["DB_NAME"]} -e "{$body}"`;

echo $dump;