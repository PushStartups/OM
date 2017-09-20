<?php
require_once '../inc/initDb.php';

$previous_count = $_POST['previous_count'];

DB::useDB('orderapp_user');

DB::query("select * from user_orders");

$newcount = DB::count();
if($previous_count != $newcount)
{
    echo json_encode("refresh");
}
else{
    echo json_encode("false");
}