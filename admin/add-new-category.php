<?php
include "header.php";

if(isset($_GET['id']))
{
    $restaurant_id = $_GET['id'];
    $menu_id = getMenuId($restaurant_id);

    $categories = getAllCategories($menu_id);
}
else
{
    header("location:logout.php");
}
?>
<style>
    .logo-table {
        width: 220px;
        height: 50px;
    }
</style>
<div id="main" role="main">

    <!-- MAIN CONTENT -->
    <div id="content">
        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-briefcase "></i> Add A Category</h1>
            </div>

        </div>

        <!-- widget grid -->

        <section id="widget-grid"  id="myform">

            <!-- SHOW CATEGORIES-->
            <?php  if(!empty($categories)) { ?>
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
                                            <th data-class="expand"><i class="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"></i> Logo</th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-info text-muted hidden-md hidden-sm hidden-xs"></i> Name </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-info text-muted hidden-md hidden-sm hidden-xs"></i> שֵׁם </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-tags text-muted hidden-md hidden-sm hidden-xs"></i> Is Discount </th>
                                            <th data-hide="phone"><i class="fa-fw fa fa-plus text-muted hidden-md hidden-sm hidden-xs"></i> Add Items </th>
                                            <th data-hide="phone,tablet"><i class="fa fa-fw fa-edit txt-color-blue hidden-md hidden-sm hidden-xs"></i> Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <?php

                                        foreach($categories as $category) {

                                            ?>
                                            <tr>

                                                <td><?=$category['id']?></td>
                                                <td><img class="logo-table" src="<?=WEB_PATH.$category['image_url'] ?>"></td>
                                                <td><?=$category['name_en']?></td>
                                                <td><?=$category['name_he']?></td>
                                                <td><?=$category['is_discount']?></td>
                                                <td><a style="text-decoration: none" href="add-new-items.php?id=<?=$category['id']?>"><button class="btn btn-labeled btn-success  txt-color-white add" style="border-color: #4c4f53;"><i class="fa fa-fw fa-plus"></i> Add Items </button></a></td>

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

                                <div onclick="show_category_div()" class="btn btn-primary btn-lg">
                                    <i class="fa fa-plus"></i>
                                   Add Category
                                </div>
                                <br><br>
                                <div id="add-category" style="display: none">
                                    <form>
                                        <fieldset>
                                            <input name="authenticity_token" type="hidden">

                                            <input id="path1" name="editorImagePath1" type = "hidden" >

                                            <!--                                            <div class="form-group">-->
                                            <!--                                                <label>Category Mobile Logo</label>-->
                                            <!--                                                <input class="form-control" name="logo1" id="file" onchange="readURL(this,1);"  type="file">-->
                                            <!--                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="logo_error"></span>-->
                                            <!--                                                <img style="display:block" id="new_image1" src="#" alt="" width="256" height="256" />-->
                                            <!--                                            </div>-->

                                            <div class="form-group">
                                                <label>Category Name</label>
                                                <input class="form-control" id="name_en" name="name_en" placeholder="Enter Category" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">שם קטגוריה</label>
                                                <input style="direction:RTL;" class="form-control" id="name_he" name="name_he"  type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Discount</label>
                                                <select id="is_discount" name="is_discount" class="form-control">
                                                    <option value="0" selected>No</option>
                                                    <option value="1">Yes</option>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>


                                            <div class="form-group">
                                                <label>Business Offer</label>
                                                <select id="business_offer" name="business_offer" class="form-control">
                                                    <option value="0" selected>No</option>
                                                    <option value="1">Yes</option>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="add_new_category('<?=$menu_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
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
