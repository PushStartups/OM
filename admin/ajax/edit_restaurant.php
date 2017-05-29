<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");




DB::update('restaurants', array(
    "name_en"               =>      $_POST['name_en'],
    "name_he"               =>      $_POST['name_he'],
    "contact"               =>      $_POST['contact'],
    "coming_soon"           =>      $_POST['coming_soon'],
    "hide"                  =>      $_POST['hide'],
    "description_en"        =>      $_POST['description_en'],
    "description_he"        =>      $_POST['description_he'],
    "address_en"            =>      $_POST['address_en'],
    "address_he"            =>      $_POST['address_he'],
    "city_id"               =>      $_POST['city_id'],
    "hechsher_en"           =>      $_POST['hechsher_en'],
    "hechsher_he"           =>      $_POST['hechsher_he'],
    "pickup_hide"           =>      $_POST['pickup_hide'],
    "min_amount"           =>       $_POST['min_amount'],

), "id=%d", $_POST['rest_id']
);


echo json_encode("success");