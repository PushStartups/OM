<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require      'vendor/autoload.php';
require      'PHPMailer/PHPMailerAutoload.php';
require_once 'inc/initDb.php';


DB::query("set names utf8");


// EMAIL SERVERS FOR EACH EMAIL ADDRESS

// DEV SERVER
if($_SERVER['HTTP_HOST'] == "dev.m.orderapp.com")
    define("EMAIL","muhammad.iftikhar.aftab@gmail.com");

// QA SERVER
else if($_SERVER['HTTP_HOST'] == "qa.webclient@orderapp.com")
    define("EMAIL","qaorders@orderapp.com");

// PRODUCTION SERVER
else
    define("EMAIL","orders@orderapp.com");



// SLIM INITIALIZATION
$app = new \Slim\App();


//  WEB HOOK GET MINIMUM ORDER AMOUNT
$app->post('/get_min_order_amount', function ($request, $response, $args)
{
    // MINIMUM ORDER AMOUNT
    $minOrder = DB::query("select * from default_settings where name = 'min_order'");

    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($minOrder));
});



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
        $tempDate              =    date("d/m/Y");
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
            "hechsher_en"          =>  $result["hechsher_en"],       // RESTAURANT HECHSHER
            "hechsher_he"          =>  $result["hechsher_he"],       // RESTAURANT HECHSHER
            "tags"                 =>  $tags,                        // RESTAURANT TAGS
            "gallery"              =>  $galleryImages,               // RESTAURANT GALLERY
            "timings"              =>  $restaurantTimings,           // RESTAURANT WEEKLY TIMINGS
            "availability"         =>  $currentStatus,               // RESTAURANT CURRENT AVAILABILITY
            "today_timings"        =>  $today_timings,               // TODAY TIMINGS
            "hours_left_to_open"   =>  $hoursLeftToOpen,             // HOURS LEFT TO OPEN FROM CURRENT TIME
        ];

        $restaurants[$count] = $restaurant;
        $count++;
    }

    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($restaurants));

});





//  WEB HOOK GET DATA OF CATEGORIES WITH ITEMS

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

        $count3 = 0;
        // CHECK FOR ITEMS PRICE ZERO
        foreach ($items as $item)
        {
            if($item['price'] == 0)
            {
                $extras = DB::query("select * from extras where item_id = '".$item["id"]."' AND type = 'One' AND price_replace=1");
                // EXTRAS WITH TYPE OME AND PRICE REPLACE 1

                foreach ($extras as $extra)
                {
                    $subItems = DB::query("select * from subitems where extra_id = '".$extra["id"]."'");
                    $lowestPrice = $subItems[0]['price'];
                    foreach ($subItems as $subitem)
                    {
                        if ($subitem['price'] < $lowestPrice)
                        {
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
        "menu_name_en"              => $menu['name_en'],               // MENU NAME EN
        "menu_name_he"              => $menu['name_he'],               // MENU NAME HE
        "categories_items"          =>  $categories                    // CATEGORIES AND ITEMS
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


// VALIDATE COUPONS

$app->post('/coupon_validation', function ($request, $response, $args) {

    $email = $request->getParam('email');        //  GET USER EMAIL
    $coupon_code = $request->getParam('code');   //  COUPON CODE ENTER BY USER
    $success_validation = "false";               //  SUCCESS VALIDATION RESPONSE FOR USER


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


        // GETTING START DATE AND END DATE OF COUPON FROM DATABASE
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
            }

        }
        else
        {
            $success_validation = "false";
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

            "success"               =>    false                                          // SUCCESS FALSE WRONG CODE

        ];
    }

    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($data));

});



//  STORE USER ORDER IN DATABASE
$app->post('/add_order', function ($request, $response, $args) {

    // GET ORDER RESPONSE FROM USER (CLIENT SIDE)
    $user_order  =  $request->getParam('user_order');
    $user_id     =  null;


    //CHECK IF USER ALREADY EXIST, IF NO CREATE USER
    $getUser = DB::queryFirstRow("select id,smooch_id from users where smooch_id = '".$user_order['email']."'");

    if(DB::count() == 0){

        // USER NOT EXIST IN DATABASE, SO CREATE USER IN DATABASE
        DB::insert('users', array(

            'smooch_id' => $user_order['email'],
            "contact"   => $user_order['contact'],
            "address"   => $user_order['deliveryAddress']
        ));

        $user_id = DB::insertId();
    }
    else{

        // IF USER ALREADY EXIST IN DATABASE
        $user_id = $getUser['id'];

        DB::update('users', array(

            'smooch_id' => $user_order['email'],
            "contact"   => $user_order['contact'],
            "address"   => $user_order['deliveryAddress']
        ),'id = %d',$user_id);

    }


    // CHECK IF DISCOUNT GIVEN TO USER ADD IN DB
    $discountType = null;
    $discountValue = 0;

    if($user_order['isCoupon'] == 'true') {

        if ($user_order['isFixAmountCoupon'] == 'true') {

            $discountType = "fixed value";
        }
        else {

            $discountType = "fixed percentage";
        }

        $discountValue = $user_order['discount'];
    }



    $todayDate = Date("d/m/Y");


    // CREATE A NEW ORDER AGAINST USER
    DB::insert('user_orders', array(

        'user_id'          =>  $user_id,
        'restaurant_id'    =>  $user_order['restaurantId'],
        'total'            =>  $user_order['total'],
        'coupon_discount'  =>  $discountType,
        'discount_value'   =>  $discountValue,
        "order_date"       =>  DB::sqleval("NOW()")
    ));


    $orderId = DB::insertId();

    foreach($user_order['cartData'] as  $orders)
    {

        // ADD ORDER DETAIL AGAINST USER
        DB::insert('order_detail', array(

            'order_id'          => $orderId,
            'qty'               => $orders['qty'],
            'item'              => $orders['name'],
            'sub_total'         => $orders['price'],
            'sub_items'         => $orders['detail']
        ));

    }


    // CLIENT EMAIL
    // EMAIL ORDER SUMMARY

    if($user_order['language'] == 'en')
    {
        email_order_summary_english($user_order,$orderId,$todayDate);
    }
    else{

        email_order_summary_hebrew($user_order,$orderId,$todayDate);
    }


    // SEND ADMIN COPY EMAIL ORDER SUMMARY

    email_order_summary_hebrew_admin($user_order,$orderId,$todayDate);


    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($todayDate));

});



//  RETURN PAYMENT URL OF GUARD API AGAINST PAYMENT OF USER ORDER
$app->post('/get_credit_card_payment_url', function ($request, $response, $args) {

    $email   =  $request->getParam('email');
    $amount  =  $request->getParam('amount');

    $user_id  = 0;

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


    $url = urlencode(guardPaymentRequest(($amount * 100),$user_id,$email));

    // RESPONSE RETURN TO REST API CALL
    return $response->withStatus(200)->write(json_encode($url));

});


// WEB HOOK FOR PAYMENT CANCEL BY USER DO APPROPRIATE ACTION
$app->get('/payment_cancel', function ($request, $response, $args)
{
    $email = $request->getParam('userId');

    $str =  '<script type="text/javascript">'.
        'window.top.onPaymentCancel();'.
        '</script>';

    return $response->withStatus(200)->write($str);
});



// WEB HOOK FOR PAYMENT SUCCESS
$app->get('/payment_success', function ($request, $response, $args)
{
    $email = $request->getParam('userId');

    $str =  '<script type="text/javascript">'.
        'window.top.onPaymentSuccess();'.
        '</script>';

    return $response->withStatus(200)->write($str);
});


// WEB HOOK FOR PAYMENT SUCCESS
$app->get('/payment_error', function ($request, $response, $args)
{
    $email = $request->getParam('userId');

    $str =  '<script type="text/javascript">'.
        'window.top.onPaymentCancel();'.
        '</script>';

    return $response->withStatus(200)->write($str);
});



$app->run();


// SUPPORT METHODS
// GUARD API PAYMENT REQUEST
// AMOUNT DIVIDED BY 100 FROM API

function  guardPaymentRequest($amount,$userId,$email)
{

    $cgConf['tid'] = '0963432';
    $cgConf['mid'] = 10998;
    $cgConf['amount'] = $amount;
    $cgConf['user'] = 'pushstartups';
    $cgConf['password'] = 'P!dc3cg4w';
    $cgConf['cg_gateway_url'] = "https://cguat2.creditguard.co.il/xpo/Relay";

    $poststring = 'user=' . $cgConf['user'];
    $poststring .= '&password=' . $cgConf['password'];

    /*Build Ashrait XML to post*/
    $poststring .= '&int_in=<ashrait>
                           <request>
                            <version>1000</version>
                            <language>ENG</language>
                            <dateTime></dateTime>
                            <command>doDeal</command>
                            <doDeal>
                                 <terminalNumber>' . $cgConf['tid'] . '</terminalNumber>
                                 <mainTerminalNumber/>
                                 <cardNo>CGMPI</cardNo>
                                 <successUrl>http://'.$_SERVER['HTTP_HOST'].'/restapi/index.php/payment_success?userId='.$userId.'</successUrl>
                                 <errorUrl>http://'.$_SERVER['HTTP_HOST'].'/restapi/index.php/payment_error?userId='.$userId.'</errorUrl>
                                 <cancelUrl>http://'.$_SERVER['HTTP_HOST'].'/restapi/index.php/payment_cancel?userId='.$userId.'</cancelUrl>
                                 <total>' . $cgConf['amount'] . '</total>
                                 <transactionType>Debit</transactionType>
                                 <creditType>RegularCredit</creditType>
                                 <currency>ILS</currency>
                                 <transactionCode>Phone</transactionCode>
                                 <authNumber/>
                                 <numberOfPayments/>
                                 <firstPayment/>
                                 <periodicalPayment/>
                                 <validation>TxnSetup</validation>
                                 <dealerNumber>7451669</dealerNumber>
                                 <user>something</user>
                                 <mid>' . $cgConf['mid'] . '</mid>
                                 <uniqueid>' . time() . rand(100, 1000) . '</uniqueid>
                                 <mpiValidation>autoComm</mpiValidation>
                                 <email>'.$email.'</email>
                                 <clientIP/>
                                 <customerData>
                                  <userData1/>
                                  <userData2/>
                                  <userData3/>
                                  <userData4/>
                                  <userData5/>
                                  <userData6/>
                                  <userData7/>
                                  <userData8/>
                                  <userData9/>
                                  <userData10/>
                                 </customerData>
                            </doDeal>
                           </request>
                          </ashrait>';

    //init curl connection
    if (function_exists("curl_init")) {
        $CR = curl_init();
        curl_setopt($CR, CURLOPT_URL, $cgConf['cg_gateway_url']);
        curl_setopt($CR, CURLOPT_POST, 1);
        curl_setopt($CR, CURLOPT_FAILONERROR, true);
        curl_setopt($CR, CURLOPT_POSTFIELDS, $poststring);
        curl_setopt($CR, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($CR, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($CR, CURLOPT_FAILONERROR, true);


        //actual curl execution perfom
        $result = curl_exec($CR);
        $error = curl_error($CR);

        // on error - die with error message
        if (!empty($error)) {
            die($error);
        }

        curl_close($CR);
    }

    if (function_exists("simplexml_load_string")) {
        if (strpos(strtoupper($result), 'HEB')) {

            $result = iconv("utf-8", "iso-8859-8", $result);
        }
        $xmlObj = simplexml_load_string($result);
        if (isset($xmlObj->response->doDeal->mpiHostedPageUrl)) {

            // print out the url which we should redirect our customers to
            return $xmlObj->response->doDeal->mpiHostedPageUrl;

        }
        else
        {
            die('<strong>Can\'t Create Transaction</strong> <br />' .
                'Error Code: ' . $xmlObj->response->result . '<br />' .
                'Message: ' . $xmlObj->response->message . '<br />' .
                'Addition Info: ' . $xmlObj->response->additionalInfo);
        }
    }
    else
    {
        die("simplexml_load_string function is not support, upgrade PHP version!");
    }

}




// CLIENT EMAILS

// EMAIL ORDER SUMMARY ENGLISH VERSION
function email_order_summary_english($user_order,$orderId,$todayDate)
{
    $mailbody  = '<html><head></head>';
    $mailbody .= '<body style="padding: 0; margin: 0" >';
    $mailbody .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px " >';
    $mailbody .= '<div style="font-family: Open Sans" src="https://fonts.googleapis.com/css?family=Open+Sans:300">';
    $mailbody .= '<div  style="background-image: url(http://dev.m.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;">';
    $mailbody .= '<table style="width: 100%; color: white; padding: 30px" >';
    $mailbody .= '<tr style="font-size: 30px; padding: 10px" >';
    $mailbody .= '<td > <img style="padding-top: 10px; width: 20px" src="http://dev.m.orderapp.com/restapi/images/bag.png" > Order Summary </td>';
    $mailbody .= '<td style="text-align: right">'.$user_order['total'].' NIS</td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 10px" >';
    $mailbody .= '<td> '.$todayDate.' &nbsp; Order ID # '.$orderId.'</td>';
    $mailbody .= '<td style="text-align: right">'.$user_order['Cash_Card'].'</td>';
    $mailbody .= '</tr>';
    $mailbody .= '</table>';
    $mailbody .= '</div>';


    $mailbody .= '<div  style="padding: 10px 30px 0px 30px;" >';

    foreach($user_order['cartData'] as $t) {

        $mailbody .= '<table style="width: 100%; color:black; padding: 30px 0; border-bottom: 1px solid #D3D3D3" >';

        $mailbody .= '<tr style="font-size: 18px; padding: 10px; font-weight: bold" >';
        // print item name
        $mailbody .= '<td >' . $t['name'] . '  </td>';
        $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$t['price'].' NIS X '.$t['qty'].'  &nbsp; <span style="color: FF864C;" >'.(($t['price'] * $t['qty'])).' NIS</span></td>';
        $mailbody .= '</tr>';

        // subitems
        $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
        $mailbody .= '<td >' . $t['detail'] . ' </td>';
        $mailbody .= '<td style="text-align: right"> </td>';
        $mailbody .= '</tr>';

        $mailbody .= '</table>';

    }

    $mailbody .= '</div>';


    $mailbody .= '<table style="width: 100%; color:black; padding:10px 30px; background: #FEF2E8; border-bottom: 1px solid #D3D3D3 " >';

    if($user_order['isCoupon'] == "false")
    {
        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
        $mailbody .= '<td style="padding: 5px 0" > Total </td>';
        $mailbody .= '<td style="text-align: right; white-space: nowrap"> <span style="color: #FF864C;" >'.$user_order['total'].' NIS</span></td>';
        $mailbody .= '</tr>';
    }
    else
    {
        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
        $mailbody .= '<td style="padding: 5px 0" > Sub total  </td>';
        $mailbody .= '<td style="text-align: right; white-space: nowrap"> <span style="color: #FF864C;" >'.$user_order['totalWithoutDiscount'].' NIS</span></td>';
        $mailbody .= '</tr>';

        if($user_order['isFixAmountCoupon'] == 'false')
        {
            $amountDiscount = (($user_order['totalWithoutDiscount'] * $user_order['discount']) / 100);

            $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
            $mailbody .= '<td style="padding: 5px 0" > Coupon Discount -'.$user_order['discount'].'% </td>';
            $mailbody .= '<td style="text-align: right; white-space: nowrap"> <span style="color: #FF864C;" >'.$amountDiscount.' NIS</span></td>';
            $mailbody .= '</tr>';
        }
        else
        {
            $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
            $mailbody .= '<td style="padding: 5px 0" > Coupon Discount Amount </td>';
            $mailbody .= '<td style="text-align: right; white-space: nowrap"> <span style="color: #FF864C;" > -'.$user_order['discount'].' NIS</span></td>';
            $mailbody .= '</tr>';

        }

    }


    $mailbody .= '</table>';

    $mailbody .= '<table style=" color:black; padding:10px 30px; width: 270px; " cellspacing="5px">';
    $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
    $mailbody .= '<td colspan="2" style="padding: 10px 0" > Customer information   </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_phone.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0; text-align: center" > <img style=" height: 24px" src="http://dev.m.orderapp.com/restapi/images/ic_location.png" ></td>';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: left; white-space: nowrap"> Delivery Address : '.$user_order['deliveryAddress'].'</td>';
    }
    else{

        $mailbody .= '<td style="text-align: left; white-space: nowrap"> Pick From Restaurant : '.$user_order['restaurantAddress'].'</td>';
    }


    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['email'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style=" width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['Cash_Card'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '</table>';

    $mailbody .= '</div>';
    $mailbody .= '</div>';
    $mailbody .= '</body>';
    $mailbody .= '</html>';

    $mail = new PHPMailer;

    $mail->CharSet = 'UTF-8';

    $mail->SMTPDebug = 3;                                               // Enable verbose debug output

    $mail->isSMTP();
    $mail->Host = "email-smtp.eu-west-1.amazonaws.com";                 //   Set mailer to use SMTP
    $mail->SMTPAuth = true;                                             //   Enable SMTP authentication
    $mail->Username = "AKIAJZTPZAMJBYRSJ27A";
    $mail->Password = "AujjPinHpYPuio4CYc5LgkBrSRbs++g9sJIjDpS4l2Ky";   //   SMTP password
    $mail->SMTPSecure = 'tls';                                          //   Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;

//From email address and name
    $mail->From = "order@orderapp.com";
    $mail->FromName = "OrderApp";


//To address and name
    $mail->addAddress($user_order['email']);     // SEND EMAIL TO USER
    $mail->addAddress(EMAIL);                    //SEND  CLIENT EMAIL COPY TO ADMIN

//Send HTML or Plain Text email
    $mail->isHTML(true);
    $mail->Subject = 'New Order '.$user_order['restaurantTitle'];
    $mail->Body = "<i>$mailbody</i>";
    $mail->AltBody = "OrderApp";

    if (!$mail->send())
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else
    {
        echo "Message has been sent successfully";
    }


}


// EMAIL ORDER SUMMARY HEBREW VERSION

function email_order_summary_hebrew($user_order,$orderId,$todayDate)
{

    $mailbody  = '<html><head><meta charset="UTF-8"></head>';
    $mailbody  .= '<body style="padding: 0; margin: 0" >';
    $mailbody  .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px ">';
    $mailbody  .= '<style>';
    $mailbody  .= '@import url("https://fonts.googleapis.com/css?family=Open+Sans:300");';
    $mailbody  .= '</style>';
    $mailbody  .= '<div style="font-family: Open Sans">';
    $mailbody  .= '<div style="background-image: url(http://dev.m.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;" >';
    $mailbody  .= '<table style="width: 100%; color: white; padding: 30px">';
    $mailbody  .= '<tr style="font-size: 30px; padding: 10px">';
    $mailbody  .= '<td dir="rtl" style="text-align: left">'.$user_order['total'].' ש"ח'.'</td>';
    $mailbody  .= '<td style="text-align: right;" >  סיכום הזמנה <img style="padding-top: 10px; width: 20px" src="http://dev.m.orderapp.com/restapi/images/bag.png" ></td>';
    $mailbody  .= '</tr>';
    $mailbody  .= '<tr style="font-size: 12px; padding: 10px" >';
    $mailbody  .= '<td>'.$user_order['Cash_Card_he'].'</td>';
    $mailbody  .= '<td style="text-align: right" dir="rtl">';
    $mailbody  .=  '&nbsp;'.$todayDate.'&nbsp;';
    $mailbody  .= 'מספר הזמנה #';
    $mailbody  .=  $orderId;
    $mailbody  .= '</tr>';
    $mailbody  .= '</table>';
    $mailbody  .= '</div>';
    $mailbody  .= '<div  style="padding: 10px 30px 0px 30px;" >';

    foreach($user_order['cartData'] as $t) {

        $mailbody.='<table style="width: 100%; color:black; padding: 30px 0; border-bottom: 1px solid #D3D3D3" >';
        $mailbody.='<tr style="font-size: 18px; padding: 10px; font-weight: bold" >';
        $mailbody.='<span style="color: #FF864C;" dir="rtl">';
        $mailbody.=(($t['price'] * $t['qty'])).'ש"ח';
        $mailbody.='</span> &nbsp; <span dir="rtl">ש"ח</span>';
        $mailbody.=$t['price'].' x '.$t['qty'].'</td>';
        $mailbody.='<td style="text-align: right;" >'. $t['name_he'] .'</td>';
        $mailbody.='</tr>';
        $mailbody.='<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
        $mailbody.='<td > </td>';
        $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].'</td>';
        $mailbody.='</tr>';
        $mailbody.='</table>';
    }

    $mailbody .= '</div>';
    $mailbody .= '<table style="width: 100%; color:black; padding:10px 30px; background: #FEF2E8; border-bottom: 1px solid #D3D3D3 ">';

    if($user_order['isCoupon'] == "false")
    {

        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold">';
        $mailbody .= '<td style=" white-space: nowrap"> <span style="color: #FF864C;" >'.$user_order['total'].' NIS</span></td>';
        $mailbody .= '<td style="padding: 5px 0; text-align: right; " > סה"כ </td>';
        $mailbody .= '</tr>';

    }
    else
    {
        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold">';
        $mailbody .= '<td style=" white-space: nowrap"> <span style="color: #FF864C;" >'.$user_order['totalWithoutDiscount'].' NIS</span></td>';
        $mailbody .= '<td style="padding: 5px 0; text-align: right; " > סיכום ביניים </td>';
        $mailbody .= '</tr>';

        if($user_order['isFixAmountCoupon'] == 'false')
        {
            $amountDiscount = (($user_order['totalWithoutDiscount'] * $user_order['discount']) / 100);

            $mailbody .= '<tr style="font-size: 18px; font-weight: bold">';
            $mailbody .= '<td style="white-space: nowrap"> <span style="color: #FF864C;"> -'.$amountDiscount.' NIS</span></td>';
            $mailbody .= '<td style="padding: 5px 0;text-align: right;" dir="rtl" > הנחת קופון -'.$user_order['discount'].'% </td>';
            $mailbody .= '</tr>';
        }
        else
        {

            $mailbody .= '<tr style="font-size: 18px; font-weight: bold">';
            $mailbody .= '<td style="white-space: nowrap"> <span style="color: #FF864C;" >-'.$user_order['discount'].' NIS</span></td>';
            $mailbody .= '<td style="padding: 5px 0;text-align: right;" dir="rtl"> סכום הנחת קופון</td>';
            $mailbody .= '</tr>';

        }

    }

    $mailbody .= '</table>';

    $mailbody .= '<table style="float: right;color:black; padding:10px 30px; width: 270px; position: relative; left: calc(100% - 270px)" cellspacing="5px">';
    $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
    $mailbody .= '<td colspan="2" style="padding: 10px 0; text-align: right" dir="rtl" > מידע ללקוחות   </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_phone.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap" dir="rtl"> כתובת למשלוח : '.$user_order['deliveryAddress'].'</td>';
    }
    else
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap"dir="rtl">  איסוף עצמי ממסעדה : '.$user_order['restaurantAddress'].'</td>';
    }

    $mailbody .=  '<td style="padding: 10px 0; text-align: center"> <img style="height: 24px" src="http://dev.m.orderapp.com/restapi/images/ic_location.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['email'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;"><img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['Cash_Card_he'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;" > <img style=" width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '</table>';
    $mailbody .=  '</div></div></body></html>';


    $mail = new PHPMailer;

    $mail->CharSet = 'UTF-8';

    $mail->SMTPDebug = 3;                                               // Enable verbose debug output

    $mail->isSMTP();
    $mail->Host = "email-smtp.eu-west-1.amazonaws.com";                 //   Set mailer to use SMTP
    $mail->SMTPAuth = true;                                             //   Enable SMTP authentication
    $mail->Username = "AKIAJZTPZAMJBYRSJ27A";
    $mail->Password = "AujjPinHpYPuio4CYc5LgkBrSRbs++g9sJIjDpS4l2Ky";   //   SMTP password
    $mail->SMTPSecure = 'tls';                                          //   Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;

    //From email address and name
    $mail->From = "order@orderapp.com";
    $mail->FromName = "OrderApp";


    //To address and name
    $mail->addAddress($user_order['email']);     // SEND EMAIL TO USER
    $mail->addAddress(EMAIL);                    //SEND  CLIENT EMAIL COPY TO ADMIN

    //Address to which recipient will reply
    $mail->addReplyTo("order@orderapp.com", "Reply");


    //Send HTML or Plain Text email
    $mail->isHTML(true);
    $mail->Subject = 'הזמנה חדשה '." ".$user_order['restaurantTitleHe'];
    $mail->Body = "<i>$mailbody</i>";
    $mail->AltBody = "OrderApp";

    if (!$mail->send())
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else
    {
        echo "Message has been sent successfully";
    }

}



// ADMIN EMAIL
// EMAIL ORDER SUMMARY HEBREW VERSION FOR ADMIN
function email_order_summary_hebrew_admin($user_order,$orderId,$todayDate)
{

    $mailbody  = '<html><head><meta charset="UTF-8"></head>';
    $mailbody  .= '<body style="padding: 0; margin: 0" >';
    $mailbody  .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px ">';
    $mailbody  .= '<style>';
    $mailbody  .= '@import url("https://fonts.googleapis.com/css?family=Open+Sans:300");';
    $mailbody  .= '</style>';
    $mailbody  .= '<div style="font-family: Open Sans">';
    $mailbody  .= '<div style="background-image: url(http://dev.m.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;" >';
    $mailbody  .= '<table style="width: 100%; color: white; padding: 30px">';
    $mailbody  .= '<tr style="font-size: 30px; padding: 10px">';
    $mailbody  .= '<td dir="rtl" style="text-align: left">'.$user_order['total'].' ש"ח'.'</td>';
    $mailbody  .= '<td style="text-align: right;" >  סיכום הזמנה <img style="padding-top: 10px; width: 20px" src="http://dev.m.orderapp.com/restapi/images/bag.png" ></td>';
    $mailbody  .= '</tr>';
    $mailbody  .= '<tr style="font-size: 12px; padding: 10px" >';
    $mailbody  .= '<td>'.$user_order['Cash_Card_he'].'</td>';
    $mailbody  .= '<td style="text-align: right" dir="rtl">';
    $mailbody  .=  '&nbsp;'.$todayDate.'&nbsp;';
    $mailbody  .= 'מספר הזמנה #';
    $mailbody  .=  $orderId;
    $mailbody  .= '</tr>';
    $mailbody  .= '</table>';
    $mailbody  .= '</div>';
    $mailbody  .= '<div  style="padding: 10px 30px 0px 30px;" >';


    foreach($user_order['cartData'] as $t) {

        $mailbody.='<table style="width: 100%; color:black; padding: 30px 0; border-bottom: 1px solid #D3D3D3" >';
        $mailbody.='<tr style="font-size: 18px; padding: 10px; font-weight: bold" >';
        $mailbody.='<span style="color: #FF864C;" dir="rtl">';
        $mailbody.=(($t['price'] * $t['qty'])).'ש"ח';
        $mailbody.='</span> &nbsp; <span dir="rtl">ש"ח</span>';
        $mailbody.=$t['price'].' x '.$t['qty'].'</td>';
        $mailbody.='<td style="text-align: right;" >'. $t['name_he'] .'</td>';
        $mailbody.='</tr>';
        $mailbody.='<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
        $mailbody.='<td > </td>';
        $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].'</td>';
        $mailbody.='</tr>';
        $mailbody.='</table>';
    }


    $mailbody .=  '</div>';

    $mailbody .= '<table style="width: 100%; color:black; padding:10px 30px; background: #FEF2E8; border-bottom: 1px solid #D3D3D3 ">';

    if($user_order['isCoupon'] == "false")
    {

        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold">';
        $mailbody .= '<td style=" white-space: nowrap"> <span style="color: #FF864C;" dir="rtl">'.$user_order['total'].' ש"ח '.'</span></td>';
        $mailbody .= '<td style="padding: 5px 0; text-align: right; " > סה"כ </td>';
        $mailbody .= '</tr>';

    }
    else
    {
        $mailbody .= '<tr style="font-size: 18px;  font-weight: bold">';
        $mailbody .= '<td style=" white-space: nowrap"> <span style="color: #FF864C;" >'.$user_order['totalWithoutDiscount'].' ש"ח '.'</span></td>';
        $mailbody .= '<td style="padding: 5px 0; text-align: right; " > סיכום ביניים </td>';
        $mailbody .= '</tr>';


    }

    $mailbody .= '</table>';

    $mailbody .= '<table style="float: right;color:black; padding:10px 30px; width: 270px; position: relative; left: calc(100% - 270px)" cellspacing="5px">';
    $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
    $mailbody .= '<td colspan="2" style="padding: 10px 0; text-align: right" dir="rtl" > מידע ללקוחות   </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_phone.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap" dir="rtl"> כתובת למשלוח : '.$user_order['deliveryAddress'].'</td>';
    }
    else
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap"dir="rtl">  איסוף עצמי ממסעדה : '.$user_order['restaurantAddress'].'</td>';
    }

    $mailbody .=  '<td style="padding: 10px 0; text-align: center"> <img style="height: 24px" src="http://dev.m.orderapp.com/restapi/images/ic_location.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['email'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;"><img style="width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['Cash_Card_he'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;" > <img style=" width: 20px" src="http://dev.m.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '</table>';
    $mailbody .=  '</div></div></body></html>';



    $mail = new PHPMailer;

    $mail->CharSet = 'UTF-8';

    $mail->SMTPDebug = 3;                                               // Enable verbose debug output

    $mail->isSMTP();
    $mail->Host = "email-smtp.eu-west-1.amazonaws.com";                 //   Set mailer to use SMTP
    $mail->SMTPAuth = true;                                             //   Enable SMTP authentication
    $mail->Username = "AKIAJZTPZAMJBYRSJ27A";
    $mail->Password = "AujjPinHpYPuio4CYc5LgkBrSRbs++g9sJIjDpS4l2Ky";   //   SMTP password
    $mail->SMTPSecure = 'tls';                                          //   Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;

    //From email address and name
    $mail->From = "order@orderapp.com";
    $mail->FromName = "OrderApp";


    //To address and name
    $mail->addAddress(EMAIL);                    //SEND ADMIN EMAIL


    //Address to which recipient will reply
    $mail->addReplyTo("order@orderapp.com", "Reply");


    //Send HTML or Plain Text email
    $mail->isHTML(true);
    $mail->Subject = 'הזמנה חדשה'." ".$user_order['restaurantTitleHe'];
    $mail->Body = "<i>$mailbody</i>";
    $mail->AltBody = "OrderApp";

    if (!$mail->send())
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else
    {
        echo "Message has been sent successfully";
    }

}
?>

