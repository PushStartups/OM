<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");




DB::update('items', array(
    "hide"                  =>      $_POST['hide'],
    "name_en"               =>      $_POST['name_en'],
    "name_he"               =>      $_POST['name_he'],
    "desc_en"               =>      $_POST['desc_en'],
    "desc_he"               =>      $_POST['desc_he'],

    "cash_pickup_exception"                 =>      $_POST['cash_pickup_exception'],
    "min_order_exception"                 =>      $_POST['min_order_exception'],
    "price"                 =>      $_POST['price']

), "id=%d", $_POST['item_id']
);


echo json_encode("success");