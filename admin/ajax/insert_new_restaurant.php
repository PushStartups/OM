<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");


//RESTAURANT TABLE
$secondlastRestaurant = DB::queryFirstRow("SELECT id FROM restaurants ORDER BY id DESC  LIMIT 1 , 1");
$secondlastId = $secondlastRestaurant['id'];

$id = $secondlastId + 1;


//MENU TABLE
$secondlastMenu = DB::queryFirstRow("SELECT * FROM menus ORDER BY id DESC  LIMIT 1 , 1");
$secondlastMenuId = $secondlastMenu['id'];
$secondlastMenuSort = $secondlastMenu['sort'];

$menuId = $secondlastMenuId + 1;
$menuSort = $secondlastMenuSort + 1;



DB::insert('restaurants', array(

    "id"                    =>      $id,
    "name_en"               =>      $_POST['name_en'],
    "name_he"               =>      $_POST['name_he'],
    "contact"               =>      $_POST['contact'],
    "coming_soon"           =>      $_POST['coming_soon'],
    "hide"                  =>      $_POST['hide'],
    //"logo"                  =>      "m/en/img/".strtolower($_POST['name_en'])."_logo.png",
    "logo"                  =>       "m/en/img/cs_logo.png",
    "description_en"        =>      $_POST['description_en'],
    "description_he"        =>      $_POST['description_he'],
    "address_en"            =>      $_POST['address_en'],
    "address_he"            =>      $_POST['address_he'],
    "city_id"               =>      $_POST['city_id'],
    "hechsher_en"           =>      $_POST['hechsher_en'],
    "hechsher_he"           =>      $_POST['hechsher_he'],
    "pickup_hide"           =>      $_POST['pickup_hide'],

));

DB::insert('menus', array(

    "id"                  =>      $menuId,
    "restaurant_id"       =>      $id,
    "name_en"             =>      "Lunch",
    "name_he"             =>      "ארוחת צהריים",
    "sort"                =>      $menuSort,

));

echo json_encode("success");