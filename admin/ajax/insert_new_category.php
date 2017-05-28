<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");

$secondlastRestaurant   =   DB::queryFirstRow("SELECT * FROM categories ORDER BY id DESC  LIMIT 1 , 1");
$secondlastId           =   $secondlastRestaurant['id'];
$secondlastSortId       =   $secondlastRestaurant['sort'];
$id                     =   $secondlastId + 1;
$sort                   =   $secondlastSortId + 1;



$menu_id = DB::queryFirstRow("select restaurant_id from menus where id = '".$_POST['menu_id']."'");

$restaurant = DB::queryFirstRow("select name_en from restaurants where id = '".$menu_id['restaurant_id']."'");


DB::insert('categories', array(

    "id"                    =>      $id,
    "menu_id"               =>      $_POST['menu_id'],
    "is_discount"           =>      $_POST['is_discount'],
    "name_en"               =>      $_POST['name_en'],
    "name_he"               =>      $_POST['name_he'],
    "business_offer"        =>      $_POST['business_offer'],
    "image_url"             =>      "/m/en/img/categories/".$restaurant['name_en']."/".$_POST['name_en'].".png",
    "sort"                  =>      $sort

));



echo json_encode("success");