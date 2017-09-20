<?php
include "header.php";

if(isset($_GET['id']))
{
    $ledger_id                 =    $_GET['id'];

}
else
{
    header("location:ledger.php");
}
?>
<div id="main" role="main">

    <!-- MAIN CONTENT -->
    <div id="content">
        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-cutlery "></i> Update Restaurant</h1>
            </div>

        </div>
        <div id="myform">
            <section id="widget-grid"  id="myform">
                <!-- row -->
                <div class="row">
                    <!-- NEW WIDGET START -->
                    <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                        <!-- Widget ID (each widget will need unique ID)-->

                        <div class="jarviswidget" id="wid-id-2" data-widget-colorbutton="false" data-widget-editbutton="false">

                            <header>
                            </header>

                            <div>

                                <div class="jarviswidget-editbox">
                                    <!-- This area used as dropdown edit box -->
                                </div>

                                <div class="widget-body">
                                    <?php $restaurant = DB::queryFirstRow("select * ledger where id = '$ledger_id'")  ?>
                                    <form  method="post" enctype="multipart/form-data">

                                        <fieldset>
                                            <input name="authenticity_token" type="hidden">

                                            <div class="form-group">
                                                <label>Payment Method</label>
                                                <select id="payment_method" name="payment_method" class="form-control">
                                                    <?php if($restaurant['payment_method'] == "CASH"){  ?>
                                                        <option value="CASH" selected>CASH</option>
                                                        <option value="Credit Card">Credit Card</option>
                                                    <?php } else { ?>
                                                        <option value="Credit Card" selected>Credit Card</option>
                                                        <option value="CASH">CASH</option>

                                                    <?php } ?>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Pickup Or Delivery</label>
                                                <select id="delivery_or_pickup" name="delivery_or_pickup" class="form-control">
                                                    <?php if($restaurant['delivery_or_pickup'] == "Delivery"){  ?>
                                                        <option value="Delivery" selected>Delivery</option>
                                                        <option value="Pick">Pick</option>
                                                    <?php } else { ?>
                                                        <option value="Pick" selected>Pick</option>
                                                        <option value="Delivery">Delivery</option>

                                                    <?php } ?>
                                                </select>
                                            </div>



                                            <div class="form-group">
                                                <label>Order No</label>
                                                <input class="form-control" id="order_no" name="order_no" value="<?=$restaurant['order_no']?>"  type="text">
                                            </div>

                                            <div class="form-group">
                                                <label>Balance</label>
                                                <input class="form-control" id="balance" name="balance" value="<?=$restaurant['balance']?>" type="text">

                                            </div>

                                            <div class="form-group">
                                                <label>Restaurant Total</label>
                                                <input class="form-control" id="restaurant_total" name="restaurant_total" value="<?=$restaurant['restaurant_total']?>" type="text">

                                            </div>

                                            <div class="form-group">
                                                <label>Restaurant Total</label>
                                                <input class="form-control" id="restaurant_total" name="restaurant_total" value="<?=$restaurant['restaurant_total']?>" type="text">

                                            </div>
                                            <div class="form-group">
                                                <label>Customer Grand Total</label>
                                                <input class="form-control" id="customer_grand_total" name="customer_grand_total" value="<?=$restaurant['customer_grand_total']?>" type="text">

                                            </div>

                                            <div class="form-group">
                                                <label>Customer Grand Total</label>
                                                <input class="form-control" id="customer_total_paid_to_restaurant" name="customer_total_paid_to_restaurant" value="<?=$restaurant['customer_total_paid_to_restaurant']?>" type="text">

                                            </div>




                                            <div class="form-group">
                                                <label>City </label>
                                                <select id="city" name="city" class="form-control">
                                                    <?php $city = getAllCities();
                                                    foreach($city as $cities)
                                                    {
                                                        if($restaurant['city_id'] == $cities['id']){
                                                            ?>

                                                            <option value ="<?=$cities['id']?>" selected><?=$cities['name_en']?></option>
                                                        <?php  } else{ ?>
                                                            <option value ="<?=$cities['id']?>"><?=$cities['name_en']?></option>
                                                        <?php }
                                                    }
                                                    ?>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label> Coming Soon </label>
                                                <select id="coming_soon" name="coming_soon" class="form-control">
                                                    <?php if($restaurant['coming_soon'] == 0){  ?>
                                                        <option value="0" selected>Off</option>
                                                        <option value="1">On</option>
                                                    <?php } else { ?>
                                                        <option value="1" selected>On</option>
                                                        <option value="0">Off</option>

                                                    <?php } ?>

                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Restaurant Hide / Show </label>
                                                <select id="hide" name="hide" class="form-control">
                                                    <?php if($restaurant['hide'] == 0){  ?>
                                                        <option value="0" selected>Show</option>
                                                        <option value="1">Hide</option>
                                                    <?php } else { ?>
                                                        <option value="1" selected>Hide</option>
                                                        <option value="0">Show</option>

                                                    <?php } ?>


                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>
                                            <style>
                                                .map_canvas {
                                                    width: 500px;
                                                    height: 300px;
                                                    margin: 10px 20px 10px 0;
                                                }

                                            </style>
                                            <div class="form-group">
                                                <label>Description </label>
                                                <textarea class="form-control" id="description_en" name="description_en" placeholder="Enter Description" type="text"><?=$restaurant['description_en']?></textarea>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="description_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">תיאור </label>
                                                <textarea style="direction:RTL;" class="form-control" id="description_he" name="description_he" placeholder="הזן תיאור בעברית" type="text"><?=$restaurant['description_he']?></textarea>
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="description_he_error"></span>
                                            </div>
                                            <div style="display:none" class="form-group">
                                                <div id="map" class="map_canvas"></div>
                                            </div>

                                            <div class="form-group">
                                                <label>Address </label>
                                                <input class="form-control" id="area_en" name="area_en" value="<?=$restaurant['address_en']?>" placeholder="Enter Address in English" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="address_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">כתובת </label>
                                                <input style="direction:RTL;" class="form-control" id="area_he" name="area_he" value="<?=$restaurant['address_he']?>" placeholder="הזן כתובת בעברית" type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="address_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Hechsher </label>
                                                <input class="form-control" id="hechsher_en" name="hechsher_en" value="<?=$restaurant['hechsher_en']?>"  placeholder="Enter Hechsher" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="hechsher_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">הכשרת </label>
                                                <input style="direction:RTL;" class="form-control" id="hechsher_he" value="<?=$restaurant['hechsher_he']?>" name="hechsher_he" placeholder="הזן הכשרת" type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="hechsher_he_error"></span>
                                            </div>
                                            <br>
                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="update_restaurant('<?=$restaurant_id?>')" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Update
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- end widget content -->
                            </div>
                            <!-- end widget div -->
                        </div>

                    </article>
                    <!-- WIDGET END -->
                </div>
                <div class="row">
                    <!-- a blank row to get started -->
                    <div class="col-sm-12">
                        <!-- your contents here -->
                    </div>

                </div>
                <!-- end row -->
            </section>
        </div>
        <!-- end widget grid -->
    </div>
    <!-- END MAIN CONTENT -->
</div>
<script>
    globalEditLogo = null;
    //alert(globalEditLogo);
    function previewEditFile() {

        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.onload = function (e) {

            $('#edit_logo1').attr('src', e.target.result);

        }

        reader.addEventListener("load", function () {

            globalEditLogo = reader.result;
            // alert(globalEditLogo);

        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
</script>


<div id="divBackground" style="position: fixed; z-index: 999; height: 100%; width: 100%;
        top: 0; left:0; background-color: Black; filter: alpha(opacity=60); opacity: 0.6; -moz-opacity: 0.8;display:none">
</div>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
