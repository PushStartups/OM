<?php

require      'vendor/autoload.php';
require_once 'inc/initDb.php';
require_once 'functions.php';
require_once 'Interfax/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Voucherify\VoucherifyClient;
use Voucherify\CustomerBuilder;
use Voucherify\ClientException;
use Mailgun\Mailgun;
use Aws\Ses\SesClient;
use Interfax\FaxClient;
use Stichoza\GoogleTranslate\TranslateClient;

//TRANSLATION SET UP
$tr = new TranslateClient();
$tr->setTarget('iw');

DB::query("set names utf8");

$con = null;

if($_SERVER['HTTP_HOST']     == "orderapp.com"
    || $_SERVER['HTTP_HOST'] == "b2b.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "staging.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "app.orderapp.com"
    || $_SERVER['HTTP_HOST'] == "backup.orderapp.com") {


    DB::useDB(B2B_B2C_COMMON);


    $active_server         =  DB::queryFirstRow("select * from mail_servers where active = '1'");
    $active_server_detail  =  DB::queryFirstRow("select * from mail_server_details where mail_server_id = '".$active_server['id']."'");


    define("EMAIL_HOST" , $active_server_detail['host']);
    define("ACTIVE_SERVER_ID",$active_server['id']);

    //AMAZON SES SERVER
    if($active_server['id'] == '1')
    {

        define("EMAIL_SMTP_USERNAME", $active_server_detail['smtp_user_name']);
        define("EMAIL_SMTP_PASSWORD", $active_server_detail['smtp_password']);
        define("ACCESS_KEY_ID", $active_server_detail['access_key_id']);
        define("ACCESS_KEY_SECRET", $active_server_detail['access_key_secret']);

    }
    //MAIL GUN EMAIL SERVER
    else if($active_server['id'] == '2')
    {

        define("MAIL_GUN_API_KEY", $active_server_detail['api_key']);
        define("MAIL_GUN_DOMAIN", $active_server_detail['domain']);

    }

}
else{


    define("ACTIVE_SERVER_ID",'2');
    define("MAIL_GUN_API_KEY", 'key-65a57d31e6628f609456464d64223d44');
    define("MAIL_GUN_DOMAIN", 'app.orderapp.com');
}


// DEV SERVER
if($_SERVER['HTTP_HOST'] == "dev.orderapp.com")
{

    define("EMAIL","orders@orderapp.com");
    // B2B LINK
    define("B2BEMAIL","devb2b.orderapp.com");

}

// QA SERVER
else if($_SERVER['HTTP_HOST'] == "qa.orderapp.com"){


    define("EMAIL","orders@orderapp.com");
    // B2B LINK
    define("B2BEMAIL","qab2b.orderapp.com");

}


// PRODUCTION SERVER
else
{

    define("EMAIL","orders@orderapp.com");
    // B2B LINK
    define("B2BEMAIL","b2b.orderapp.com");

}


// SLIM INITIALIZATION
$app = new \Slim\App();


DB::useDB(B2C_RESTAURANTS);


//  GET LIST OF CITIES
//  WEB HOOK GET LIST OF CITIES AVAILABLE
$app->post('/get_all_cities', function ($request, $response, $args)
{
    try{

        // MINIMUM ORDER AMOUNT
        $cities = DB::query("select * from cities where hide = 0");

        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($cities));
        return $response;


    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});



//  WEB HOOK GET ALL RESTAURANT
$app->post('/get_selected_restaurants', function ($request, $response, $args)
{

    try {

        $city_name        = $request->getParam('city');
        $restaurant_name  = $request->getParam('rest');

        $new_city_name    = "";
        $new_restaurant_name = "";

        $cities   =  DB::query("select * from cities");
        foreach($cities as $city)
        {
            $cityy = str_replace(' ', '', $city['name_en']);
            if($cityy == $city_name)
            {
                $new_city_name = $city['name_en'];
            }
        }




        $restaurants   =  DB::query("select * from restaurants");
        foreach($restaurants as $restaurant)
        {
            $restaurantt = str_replace(' ', '', $restaurant['name_en']);
            if($restaurantt == $restaurant_name)
            {
                $new_restaurant_name = $restaurant['name_en'];
            }
        }

        if(($new_city_name == "") || ($new_restaurant_name == ""))
        {
            // RESPONSE RETURN TO REST API CALL
            $response = $response->withStatus(202);
            $response = $response->withJson(json_encode("false"));
            return $response;
        }






        $get_city_id = DB::queryFirstRow("select * from cities where name_en = '$new_city_name' ");
        $get_restaurant_id = DB::queryFirstRow("select * from restaurants where name_en = '$new_restaurant_name' ");



        $restaurants = Array();

        $result = DB::queryFirstRow("select * from restaurants  where city_id = '".$get_city_id['id']."' and hide = 0 and id = '".$get_restaurant_id['id']."' order by sort ASC ");

        $count = 0;

        //foreach ($results as $result) {
        // GET TAGS OF RESTAURANT i.e BURGER , PIZZA

        $tagsIds = DB::query("select tag_id from restaurant_tags where restaurant_id = '" . $result['id'] . "'");

        $tags = Array();
        $count2 = 0;
        $hoursLeftToOpen = null;

        foreach ($tagsIds as $id) {

            $tag = DB::queryFirstRow("select * from tags where id = '" . $id["tag_id"] . "'");
            $tags[$count2] = $tag;
            $count2++;
        };

        // GET GALLERY OF RESTAURANT

        $galleryImages = DB::query("select url from restaurant_gallery where restaurant_id = '" . $result['id'] . "'");


        // RETRIEVING RESTAURANT TIMINGS i.e SUNDAY   STAT_TIME : 12:00  END_TIME 21:00;

        $restaurantTimings = DB::query("select * from weekly_availibility where restaurant_id = '" . $result['id'] . "'");

        // CURRENT TIME OF ISRAEL
        date_default_timezone_set("Asia/Jerusalem");
        $currentTime = date("H:i");
        $tempDate = date("d/m/Y");
        $dayOfWeek = date('l');

        // RESTAURANT AVAILABILITY ACCORDING TO TIME
        $currentStatus = false;

        $today_timings = "";
        $today_timings_he = "";


        foreach ($restaurantTimings as $singleTime) {


            if ($singleTime['week_en'] == $dayOfWeek) {


                $today_timings = $singleTime['opening_time'] . " - " . $singleTime['closing_time'];
                $today_timings_he = $singleTime['opening_time_he'] . " - " . $singleTime['closing_time_he'];
                $openingTime = DateTime::createFromFormat('H:i', $singleTime['opening_time']);
                $closingTime = DateTime::createFromFormat('H:i', $singleTime['closing_time']);
                $currentTime = DateTime::createFromFormat('H:i', $currentTime);


                if ($currentTime >= $openingTime && $currentTime <= $closingTime) {

                    $currentStatus = true;

                    break;
                } else {

                    $hoursLeftToOpen = "Open On Sunday";


                }

            }
        }

        $delivery_fee = DB::query("select * from delivery_fee where restaurant_id = '".$result['id']."'");

        $min = $delivery_fee[0]["fee"];
        $max = $delivery_fee[0]["fee"];

        // CALCULATING MINIMUM AND MAXIMUM DELIVERY FEE
        foreach ($delivery_fee as $fee) {
            if ($fee['fee'] > $max)
                $max = $fee['fee'];
            else if ($fee['fee'] < $min)
                $min = $fee['fee'];
        }


        // CREATE DEFAULT RESTAURANT OBJECT;
        $restaurant = [

            "min_delivery"         => $min,                         // MINIMUM DELIVERY FEE
            "max_delivery"         => $max,                         // MAXIMUM DELIVERY FEE
            "id"                   => $result["id"],                // RESTAURANT ID
            "name_en"              => $result["name_en"],           // RESTAURANT NAME
            "name_he"              => $result["name_he"],           // RESTAURANT NAME
            "min_amount"           => $result["min_amount"],        // RESTAURANT MINIMUM AMOUNT
            "logo"                 => $result["logo"],              // RESTAURANT LOGO
            "description_en"       => $result["description_en"],    // RESTAURANT DESCRIPTION
            "description_he"       => $result["description_he"],    // RESTAURANT DESCRIPTION
            "address_en"           => $result["address_en"],        // RESTAURANT ADDRESS
            "address_he"           => $result["address_he"],        // RESTAURANT ADDRESS
            "hechsher_en"          => $result["hechsher_en"],       // RESTAURANT HECHSHER
            "hechsher_he"          => $result["hechsher_he"],       // RESTAURANT HECHSHER
            "coming_soon"          => $result["coming_soon"],       // RESTAURANT COMING SOON
            "pickup_hide"          => $result["pickup_hide"],       // HIDE PICK UP OPTION
            "delivery_exception"   => $result["delivery_exception"],    // DELIVERY EXCEPTION
            "cash_exception"       => $result["cash_exception"],    // CASH_EXCEPTION
            "cc_exception"         => $result["cc_exception"],          // CREDIT CARD
            "tags"                 => $tags,                        // RESTAURANT TAGS
            "gallery"              => $galleryImages,               // RESTAURANT GALLERY
            "timings"              => $restaurantTimings,           // RESTAURANT WEEKLY TIMINGS
            "availability"         => $currentStatus,               // RESTAURANT CURRENT AVAILABILITY
            "today_timings"        => $today_timings,               // TODAY TIMINGS
            "today_timings_he"     => $today_timings_he,            // TODAY TIMINGS HE
            "hours_left_to_open"   => $hoursLeftToOpen,             // HOURS LEFT TO OPEN FROM CURRENT TIME
            "delivery_fee"         => $delivery_fee,                // DELIVERY FEE AREA WISE
            "contact"              => $result['contact']            // CONTACT NO
        ];

        //}


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($restaurant));
        return $response;

    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});



//  WEB HOOK GET ALL RESTAURANT
$app->post('/get_all_restaurants', function ($request, $response, $args)
{

    try {

        DB::useDB(B2C_RESTAURANTS);

        $id = $request->getParam('city_id');


        $restaurants = Array();

        $results = DB::query("select * from restaurants  where city_id = '$id' and hide = 0 order by sort ASC ");

        $count = 0;

        foreach ($results as $result) {
            // GET TAGS OF RESTAURANT i.e BURGER , PIZZA

            $tagsIds = DB::query("select tag_id from restaurant_tags where restaurant_id = '" . $result['id'] . "'");

            $tags = Array();
            $count2 = 0;
            $hoursLeftToOpen = null;

            foreach ($tagsIds as $id) {

                $tag = DB::queryFirstRow("select * from tags where id = '" . $id["tag_id"] . "'");
                $tags[$count2] = $tag;
                $count2++;
            };

            // GET GALLERY OF RESTAURANT

            $galleryImages = DB::query("select url from restaurant_gallery where restaurant_id = '" . $result['id'] . "'");


            // RETRIEVING RESTAURANT TIMINGS i.e SUNDAY   STAT_TIME : 12:00  END_TIME 21:00;

            $restaurantTimings = DB::query("select * from weekly_availibility where restaurant_id = '" . $result['id'] . "'");

            // CURRENT TIME OF ISRAEL
            date_default_timezone_set("Asia/Jerusalem");
            $currentTime = date("H:i");
            $tempDate = date("d/m/Y");
            $dayOfWeek = date('l');

            // RESTAURANT AVAILABILITY ACCORDING TO TIME
            $currentStatus = false;

            $today_timings = "";
            $today_timings_he = "";


            foreach ($restaurantTimings as $singleTime) {


                if ($singleTime['week_en'] == $dayOfWeek) {


                    $today_timings = $singleTime['opening_time'] . " - " . $singleTime['closing_time'];
                    $today_timings_he = $singleTime['opening_time_he'] . " - " . $singleTime['closing_time_he'];
                    $openingTime = DateTime::createFromFormat('H:i', $singleTime['opening_time']);
                    $closingTime = DateTime::createFromFormat('H:i', $singleTime['closing_time']);
                    $currentTime = DateTime::createFromFormat('H:i', $currentTime);


                    if ($currentTime >= $openingTime && $currentTime <= $closingTime) {

                        $currentStatus = true;

                        break;
                    } else {

                        $hoursLeftToOpen = "Open On Sunday";


                    }

                }
            }

            $delivery_fee = DB::query("select * from delivery_fee where restaurant_id = '".$result['id']."'");

            $min = $delivery_fee[0]["fee"];
            $max = $delivery_fee[0]["fee"];

            // CALCULATING MINIMUM AND MAXIMUM DELIVERY FEE
            foreach ($delivery_fee as $fee) {
                if ($fee['fee'] > $max)
                    $max = $fee['fee'];
                else if ($fee['fee'] < $min)
                    $min = $fee['fee'];
            }


            // CREATE DEFAULT RESTAURANT OBJECT;
            $restaurant = [

                "min_delivery"         => $min,                         // MINIMUM DELIVERY FEE
                "max_delivery"         => $max,                         // MAXIMUM DELIVERY FEE
                "id"                   => $result["id"],                // RESTAURANT ID
                "name_en"              => $result["name_en"],           // RESTAURANT NAME
                "name_he"              => $result["name_he"],           // RESTAURANT NAME
                "min_amount"           => $result["min_amount"],        // RESTAURANT MINIMUM AMOUNT
                "logo"                 => $result["logo"],              // RESTAURANT LOGO
                "description_en"       => $result["description_en"],    // RESTAURANT DESCRIPTION
                "description_he"       => $result["description_he"],    // RESTAURANT DESCRIPTION
                "address_en"           => $result["address_en"],        // RESTAURANT ADDRESS
                "address_he"           => $result["address_he"],        // RESTAURANT ADDRESS
                "hechsher_en"          => $result["hechsher_en"],       // RESTAURANT HECHSHER
                "hechsher_he"          => $result["hechsher_he"],       // RESTAURANT HECHSHER
                "coming_soon"          => $result["coming_soon"],       // RESTAURANT COMING SOON
                "pickup_hide"          => $result["pickup_hide"],       // HIDE PICK UP OPTION
                "rest_lat"             => $result["lat"],               // LATITUDE
                "rest_lng"             => $result["lng"],               // LONGITUDE
                "tags"                 => $tags,                        // RESTAURANT TAGS
                "gallery"              => $galleryImages,               // RESTAURANT GALLERY
                "timings"              => $restaurantTimings,           // RESTAURANT WEEKLY TIMINGS
                "availability"         => $currentStatus,               // RESTAURANT CURRENT AVAILABILITY
                "today_timings"        => $today_timings,               // TODAY TIMINGS
                "today_timings_he"     => $today_timings_he,            // TODAY TIMINGS HE
                "hours_left_to_open"   => $hoursLeftToOpen,             // HOURS LEFT TO OPEN FROM CURRENT TIME
                "delivery_fee"         => $delivery_fee,                // DELIVERY FEE AREA WISE
                "contact"              => $result['contact']            // CONTACT NO
            ];

            $restaurants[$count] = $restaurant;
            $count++;
        }


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($restaurants));
        return $response;

    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});


//  WEB HOOK GET DATA OF CATEGORIES WITH ITEMS

$app->post('/categories_with_items', function ($request, $response, $args)
{
    try {

        DB::useDB(B2C_RESTAURANTS);

        $id = $request->getParam('restaurantId');

        // GET MENUS FOR RESTAURANT i.e LUNCH
        $menu = DB::queryFirstRow("select * from menus where restaurant_id = '" . $id . "'");

        // GET CATEGORIES OF RESTAURANT i.e ANGUS SALAD , ANGUS BURGER
        $categories = DB::query("select * from categories where menu_id = '" . $menu['id'] . "' order by sort ASC");

        $count2 = 0;

        $items = '';

        foreach ($categories as $category) {

            $items = array();

            if($category['business_offer'] == 0) {

                $items = DB::query("select * from items where category_id = '" . $category["id"] . "' and hide = '0'");

            }
            else {

//                // BUSINESS LUNCH CATEGORY GET SELECTED ITEMS
                $first_day_this_month = date('Y-m-01');
                $firstDayOfMonth = $first_day_this_month;

                $currentDate = date('Y-m-d');

                $dtCurrent      = DateTime::createFromFormat('Y-m-d', $currentDate);
                $dtFirstOfMonth = DateTime::createFromFormat('Y-m-d', $firstDayOfMonth);

                $numWeeks = 1 + (intval($dtCurrent->format("W")) - intval($dtFirstOfMonth->format("W")));

                $dayOfWeek = date('l');

                $businessItemsIds = DB::query("select item_id from business_lunch_detail where category_id = '" . $category["id"] . "' AND  week_day = '$dayOfWeek' AND week_cycle = '$numWeeks'");


                foreach ($businessItemsIds as $businessItem) {

                    $item = DB::queryFirstRow("select * from items where category_id = '" . $category["id"] . "' and hide = '0' and id = '".$businessItem['item_id']."'");

                    array_push($items, $item);
                }

            }

            $count3 = 0;

            // CHECK FOR ITEMS PRICE ZERO
            foreach ($items as $item) {

                if ($item['price'] == 0) {

                    $extras = DB::query("select * from extras where item_id = '" . $item["id"] . "' AND type = 'One' AND price_replace=1");
                    // EXTRAS WITH TYPE OME AND PRICE REPLACE 1

                    foreach ($extras as $extra) {

                        $subItems = DB::query("select * from subitems where extra_id = '" . $extra["id"] . "'");
                        $lowestPrice = $subItems[0]['price'];

                        foreach ($subItems as $subitem) {

                            if ($subitem['price'] < $lowestPrice) {
                                $lowestPrice = $subitem['price'];
                            }

                        }

                        $items[$count3]['price'] = $lowestPrice;

                    }
                    //break;
                }

                $count3++;
            }


            $categories[$count2]['items'] = $items;
            $count2++;
        }

        // CREATE DEFAULT OBJECT FOR ITEMS AND CATEGORIES;
        $data = [
            "menu_name_en" => $menu['name_en'],               // MENU NAME EN
            "menu_name_he" => $menu['name_he'],               // MENU NAME HE
            "categories_items" => $categories                 // CATEGORIES AND ITEMS
        ];


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($data));
        return $response;

    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});




// GET EXTRAS WITH SUBITEMS
$app->post('/extras_with_subitems', function ($request, $response, $args) {

    try {

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
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($data));
        return $response;
    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});

$app->post('/testing_traccer', function ($request, $response, $args) {

    $service_url = "http://35.156.74.68:8082/api/objectives";
    $curl = curl_init($service_url);
    $curl_post_data = array(
        "name" => "asad",
        "phone" => "testing",
        "startLatitude"=>31.748089,
        "startLongitude"=>34.9950524999999,
        "endLatitude"=>32.083725,
        "endLongitude"=>34.798195,
        "deviceId"=>0,
        "status"=>"",
        "startAddress" => "Modiin",
        "endAddress" => "beit",
        "orderId" => "684",
        "geocode"        => "no",
        "timeCreate"     => null
    );
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERPWD,  "admin:admin");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($curl_post_data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: Basic YWRtaW46YWRtaW4=',
        'Content-Type: application/json'
    ));
    $curl_response = curl_exec($curl);
    curl_close($curl);

    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($curl_response));
    return $response;

});

// VALIDATE COUPONS

$app->post('/coupon_validation', function ($request, $response, $args) {


    try {

        $email              =   $request->getParam('email');          //  GET USER EMAIL
        $coupon_code        =   $request->getParam('code');           //  COUPON CODE ENTER BY USER
        $order_amount       =   $request->getParam('total');          //  ORDER AMOUNT
        $restaurant_title   =   $request->getParam('rest_title');     //  RESTAURANT TITLE
        $restaurant_city    =   $request->getParam('rest_city');      //  RESTAURANT CITY
        $delivery_fee       =   $request->getParam('delivery_fee');   //  DELIVERY FEE
        $user_order         =   $request->getParam('user_order');     //  USER ORDER
        $success_validation =   "false";                              //  SUCCESS VALIDATION RESPONSE FOR USER
        $user_id            =   null;

        $isUniqueUser       =   false;


        DB::useDB(B2C_USER);

        //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
        $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '$email'");

        if (DB::count() == 0) {

            // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
            DB::insert('users', array(
                'smooch_id' => $email,
                'email' => $email
            ));

            $user_id = DB::insertId();

            $isUniqueUser = true;
        }
        else {

            // IF USER ALREADY EXIST IN DATABASE
            $user_id = $getUser['id'];
        }

        // COUPON VALIDATION
        $coupon_code = strtoupper($coupon_code);

        $res = VoucherifyValidation($coupon_code,$user_id,($order_amount * 100),$restaurant_title,$restaurant_city,$delivery_fee,$user_order,$isUniqueUser);


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($res));
        return $response;

    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});



function VoucherifyValidation($userCoupon,$user_id,$order_amount,$rest_title,$rest_city,$delivery_fee,$user_order,$isUniqueUser)
{

    $apiID          = "6243c07e-fea0-4f0d-89f8-243d589db97b";
    $apiKey         = "ac0d95c8-b5fd-4484-a697-41a1a91f3dd2";
    $voucherify     =  new VoucherifyClient($apiID, $apiKey);
    $data = '';

    DB::useDB(B2C_USER);

    $result = DB::queryFirstRow("select * from users where id = '$user_id'");

    $Vid = $result['voucherify_id'];



    // USER NOT EXIST ON VOUCHERIFY
    if($Vid == "" || $Vid == null)
    {

        try {

            $customer = (new CustomerBuilder())
                ->setName($result['name'])
                ->setEmail($result['email'])
                ->setDescription("OrderApp website2.0 User")
                ->setMetadata((object)array("lang" => "en"))
                ->build();

            $vResult = $voucherify->customer->create($customer);


            DB::query("update users set voucherify_id = '".$vResult->id."' where id = '$user_id'");


            $Vid =  $vResult->id;


        }
        catch (ClientException $e)
        {
            $data = [

                "success" => false  // SUCCESS FALSE WRONG CODE

            ];
            return $data;
        }
    }


    try {

        $result =  $voucherify->get($userCoupon);

        if($result->discount->type == "UNIT" && $delivery_fee == "null")
        {
            $data = [

                "success" => false,                                       // COUPON VALID OR NOT (TRUE OR FALSE)
                "deliveryFree" => true,                                   //  COUPON DISCOUNT
                "message" => "Error Coupon is valid only in case of Delivery"
            ];


            return $data;

        }



        // PREPARE META DATA ON ITEMS SELECTED
        // FOR COUPON REDUMPTION VALIDATION

        $metaData = [

            "restaurant" => $rest_title,
            "city" => $rest_city,
            "unique user" => $isUniqueUser

        ];


        foreach ($user_order['orders'] as $order) {

            $metaData[$order['itemName']] =  $order['itemName'];
        }




        $resultRedeem = $voucherify->redeem([
            "voucher" => $userCoupon,
            "customer" => [
                "id" =>  $Vid
            ],
            "order" => [
                "amount" => $order_amount
            ],
            "metadata" => $metaData

        ], NULL);



        if($resultRedeem->voucher->discount->type == "AMOUNT")
        {
            $dAmount = ($resultRedeem->voucher->discount->amount_off / 100);

            $data = [

                "success" => true,                                         // COUPON VALID OR NOT (TRUE OR FALSE)
                "amount" => $dAmount,                                      // DISCOUNT ON COUPON
                "isFixAmountCoupon" => true                                // COUPON TYPE (AMOUNT OR PERCENTAGE)

            ];


            return $data;


        }
        else if($resultRedeem->voucher->discount->type == "PERCENT")
        {
            $dAmount = $resultRedeem->voucher->discount->percent_off;


            $data = [

                "success" => true,                                         // COUPON VALID OR NOT (TRUE OR FALSE)
                "amount" => $dAmount,                                      // DISCOUNT ON COUPON
                "isFixAmountCoupon" => false,                              // COUPON TYPE (AMOUNT OR PERCENTAGE)
                "deliveryFree" => false
            ];


            return $data;
        }
        else if($resultRedeem->voucher->discount->type == "PERCENT")
        {
            $dAmount = $resultRedeem->voucher->discount->percent_off;


            $data = [

                "success" => true,                                         // COUPON VALID OR NOT (TRUE OR FALSE)
                "amount" => $dAmount,                                      // DISCOUNT ON COUPON
                "isFixAmountCoupon" => false,                             // COUPON TYPE (AMOUNT OR PERCENTAGE)
                "deliveryFree" => false
            ];


            return $data;
        }
        else if($resultRedeem->voucher->discount->type == "UNIT")
        {
            $data = [

                "success" => true,                                         // COUPON VALID OR NOT (TRUE OR FALSE)
                "deliveryFree" => true,                                    //  COUPON DISCOUNT

            ];

            return $data;
        }


    }
    catch (ClientException $e)
    {
        $data = [

            "success" => false,  // SUCCESS FALSE WRONG CODE
            "message" => $e->getMessage()
        ];

        return $data;
    }


    $data = [

        "success" => false  // SUCCESS FALSE WRONG CODE

    ];

    return $data;

}



//  MAIL GUN API EMAIL VALIDATOR
$app->post('/validate_email', function ($request, $response, $args) {
//
    $email      = $request->getParam('email');
    $emailErr   = false;

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $emailErr = true;
    }


    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($emailErr));
    return $response;

});





//  STORE USER INFORMATION
$app->post('/add_new_user', function ($request, $response, $args) {

    $resp               =   'error';
    $user_email         =   $request->getParam('user_email');
    $user_password      =   $request->getParam('user_password');


    DB::useDB(B2C_USER);

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select * from users where smooch_id = '" . $user_email . "'");

    if (DB::count() == 0) {


        $verification_code  =  rand(1000,5000);
        $verification_code  =  md5($verification_code);


        // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
        DB::insert('users', array(

            'smooch_id' => $user_email,
            "user_name" => $user_email,
            "password"  => $user_password,
            "name" => '',
            "email" => $user_email,
            "login_verification_hash" => $verification_code,
            "is_signup" => 1
        ));

        sendVerificationEmail($verification_code,$user_email);

        ob_end_clean();

        $resp = 'success';

    }
    else{


        if($getUser['is_signup'] == "0")
        {
            $verification_code  =  rand(1000,5000);
            $verification_code  =  md5($verification_code);

            DB::update('users', array(

                'smooch_id' => $user_email,
                "user_name" => $user_email,
                "password"  => $user_password,
                "email" => $user_email,
                "login_verification_hash" => $verification_code,
                "is_signup" => 1
            ), 'smooch_id = %s', $user_email);

            sendVerificationEmail($verification_code,$user_email);

            ob_end_clean();

            $resp = 'success';

        }
        else {

            if ($getUser['login_verification_hash'] != "success") {

                $resp = "account_exist";

            } else {

                $resp = "account_exist";
            }

        }
    }


    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($resp));
    return $response;

});


// RESEND EMAIL FOR SIGNUP URL

$app->post('/resend_signup_email', function ($request, $response, $args) {


    $user_email   =   $request->getParam('user_email');
    $resp = '';

    DB::useDB(B2C_USER);

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select * from users where smooch_id = '" . $user_email . "'");


    if(DB::count() != 0) {

        sendVerificationEmail($getUser['login_verification_hash'], $user_email);
        $resp = 'success';
    }
    else{

        $resp = 'error';
    }

    ob_end_clean();


    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($resp));
    return $response;

});




$app->post('/get_user', function ($request, $response, $args) {

    $resp = "not found";
    $user_smooch_id = $request->getParam('smooch_id');

    DB::useDB(B2C_USER);

    $getUser = DB::queryFirstRow("select * from users where smooch_id = '$user_smooch_id'");

    if (DB::count() == 0) {

        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode($resp));
        return $response;

    }


    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($getUser));
    return $response;

});



// RESEND EMAIL FOR SIGNUP URL

$app->post('/user_login', function ($request, $response, $args) {

    $resp = "error";

    $user_email         =   $request->getParam('user_email');
    $user_password      =   $request->getParam('user_password');

    DB::useDB(B2C_USER);

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select * from users where smooch_id = '$user_email' AND password = '$user_password'");

    if (DB::count() != 0) {


        if($getUser['login_verification_hash'] == 'success')
        {
            $resp = 'success';
        }
        else{

            $resp = 'success';

        }

    }

    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($resp));
    return $response;

});




$app->post('/reset_password', function ($request, $response, $args) {

    $user_email   =   $request->getParam('user_email');
    $resp = '';

    DB::useDB(B2C_USER);

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select * from users where smooch_id = '" . $user_email . "'");

    if(DB::count() != 0) {

        sendPassword($getUser['password'], $user_email);

        ob_end_clean();

        $resp = 'success';
    }
    else{

        $resp = "error";
    }
    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($resp));
    return $response;

});


//  STORE USER ORDER IN DATABASE
$app->post('/add_order', function ($request, $response, $args) {

    try {

        // GET ORDER RESPONSE FROM USER (CLIENT SIDE)
        $user_order = $request->getParam('user_order');
        $user_platform = $request->getParam('user_platform');
        $browser_info = $request->getParam('browser_info');
        $user_id = null;
        $getUser = null;

        //CHECK IF USER ALREADY EXIST, IF NO CREATE USER


        DB::useDB(B2C_USER);

        if($user_order['uid'] != '')
        {
            $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '" . $user_order['uid'] . "'");
        }
        else{

            $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '" . $user_order['email'] . "'");
        }

        if (DB::count() == 0) {

            // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
            DB::insert('users', array(

                'smooch_id' => $user_order['email'],
                'email' => $user_order['email'],
                "contact" => $user_order['contact'],
                "address" => $user_order['deliveryAddress'],
                "name" => $user_order['name']
            ));

            $user_id = DB::insertId();
        } else {

            // IF USER ALREADY EXIST IN DATABASE
            $user_id = $getUser['id'];

            DB::update('users', array(

                'email' => $user_order['email'],
                "contact" => $user_order['contact'],
                "address" => $user_order['deliveryAddress'],
                "name" => $user_order['name']
            ), 'id = %d', $user_id);

        }


        // CHECK IF DISCOUNT GIVEN TO USER ADD IN DB
        $discountType = null;
        $discountValue = 0;

        if ($user_order['isCoupon'] == 'true') {

            if ($user_order['isFixAmountCoupon'] == 'true') {

                $discountType = "fixed value";
            }
            else
            {

                $discountType = "fixed percentage";
            }


            $discountValue = $user_order['discount'];
        }

        $todayDate   =  Date("d/m/Y");
        $db_date     =  Date("Y-m-d");
        $currentTime =  getCurrentTime();


        $delivery_pickup = "";
        if($user_order['pickFromRestaurant'] == 'true')
        {
            $delivery_pickup = "Pick";
        }
        else
        {
            $delivery_pickup = "Delivery";
        }

        $order_table = '';
        $order_detail_table = '';
        $ledger_table = '';

        if($user_order['email'] == 'test@orderapp.com' && ($_SERVER['HTTP_HOST']     == "orderapp.com" || $_SERVER['HTTP_HOST'] == "b2b.orderapp.com"
                || $_SERVER['HTTP_HOST'] == "staging.orderapp.com" || $_SERVER['HTTP_HOST'] == "app.orderapp.com"
                || $_SERVER['HTTP_HOST'] == "backup.orderapp.com"))
        {

            $order_table = 'test_user_orders';
            $order_detail_table = 'test_order_detail';
            $ledger_table = 'test_ledger';

        }
        else{

            $order_table = 'user_orders';
            $order_detail_table = 'order_detail';
            $ledger_table = 'b2c_ledger';
        }


        // CREATE A NEW ORDER AGAINST USER
        DB::insert($order_table, array(

            'user_id'         => $user_id,
            'restaurant_id'   => $user_order['restaurantId'],
            'total'           => $user_order['total'],
            'coupon_discount' => $discountType,
            'discount_value'  => $discountValue,
            "order_date"      => $db_date." ".$currentTime,
            "contact"         => $user_order['contact'],
            "delivery_address" => $user_order['deliveryAddress'],
            "delivery_or_pickup"  => $delivery_pickup,
            "platform_info"   => $user_platform,
            'payment_method'  => $user_order['Cash_Card'],
            'transaction_id'  => $user_order['trans_id'],
            'browser_info'    => $browser_info
        ));


        $orderId = DB::insertId();

        date_default_timezone_set("Asia/Jerusalem");
        $onlyDate = date("d/m/Y");              //FOR LEDGER
        $onlytime = date("H:i");                //FOR LEDGER


        $customer_total_paid_to_rest = $user_order['total'] - $user_order['deliveryCharges'];

        $restaurant_total = $user_order['totalWithoutDiscount'];

        DB::useDB(B2C_RESTAURANTS);

        $rest = DB::queryFirstRow('select * from restaurants where id = '.$user_order['restaurantId']);


        DB::useDB(B2B_B2C_COMMON);

        $rest_balance = DB::queryFirstRow('select * from restaurant_balance where restaurant_id = '.$rest['id']);

        if(DB::count() == 0)
        {

            DB::insert('restaurant_balance', array(

                "balance"  => 0,
                "restaurant_id"       => $rest['id'],
                "restaurant_name"     => $rest['name_en'],

            ));

            $rest_balance = DB::queryFirstRow('select * from restaurant_balance where restaurant_id = '.$rest['id']);
        }


        // RESTAURANT BALANCE CALCULATION

        $T = 0;

        if($delivery_pickup == 'Pick' && $user_order['Cash_Card'] == 'CASH')
        {

            $T  = $customer_total_paid_to_rest *  (1 + ($rest_balance['comission'] / 100 ));
        }


        $balance = $rest_balance['balance'] + $T - $restaurant_total;


        DB::update('restaurant_balance',array(

            'balance' => $balance

        ),'id = %d',$user_order['restaurantId']);


        // DELIVERY GROUP BALANCE CALCULATION


        $delivery_balance = 0;

        if($delivery_pickup == 'Delivery' && $user_order['Cash_Card'] == 'CASH')
        {
            DB::useDB(B2B_B2C_COMMON);

            $delivery_group   = DB::queryFirstRow('select * from delivery_groups where id = '.$rest['delivery_group']);

            DB::useDB(B2C_RESTAURANTS);

            $ourDeliveryPrice = DB::queryFirstRow('select * from delivery_fee where restaurant_id = '.$user_order['restaurantId'].' and area_en = "'.$user_order['deliveryArea'].'"');

            $delivery_balance = $delivery_group['balance']  + $user_order['total'] - $ourDeliveryPrice['our_delivery_price'];

            DB::useDB(B2B_B2C_COMMON);

            DB::update('delivery_groups',array(

                'balance' => $delivery_balance

            ),'id = %d',$rest['delivery_group']);


        }
        else if($delivery_pickup == 'Delivery' && $user_order['Cash_Card'] == 'Credit Card')
        {
            DB::useDB(B2B_B2C_COMMON);

            $delivery_group   = DB::queryFirstRow('select * from delivery_groups where id = '.$rest['delivery_group']);

            DB::useDB(B2C_RESTAURANTS);

            $ourDeliveryPrice = DB::queryFirstRow('select * from delivery_fee where restaurant_id = '.$user_order['restaurantId'].' and area_en = "'.$user_order['deliveryArea'].'"');

            $delivery_balance = $delivery_group['balance'] - $ourDeliveryPrice['our_delivery_price'];

            DB::useDB(B2B_B2C_COMMON);

            DB::update('delivery_groups',array(

                'balance' => $delivery_balance

            ),'id = %d',$rest['delivery_group']);

        }


        DB::useDB(B2B_B2C_COMMON);

        $delivery_group   = DB::queryFirstRow('select * from delivery_groups where id = '.$rest['delivery_group']);

        DB::insert($ledger_table, array(
            'date'                  => $onlyDate,
            'time'                  => $onlytime,
            'customer_name'         => $user_order['name'],
            'customer_contact'      => $user_order['contact'],
            "customer_email"        => $user_order['email'],
            "restaurant_name"       => $user_order['restaurantTitle'],
            "restaurant_id"         => $user_order['restaurantId'],
            'payment_method'        => $user_order['Cash_Card'],
            'delivery_team'         =>  $delivery_group['delivery_team'],
            'delivery_or_pickup'    => $delivery_pickup,
            'delivery_price'        => $user_order['deliveryCharges'],
            'company_name'          => "N/A",
            'order_no'              => $orderId ,
            'discount_amount'       => $discountValue ,
            'restaurant_total'      => $restaurant_total,
            'customer_grand_total'  => $user_order['total'],
            'customer_total_paid_to_restaurant'  => $customer_total_paid_to_rest,
            'balance' => $balance,
            'delivery_team_balance' => $delivery_balance
        ));


        try {


            if ($user_order['pickFromRestaurant'] == 'false') {

                traccer($orderId, $user_order['name'], $user_order['contact'], $user_order['restaurantAddress'], $user_order['deliveryAddress'], $user_order['rest_lat'], $user_order['rest_lng'], $user_order['delivery_lat'], $user_order['delivery_lng']);
            }

        }
        catch (Exception $exception)
        {

        }

        foreach ($user_order['cartData'] as $orders) {


            DB::useDB(B2C_USER);

            // ADD ORDER DETAIL AGAINST USER
            DB::insert($order_detail_table, array(

                'order_id' => $orderId,
                'qty' => $orders['qty'],
                'item' => $orders['name'],
                'sub_total' => $orders['price'],
                'sub_items' => $orders['detail']
            ));

        }



        if($_SERVER['HTTP_HOST'] == "orderapp.com" || $_SERVER['HTTP_HOST'] == "b2b.orderapp.com" || $_SERVER['HTTP_HOST'] == "staging.orderapp.com" || $_SERVER['HTTP_HOST'] == "app.orderapp.com" ) {

            // MESSAGE REGARDING ORDER

            $phone = '972525133739,972547411863,972539342232,972538259764,972533062625,972586288567,972547511863,972558838322';

            $message = 'B2C Order-Id : ' . $orderId . ' ' . 'Restaurant-Title : ' . $user_order['restaurantTitle'];

            $smsMessage = str_replace(' ', '%20', $message);

            if ($user_order['email']!="test@orderapp.com") { file_get_contents('http://api.clickatell.com/http/sendmsg?user=Pushstartups&password=UGAgWOPIFNgTCM&api_id=3633970&to=' . $phone . '&text=' . $smsMessage);}

        }
        
        //SEND ORDERS TO RESTAURANT AND DELIVERY TEAMS
      $TEST_MODE = true;
  
      DB::useDB('orderapp_restaurants');
      $restaurant_id = $user_order['restaurantId'];
      $restaurant_contacts = DB::query("SELECT whatsapp_group_name , whatsapp_group_creator , fax_number , email FROM restaurants WHERE id ='" . $restaurant_id . "'");
  
      telegramAPI(createOrder($orderId, $user_order), $TEST_MODE);
      telegramAPI(createOrderForDelivery($user_order), $TEST_MODE);
  
      $group_name = $restaurant_contacts[0]['whatsapp_group_name'];
      $group_creator_phone = '+' . $restaurant_contacts[0]['whatsapp_group_creator'];
      $fax = $restaurant_contacts[0]['fax_number'];
      $email = $restaurant_contacts[0]['email'];
  
      whatsappAPI($group_creator_phone, $group_name, createOrder($orderId, $user_order), $TEST_MODE);
  
      //SEND EMAIL WITH AN ORDER TO orders@orderapp.com
      sendEmail(createOrderMsgForRestaurantHtml($orderId, $user_order), 'orders@orderapp.com', $orderId, $user_order);
      //ob_end_clean();
  
      //SEND EMAIL TO RESTAURANT
      if ($email && $TEST_MODE == false) {
        sendEmail(createOrderMsgForRestaurantHtml($orderId, $user_order), $email, $orderId, $user_order);
        //ob_end_clean();
      }
  
      //DELIVERY MESSAGES TO WHATSAPP
      if ($user_order['pickFromRestaurant'] == "false") {
        $delivery_group = DB::query("SELECT delivery_group FROM `restaurants` WHERE id = " . $restaurant_id);
        if ($delivery_group[0]['delivery_group'] == 0) {
          whatsappAPI($group_creator_phone, $group_name, createOrderForDelivery($user_order), $TEST_MODE);
        } else {
          DB::useDB(B2B_B2C_COMMON);
          $delivery_contacts = DB::query("SELECT `whatsapp_group_name`, `whatsapp_group_creator` FROM delivery_groups WHERE id = " . $delivery_group[0]['delivery_group']);
          $delivery_group_name = $delivery_contacts[0]['whatsapp_group_name'];
          $delivery_group_creator_phone = '+' . $delivery_contacts[0]['whatsapp_group_creator'];
          whatsappAPI($delivery_group_creator_phone, $delivery_group_name, createOrderForDelivery($user_order), $TEST_MODE);
        }
      }
  
      //SEND FAX TO RESTAURANT
      if ($fax) {
        if ($delivery_group[0]['delivery_group'] == 0) {
          $msg = createOrder($orderId, $user_order);
          $msg .= "
";
          $msg .= "----Delivery Info----" . "
  
";
          $msg .= createOrderForDelivery($user_order);
        } else {
          $msg = createOrder($orderId, $user_order);
        }
        sendFax($fax, $msg, $TEST_MODE);
      }
        

        // SEND EMAIL TO KITCHEN

        email_for_kitchen($user_order, $orderId, $todayDate);

        ob_end_clean();


        email_for_mark($user_order, $orderId, $todayDate);

        ob_end_clean();


        email_for_mark2($user_order, $orderId, $todayDate);

        ob_end_clean();


        //  CLIENT EMAIL
        //   EMAIL ORDER SUMMARY

        if ($user_order['language'] == 'en') {

            email_order_summary_english($user_order, $orderId, $todayDate);

        }
        else {


            email_order_summary_hebrew($user_order, $orderId, $todayDate);

        }


        ob_end_clean();

        // SEND ADMIN COPY EMAIL ORDER SUMMARY

        email_order_summary_hebrew_admin($user_order, $orderId, $todayDate);


        ob_end_clean();


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode('success'));
        return $response;

    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});

$app->post('/send_email_to_b2b_users', function ($request, $response, $args) {

    $email          = $request->getParam('email');
    $password       = $request->getParam('password');
    $user_name      = $request->getParam('user_name');

    email_to_b2b_users($email,$password,$user_name);

    ob_end_clean();

    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode('success'));
    return $response;

});

$app->post('/test_entry', function ($request, $response, $args) {

    DB::useDB(B2C_RESTAURANTS);
    $rest = DB::query("select * from restaurants where id <> '1'");
    foreach($rest as $r)
    {
        DB::useDB(B2B_B2C_COMMON);
        DB::insert('restaurant_balance', array(

            'restaurant_id' => $r['id'],
            'restaurant_name' => $r['name_en'],

        ));
    }

    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode('success'));
    return $response;

});
$app->post('/native_app', function ($request, $response, $args) {

    $getUser = "";

    $email          = $request->getParam('email');
    $name           = $request->getParam('name');
    $provider       = $request->getParam('provider');
    $uid            = $request->getParam('uid');
    $contact        = $request->getParam('contact');


    DB::useDB(B2C_USER);

    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select * from users where smooch_id = '" . $uid . "'");

    if (DB::count() == 0) {

        DB::insert('users', array(

            'smooch_id' => $uid,
            'provider' => $provider,
            'email' => $email,
            "contact" => $contact,
            "name" => $name,
            "uid" => $uid

        ));

        $getUser = DB::queryFirstRow("select * from users where smooch_id = '" . $uid . "'");

    }

    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson(json_encode($getUser));
    return $response;

});


$app->post('/tcs_printer', function ($request, $response, $args) {

    $result = 'resp';

    try {

        $result =   TCS_Service_Printer();

    }
    catch (Exception $e)
    {
        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson(json_encode("error  ".$e->getMessage()));
        return $response;
    }

    // RESPONSE RETURN TO REST API CALL
    $response = $response->withStatus(202);
    $response = $response->withJson($result);
    return $response;


});


function TCS_Service_Printer()
{
    $API_KEY = 'demoapikey';
    $client = new \GuzzleHttp\Client([

        'timeout' => 100, // NEVER FORGET to set a timeout
        'base_uri' => 'https://imprimo.altercodex.com/api/dev/',
        'headers' => [
            'Authorization' => "Bearer $API_KEY"

        ]

    ]);

    $mystring = "מםפק";


    $response = $client->post('devices/356498044821326/requests/', ['json' => [
        'data' =>  $mystring

    ]]);


    return $response->getBody();
}



//  RETURN PAYMENT URL OF GUARD API AGAINST PAYMENT OF USER ORDER
$app->post('/stripe_payment_request', function ($request, $response, $args) {

    try {

        $amount = $request->getParam('amount');
        $creditCardNo = $request->getParam('cc_no');
        $expDate = $request->getParam('exp_date');
        $cvv = $request->getParam('cvv');
        $user_order = $request->getParam('user_order');


        $user_id = 0;

        DB::useDB(B2C_USER);

        $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '".$user_order['email']."'");

        if (DB::count() == 0) {

            // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
            DB::insert('users', array(
                'smooch_id' => $user_order['email']
            ));

            $user_id = DB::insertId();

        } else {

            // IF USER ALREADY EXIST IN DATABASE
            $user_id = $getUser['id'];
        }

        $result = '';

        if($user_order['language'] == 'en')
        {
            $result = stripePaymentRequest(($amount*100),$user_order,$user_id,$creditCardNo,$expDate,$cvv);
        }
        else{

            $result = stripePaymentRequestHE(($amount*100),$user_order,$user_id,$creditCardNo,$expDate,$cvv);

        }


        // RESPONSE RETURN TO REST API CALL
        $response = $response->withStatus(202);
        $response = $response->withJson($result);
        return $response;
    }
    catch(MeekroDBException $e) {

        $response =  $response->withStatus(500);
        $response =  $response->withHeader('Content-Type', 'text/html');
        $response =  $response->write( $e->getMessage());
        return $response;
    }

});


$app->run();


// SUPPORT METHODS
// STRIPE API PAYMENT REQUEST
// AMOUNT DIVIDED BY 100 FROM API

function  stripePaymentRequest($amount,$user_order,$user_id,$creditCardNo,$expDate,$cvv)
{
    $rest = "Error";
    $cgConf['tid']='8804324';
    $cgConf['amount']=$amount;
    $cgConf['user']='pushstart';
    $cgConf['password']='OE2@38sz';
    $cgConf['cg_gateway_url']="https://cgpay5.creditguard.co.il/xpo/Relay";

    $poststring = 'user='.$cgConf['user'];
    $poststring .= '&password='.$cgConf['password'];

    /*Build Ashrait XML to post*/
    $poststring.='&int_in=<ashrait>
							<request>
							<language>ENG</language>
							<command>doDeal</command>
							<requestId/>
							<version>1000</version>
							<doDeal>
								<terminalNumber>'.$cgConf['tid'].'</terminalNumber>
								<authNumber/>
								<transactionCode>Phone</transactionCode>
								<transactionType>Debit</transactionType>
								<total>'.$cgConf['amount'].'</total>
								<creditType>RegularCredit</creditType>
								<cardNo>'.$creditCardNo.'</cardNo>
								<cvv>'.$cvv.'</cvv>
								<cardExpiration>'.$expDate.'</cardExpiration>
								<validation>AutoComm</validation>
								<numberOfPayments/>
								<customerData>
									<userData1>'.$user_order['email'].'</userData1>
									<userData2/>
									<userData3/>
									<userData4/>
									<userData5/>
								</customerData>
								<currency>ILS</currency>
								<firstPayment/>
								<periodicalPayment/>
								<user>Push</user>	
								
								<invoice>

									<invoiceCreationMethod>wait</invoiceCreationMethod>
									
									<invoiceDate/>
									
									<invoiceSubject>'.$user_order['restaurantTitle'].' Order# '.$user_id.'</invoiceSubject>
									
									<invoiceDiscount/>
									
									<invoiceDiscountRate/>
									
									<invoiceItemCode>'.$user_id.'</invoiceItemCode>
									
									<invoiceItemDescription>'.$user_order['restaurantTitle'].' food order from OrderApp</invoiceItemDescription>
									
									<invoiceItemQuantity>1</invoiceItemQuantity>
									
									<invoiceItemPrice>'.$amount.'</invoiceItemPrice>
									
									<invoiceTaxRate/>
									
									<invoiceComments/>
									
									<companyInfo>OrderApp</companyInfo>
									
									<sendMail>1</sendMail>
									
									<mailTo>'.$user_order['email'].'</mailTo>
									
									<isItemPriceWithTax>0</isItemPriceWithTax>
									
									<ccDate>'.date("Y-m-d").'</ccDate>
									
									<invoiceSignature/>
									
									<invoiceType>receipt</invoiceType>
									
									<DocNotMaam/>
									
								</invoice>	
								
							</doDeal>
						</request>
					</ashrait>';


    //init curl connection
    if( function_exists( "curl_init" )) {
        $CR = curl_init();
        curl_setopt($CR, CURLOPT_URL, $cgConf['cg_gateway_url']);
        curl_setopt($CR, CURLOPT_POST, 1);
        curl_setopt($CR, CURLOPT_FAILONERROR, true);
        curl_setopt($CR, CURLOPT_POSTFIELDS, $poststring);
        curl_setopt($CR, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($CR, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($CR, CURLOPT_FAILONERROR,true);


        //actual curl execution perfom
        $result = curl_exec( $CR );
        $error = curl_error ( $CR );

        // on error - die with error message
        if( !empty( $error )) {
            die($error);
        }

        curl_close($CR);

        $xml  = simplexml_load_string((string) $result);

        if($xml->response->result[0] == 000)
        {
            $rest = [

                "response" => 'success',
                "trans_id" => (string) $xml->response->tranId[0]
            ];

        }
        else{

            $rest = [

                "response" =>  (string) $xml->response->message[0]

            ];

        }

    }

    return $rest;
}

// STRIPE PAYMENT REQUEST HE

function  stripePaymentRequestHE($amount,$user_order,$user_id,$creditCardNo,$expDate,$cvv)
{
    $rest = "Error";
    $cgConf['tid']='8804324';
    $cgConf['amount']=$amount;
    $cgConf['user']='pushstart';
    $cgConf['password']='OE2@38sz';
    $cgConf['cg_gateway_url']="https://cgpay5.creditguard.co.il/xpo/Relay";

    $poststring = 'user='.$cgConf['user'];
    $poststring .= '&password='.$cgConf['password'];

    /*Build Ashrait XML to post*/
    $poststring.='&int_in=<ashrait>
							<request>
							<language>HEB</language>
							<command>doDeal</command>
							<requestId/>
							<version>1000</version>
							<doDeal>
								<terminalNumber>'.$cgConf['tid'].'</terminalNumber>
								<authNumber/>
								<transactionCode>Phone</transactionCode>
								<transactionType>Debit</transactionType>
								<total>'.$cgConf['amount'].'</total>
								<creditType>RegularCredit</creditType>
								<cardNo>'.$creditCardNo.'</cardNo>
								<cvv>'.$cvv.'</cvv>
								<cardExpiration>'.$expDate.'</cardExpiration>
								<validation>AutoComm</validation>
								<numberOfPayments/>
								<customerData>
									<userData1>'.$user_order['email'].'</userData1>
									<userData2/>
									<userData3/>
									<userData4/>
									<userData5/>
								</customerData>
								<currency>ILS</currency>
								<firstPayment/>
								<periodicalPayment/>
								<user>Push</user>	
								
								<invoice>

									<invoiceCreationMethod>wait</invoiceCreationMethod>
									
									<invoiceDate/>
									
									<invoiceSubject>'.$user_order['restaurantTitle'].' Order# '.$user_id.'</invoiceSubject>
									
									<invoiceDiscount/>
									
									<invoiceDiscountRate/>
									
									<invoiceItemCode>'.$user_id.'</invoiceItemCode>
									
									<invoiceItemDescription>'.$user_order['restaurantTitle'].' food order from OrderApp</invoiceItemDescription>
									
									<invoiceItemQuantity>1</invoiceItemQuantity>
									
									<invoiceItemPrice>'.$amount.'</invoiceItemPrice>
									
									<invoiceTaxRate/>
									
									<invoiceComments/>
									
									<companyInfo>OrderApp</companyInfo>
									
									<sendMail>1</sendMail>
									
									<mailTo>'.$user_order['email'].'</mailTo>
									
									<isItemPriceWithTax>0</isItemPriceWithTax>
									
									<ccDate>'.date("Y-m-d").'</ccDate>
									
									<invoiceSignature/>
									
									<invoiceType>receipt</invoiceType>
									
									<DocNotMaam/>
									
								</invoice>	
								
							</doDeal>
						</request>
					</ashrait>';


    //init curl connection
    if( function_exists( "curl_init" )) {
        $CR = curl_init();
        curl_setopt($CR, CURLOPT_URL, $cgConf['cg_gateway_url']);
        curl_setopt($CR, CURLOPT_POST, 1);
        curl_setopt($CR, CURLOPT_FAILONERROR, true);
        curl_setopt($CR, CURLOPT_POSTFIELDS, $poststring);
        curl_setopt($CR, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($CR, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($CR, CURLOPT_FAILONERROR,true);


        //actual curl execution perfom
        $result = curl_exec( $CR );
        $error = curl_error ( $CR );

        // on error - die with error message
        if( !empty( $error )) {
            die($error);
        }

        curl_close($CR);

        $result = mb_convert_encoding( $result, "HTML-ENTITIES", "UTF-8");

        $xml = simplexml_load_string((string) $result);

        if($xml->response->result[0] == 000)
        {
            $rest = [

                "response" => 'success',
                "trans_id" => (string) $xml->response->tranId[0]
            ];

        }
        else{

            $rest = [

                "response" =>  (string) $xml->response->message[0]

            ];

        }

    }

    return $rest;
}





// BRING SEND ADDRESS OF DELIVERY
function createBringgTask($user_order, $todayDate, $delivery_time) {

    $url = 'https://admin-api.bringg.com//services/6f15901b/caa8a0ea-0b7a-4bd6-87cb-f07c77d66c48/27e666d2-e7cd-4917-988b-aa109829f0c4/';

    if ($user_order['pickFromRestaurant'] == 'true'){
        return;
    }



    date_default_timezone_set('Asia/Jerusalem');
    $ScheduledAt = print_r($todayDate . 'T' . $delivery_time . ':00z',true);

    $order_text = '';
    $order_text .= $user_order['restaurantTitleHe'] .'\n';

    foreach ($user_order['cartData'] as $t) {
        $order_text .= $t['qty'] . '  ' . $t['name_he'] .'\n';
        $order_text .= preg_replace("/\([^)]+\)/", "", $t['detail_he']).'\n\n';
    }

    $jason = print_r('{
       "company_id": 666,
       "title": "Delivery",      // Title for the Task being created.
       "scheduled_at": "' . $ScheduledAt . '",   // Here the  $ScheduledAt variable is an example for the date and time format.
       "note": "' . $order_text . '",
       "customer": {
          "name": "' . $user_order['name'] . '",
          "address": "' . $user_order['deliveryAddress'] . '",
          "phone": "' . $user_order['contact'] . '"
       },
       "way_points":[
          {
             "customer":{
                "name": "' . $user_order['restaurantTitleHe'] . '",
                "phone": "026222862"
             },
             "address":"'.$user_order['deliveryAddress'].' ('.$user_order['deliveryArea'].')",
             "restaurantAddress":"'.$user_order['restaurantAddress'].'"
            "allow_editing_inventory": "true", // Allow driver to edit the Inventory e.g. change quantities?
            "must_approve_inventory": "true",   // Driver must approve pick up inventory e.g. by scanning it. The driver won\'t be allowed to leave location without doing this.
            "allow_scanning_inventory": "true"  // Allow to scan inventory via phone camera (on the Driver App)
          },
          {
             "customer":{
                "name":"' . $user_order['name'] . '",
                "phone":"' . $user_order['contact'] . '"
             },
             "address":"' . $user_order['deliveryAddress'] . '",
            "allow_editing_inventory": "true",    // Allow driver to edit the Inventory e.g. change quantities?
            "must_approve_inventory": "true",   // Driver must approve drop off inventory e.g. by scanning it. The driver won\'t be allowed to leave location and finish the task without doing this.
            "allow_scanning_inventory": "true" // Allow to scan inventory via phone camera (on the Driver App)
          }
       ]
    }',true);



    $ch=curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jason);
    curl_setopt($ch, CURLOPT_HTTPHEADER,
        array('Content-Type:application/json',
            'Content-Length: ' . strlen($jason))
    );

    $json_response = curl_exec($ch);

    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ( $status != 200 ) {

        //die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));

    }

    curl_close($ch);

}




function createOrderForTelegram($user_order)
{
    $mailBody = '';
    $mailBody = " הזמנה חדשה".substr($user_order['contact'], -4) . " #" . $user_order['restaurantTitleHe'].'
    
    ';

    $mailBody .= 'שם הלקוח :' . $user_order['name'] . '
    
    ';
    $mailBody .= 'מספר :' . $user_order['contact'] . '
    
    ';

    if ($user_order['pickFromRestaurant'] == 'false') {

        $mailBody .= ':  כתובת'. $user_order['deliveryAptNo'] .' '. $user_order['deliveryAddress'] .' ('.$user_order['deliveryArea'].')'.' 
        
        ';
    }
    else
    {
        $mailBody .= 'כתובת: איסוף עצמי'.'
        
        ' ;
    }

    $mailBody .= 'הזמנה :' . substr($user_order['contact'], -4) . ' 
    
    ';


    if($user_order['specialRequest'] != '')
    {

        $mailBody .= 'ההערות :' . $user_order["specialRequest"] . ' 
    
       ';
    }



    foreach ($user_order['cartData'] as $t) {

        $mailBody .=  $t['qty'] . '  ' . $t['name_he'] . ' 
        
        ';

        if($t['specialRequest'] != "") {


            if ($t['detail_he'] == '') {


                $mailBody .=  preg_replace("/\([^)]+\)/", "", $t['detail_he']).'הערות :'.$t['specialRequest'].' 
                
                ';

            }
            else {


                $mailBody .= preg_replace("/\([^)]+\)/", "", $t['detail_he']).' ,הערות :'.$t['specialRequest'].' 
               
                ';

            }
        }
        else
        {
            $mailBody .= preg_replace("/\([^)]+\)/", "", $t['detail_he']) . ' 
            
            ';

        }
    }


    return $mailBody;
}



//  TELEGRAM API
//  SEND ORDERS THROUGH TELEGRAM

//function telegramAPI($bot_id, $chat_id, $text) {
//
//
//    $postData = array(
//        'chat_id' => $chat_id,
//        'text' => $text
//    );
//
//
//    $headers = array(
//        'Content-Type: application/json'
//    );
//
//
//    $url = 'https://api.telegram.org/bot'.$bot_id.'/sendMessage';
//
//
//    $ch = curl_init($url);
//    curl_setopt($ch, CURLOPT_POST, 1);
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
//    $response = curl_exec($ch);
//    echo "Response: ".$response;
//    curl_close($ch);
//
//
//}



function getCurrentTime(){

    //CURRENT TIME OF ISRAEL
    date_default_timezone_set("Asia/Jerusalem");
    $currentTime           =    date("H:i:s");

    return $currentTime;
}



function traccer($order_id,$name,$phone,$start_address,$delivery_address,$startLat,$startLng,$endLat,$endLng)
{
    $service_url = "http://35.156.74.68:8082/api/objectives";
    $curl = curl_init($service_url);
    $curl_post_data = array(
        "name"           => $name,
        "phone"          => $phone,
        "startLatitude"  => $startLat,
        "startLongitude" => $startLng,
        "endLatitude"    => $endLat,
        "endLongitude"   => $endLng,
        "deviceId"       => 100,
        "status"         => "incomplete",
        "startAddress"   => $start_address,
        "endAddress"     => $delivery_address,
        "orderId"        => $order_id,
        "geocode"        => "no",
        "timeCreate"     => null
    );


    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERPWD,  "admin:admin");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($curl_post_data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: Basic YWRtaW46YWRtaW4=',
        'Content-Type: application/json'
    ));


    $curl_response = curl_exec($curl);
    curl_close($curl);


    return $curl_response;

}

function createMsg($user_platform, $user_order, $restaurant_contacts) {
  
  $mailBody = '';
  $mailBody .= $user_order['restaurantTitle'] . '
';
  
  $group_name = $restaurant_contacts[0]['whatsapp_group_name'];
  $group_creator_phone = '+' . $restaurant_contacts[0]['whatsapp_group_creator'];
  $fax = $restaurant_contacts[0]['fax_number'];
  $email = $restaurant_contacts[0]['email'];
  $mailBody .= $group_name . ' ' . $group_creator_phone . ' ' . $fax . ' ' . $email;
  
  return $mailBody;
}

function createOrder($orderId, $user_order) {
  global $tr;
  $mailBody = '';
  
  if ($user_order['contact'] == 000000) {
    $mailBody .= 'Test' . '
';
  }
  
  $mailBody .= $user_order['restaurantTitleHe'] . '
';
  $mailBody .= 'הזמנה חדשה :' . $orderId . '

';
  
  if ($user_order['pickFromRestaurant'] == 'true' && $user_order['isCoupon'] == 'true') {
    $mailBody .= 'שם הלקוח :' . $user_order["name"] . "
";
  }
  
  $mailBody .= '---------------
';
  
  foreach ($user_order['orders'] as $order) {
    
    //GET subItems total sum and its text part
    $multiItemsPrice = 0;
    $multiItemsText = '';
    foreach ($order["multiItemsOneType"] as $item) {
      foreach ($item as $innerItem) {
        if ($innerItem["subItemNameHe"]) {
          $multiItemsText .= $innerItem["subItemNameHe"] . '
';
          if ($innerItem["subItemPrice"] ) {
            $multiItemsPrice = $multiItemsPrice + $innerItem["subItemPrice"];
          }
        }
      }
    }
    
    if (strlen($multiItemsText)) {
      $mailBody .= 'כמות ' . $order['qty'] . '  ' . $order['itemNameHe'] . '
';
    } else {
      $mailBody .= $order["itemPrice"] . ' ' . 'כמות ' . $order['qty'] . '  ' . $order['itemNameHe'] . '
';
    }
    
    if (count($order["subItemsOneType"])) {
      foreach ($order["subItemsOneType"] as $item) {
        foreach ($item as $key => $value) {
          $mailBody .= $tr->translate($key) . ': ' . $value["subItemNameHe"] . '
';
        }
      }
    }
    
    //ADD multiItemsText TO mailBody
    $mailBody .= $multiItemsText;
    
    if ($order['specialRequest'] != "") {
      $mailBody .= ' הערות : ' . $order['specialRequest'] . '
';
    } else {
      $mailBody .= '
';
    }
    if (strlen($multiItemsText)) {
      $mailBody .= $order["itemPrice"] + $multiItemsPrice . '
';
      $mailBody .= '---------------

';
    } else {
      $mailBody .= '---------------

';
    }
  }
  
  $mailBody .= " סה\"כ: ₪" . $user_order["total"] . "

";
  
  $mailBody .= "כמה זמן?\n\n??????????????????";
  
  return $mailBody;
}

function createOrderForDelivery($user_order) {
  global $tr;
  $mailBody = '';
  
  if ($user_order['contact'] == 000000) {
    $mailBody .= 'Test' . '
';
  }
  
  $mailBody .= $user_order['restaurantTitleHe'] . '
';
  $mailBody .= $user_order['Cash_Card_he'] . ' ' . '₪' . $user_order['total'] . '
';
  $mailBody .= 'שם הלקוח :' . $user_order['name'] . '
';
  $mailBody .= 'מספר :' . $user_order['contact'] . '
';
  
  $delivery_address = $tr->translate($user_order['deliveryAddress']);
  $delivery_area = $tr->translate($user_order['deliveryArea']);
  
  $mailBody .= 'כתובת :' . $user_order['deliveryAptNo'] . ' ' . $delivery_address . ' (' . $delivery_area . ')' . '
';
  
  return $mailBody;
}

function createOrderMsgForRestaurantHtml($orderId, $user_order) {
  global $tr;
  $msg = '<html>';
  $msg .= '<body>';
  $msg .= '<div dir="rtl">';
  
  if ($user_order['contact'] == 000000) {
    $msg .= '<p>Test</p>';
  }
  
  $msg .= '<p> שם הלקוח : ' . $user_order["name"] . '</p> ';
  $msg .= '<p>' . 'מספר: ' . $user_order["contact"] . '</p>';
  
  $delivery_address = $tr->translate($user_order['deliveryAddress']);
  $delivery_area = $tr->translate($user_order['deliveryArea']);
  $msg .= '<p> כתובת : ' . $user_order['deliveryAptNo'] . ' ' . $delivery_address . ' (' . $delivery_area . ')' . '</p>';
  $msg .= '<p>' . 'הזמנה: ' . $orderId . '</p>';
  $msg .= '<br>';
  
  foreach ($user_order['orders'] as $order) {
    
    //GET subItems total sum and its text part
    $multiItemsPrice = 0;
    $multiItemsText = array();
    foreach ($order["multiItemsOneType"] as $item) {
      foreach ($item as $innerItem) {
        if ($innerItem["subItemNameHe"]) {
          array_push($multiItemsText, 'תוספת ' . $innerItem["subItemNameHe"]);
          if ($innerItem["subItemPrice"] ) {
            $multiItemsPrice = $multiItemsPrice + $innerItem["subItemPrice"];
          }
        }
      }
    }
    
    if (count($multiItemsText)) {
      $msg .= '<p> כמות ' . $order['qty'] . '  ' . $order['itemNameHe'] . '</p>';
    } else {
      $msg .=  '<p> כמות ' . $order['qty'] . ' ' . $order['itemNameHe'] . ' ש"ח ' . $order["itemPrice"] . '</p>';
    }
    
    if (count($order["subItemsOneType"])) {
      foreach ($order["subItemsOneType"] as $item) {
        foreach ($item as $key => $value) {
          $msg .= '<p>' . $tr->translate($key) . ': ' . $value["subItemNameHe"] . '</p>';
        }
      }
    }
    
    //ADD multiItemsText TO mailBody
    $msg .= '<p>' . implode(',', $multiItemsText) . '</p>';
    
    if ($order['specialRequest'] != "") {
      $msg .= '<p> הערות : ' . $order['specialRequest'] . '</p>';
    }
    
    if (count($multiItemsText)) {
      $orderPrice = $order["itemPrice"] + $multiItemsPrice;
      $msg .= '<p>₪ ' . $orderPrice . '</p>';
      $msg .= '<br>';
    } else {
      $msg .= '<br>';
    }
  }
  
  $msg .= '<div>---------------</div>';
  $msg .= '<br>';
  
  $msg .= '<p>' . ' סה"כ סכום הזמנה ₪' . $user_order["total"] . '</p>';
  $msg .= '</div>';
  $msg .= '</body>';
  $msg .= '</html>';
  return $msg;
}

function telegramAPI($text, $TEST_MODE) {
  
  if ($TEST_MODE) {
    $bot_id = "271480837:AAEI0i1O3ozIRNyWU-7-qC_hGfOBnUxab88";
    $chat_id = "-222443307";
  } else {
    //LIVE TELEGRAM CREDENTIALS
    $bot_id = "234472538:AAEwJUUgl0nasYLc3nQtGx4N4bzcqFT-ONs";
    $chat_id = "-165732759";
  }
  
  $postData = array(
    'chat_id' => $chat_id,
    'text' => $text
  );
  
  $headers = array(
    'Content-Type: application/json'
  );
  
  $url = 'https://api.telegram.org/bot' . $bot_id . '/sendMessage';
  
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
  $response = curl_exec($ch);
  //echo "Response: ".$response;
  curl_close($ch);
}

function whatsappAPI($groupAdmin, $groupName, $message, $TEST_MODE) {
  
  if ($TEST_MODE) {
    $groupAdmin = "+972525952665";
    $groupName = "Whatsapp Tests New";
  }
  
  $INSTANCE_ID = "3";
  $CLIENT_ID = "orderapp.orders@gmail.com";
  $CLIENT_SECRET = "59f0a2e52b384082a2f53b687836a65f";
  
  $postData = array(
    'group_admin' => $groupAdmin,
    'group_name' => $groupName,
    'message' => $message
  );
  
  $headers = array(
    'Content-Type: application/json',
    'X-WM-CLIENT-ID: ' . $CLIENT_ID,
    'X-WM-CLIENT-SECRET: ' . $CLIENT_SECRET
  );
  
  $url = 'http://api.whatsmate.net/v2/whatsapp/group/message/' . $INSTANCE_ID;
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
  $response = curl_exec($ch);
  
  curl_close($ch);
}

//SEND FAX
function sendFax($fax, $msg, $TEST_MODE) {
  
  $fax_number = '+' . $fax;
  
  if ($TEST_MODE) {
    
    $fax_number = "+97226544308";
  }
  
  $file = 'FaxMessage.txt';
  file_put_contents($file, $msg);
  
  $interfax = new FaxClient(['username' => 'Orderapp', 'password' => 'pushstartups1!']);
  $fax = $interfax->deliver(['faxNumber' => $fax_number, 'file' => 'FaxMessage.txt']);
  
  // get the latest status:
  $fax->refresh()->status; // Pending if < 0. Error if > 0
  
  // Simple polling
  while ($fax->refresh()->status < 0) {
    sleep(5);
  }
  
}

function sendEmail($msg, $toEmail, $orderId, $user_order) {
  
  if($_SERVER['HTTP_HOST'] == 'eluna.orderapp.com')
  {
    $subject = "(ELUNA) "+$user_order['restaurantTitle'].' Order# '.$orderId;
  }
  
  else
  {
    $subject = $user_order['restaurantTitle'].' Order# '.$orderId;
  }
  
  
  //AMAZON SERVER ACTIVATED
  if(ACTIVE_SERVER_ID == '1')
  {
    
    $client = SesClient::factory(array(
      'version'=> 'latest',
      'region' => 'eu-west-1',
      'credentials' => array(
        'key'    => ACCESS_KEY_ID,
        'secret' => ACCESS_KEY_SECRET,
      )
    ));
    
    try {
      
      $result = $client->sendEmail([
        'Destination' => [
          'ToAddresses' => [
            $toEmail,
          ],
        ],
        'Message' => [
          'Body' => [
            'Html' => [
              'Charset' => 'UTF-8',
              'Data' => $msg,
            ]
          ],
          'Subject' => [
            'Charset' => 'UTF-8',
            'Data' => $subject,
          ],
        ],
        'Source' => EMAIL,
      
      ]);
      
      $messageId = $result->get('MessageId');
      
      //echo("Email sent! Message ID: $messageId"."\n");
      
    } catch (SesException $error) {
      
      echo("The email was not sent. Error message: ".$error->getAwsErrorMessage()."\n");
    }
    
  }
  //MAIN GUN SERVER ACTIVATED
  else if(ACTIVE_SERVER_ID == '2'){
    
    $mg = Mailgun::create(MAIL_GUN_API_KEY);
    
    $mg->messages()->send(MAIL_GUN_DOMAIN, [
      'from'    =>  "OrderApp <".EMAIL.">",
      'to'      =>  $toEmail,
      'cc'      =>  EMAIL,
      'subject' =>  $subject,
      'html'    => $msg
    ]);
    
  }
}


?>

