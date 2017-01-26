<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require      'vendor/autoload.php';
require_once 'inc/initDb.php';


DB::query("set names utf8");
// SLIM INITIALIZATION
$app = new \Slim\App();


//  WEB HOOK GET ALL RESTAURANT

$app->post('/get_all_restaurants_he', function ($request, $response, $args)
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

            $tag = DB::queryFirstRow("select name_he from tags where id = '".$id["tag_id"]."'");
            $tags[$count2] = $tag["name_he"];

            $count2++;
        };

        // RETRIEVING RESTAURANT TIMINGS;

        $restaurantTimings = DB::query("select * from weekly_availibility where restaurant_id = '".$result['id']."'");
        $timings = Array();
        $count3 = 0;

        foreach ($restaurantTimings as $singleTime) {

            $time [] = [
                "week_day"            => $singleTime['week_day'],
                "openning_time"    => $singleTime['openning_time'],
                "closing_time"    => $singleTime['closing_time']
            ];

            $timings[$count3] = $time;
            $count3++;
        }

        // CREATE DEFAULT RESTAURANT OBJECT;

        $restaurant[] = [
            "name"              => $result["name_he"],
            "logo"              => $result["logo"],
            "description"       => $result["description_he"],
            "address"           => $result["address_he"],
            "tags"              => $tags
        ];

        $restaurants[$count] = $restaurant;
        $count++;
    }


    // RESPONSE RETURN TO REST API CALL FROM SMOOCH
    return $response->withStatus(200)->write(json_encode($restaurants));

});


$app->run();


