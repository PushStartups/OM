<?php
require_once '../inc/initDb.php';
DB::query("set names utf8");

$restaurant_id = $_POST['restaurant_id'];

DB::useDB('orderapp_b2b_b2c');
$r = DB::queryFirstRow("select * from restaurant_balance where restaurant_id = '$restaurant_id'");


$balance = $r['balance'] + $_POST['amount_added_tab'] * (1+$r['comission'] / 100) ;
$date = date("d-m-Y");
if(empty($r['amount_added_tab']))
{
    DB::useDB('orderapp_b2b_b2c');
    DB::update('restaurant_balance', array(

        "amount_added_tab"                  =>  $_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date,
        "swiped_by"                         =>  $_POST['swiped_by'],
        "comments"                          =>  $_POST['comments'],

    ),  "restaurant_id=%d",     $restaurant_id  );
}
else
{
    
    $amount_added_tab   =     $r['amount_added_tab'];
    $date_added_tab     =     $r['date_added_tab'];
    $swiped_by          =     $r['swiped_by'];
    $comments           =     $r['comments'];
    DB::useDB('orderapp_b2b_b2c');
    DB::update('restaurant_balance', array(
        "amount_added_tab"                  =>  $amount_added_tab.",".$_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date_added_tab.",".$date,
        "swiped_by"                         =>  $swiped_by.",".$_POST['swiped_by'],
        "comments"                          =>  $comments.",".$_POST['comments']
    ),  "restaurant_id=%d",  $restaurant_id );
}
DB::useDB('orderapp_b2b_b2c');
DB::update('restaurant_balance', array(

    "balance"                  =>  $balance,

),  "restaurant_id=%d",     $restaurant_id  );


echo json_encode("success");