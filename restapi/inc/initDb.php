<?php

require_once 'meekrodb.2.3.class.php';

define("B2C_USER","orderapp_user");
define("B2C_RESTAURANTS","orderapp_restaurants");
define("B2B_B2C_COMMON","orderapp_b2b_b2c");


if($_SERVER['HTTP_HOST']     == "orderapp.com"
    || $_SERVER['HTTP_HOST'] == "app.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "eluna.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "staging.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "backup.orderapp.com") {


    DB::$host = 'pushxx-oappxxx-prodxxxx.crv4lzhgi1gx.eu-central-1.rds.amazonaws.com';
    DB::$port = '3306';
    DB::$password = 'RDSx!_OAPPxxx#';
}
else{

    DB::$password = 'orderapp';
}


DB::$user = 'root';
DB::$dbName = B2C_RESTAURANTS;

?>
