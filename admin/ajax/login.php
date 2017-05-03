<?php
require_once '../inc/initDb.php';
session_start();
$email = $_POST['email'];
$password = $_POST['password'];

$admin = DB::queryFirstRow("select * from admin where id = '1'");


if ($email == $admin['email'] and $password == $admin['password']) {
    //startAdminSession();
    $_SESSION['admin'] = $email;

    echo json_encode("true");
}
else
{
    echo json_encode("false");
}
