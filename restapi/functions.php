<?php

use Mailgun\Mailgun;
use Aws\Ses\SesClient;
use Aws\Ses\Exception\SesException;

/**
 * ALL EMAIL SCRIPTS
 */

//SEND EMAIL TO B2B USERS CREDENTIALS INFO
function email_to_b2b_users($email,$password,$username)
{

    $mailbody = '<html lang="en">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>OrderApp</title>';

    //    <style type="text/css">
    //    </style>
    $mailbody .= '</head><body bgcolor="#f7f7f7" style="background: #f7f7f7;">';
    $mailbody .= '<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateColumns" style="color: #000; font-size: 16px; line-height: 18px; font-weight: 400; width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">';
    $mailbody .= '<tr><td align="left" valign="top" width="100%" bgcolor="#ff7f00" style="background: #ff7f00; font-size: 18px; line-height: 22px; font-weight: 700;padding: 20px;">';
    $mailbody .= '<a href="https://orderapp.com" ><img style="display: inline-block; vertical-align: middle; margin: 0;" src="https://dev.orderapp.com/admin/img/email-logo.png" alt="orderapp"></a>';
    $mailbody .= '<h1 style="display: inline-block; vertical-align: middle; margin: 0 10px; font-weight: 400; color: #fff;">Welcome to OrderApp!</h1></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr>';
    $mailbody .= '<td align="left" valign="top" width="100%" bgcolor="#FFFFFF" style="padding: 50px 25px; background: #fff;">';
    $mailbody .= '<p>Hi '.$username.' <br><br>Your login details are as follows:</p>';
    $mailbody .= '<p><b>Username : </b> '.$username.'</p>';
    $mailbody .= '<p><b>Password : </b> '.$password.'</p><br>';
    $mailbody .= '<p>Visit Website : <a style="color: #3b5998; text-decoration: none;" href="#">'.B2BEMAIL.'</a></p>';
    $mailbody .= '</td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr>';
    $mailbody .= '<td align="center" style="padding: 100px 0 20px;">';
    $mailbody .= '<table border="0" cellspacing="0" cellpadding="0">';
    $mailbody .= '<tr><td width="37" style="text-align: center; padding: 0 8px;"><a href="#"><img src="https://dev.orderapp.com/admin/img/fb.png" width="37" height="37" alt="Facebook" border="0" /></a></td>';
    $mailbody .= '<td width="37" style="text-align: center; padding: 0 8px;"><a href="#"><img src="https://dev.orderapp.com/admin/img/tw.png" width="37" height="37" alt="Twitter" border="0" /></a></td>';
    $mailbody .= '<td width="37" style="text-align: center; padding: 0 8px;"><a href="#"> <img src="https://dev.orderapp.com/admin/img/gp.png" width="37" height="37" alt="Facebook" border="0" /></a></td>';
    $mailbody .= '<td width="37" style="text-align: center; padding: 0 8px;"><a href="#"><img src="https://dev.orderapp.com/admin/img/insta.png" width="37" height="37" alt="Twitter" border="0" /></a></td>';
    $mailbody .= '<td width="37" style="text-align: center; padding: 0 8px;"><a href="#"><img src="https://dev.orderapp.com/admin/img/pin.png" width="37" height="37" alt="Facebook" border="0" /></a></td>';
    $mailbody .= '<td width="37" style="text-align: center; padding: 0 8px;"><a href="#"><img src="https://dev.orderapp.com/admin/img/link.png" width="37" height="37" alt="Twitter" border="0" /></a></td>';
    $mailbody .= '</tr>';
    $mailbody .= '</table>';
    $mailbody .= '</td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr>';
    $mailbody .= '<td><p style="margin: 0; text-align: center;"><a style="color: #797979; text-decoration: none;" href="https://dev.orderapp.com/en/">orderapp.com</a></p></td></tr></table></body></html>';


    $subject = "B2B OrderApp Credentials Info";


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
                        $email,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  $email,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }

}


// CLIENT EMAILS

function sendVerificationEmail($code,$email)
{

    $mailbody  = 'https://'.$_SERVER['HTTP_HOST']."/verification.php?key=".$code.'&email='.$email;

    $subject = 'OrderApp Verification';

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
                        $email,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  $email,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }


}

function sendPassword($password,$email)
{
    $mailbody  = 'your password is '.$password;

    $subject = 'Your Password Reset Request For OrderApp';

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
                        $email,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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

        }
        catch (SesException $error) {


            echo("The email was not sent. Error message: ".$error->getAwsErrorMessage()."\n");

        }

    }
    //MAIN GUN SERVER ACTIVATED
    else if(ACTIVE_SERVER_ID == '2'){

        $mg = Mailgun::create(MAIL_GUN_API_KEY);

        $mg->messages()->send(MAIL_GUN_DOMAIN, [
            'from'    =>  "OrderApp <".EMAIL.">",
            'to'      =>  $email,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }

}


// EMAIL ORDER SUMMARY ENGLISH VERSION
function email_order_summary_english($user_order,$orderId,$todayDate)
{
    $mailbody  = '<html><head></head>';
    $mailbody .= '<body style="padding: 0; margin: 0" >';
    $mailbody .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px " >';
    $mailbody .= '<div style="font-family: Open Sans" src="https://fonts.googleapis.com/css?family=Open+Sans:300">';
    $mailbody .= '<div  style="background-image: url(http://dev.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;">';
    $mailbody .= '<table style="width: 100%; color: white; padding: 30px" >';
    $mailbody .= '<tr style="font-size: 30px; padding: 10px" >';
    $mailbody .= '<td > <img style="padding-top: 10px; width: 20px" src="http://dev.orderapp.com/restapi/images/bag.png" > Order Summary </td>';
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


        if($t['specialRequest'] != "") {

            if ($t['detail'] != '') {

                $mailbody .= '<td >' . $t['detail'] .', Special Request : '.$t['specialRequest']. '</td>';
            }
            else
            {

                $mailbody .= '<td >' . $t['detail'].' Special Request : '.$t['specialRequest'].' </td>';
            }
        }
        else
        {
            $mailbody .= '<td >' . $t['detail'] . ' </td>';
        }


        $mailbody .= '<td style="text-align: right"> </td>';
        $mailbody .= '</tr>';

        $mailbody .= '</table>';

    }

    if($user_order['pickFromRestaurant'] == 'false' && $user_order['deliveryCharges'] != null && $user_order['deliveryCharges'] != 0) {

        $mailbody .= '<table style="width: 100%; color:black; padding: 30px 0; border-bottom: 1px solid #D3D3D3" >';

        $mailbody .= '<tr style="font-size: 18px; padding: 10px; font-weight: bold" >';

        // print item name
        $mailbody .= '<td > Delivery Fee </td>';
        $mailbody .= '<td style="text-align: right; white-space: nowrap"><span style="color: #FF864C;" >' . (($user_order['deliveryCharges'])) . ' NIS</span></td>';
        $mailbody .= '</tr>';

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


    if($user_order['specialRequest'] != '')
    {

        $mailbody .= '<br><span style="color: #000000; padding:10px 30px;">Special Request : <span style="color: #808080">'.$user_order["specialRequest"].'</span></span><br>';

    }


    $mailbody .= '<table style=" color:black; padding:10px 30px; width: 270px; " cellspacing="5px">';
    $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
    $mailbody .= '<td colspan="2" style="padding: 10px 0" > Customer information   </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_user.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['name'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_phone.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0; text-align: center" > <img style=" height: 24px" src="http://dev.orderapp.com/restapi/images/ic_location.png" ></td>';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: left; white-space: nowrap"> Delivery Address : '.$user_order['deliveryAptNo'].'  '.$user_order['deliveryAddress'].' ('.$user_order['deliveryArea'].')'.'</td>';
    }
    else{

        $mailbody .= '<td style="text-align: left; white-space: nowrap"> Pick From Restaurant : '.$user_order['restaurantAddress'].'</td>';
    }


    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['email'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
    $mailbody .= '<td style="padding: 10px 0" > <img style=" width: 20px" src="http://dev.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .= '<td style="text-align: left; white-space: nowrap"> '.$user_order['Cash_Card'].' </td>';
    $mailbody .= '</tr>';
    $mailbody .= '</table>';

    $mailbody .= '</div>';
    $mailbody .= '</div>';
    $mailbody .= '</body>';
    $mailbody .= '</html>';


    $subject = "";

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
                        $user_order['email'],
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  $user_order['email'],
            'cc'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }
}


// EMAIL ORDER SUMMARY HEBREW VERSION

function email_order_summary_hebrew($user_order,$orderId,$todayDate)
{

    $mailbody  = '<html><head><meta charset="UTF-8"></head>';
    $mailbody  .= '<body style="padding: 0; margin: 0" >';
    $mailbody  .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px; overflow: hidden; ">';
    $mailbody  .= '<style>';
    $mailbody  .= '@import url("https://fonts.googleapis.com/css?family=Open+Sans:300");';
    $mailbody  .= '</style>';
    $mailbody  .= '<div style="font-family: Open Sans">';
    $mailbody  .= '<div style="background-image: url(http://dev.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;" >';
    $mailbody  .= '<table style="width: 100%; color: white; padding: 30px">';
    $mailbody  .= '<tr style="font-size: 30px; padding: 10px">';
    $mailbody  .= '<td dir="rtl" style="text-align: left">'.$user_order['total'].' ש"ח'.'</td>';
    $mailbody  .= '<td style="text-align: right;" >  סיכום הזמנה <img style="padding-top: 10px; width: 20px" src="http://dev.orderapp.com/restapi/images/bag.png" ></td>';
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
        $mailbody.=(($t['price'] * $t['qty'])).'  ש"ח ';
        $mailbody.='</span> &nbsp; <span dir="rtl">ש"ח</span>';
        $mailbody.=$t['price'].' x '.$t['qty'].'</td>';
        $mailbody.='<td style="text-align: right;width: 60%" >'. $t['name_he'] .'</td>';
        $mailbody.='</tr>';
        $mailbody.='<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
        $mailbody.='<td > </td>';



        if($t['specialRequest'] != "") {

            if ($t['detail_he'] == '') {


                $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].' הערות : '.$t['specialRequest'].'</td>';

            }
            else {

                $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].', הערות : '.$t['specialRequest'].'</td>';

            }
        }
        else
        {
            $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].'</td>';

        }





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


    if($user_order['specialRequest'] != '')
    {

        $mailbody .= '<br><span style="color: #000000;text-align: right;float: right;" dir="rtl"> <span style="color: #808080; padding:10px 30px;">בקשה מיוחדת :</span>'.$user_order["specialRequest"].'</span><br>';

    }


    $mailbody .= '<table style="float: right;color:black; padding:10px 30px; width: 270px; position: relative; left: calc(100% - 270px)" cellspacing="5px">';
    $mailbody .= '<tr style="font-size: 18px;  font-weight: bold" >';
    $mailbody .= '<td colspan="2" style="padding: 10px 0; text-align: right" dir="rtl" > מידע ללקוחות   </td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['name'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_user.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_phone.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap" dir="rtl"> כתובת למשלוח : '.$user_order['deliveryAptNo'].'  '.$user_order['deliveryAddress'].' )'.$user_order['deliveryArea'].')</td>';
    }
    else
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap"dir="rtl">  איסוף עצמי ממסעדה : '.$user_order['restaurantAddress'].'</td>';
    }

    $mailbody .=  '<td style="padding: 10px 0; text-align: center"> <img style="height: 24px" src="http://dev.orderapp.com/restapi/images/ic_location.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['email'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['Cash_Card_he'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;" > <img style=" width: 20px" src="http://dev.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '</table>';

    $mailbody .=  '</div></div></body></html>';


    $subject = "";
    if($_SERVER['HTTP_HOST'] == 'eluna.orderapp.com')
        $subject = "(ELUNA) "+'הזמנה חדשה '." ".$user_order['restaurantTitleHe'];
    else
        $subject = 'הזמנה חדשה '." ".$user_order['restaurantTitleHe'];


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
                        $user_order['email'],
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  $user_order['email'],
            'cc'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }
}


// ADMIN EMAIL
// EMAIL ORDER SUMMARY HEBREW VERSION FOR ADMIN
function email_order_summary_hebrew_admin($user_order,$orderId,$todayDate)
{

    $mailbody  = '<html><head><meta charset="UTF-8"></head>';
    $mailbody  .= '<body style="padding: 0; margin: 0" >';
    $mailbody  .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #D3D3D3; border-radius: 5px; overflow: hidden; ">';
    $mailbody  .= '<style>';
    $mailbody  .= '@import url("https://fonts.googleapis.com/css?family=Open+Sans:300");';
    $mailbody  .= '</style>';
    $mailbody  .= '<div style="font-family: Open Sans">';
    $mailbody  .= '<div style="background-image: url(http://dev.orderapp.com/restapi/images/header.png); background-repeat: no-repeat; background-position: center; background-size: cover;" >';
    $mailbody  .= '<table style="width: 100%; color: white; padding: 30px">';
    $mailbody  .= '<tr style="font-size: 30px; padding: 10px">';
    $mailbody  .= '<td dir="rtl" style="text-align: left">'.$user_order['total'].' ש"ח'.'</td>';
    $mailbody  .= '<td style="text-align: right;" >  סיכום הזמנה <img style="padding-top: 10px; width: 20px" src="http://dev.orderapp.com/restapi/images/bag.png" ></td>';
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
        $mailbody.=(($t['price'] * $t['qty'])).'  ש"ח ';
        $mailbody.='</span> &nbsp; <span dir="rtl">ש"ח</span>';
        $mailbody.=$t['price'].' x '.$t['qty'].'</td>';
        $mailbody.='<td style="text-align: right;width: 60%" >'. $t['name_he'] .'</td>';
        $mailbody.='</tr>';
        $mailbody.='<tr style="font-size: 12px; padding: 5px 10px; color: #808080" >';
        $mailbody.='<td > </td>';



        if($t['specialRequest'] != "") {

            if ($t['detail_he'] == '') {


                $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].' הערות : '.$t['specialRequest'].'</td>';

            }
            else {

                $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].', הערות : '.$t['specialRequest'].'</td>';

            }
        }
        else
        {
            $mailbody.='<td style="text-align: right; padding: 5px" dir="rtl">'.$t['detail_he'].'</td>';

        }





        $mailbody.='</tr>';
        $mailbody.='</table>';
    }


    $mailbody .=  '</div>';

    if($user_order['specialRequest'] != '')
    {

        $mailbody .= '<br><span style="color: #000000;text-align: right;float: right;" dir="rtl"> <span style="color: #808080; padding:10px 30px;">בקשה מיוחדת :</span>'.$user_order["specialRequest"].'</span><br>';

    }

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
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['name'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_user.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .= '<td style="text-align: right; white-space: nowrap"> '.$user_order['contact'].' </td>';
    $mailbody .= '<td style="padding: 10px 0"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_phone.png"></td>';
    $mailbody .= '</tr>';
    $mailbody .= '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';

    if($user_order['pickFromRestaurant'] == 'false')
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap" dir="rtl"> כתובת למשלוח : '.$user_order['deliveryAptNo'].'  '.$user_order['deliveryAddress'].' ('.$user_order['deliveryArea'].')</td>';
    }
    else
    {
        $mailbody .= '<td style="text-align: right; white-space: nowrap"dir="rtl">  איסוף עצמי ממסעדה : '.$user_order['restaurantAddress'].'</td>';
    }

    $mailbody .=  '<td style="padding: 10px 0; text-align: center"> <img style="height: 24px" src="http://dev.orderapp.com/restapi/images/ic_location.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['email'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;"><img style="width: 20px" src="http://dev.orderapp.com/restapi/images/ic_email.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '<tr style="font-size: 12px; padding: 5px 10px; color: #808080">';
    $mailbody .=  '<td style="text-align: right; white-space: nowrap">'.$user_order['Cash_Card_he'].'</td>';
    $mailbody .=  '<td style="padding: 10px 0;" > <img style=" width: 20px" src="http://dev.orderapp.com/restapi/images/ic_card.png" ></td>';
    $mailbody .=  '</tr>';
    $mailbody .=  '</table>';

    $mailbody .=  '</div></div></body></html>';


    $subject = "";
    if($_SERVER['HTTP_HOST'] == 'eluna.orderapp.com')
        $subject = "(ELUNA) "+'הזמנה חדשה '." ".$user_order['restaurantTitleHe'];
    else
        $subject = 'הזמנה חדשה '." ".$user_order['restaurantTitleHe'];



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
                        EMAIL,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }
}



// ADMIN EMAIL
// EMAIL ORDER SUMMARY HEBREW VERSION FOR ADMIN
function email_for_kitchen($user_order,$orderId,$todayDate)
{

    $mailbody = '<html>
                  <head>
                  <meta charset="UTF-8">
                  </head>
                  <body style="padding: 15px; margin: 15px;font-size: 16px" dir="rtl" >';

    $mailbody .= ' <span dir="rtl">
        שם הלקוח :  
        ' . $user_order['name'] . '
    </span>';

    $mailbody .= '<br>';

    $mailbody .= ' <span dir="rtl">
       מספר :  
  ' . $user_order['contact'] . '
    </span>';

    $mailbody .= '<br>';


    if ($user_order['pickFromRestaurant'] == 'false') {
        $mailbody .= ' <span dir="rtl">
       כתובת:  
    '. $user_order['deliveryAptNo'] .' '. $user_order['deliveryAddress'] .' ('.$user_order['deliveryArea'].')'.'
    </span>';

    }
    else
    {
        $mailbody .= ' <span dir="rtl">
       כתובת:  
    איסוף עצמי
    </span>';
    }

    $mailbody .= '<br>';

    $mailbody .= ' <span dir="rtl">
      הזמנה:  
   ' . $orderId . '
    </span>';



    if($user_order['specialRequest'] != '')
    {

        $mailbody .= '<br>';

        $mailbody .= ' <span dir="rtl">
      ההערות :  
   ' . $user_order["specialRequest"]  . '
    </span>';


    }

    $mailbody .= '<br>';
    $mailbody .= '<br>';
    $mailbody .= '<br>';

    foreach ($user_order['cartData'] as $t) {


        $mailbody .= '<span dir="rtl">' . $t['qty'] . '  ' . $t['name_he'] . '</span>';
        $mailbody .= '<br>';



        if($t['specialRequest'] != "") {

            if ($t['detail_he'] == '') {


                $mailbody .= '<span dir="rtl">' . preg_replace("/\([^)]+\)/", "", $t['detail_he']).' הערות : '.$t['specialRequest'].'</span>';


            }
            else {


                $mailbody .= '<span dir="rtl">' . preg_replace("/\([^)]+\)/", "", $t['detail_he']).', הערות : '.$t['specialRequest'].'</span>';


            }
        }
        else
        {
            $mailbody .= '<span dir="rtl">' . preg_replace("/\([^)]+\)/", "", $t['detail_he']) . '</span>';

        }






        $mailbody .= '<br>';
        $mailbody .= '<br>';


        $mailbody .= '<br>';

    }
    $subject = "";
    if($_SERVER['HTTP_HOST'] == "eluna.orderapp.com")
        $subject = "(ELUNA) "+" הזמנה חדשה ".$orderId . " #" . $user_order['restaurantTitleHe'];
    else
        $subject =  " הזמנה חדשה ".$orderId . " #" . $user_order['restaurantTitleHe'];


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
                        EMAIL,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }

}

function email_for_mark($user_order,$orderId,$todayDate)
{

    $mailbody = '';

    $mailbody .= 'שם הלקוח :'. $user_order['name'];
    $mailbody .= '\n';

    $mailbody .= 'מספר : '.$user_order['contact'];
    $mailbody .= '\n';

    if ($user_order['pickFromRestaurant'] == 'false') {
        $mailbody .= 'כתובת:'. $user_order['deliveryAptNo'] .' '. $user_order['deliveryAddress'] .' ('.$user_order['deliveryArea'].')';
    }
    else
    {
        $mailbody .= 'כתובת: איסוף עצמי';
    }

    $mailbody .= '\n';

    $mailbody .= 'הזמנה:' . $orderId;

    if($user_order['specialRequest'] != '')
    {
        $mailbody .= '\n';

        $mailbody .= 'ההערות : ' . $user_order["specialRequest"];
    }

    $mailbody .= '\n';
    $mailbody .= '\n';
    $mailbody .= '\n';

    foreach ($user_order['cartData'] as $t) {


        $mailbody .= $t['qty'] . '  ' . $t['name_he'] . '  ' . $t['price'];
        $mailbody .= '\n';



        if($t['specialRequest'] != "") {

            if ($t['detail_he'] == '') {


                $mailbody .= preg_replace("/\([^)]+\)/", "", $t['detail_he']).' הערות : '.$t['specialRequest'];


            }
            else {


                $mailbody .= preg_replace("/\([^)]+\)/", "", $t['detail_he']).', הערות : '.$t['specialRequest'];


            }
        }
        else
        {
            $mailbody .= preg_replace("/\([^)]+\)/", "", $t['detail_he']);

        }


        $mailbody .= $user_order['total'] . 'סה"כ ';
        $mailbody .= '\n';
        $mailbody .= '\n';

        $mailbody .= $user_order['Cash_Card_he'] . 'אמצעי תשלום ';
        $mailbody .= '\n';
        $mailbody .= '\n';

    }

    $subject = "";
    if($_SERVER['HTTP_HOST'] == "eluna.orderapp.com")
        $subject = "(ELUNA) "+" הזמנה חדשה ".$orderId . " #" . $user_order['restaurantTitleHe'];
    else
        $subject =  " הזמנה חדשה ".$orderId . " #" . $user_order['restaurantTitleHe'];


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
                        EMAIL,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }



}



function email_for_mark2($user_order,$orderId,$todayDate)
{

    $mailbody = '';

    $mailbody .= 'Name :'. $user_order['name'];
    $mailbody .= '\n';

    $mailbody .= 'Email :'. $user_order['email'];
    $mailbody .= '\n';

    $mailbody .= 'Contact :'. $user_order['contact'];
    $mailbody .= '\n';

    $mailbody .= 'Restaurant Name :'. $user_order['restaurantTitle'];
    $mailbody .= '\n';

    $mailbody .= 'Payment Method : '.$user_order['Cash_Card'];
    $mailbody .= '\n';

    if ($user_order['pickFromRestaurant'] == 'false') {

        $mailbody .= 'Delivery Charges : '. $user_order['deliveryCharges'];
        $mailbody .= '\n';
        $mailbody .= 'Appt No : '. $user_order['deliveryAptNo'];
        $mailbody .= '\n';
        $mailbody .= ' Address : '. $user_order['deliveryAddress'];
        $mailbody .= '\n';
        $mailbody .=  ' Area : ('.$user_order['deliveryArea'].')';
    }
    else
    {
        $mailbody .= 'Pick Up : Pick From Restaurant';
    }


    if($user_order['isCoupon']) {

        $mailbody .= '\n';
        $mailbody .= 'coupon code : ' . $user_order['couponCode'];
        $mailbody .= '\n';

        if ($user_order['isFixAmountCoupon'] == 'true') {

            $mailbody .= 'Discount : ' . $user_order['discount'] . ' NIS';
        } else {

            $mailbody .= 'Discount : ' . $user_order['discount'] . ' %';
        }


    }


    if(!($user_order['discount'] == 0 || $user_order['discount'] == '0' )) {

        $mailbody .= '\n';
        $mailbody .= 'Total Without Discount : ' . $user_order['totalWithoutDiscount'];

    }
    else{

        $mailbody .= '\n';
        $mailbody .= 'Sub Total : ' . $user_order['subTotal'];

    }


    $mailbody .= '\n';
    $mailbody .= 'Total : '.$user_order['total'];

    $mailbody .= '\n';
    $mailbody .= '\n';


    $subject = "";
    if($_SERVER['HTTP_HOST'] == "eluna.orderapp.com")

        $subject = 'ELUNA Ledger '.$user_order['restaurantTitle'].' Order# '.$orderId;
    else
        $subject = 'Ledger '.$user_order['restaurantTitle'].' Order# '.$orderId;




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
                        EMAIL,
                    ],
                ],
                'Message' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'UTF-8',
                            'Data' => $mailbody,
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
            'to'      =>  EMAIL,
            'subject' =>  $subject,
            'html'    => $mailbody
        ]);

    }
}