<?php

function get_conf() {
	return parse_ini_file("../.htconf");
}

function get_db() {
	$conf = get_conf();
	return mysqli_connect($conf["DB_ADDR"], $conf["DB_USER"], $conf["DB_PASS"], $conf["DB_NAME"]);
}