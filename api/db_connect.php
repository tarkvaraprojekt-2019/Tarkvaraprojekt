<?php

$conf = parse_ini_file("../.htconf");
$db = mysqli_connect($conf["DB_ADDR"], $conf["DB_USER"], $conf["DB_PASS"], $conf["DB_NAME"]);