<?php
require_once '../inc/initDb.php';
require_once '../inc/functions.php';

session_start();
DB::query("set names utf8");

$delivery_group_name = $_POST['delivery_group_id'];
$_SESSION['select_delivery_group_id'] = $delivery_group_name ;


DB::useDB('orderapp_user');
$query = "select * from ledger where delivery_team = '$delivery_group_name'";

$result = DB::query($query);



$output = "";
$i = 1;
$totall = 0; $actual_total = 0 ; $discount = 0;
foreach($result as $order) {
    //$refundAmount = getTotalRefundAmountB2B($order['id']);
    DB::useDB('orderapp_restaurants');
    $rest            = DB::queryFirstRow("select * from restaurants where id = '".$order['restaurant_id']."' ");
    $restaurant_name = $rest['name_en'];


    $output .= '<tr>';
    $output .= '<td>' . $order['id'] . '</td>';


    $output .= '<td>' . $order['date'] . '</td>';


    $output .= '<td>' . $order['time'] . '</td>';


    $output .= '<td>' . $order['customer_name'] . '</td>';


    $output .= '<td>' . $order['customer_contact'] . '</td>';



    $output .= '<td>' .  $order['customer_email'].'</td>';


    $output .= '<td>' . $order['delivery_team']. '</td>';


    $output .= '<td>' . $order['restaurant_name'] . '</td>';


    $output .= '<td>' . $order['payment_method'] . '</td>';


    $output .= '<td>' . $order['delivery_or_pickup']. '</td>';


    $output .= '<td>' .  $order['order_no'] .'</td>';


    $output .= '<td>' .  $order['balance'].'</td>';
    $output .= '<td>' . $order['restaurant_total'].'</td>';
    $output .= '<td>' .  $order['customer_grand_total'].'</td>';
    $output .= '<td>' .  $order['customer_total_paid_to_restaurant'].'</td>';

    $output .= '</tr>';


    $i++;
}

$output1 = "";
$output1 .= '<div id="swipe_table"><article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false">
                    <header>
                            <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                            <h2> Swipe Detail </h2> </header>
                            <div>
                                 <div class="jarviswidget-editbox">

                                 </div>

                                 <div class="widget-body no-padding">
                                        <table id="datatable_fixed_column" class="table table-striped table-bordered" width="100%">
                                        <thead>
                                            <tr>
                                              
                                                <th data-class="expand">Amount Added Tab</th>
                                                <th >Date Added</th>
                                                <th data-hide="phone, tablet">Swiped By</th>
                                                <th data-hide="phone, tablet">Comments</th>

                                            </tr>
                                            </thead>

                                            <tbody>';
DB::useDB('orderapp_restaurants');
$order = DB::queryFirstRow("select * from delivery_groups where delivery_team = '$delivery_group_name'");
$tab1 = explode(",", $order['amount_added_tab']);
$tab2 = explode(",", $order['date_added_tab']);
$tab3 = explode(",", $order['swiped_by']);
$tab4 = explode(",", $order['comments']);
for ($i = 0; $i < sizeof($tab1); $i++) {

    $output1 .= '<tr>';

    $output1 .= '<td>' . $tab1[$i] . '</td>';

    $output1 .= '<td>' .  $tab2[$i] . '</td>';
    $output1 .= '<td>' . $tab3[$i]. '</td>';
    $output1 .= '<td>' .  $tab4[$i] .'</td>';
    $output1 .= '</tr>'; }

$output1 .= '</tbody>

                                            </table>

                                        </div>

                                    </div>
                                 </div>
                             </article>
                        </div>';


$arr[] = array('outputt' => "$output" ,'output1' => "$output1");

echo json_encode($arr);