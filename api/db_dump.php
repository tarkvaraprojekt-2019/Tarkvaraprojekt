<?php

//Returns SQL statements to restore tables using mysqldump utility

require "verify_token.php";

if (!is_admin()) {
	http_response_code(403);
	echo "Unauthorized action";
	exit();
}

$conf = parse_ini_file("../.htconf");

$dump = `mysqldump -h {$conf["DB_ADDR"]} -u {$conf["DB_USER"]} -p{$conf["DB_PASS"]} {$conf["DB_NAME"]} | grep -v "Using a password"`;
$date = date("Y-m-d");
$filename = "../dumps/dump_" . $date . "_manual";
file_put_contents($filename, $dump);
`../cleaner.sh`

echo $dump;