<?php

require_once '../inc/initDb.php';
$company_id = $_POST['id'];


DB::update('company', array(
    "voting" =>  $_POST['val'],
),  "id=%d",     $company_id
);
echo json_encode("success");