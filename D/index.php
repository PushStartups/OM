<?php

require "../restapi/inc/initDb.php";

$url         =      explode("/", $_SERVER['REQUEST_URI']);
$agent_name  =      end($url);

DB::useDB("orderapp_user");
$agent = DB::queryFirstRow("select * from agents where name = '$agent_name'");

if(DB::count() == 0)
{
    DB::useDB("orderapp_user");
    DB::insert('agents', array(
        "name"              =>  $agent_name,
        "sales_count"       =>  1,

    ));
}
else
{
    $total = $agent['sales_count'] + 1;
    DB::useDB("orderapp_user");
    DB::update('agents', array(
        "sales_count"               =>      $total,

    ), "name=%s", $agent_name
    );
}

$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
$Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");
$webOS   = stripos($_SERVER['HTTP_USER_AGENT'],"webOS");

if( $iPod || $iPhone || $iPad)
{
    $redirect_url = "https://itunes.apple.com/us/app/orderapp-customer/id1148884312?mt=8";
    header("Location: $redirect_url");
}
else if($Android)
{
    $redirect_url = "https://play.google.com/store/apps/details?id=ps.orderapp&hl=en";
    header("Location: market://details?id=ps.orderapp&hl=en");
     }
else if($webOS)
{
    $redirect_url = "https://orderapp.com";
    header("Location: $redirect_url");
}
else
{
    $redirect_url = "https://orderapp.com";
    header("Location: $redirect_url");
}