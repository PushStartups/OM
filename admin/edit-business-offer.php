<?php
include "header.php";

if(isset($_GET['id']))
{
    $busines_id                 =    $_GET['id'];
    $business_id                    =    getSpecificBusinessOffer($busines_id);
    $cat_id = $business_id['category_id'];
    $categories  =  getSpecificCategories($cat_id);

foreach($categories as $category){

    $category_data_id = $category['id'];
    $category_data_name = $category['name_en'];

}


    $itemss  =  DB::query("select * from items where category_id = '$category_data_id' ");
}
else
{
    header("location:logout.php");
}
?>
<div id="main" role="main">

    <!-- MAIN CONTENT -->
    <div id="content">
        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-cutlery "></i> Update Business Offer</h1>
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

                                    <form id="my-form"  method="post" enctype="multipart/form-data">
                                        <fieldset>

                                            <div class="form-group">
                                               <h2>You are editing <?=$category_data_name;?> category</h2>
                                            </div>

                                            <div  id="item-div" class="form-group">
                                                <label> Select Item </label>
                                                <select id="business_item" name="business_item" class="form-control">
                                                    <option value="" disabled selected>Select Item</option>
                                                    <?php foreach($itemss as $items)
                                                    { ?>
                                                        <option value="<?=$items['id']?>"><?=$items['name_en']?></option>

                                                    <?php }
                                                    ?>


                                                </select>
                                            </div>



                                            <div id="week-day-div"  class="form-group">
                                                <label>Select Day</label>

                                                <select id="day" name="day" class="form-control">
                                                    <option value="<?=$business_id['week_day']?>" selected><?=$business_id['week_day']?></option>
                                                    <option value="Sunday">Sunday</option>
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                </select>
                                            </div>

                                            <div id="week-cycle-div" class="form-group">
                                                <label>Week Cycle</label>
                                                <select id="week_cycle" name="week_cycle" class="form-control">
                                                    <option value="<?=$business_id['week_cycle']?>" selected><?=$business_id['week_cycle']?></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>

                                                </select>
                                            </div>



                                            <br>

                                        </fieldset>
                                        <div id="business-offer-div" class="form-actions">
                                            <div onclick="edit_business_offer('<?=$busines_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Submit
                                            </div>
                                            <!--                                            <input type="submit" value="Submit" class="btn btn-primary btn-lg">-->
                                        </div>
                                    </form>                                </div>
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



<div id="divBackground" style="position: fixed; z-index: 999; height: 100%; width: 100%;
        top: 0; left:0; background-color: Black; filter: alpha(opacity=60); opacity: 0.6; -moz-opacity: 0.8;display:none">
</div>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
