<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");

DB::insert('delivery_info', array(
    "restaurant_id"                 =>  $_POST['restaurant_id'],
    "area_name_en"                  =>  $_POST['area_en'],
    "area_name_he"                  =>  $_POST['area_he'],
    "fee"                           =>  $_POST['fee']
));
$insertId = DB::insertId();

foreach($_POST['path'] as $latLng)
{
    $latilngi = explode(",",$latLng);
    DB::insert('delivery_info_detail', array(
        "delivery_info_id"              =>  $insertId,
        "lat"                           =>  $latilngi[0],
        "lng"                           =>  $latilngi[1]
    ));
}


echo json_encode("success");