<?php
require_once '../inc/initDb.php';
DB::query("set names utf8");

$restaurant_id =  $_POST['restaurant_id'];
$city_id       =  $_POST['city_id'];



$secondlastMenu = DB::queryFirstRow("SELECT * FROM menus ORDER BY id DESC  LIMIT 1 , 1");
$secondlastMenuId = $secondlastMenu['id'];
$secondlastMenuSort = $secondlastMenu['sort'];

$menuId   = $secondlastMenuId + 1;
$menuSort = $secondlastMenuSort + 1;
$max = DB::queryFirstRow("SELECT MAX( sort ) as sort  FROM restaurants");
$getMax = $max['sort'] + 1;
DB::query("set names utf8");
$rest = DB::queryFirstRow("select * from restaurants where id = '$restaurant_id'");
DB::insert('restaurants', array(

    "name_en"               =>      $rest['name_en'],
    "name_he"               =>      $rest['name_he'],
    "contact"               =>      $rest['contact'],
    "coming_soon"           =>      $rest['coming_soon'],
    "hide"                  =>      1,
    "logo"                  =>      $rest['logo'],
    "description_en"        =>      $rest['description_en'],
    "description_he"        =>      $rest['description_he'],
    "address_en"            =>      $rest['address_en'],
    "address_he"            =>      $rest['address_he'],
    "city_id"               =>      $city_id,
    "hechsher_en"           =>      $rest['hechsher_en'],
    "hechsher_he"           =>      $rest['hechsher_he'],
    "pickup_hide"           =>      $rest['pickup_hide'],
    "min_amount"            =>      $rest['min_amount'],
    "sort"                  =>      $getMax,
    "lat"                   =>       $rest['lat'],
    "lng"                   =>       $rest['lng'],

));

$lastInsertID = DB::insertId();

DB::insert('menus', array(

    "restaurant_id"       =>      $lastInsertID,
    "name_en"             =>      "Lunch",
    "name_he"             =>      "ארוחת צהריים",
    "sort"                =>      $menuSort,

));

$menu_id = DB::insertId();


$secondlastRestaurant   =   DB::queryFirstRow("SELECT * FROM categories ORDER BY id DESC  LIMIT 1 , 1");
$secondlastId           =   $secondlastRestaurant['id'];
$secondlastSortId       =   $secondlastRestaurant['sort'];
$id                     =   $secondlastId + 1;
$sort                   =   $secondlastSortId + 1;

DB::query("set names utf8");

$getPrevMenuId = DB::queryFirstRow("select id from menus where restaurant_id = '$restaurant_id'");

//GET CATEGORIES OF PREVIOUS RESTAURANTS
$prevCategories = DB::query("select * from categories where menu_id = '".$getPrevMenuId['id']."'");
foreach($prevCategories as $categoriess)
{
    DB::query("set names utf8");
    DB::insert('categories', array(
        "menu_id" => $menu_id,
        "is_discount" => $categoriess['is_discount'],
        "name_en" => $categoriess['name_en'],
        "name_he" => $categoriess['name_he'],
        "business_offer" => $categoriess['business_offer'],
        "image_url" => $categoriess['image_url'],
        "sort" => $sort

    ));
    $category_id = DB::insertId();

    // GET THE PREVIOUS CATEGORY ID AND GET THE DATA
    $prevItems = DB::query("select * from items where category_id = '".$categoriess['id']."'");
    foreach($prevItems as $itemss)
    {
        $secondlastRestaurant   =   DB::queryFirstRow("SELECT * FROM items ORDER BY id DESC  LIMIT 1 , 1");
        $secondlastSortId       =   $secondlastRestaurant['sort'];
        $sort1                   =   $secondlastSortId + 2;
        DB::query("set names utf8");
        DB::insert('items', array(
            "category_id"           =>      $category_id,
            "hide"                  =>      $itemss['hide'],
            "name_en"               =>      $itemss['name_en'],
            "name_he"               =>      $itemss['name_he'],
            "desc_en"               =>      $itemss['desc_en'],
            "desc_he"               =>      $itemss['desc_he'],
            "price"                 =>      $itemss['price'],
            "cash_pickup_exception" =>      $itemss['cash_pickup_exception'],
            "min_order_exception"   =>      $itemss['min_order_exception'],
            "sort"                  =>      $sort1

        ));
        $item_id = DB::insertId();

        $prevExtras = DB::query("select * from extras where item_id = '".$itemss['id']."'");
        foreach($prevExtras as $extrass)
        {
            $secondlastRestaurant   =   DB::queryFirstRow("SELECT * FROM extras ORDER BY id DESC  LIMIT 1 , 1");
            $secondlastId           =   $secondlastRestaurant['id'];
            $secondlastSortId       =   $secondlastRestaurant['sort'];
            $sort2                   =   $secondlastSortId + 1;

            DB::query("set names utf8");
            DB::insert('extras', array(
                "item_id"               =>      $item_id,
                "name_en"               =>      $extrass['name_en'],
                "name_he"               =>      $extrass['name_he'],
                "type"                  =>      $extrass['type'],
                "price_replace"         =>      $extrass['price_replace'],
                "limit"                 =>      $extrass['limit'],
                "sort"                  =>      $sort2

            ));
            $extra_id = DB::insertId();

            $prevSubitems = DB::query("select * from subitems where extra_id = '".$extrass['id']."'");
            foreach($prevSubitems as $subitemss)
            {
                DB::query("set names utf8");
                $secondlastRestaurant   =   DB::queryFirstRow("SELECT * FROM subitems ORDER BY id DESC  LIMIT 1 , 1");
                $secondlastId           =   $secondlastRestaurant['id'];
                $secondlastSortId       =   $secondlastRestaurant['sort'];
                $sort3                   =   $secondlastSortId + 2;

                DB::insert('subitems', array(

                    "extra_id"              =>      $extra_id,
                    "name_en"               =>      $subitemss['name_en'],
                    "name_he"               =>      $subitemss['name_he'],
                    "price"                 =>      $subitemss['price'],
                    "sort"                  =>      $sort3
                ));

            }
        }
    }
}
echo json_encode("success");