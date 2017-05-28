<?php
include "header.php";

if(isset($_GET['id']))
{
    $category_id = $_GET['id'];
    $category_name = getCategoryName($category_id);
    $items = getItemsFromCategoryId($category_id);

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
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-briefcase "></i> Add Items</h1>
            </div>

        </div>

        <!-- widget grid -->

        <section id="widget-grid"  id="myform">

            <!-- SHOW CATEGORIES-->
            <?php  if(!empty($items)) { ?>
                <div class="row">
                    <!-- NEW WIDGET START -->
                    <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                        <div class="jarviswidget jarviswidget-color-darken" id="wid-id-0" data-widget-editbutton="false">

                            <header>
                                <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                                <h2>Restaurants</h2>
                            </header>

                            <!-- widget div-->
                            <div>

                                <!-- widget edit box -->
                                <div class="jarviswidget-editbox">
                                    <!-- This area used as dropdown edit box -->

                                </div>
                                <!-- end widget edit box -->

                                <!-- widget content -->
                                <div class="widget-body no-padding">
                                    <table id="dt_basic" class="table table-striped table-bordered table-hover" width="100%">
                                        <thead>
                                        <tr>
                                            <th data-hide="phone">ID</th>

                                            <th data-hide="phone"><i class="fa-fw fa fa-info text-muted hidden-md hidden-sm hidden-xs"></i> Name </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-info text-muted hidden-md hidden-sm hidden-xs"></i> שֵׁם </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-tags text-muted hidden-md hidden-sm hidden-xs"></i> Hide/Show </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-tags text-muted hidden-md hidden-sm hidden-xs"></i> Price </th>
                                            <th data-hide="phone,tablet"><i class="fa fa-fw fa-edit txt-color-blue hidden-md hidden-sm hidden-xs"></i> Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <?php

                                        foreach($items as $item) {
                                            ?>
                                            <tr>

                                                <td><?=$item['id']?></td>
                                                <td><?=$item['name_en']?></td>
                                                <td><?=$item['name_he']?></td>
                                                <td><?=$item['hide']?></td>
                                                <td><?=$item['price']?></td>
                                                <td><button class="btn btn-labeled btn-primary bg-color-blueDark txt-color-white add" style="border-color: #4c4f53;"><i class="fa fa-fw fa-edit"></i> Edit </button></td>
                                            </tr>
                                        <?php  } ?>

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </article>

                </div>
                <!-- SHOW CATEGORIES END-->
            <?php  } ?>

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

                                <div onclick="show_addons_div()" class="btn btn-primary btn-lg">
                                    <i class="fa fa-plus"></i>
                                    Add Choices & Addons
                                </div>
                                <br><br>
                                <div id="add-choices" style="display: none">
                                    <form>
                                        <fieldset>
                                            <input name="authenticity_token" type="hidden">

                                            <div class="form-group">
                                                <label>Name EN</label>
                                                <input class="form-control" id="name_en" name="name_en" placeholder="Enter Category" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">NAME HE</label>
                                                <input style="direction:RTL;" class="form-control" id="name_he" name="name_he"  type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Type</label>
                                                <select id="type" name="type" class="form-control">
                                                    <option value="0" selected>Multiple</option>
                                                    <option value="1">One</option>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Limit</label>
                                                <input class="form-control" id="limit" name="limit" placeholder="Enter Limit" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="price_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Price Replace</label>
                                                <select id="hide" name="hide" class="form-control">
                                                    <option value="0" selected>0</option>
                                                    <option value="1">1</option>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>


                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="add_new_item('<?=$category_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Submit
                                            </div>
                                        </div>
                                    </form>
                                </div>

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

        <!-- end widget grid -->
    </div>
    <!-- END MAIN CONTENT -->
</div>

</div>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
