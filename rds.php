<?php

define("HOST", "orderapp.crv4lzhgi1gx.eu-central-1.rds.amazonaws.com:3306");
define("DBUSER", "root");
define("PASS", "orderapp");
define("DB", "Orderapp");
define("PORT", 3306);


$link = mysqli_connect(HOST,DBUSER,PASS,DB,PORT);


if (mysqli_connect_errno($link)){

    echo "Failure to connect: " . mysqli_connect_error();
}
else{

    echo "successfully connected";
}