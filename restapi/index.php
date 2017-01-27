<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require      'vendor/autoload.php';
require_once 'inc/initDb.php';


DB::query("set names utf8");
// SLIM INITIALIZATION
$app = new \Slim\App();


//  WEB HOOK GET ALL RESTAURANT

$app->post('/get_all_restaurants', function ($request, $response, $args)
{
    $restaurants = Array();

    $results = DB::query("select * from restaurants");
    $count = 0;

    foreach ($results as $result)
    {

        // GET TAGS OF RESTAURANT i.e BURGER , PIZZA

        $tagsIds = DB::query("select tag_id from restaurant_tags where restaurant_id = '".$result['id']."'");

        $tags = Array();
        $count2 = 0;

        foreach ($tagsIds as $id) {

            $tag = DB::queryFirstRow("select * from tags where id = '".$id["tag_id"]."'");
            $tags[$count2] = $tag;
            $count2++;
        };


        // RETRIEVING RESTAURANT TIMINGS i.e SUNDAY   STAT_TIME : 12:00  END_TIME 21:00;

        $restaurantTimings = DB::query("select * from weekly_availibility where restaurant_id = '".$result['id']."'");

        // CURRENT TIME OF ISRAEL
        date_default_timezone_set("Asia/Jerusalem");
        $currentTime           =    date("H:i:s");
        $tempDate              =    date("Y/m/d");
        $dayOfWeek             =    date('l', strtotime( $tempDate));

        // RESTAURANT AVAILABILITY ACCORDING TO TIME
        $currentStatus = false;

        $today_timings = "";

        foreach ($restaurantTimings as $singleTime) {

            if($singleTime['week_en'] == $dayOfWeek) {

                $today_timings = $singleTime['opening_time']." - ". $singleTime['closing_time'];

                $openingTime = DateTime::createFromFormat('H:i', $singleTime['opening_time']);
                $closingTime = DateTime::createFromFormat('H:i', $singleTime['closing_time']);
                $currentTime = DateTime::createFromFormat('H:i:s', $currentTime);


                if ($currentTime >= $openingTime && $currentTime <= $closingTime) {

                    $currentStatus = true;
                    break;
                }

            }
        }



        // CREATE DEFAULT RESTAURANT OBJECT;

        $restaurant = [
            "name_en"              =>  $result["name_en"],           // RESTAURANT NAME
            "name_he"              =>  $result["name_he"],           // RESTAURANT NAME
            "logo"                 =>  $result["logo"],              // RESTAURANT LOGO
            "description_en"       =>  $result["description_en"],    // RESTAURANT DESCRIPTION
            "description_he"       =>  $result["description_he"],    // RESTAURANT DESCRIPTION
            "address_en"           =>  $result["address_en"],        // RESTAURANT ADDRESS
            "address_he"           =>  $result["address_he"],        // RESTAURANT ADDRESS
            "tags"                 =>  $tags,                        // RESTAURANT TAGS
            "timings"              =>  $restaurantTimings,           // RESTAURANT WEEKLY TIMINGS
            "availability"         =>  $currentStatus,               // RESTAURANT CURRENT AVAILABILITY
            "today_timings"        =>  $today_timings                // TODAY TIMINGS
        ];

        $restaurants[$count] = $restaurant;
        $count++;
    }


    // RESPONSE RETURN TO REST API CALL FROM SMOOCH
    return $response->withStatus(200)->write(json_encode($restaurants));

});


$app->run();


