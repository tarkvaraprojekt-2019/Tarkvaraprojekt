<?php

//Feeds sent SQL statements into database to restore tables, to be used with statements retrieved from db_dump.php

require "verify_token.php";

if (!is_admin()) {
	http_response_code(403);
	echo "Unauthorized action";
	exit();
}

$body = file_get_contents("php://input");

$conf = parse_ini_file("../.htconf");
$date = date("Y-m-d");
$filename = "../restores/restore_" . $date;
file_put_contents($filename, $body);

echo `mysql -h {$conf["DB_ADDR"]} -u {$conf["DB_USER"]} -p{$conf["DB_PASS"]} {$conf["DB_NAME"]} < {$filename}`;
`../cleaner.sh`;