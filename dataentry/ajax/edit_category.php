<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");


DB::update('categories', array(
    "name_en"               =>      $_POST['name_en'],
    "name_he"               =>      $_POST['name_he'],
    "business_offer"        =>      $_POST['business_offer'],

), "id=%d", $_POST['category_id']
);



echo json_encode("success");