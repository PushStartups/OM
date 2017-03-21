<?php
$file = '/var/www/html/staging.orderapp.com/phonenumbers.txt';
$phone = $_REQUEST['phone'];
file_put_contents($file, $phone, FILE_APPEND | LOCK_EX);
echo "rael"
?>
