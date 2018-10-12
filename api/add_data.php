<?php

require "verify_token.php";

//Only accepts POST requests
//All actions require authentication token
//Request is specified in the "table" parameter
//Tables are "clients", "incidents", and "sessions"
//Data must be sent in a JSON file
//Json file consists of an array of JSON objects
//Each object has three fields: "name", "data", and "datatype"
//"name" corresponds to the column name in associated table
//"dataype" is either "string", "number", or "boolean"