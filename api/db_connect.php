<?php

function get_conf() {
	return parse_ini_file("../.htconf");
}

function get_db() {
	$conf = get_conf();
	$db = mysqli_connect($conf["DB_ADDR"], $conf["DB_USER"], $conf["DB_PASS"], $conf["DB_NAME"]);
	mysqli_set_charset($db, "utf8");
	return $db;
}