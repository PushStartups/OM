<?php

//CHECK WHETHER ADMIN LOGGED IN OR NOT
function checkAdminSession() {

    if(empty($_SESSION['admin']))
    {
        header("location:login.php");
    }

}



//GET ALL RESTAURANTS FROM DATABSE (SHOWING ON INDEX.PHP)
function getAllRestaurants()
{
    $restaurants = DB::query("select r.*,cities.name_en as city_name from restaurants as r inner join cities on r.city_id = cities.id where r.id <> '99999' order by r.sort ASC ");
    return $restaurants;
}



//GET ALL RESTAURANTS ON CITY BASIS
function getAllRestaurantsByCity($city_id)
{
    $restaurants = DB::query("select * from restaurants where city_id = '$city_id' and id <> '99999'");
    return $restaurants;
}


// GET TOTAL COUNT OF RESTAURANTS
function getTotalRestaurants()
{
    DB::query("select * from restaurants where id <> '99999'");
    return $restaurants = DB::count();
}



// GET TOTAL COUNT OF RESTAURANTS ON CITY BASIS
function getRestaurantsCountByCity($city_id)
{
    DB::query("select * from restaurants where city_id = '$city_id' and id <> '99999' ");
    return $restaurants = DB::count();
}


// GET ALL ORDERS FROM DATABASE (SHOWING ON ORDERS.PHP)
function getAllOrders()
{
    $orders = DB::query("select o.*, r.name_en as restaurant_name, u.smooch_id as email from user_orders as o inner join restaurants as r on o.restaurant_id = r.id  inner join users as u on o.user_id = u.id order by o.id DESC ");
    return $orders;
}


function getOrderItems($order_id)
{
    $order_detail = DB::query("select * from order_detail where order_id = '$order_id'");
    return $order_detail;
}
function getRestaurantNameByOrderId($order_id)
{
    $orders = DB::queryFirstRow("select o.*, r.name_en as restaurant_name from user_orders as o  inner join restaurants as r on o.restaurant_id = r.id where o.id = '$order_id'");
    return $orders;
}

function getTotalPriceOfSpecificOrder($order_id)
{
    $total = 0;
    $orders = DB::query("select * from order_detail where order_id = '$order_id'");
    foreach($orders as $order)
    {
        $total = $total + $order['sub_total'];
    }
    return $total;
}

function getPaymentMethod($order_id)
{
    $payment       =  DB::queryFirstRow("select total,payment_method from user_orders where id = '$order_id' ");
    $payment_info  =  $payment['payment_method'];
    $total         =  $payment['total'];
    $transaction_id        =  $payment['transaction_id '];
    return array('payment_info' => $payment_info, 'total' => $total, 'transaction_id' => $transaction_id );
}


function getRefundCount($order_id)
{
    DB::query("select * from refund where order_id = '$order_id'");
    return $refund_count = DB::count();
}

function getRefundDetail($order_id)
{
    $refund_orders = DB::query("select * from refund where order_id = '$order_id'");
    return $refund_orders;
}



function getTotalRefundAmount($order_id)
{
    $total = 0;
    $orders = DB::query("select * from refund where order_id = '$order_id'");
    foreach($orders as $order)
    {
        $total = $total + $order['amount'];
    }
    return $total;
}