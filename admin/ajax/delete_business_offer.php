<?php
require_once '../inc/initDb.php';

$business_id = $_POST['business_id'];

DB::query("delete from business_lunch_detail where  id = '$business_id' ");

echo json_encode('success') ;