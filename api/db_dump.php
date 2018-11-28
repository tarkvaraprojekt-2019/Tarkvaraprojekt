<?php

//Returns SQL statements to restore tables using mysqldump utility
//Statements are JSON-encoded, to be passed straight into db_restore.php
//Specify "raw":"true" in JSON to get unescaped, human-readable dump

require "verify_token.php";

if (!is_admin()) {
	http_response_code(403);
	echo "Unauthorized action";
	exit();
}

$conf = parse_ini_file("../.htconf");

$dump = `mysqldump -h {$conf["DB_ADDR"]} -u {$conf["DB_USER"]} -p{$conf["DB_PASS"]} {$conf["DB_NAME"]} 2>&1 | grep -v "Using a password"`;

echo $dump;