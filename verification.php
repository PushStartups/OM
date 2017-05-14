<?php

include 'restapi/inc/initDb.php';

if(isset($_GET['key']))
{
    $key = $_GET['key'];
    $email = $_GET['email'];

    $result = DB::queryFirstRow("select login_verification_hash from users where smooch_id = '".$email."'");

    if($result['login_verification_hash'] == $key)
    {

        DB::update("users",array(

        'login_verification_hash' => 'success'

        ), 'smooch_id = %s', $email);

        ?>

        <script>


            localStorage.setItem("IS_LOGIN","true");
            window.location.href = '/en/confirm-order';

        </script>


        <?php

    }
}


?>