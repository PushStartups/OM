<?php
require_once '../inc/initDb.php';
DB::query("set names utf8");

$delivery_group_name = $_POST['delivery_group_name'];
$r = DB::queryFirstRow("select * from delivery_groups where delivery_team = '$delivery_group_name'");
$balance = $r['balance'] + $_POST['amount_added_tab'];
$date = date("d-m-Y");
if(empty($r['amount_added_tab']))
{
    DB::update('delivery_groups', array(

        "amount_added_tab"                  =>  $_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date ,
        "swiped_by"                         =>  $_POST['swiped_by'],
        "comments"                          =>  $_POST['comments'],

    ),  "delivery_team=%s",     $delivery_group_name  );
}
else
{
    $amount_added_tab       =   $r['amount_added_tab'];
    $date_added_tab         =   $r['date_added_tab'];
    $swiped_by              =   $r['swiped_by'];
    $comments               =   $r['comments'];

    DB::update('delivery_groups', array(

        "amount_added_tab"                  =>  $amount_added_tab.",".$_POST['amount_added_tab'],
        "date_added_tab"                    =>  $date_added_tab.",".$date,
        "swiped_by"                         =>  $swiped_by.",".$_POST['swiped_by'],
        "comments"                          =>  $comments.",".$_POST['comments'],

    ),  "delivery_team=%s",     $delivery_group_name  );
}

DB::update('delivery_groups', array(
    "balance"                  =>  $balance,
),  "delivery_team=%s",     $delivery_group_name );


echo json_encode("success");