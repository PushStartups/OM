<?php
require_once '../inc/initDb.php';
DB::query("set names utf8");

$restaurant_id = $_POST['restaurant_id'];
$r = DB::queryFirstRow("select * from restaurants where id = '$restaurant_id'");
$balance = $r['balance'] + $_POST['amount_added_tab']*(1+$r['comission'] / 100) ;
$date = date("d-m-Y");
if(empty($r['amount_added_tab']))
{
    DB::update('restaurants', array(

        "amount_added_tab"                  =>  $_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date,
        "swiped_by"                         =>  $_POST['swiped_by'],
        "comments"                          =>  $_POST['comments'],

    ),  "id=%d",     $restaurant_id  );
}
else
{
    
    $amount_added_tab   =     $r['amount_added_tab'];
    $date_added_tab     =     $r['date_added_tab'];
    $swiped_by          =     $r['swiped_by'];
    $comments           =     $r['comments'];

    DB::update('restaurants', array(
        "amount_added_tab"                  =>  $amount_added_tab.",".$_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date_added_tab.",".$date,
        "swiped_by"                         =>  $swiped_by.",".$_POST['swiped_by'],
        "comments"                          =>  $comments.",".$_POST['comments']
    ),  "id=%d",  $restaurant_id );
}

DB::update('restaurants', array(

    "balance"                  =>  $balance,

),  "id=%d",     $restaurant_id  );


echo json_encode("success");