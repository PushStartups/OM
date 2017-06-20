<?php

// TAKE DB DUMP AND SAVE WITH DATE TIME STAMP

$name =  date("Y_m_d");
$return_var = NULL;
$output = NULL;

try {


    $result = exec('mysqldump --replace --user=root --password=orderapp orderapp > /var/www/html/db_backups/' . $name . '.sql', $output, $return_var);

    var_dump($output);
    var_dump($return_var);

    $result = exec('mysql -h production-orderapp.crv4lzhgi1gx.eu-central-1.rds.amazonaws.com -P 3306 -u root --password=orderapp  orderapp < /var/www/html/db_backups/' . $name . '.sql', $output, $return_var);

    var_dump($output);
    var_dump($return_var);


}
catch (Exception $exp)
{

    echo  $exp;

}

//define("HOST", "orderappdev.crv4lzhgi1gx.eu-central-1.rds.amazonaws.com:3306");
//define("DBUSER", "root");
//define("PASS", "orderapp");
//define("DB", "orderapp");
//define("PORT", 3306);
//
//
//$link = mysqli_connect(HOST,DBUSER,PASS,DB,PORT);
//
//
//if (mysqli_connect_errno($link)){
//
//    echo "Failure to connect: " . mysqli_connect_error();
//}
//else{
//
//    echo "successfully connected";
//}