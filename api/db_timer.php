<?php

require 'auth.php';

$start = microtime(true);

$db = get_db();

$user = get_user('asdf', $db);

$end = microtime(true);

echo "Time taken (ms): ".($end-$start);