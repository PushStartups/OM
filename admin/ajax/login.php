<?php
require_once '../inc/initDb.php';
session_start();
$email = $_POST['email'];
$password = $_POST['password'];

DB::useDB('orderapp_user');

$admin = DB::queryFirstRow("select * from admin where email = '$email' and password = '$password'");


if ($email == $admin['email'] and $password == $admin['password']) {
    //startAdminSession();
    $_SESSION['admin'] = $email;

    if($admin['role'] == "wr")
    {
        $_SESSION['b2c_admin_role'] = 1;
    }
    else if($admin['role'] == "r"){
        $_SESSION['b2c_admin_role'] = 0;
    }

    echo json_encode("true");
}
else
{
    echo json_encode("false");
}
