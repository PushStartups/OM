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
        $hoursLeftToOpen = null;

        foreach ($tagsIds as $id) {

            $tag = DB::queryFirstRow("select * from tags where id = '".$id["tag_id"]."'");
            $tags[$count2] = $tag;
            $count2++;
        };

        // GET GALLERY OF RESTAURANT

        $galleryImages = DB::query("select url from restaurant_gallery where restaurant_id = '".$result['id']."'");


        // RETRIEVING RESTAURANT TIMINGS i.e SUNDAY   STAT_TIME : 12:00  END_TIME 21:00;

        $restaurantTimings = DB::query("select * from weekly_availibility where restaurant_id = '".$result['id']."'");

        // CURRENT TIME OF ISRAEL
        date_default_timezone_set("Asia/Jerusalem");
        $currentTime           =    date("H:i:s");
        $tempDate              =    date("Y/m/d");
        $dayOfWeek             =    date('l', strtotime( $tempDate));

        // RESTAURANT AVAILABILITY ACCORDING TO TIME
        $currentStatus = true;

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
                else
                {

                    $hoursLeftToOpen = "Open On Sunday";


                }

            }
        }


        // CREATE DEFAULT RESTAURANT OBJECT;
        $restaurant = [
            "id"                   =>  $result["id"],                // RESTAURANT ID
            "name_en"              =>  $result["name_en"],           // RESTAURANT NAME
            "name_he"              =>  $result["name_he"],           // RESTAURANT NAME
            "logo"                 =>  $result["logo"],              // RESTAURANT LOGO
            "description_en"       =>  $result["description_en"],    // RESTAURANT DESCRIPTION
            "description_he"       =>  $result["description_he"],    // RESTAURANT DESCRIPTION
            "address_en"           =>  $result["address_en"],        // RESTAURANT ADDRESS
            "address_he"           =>  $result["address_he"],        // RESTAURANT ADDRESS
            "tags"                 =>  $tags,                        // RESTAURANT TAGS
            "gallery"              =>  $galleryImages,               // RESTAURANT GALLERY
            "timings"              =>  $restaurantTimings,           // RESTAURANT WEEKLY TIMINGS
            "availability"         =>  $currentStatus,               // RESTAURANT CURRENT AVAILABILITY
            "today_timings"        =>  $today_timings,               // TODAY TIMINGS
            "hours_left_to_open"   =>  $hoursLeftToOpen              // HOURS LEFT TO OPEN FROM CURRENT TIME
        ];

        $restaurants[$count] = $restaurant;
        $count++;
    }


    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($restaurants));

});

//  WEB HOOK GET DATA OF ALL RESTAURANT

$app->post('/categories_with_items', function ($request, $response, $args)
{

    $id = $request->getParam('restaurantId');

    // GET MENUS FOR RESTAURANT i.e LUNCH
    $menu = DB::queryFirstRow("select * from menus where restaurant_id = '".$id."'");

    // GET CATEGORIES OF RESTAURANT i.e ANGUS SALAD , ANGUS BURGER
    $categories = DB::query("select * from categories where menu_id = '".$menu['id']."'");

    $count2 = 0;
    foreach ($categories as $category) {
        $items = DB::query("select * from items where category_id = '".$category["id"]."'");
        $categories[$count2]['items'] = $items;
        $count2++;
    }

    // CREATE DEFAULT OBJECT FOR ITEMS AND CATEGORIES;
    $data = [
        "menu_name_en"              => $menu['name_en'],               // MENU NAME EN
        "menu_name_he"              => $menu['name_he'],               // MENU NAME HE
        "categories_items"          =>  $categories                   // CATEGORIES AND ITEMS
    ];



    // RESPONSE RETURN TO REST API CALL FROM SMOOCH
    return $response->withStatus(200)->write(json_encode($data));

});

// GET EXTRAS WITH SUBITEMS
$app->post('/extras_with_subitems', function ($request, $response, $args) {
    //GETTING ITEM_ID FROM CLIENT SIDE
    $item_id = $request->getParam('itemId');

    //GETTING EXTRAS OF ITEMS i,e ADDONS,SAUCES ETC
    $extra = DB::query("select * from extras where item_id = '$item_id'");

    $countExtra = 0;

    foreach ($extra as $extras) {
        //GETTING SUNITEMS OF EXTRAS i,e KETCHUP,AMERICAN FRIES
        $subItems = DB::query("select * from subitems where extra_id = '" . $extras["id"] . "'");

        $extra[$countExtra]['subitems'] = $subItems;

        $countExtra++;

    }
    $data = [
        "extra_with_subitems" => $extra                           // EXTRA AND ITEMS
    ];


    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($data));

});

// ADD USER ORDER INTO DATABASE
$app->post('/add_orders', function ($request, $response, $args) {
    $email = $request->getParam('email');

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '$email'");

    if(DB::count() == 0){
        // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
        DB::insert('users', array(
            'smooch_id' => $email
        ));
        $user_id = DB::insertId();
    }
    else{
        // IF USER ALREADY EXIST IN DATABASE
        $user_id = $getUser['id'];
    }

    // INSERTING USER INTO USER_ORDERS TABLE
    DB::insert('users_orders', array(
        'user_id' => $user_id
    ));
    $order_id = DB::insertId();

});

// VALIDATE COUPONS
$app->post('/coupon_validation', function ($request, $response, $args) {

    $email = $request->getParam('email');
    $coupon_code = $request->getParam('code');
    $success_validation = "false";


    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '$email'");

    if(DB::count() == 0){

        // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
        DB::insert('users', array(
            'smooch_id' => $email
        ));
        $user_id = DB::insertId();
    }
    else{

        // IF USER ALREADY EXIST IN DATABASE
        $user_id = $getUser['id'];
    }


    // COUPON VALIDATION
    $coupon_code = strtolower($coupon_code);

    //EXACT TIMEZONE OF ISRAEL
    date_default_timezone_set("Asia/Jerusalem");
    $current_date_time = date('Y-m-d H:i:s');


    $arr = explode(" ",$current_date_time);
    $current_date_time = $arr[0];
    $getCouponCode = DB::queryFirstRow("select * from coupons where name =%s", $coupon_code);


    if(!empty($getCouponCode)){

        $coupon_id = $getCouponCode['id'];
        $getStartingTime = $getCouponCode['starting_date'];
        $getEndingTime = $getCouponCode['ending_date'];
        $discount = $getCouponCode['discount'];
        $type = $getCouponCode['type'];

        if($type == "amount"){

            $isFixAmountCoupon = true;
        }
        else
        {
            $isFixAmountCoupon = false;
        }


        // GETTING STARTDATE AND ENDDATE OF COUPON FROM DATABASE
        $arr1 = explode(" ",$getStartingTime);
        $start_date = $arr1[0];


        $arr2 = explode(" ",$getEndingTime);
        $end_date = $arr2[0];


        if ((($current_date_time >= $start_date) && ($current_date_time <= $end_date))) {

            //VALIDATE COUPON, IF USER ALREADY HAVE THAT COUPON
            $userExist = DB::queryFirstRow("select * from user_coupons where user_id =%d AND coupon_id = %d", $user_id,$coupon_id);
            if(DB::count() == 0){
                DB::insert('user_coupons', array(
                    'user_id'     =>  $user_id,
                    'coupon_id'   =>  $coupon_id
                ));
                $success_validation = "true";

            }
            else{
                $success_validation = "false";
                $message = "Already Receive Coupon, Please Try Another Coupon";
            }

        }
        else{
            $success_validation = "false";
            $message = "Invalid Coupon, Please Try Another Coupon";
        }

    }
    if($success_validation == "true"){
        $data = [
            "success"               =>    true,                                          // COUPON VALID OR NOT (TRUE OR FALSE)
            "amount"                =>    $discount,                                     // DISCOUNT ON COUPON
            "isFixAmountCoupon"     =>    $isFixAmountCoupon                             // COUPON TYPE (AMOUNT OR PERCENTAGE)

        ];
    }
    else
    {

        $data = [
            "success"               =>    false
        ];
    }

    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($data));

});
$app->run();

?>

