<?php
include "header.php";

if(isset($_GET['id']))
{
    $busines_id                 =    $_GET['id'];
    $business_id                    =    getSpecificBusinessOffer($busines_id);
    $cat_id = $business_id['category_id'];
    $categories  =  getSpecificCategories($cat_id);

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

                                            <input type="text" value="<?=$business_id['category_id']?>"

                                            <div class="form-group">
                                                <label> Select Category </label>
                                                <select id="business_category" name="business_category" class="form-control" onchange="category_change(this.value)">
                                                    <option value="" disabled selected>Select Category</option>
                                                    <?php foreach($categories as $category)
                                                    { ?>
                                                        <option value="<?=$category['id']?>"><?=$category['name_en']?></option>

                                                    <?php }
                                                    ?>


                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div style="display:none" id="item-div" class="form-group">

                                            </div>

                                            <div id="week-day-div" style="display:none" class="form-group">
                                                <label>Select Day</label>
                                                <select id="day" name="day" class="form-control">
                                                    <option value="Sunday" selected>Sunday</option>
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                </select>
                                            </div>

                                            <div id="week-cycle-div" style="display:none" class="form-group">
                                                <label>Week Cycle</label>
                                                <select id="week_cycle" name="week_cycle" class="form-control">
                                                    <option value="1" selected>1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>

                                                </select>
                                            </div>



                                            <br>

                                        </fieldset>
                                        <div style="display:none" id="business-offer-div" class="form-actions">
                                            <div onclick="add_business_offer('<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
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
