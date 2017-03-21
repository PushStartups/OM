<?php
$file = '/var/www/html/qa.website_2.0/en/phonenumbers.txt';
$phone = $_REQUEST['phone'];
file_put_contents($file, $phone, FILE_APPEND | LOCK_EX);
?>
