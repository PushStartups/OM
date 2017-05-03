<?php

function checkAdminSession() {

    if(empty($_SESSION['admin']))
    {
        header("location:login.php");
    }

}
function getAllRestaurants()
{
    $restaurants = DB::query("select r.*,cities.name_en as city_name from restaurants as r inner join cities on r.city_id = cities.id where r.id <> '99999' order by r.sort ASC ");
    return $restaurants;
}

function getAllRestaurantsByCity($city_id)
{
    $restaurants = DB::query("select * from restaurants where city_id = '$city_id'");
    return $restaurants;
}
function getTotalRestaurants()
{
    DB::query("select * from restaurants");
    return $restaurants = DB::count();
}
function getRestaurantsCountByCity($city_id)
{
    DB::query("select * from restaurants where city_id = '$city_id'");
    return $restaurants = DB::count();
}