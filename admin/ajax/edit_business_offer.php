<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");


$business_id            =  $_POST['business_id'];


DB::update('business_lunch_detail', array(
//    "category_id"              =>      $_POST['category_id'],
    "item_id"                  =>      $_POST['item_id'],
    "week_day"                 =>      $_POST['day'],
    "week_cycle"               =>      $_POST['week_cycle'],

),  "id=%d",     $business_id  );


echo json_encode("success");