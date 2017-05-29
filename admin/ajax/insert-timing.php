<?php
require_once '../inc/initDb.php';
session_start();
DB::query("set names utf8");



if(($_POST['monday_start_time'] == "Closed") || ($_POST['monday_start_time'] == "closed") )
{
    $_POST['monday_start_time']    = "Closed";
    $_POST['monday_end_time']      = "Closed";

    $_POST['monday_start_time_he'] = "סגור";
    $_POST['monday_end_time_he']   = "סגור";
}
else
{
    $_POST['monday_start_time_he'] = $_POST['monday_start_time'];
    $_POST['monday_end_time_he']   = $_POST['monday_end_time'];
}


if(($_POST['tuesday_start_time'] == "Closed") || ($_POST['tuesday_start_time'] == "closed") )
{
    $_POST['tuesday_start_time']    = "Closed";
    $_POST['tuesday_end_time']      = "Closed";

    $_POST['tuesday_start_time_he'] = "סגור";
    $_POST['tuesday_end_time_he']   = "סגור";
}
else
{
    $_POST['tuesday_start_time_he'] = $_POST['tuesday_start_time'];
    $_POST['tuesday_end_time_he']   = $_POST['tuesday_end_time'];
}




if(($_POST['wednesday_start_time'] == "Closed") || ($_POST['wednesday_start_time'] == "closed") )
{
    $_POST['wednesday_start_time']    = "Closed";
    $_POST['wednesday_end_time']      = "Closed";

    $_POST['wednesday_start_time_he'] = "סגור";
    $_POST['wednesday_end_time_he']   = "סגור";
}
else
{
    $_POST['wednesday_start_time_he'] = $_POST['wednesday_start_time'];
    $_POST['wednesday_end_time_he']   = $_POST['wednesday_end_time'];
}




if(($_POST['thursday_start_time'] == "Closed") || ($_POST['thursday_start_time'] == "closed"))
{
    $_POST['thursday_start_time']    = "Closed";
    $_POST['thursday_end_time']      = "Closed";

    $_POST['thursday_start_time_he'] = "סגור";
    $_POST['thursday_end_time_he']   = "סגור";
}
else
{
    $_POST['thursday_start_time_he'] = $_POST['thursday_start_time'];
    $_POST['thursday_end_time_he']   = $_POST['thursday_end_time'];
}




if(($_POST['friday_start_time'] == "Closed") || ($_POST['friday_start_time'] == "closed") )
{
    $_POST['friday_start_time']    = "Closed";
    $_POST['friday_end_time']      = "Closed";

    $_POST['friday_start_time_he'] = "סגור";
    $_POST['friday_end_time_he']   = "סגור";
}
else
{
    $_POST['friday_start_time_he'] = $_POST['friday_start_time'];
    $_POST['friday_end_time_he']   = $_POST['friday_end_time'];
}




if(($_POST['saturday_start_time'] == "Closed") || ($_POST['saturday_start_time'] == "closed") )
{
    $_POST['saturday_start_time']    = "Closed";
    $_POST['saturday_end_time']      = "Closed";

    $_POST['saturday_start_time_he'] = "סגור";
    $_POST['saturday_end_time_he']   = "סגור";
}
else
{
    $_POST['saturday_start_time_he'] = $_POST['saturday_start_time'];
    $_POST['saturday_end_time_he']   = $_POST['saturday_end_time'];
}




if(($_POST['sunday_start_time'] == "Closed") || ($_POST['sunday_start_time'] == "closed") )
{
    $_POST['sunday_start_time']    = "Closed";
    $_POST['sunday_end_time']      = "Closed";

    $_POST['sunday_start_time_he'] = "סגור";
    $_POST['sunday_end_time_he']   = "סגור";
}
else
{
    $_POST['sunday_start_time_he'] = $_POST['sunday_start_time'];
    $_POST['sunday_end_time_he']   = $_POST['sunday_end_time'];
}


$restaurant_id = $_POST['restaurant_id'];

$timings = DB::query("select * from weekly_availibility where restaurant_id = '$restaurant_id'");


if(DB::count() == 0){


    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Sunday",
        "week_he"                       =>  "יום א",
        "opening_time"                  =>  $_POST['sunday_start_time'],
        "closing_time"                  =>  $_POST['sunday_end_time'],
        "opening_time_he"               =>  $_POST['sunday_start_time_he'],
        "closing_time_he"               =>  $_POST['sunday_end_time_he']
    ));


    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Monday",
        "week_he"                       =>  "יום ב",
        "opening_time"                  =>  $_POST['monday_start_time'],
        "closing_time"                  =>  $_POST['monday_end_time'],
        "opening_time_he"               =>  $_POST['monday_start_time_he'],
        "closing_time_he"               =>  $_POST['monday_end_time_he']
    ));


    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Tuesday",
        "week_he"                       =>  "יום ג",
        "opening_time"                  =>  $_POST['tuesday_start_time'],
        "closing_time"                  =>  $_POST['tuesday_end_time'],
        "opening_time_he"               =>  $_POST['tuesday_start_time_he'],
        "closing_time_he"               =>  $_POST['tuesday_end_time_he']

    ));

    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Wednesday",
        "week_he"                       =>  "יום ד",
        "opening_time"                  =>  $_POST['wednesday_start_time'],
        "closing_time"                  =>  $_POST['wednesday_end_time'],
        "opening_time_he"               =>  $_POST['wednesday_start_time_he'],
        "closing_time_he"               =>  $_POST['wednesday_end_time_he']
    ));


    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Thursday",
        "week_he"                       =>  "יום ה",
        "opening_time"                  =>  $_POST['thursday_start_time'],
        "closing_time"                  =>  $_POST['thursday_end_time'],
        "opening_time_he"               =>  $_POST['thursday_start_time_he'],
        "closing_time_he"               =>  $_POST['thursday_end_time_he']
    ));



    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Friday",
        "week_he"                       =>  "ששי",
        "opening_time"                  =>  $_POST['friday_start_time'],
        "closing_time"                  =>  $_POST['friday_end_time'],
        "opening_time_he"               =>  $_POST['friday_start_time_he'],
        "closing_time_he"               =>  $_POST['friday_end_time_he']
    ));



    DB::insert('weekly_availibility', array(
        "restaurant_id"                 =>  $_POST['restaurant_id'],
        "week_en"                       =>  "Saturday",
        "week_he"                       =>  "שבת",
        "opening_time"                  =>  $_POST['saturday_start_time'],
        "closing_time"                  =>  $_POST['saturday_end_time'],
        "opening_time_he"               =>  $_POST['saturday_start_time_he'],
        "closing_time_he"               =>  $_POST['saturday_end_time_he']
    ));


}

else {


    $week1_id = $_POST['week1_id'];
    $week2_id = $_POST['week2_id'];
    $week3_id = $_POST['week3_id'];
    $week4_id = $_POST['week4_id'];
    $week5_id = $_POST['week5_id'];
    $week6_id = $_POST['week6_id'];
    $week7_id = $_POST['week7_id'];


    DB::update('weekly_availibility', array(
        "opening_time_he"               =>  $_POST['sunday_start_time_he'],
        "closing_time_he"               =>  $_POST['sunday_end_time_he'],
        "opening_time"                  =>  $_POST['sunday_start_time'],
        "closing_time"                  =>  $_POST['sunday_end_time'],

    ),  "id=%d",     $week1_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['monday_start_time'],
        "closing_time"                  =>  $_POST['monday_end_time'],
        "opening_time_he"               =>  $_POST['monday_start_time_he'],
        "closing_time_he"               =>  $_POST['monday_end_time_he']

    ),  "id=%d",     $week2_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['tuesday_start_time'],
        "closing_time"                  =>  $_POST['tuesday_end_time'],
        "opening_time_he"               =>  $_POST['tuesday_start_time_he'],
        "closing_time_he"               =>  $_POST['tuesday_end_time_he']

    ),  "id=%d",     $week3_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['wednesday_start_time'],
        "closing_time"                  =>  $_POST['wednesday_end_time'],
        "opening_time_he"               =>  $_POST['wednesday_start_time_he'],
        "closing_time_he"               =>  $_POST['wednesday_end_time_he']

    ),  "id=%d",     $week4_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['thursday_start_time'],
        "closing_time"                  =>  $_POST['thursday_end_time'],
        "opening_time_he"               =>  $_POST['thursday_start_time_he'],
        "closing_time_he"               =>  $_POST['thursday_end_time_he']

    ),  "id=%d",     $week5_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['friday_start_time'],
        "closing_time"                  =>  $_POST['friday_end_time'],
        "opening_time_he"               =>  $_POST['friday_start_time_he'],
        "closing_time_he"               =>  $_POST['friday_end_time_he']

    ),  "id=%d",     $week6_id  );


    DB::update('weekly_availibility', array(
        "opening_time"                  =>  $_POST['saturday_start_time'],
        "closing_time"                  =>  $_POST['saturday_end_time'],
        "opening_time_he"               =>  $_POST['saturday_start_time_he'],
        "closing_time_he"               =>  $_POST['saturday_end_time_he']

    ),  "id=%d",     $week7_id  );




}


echo json_encode("success");