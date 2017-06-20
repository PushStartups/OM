<?php
require_once '../inc/initDb.php';

$users_id = $_POST['users_id'];

DB::useDB('orderapp_b2b');

DB::query("delete from b2b_users where  id = '$users_id' ");

echo json_encode('success') ;