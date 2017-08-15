<?php
include 'header.php';
?>
    <div id="main" role="main">

        <!-- MAIN CONTENT -->
        <div id="content">

            <!-- row -->
            <div class="row">

                <!-- col -->
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                    <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-briefcase "></i> Add Restaurants</h1>
                </div>
                <!-- end col -->

                <!-- right side of the page with the sparkline graphs -->
                <!-- col -->
               
                <!-- end col -->

            </div>
            <!-- end row -->

            <!--
            The ID "widget-grid" will start to initialize all widgets below
            You do not need to use widgets if you dont want to. Simply remove
            the <section></section> and you can use wells or panels instead  -->

            <!-- widget grid -->
            <section id="widget-grid" class="">
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
                                <style>
                                    .map_canvas {
                                        width: 500px;
                                        height: 300px;
                                        margin: 10px 20px 10px 0;
                                    }

                                </style>

                                <div class="widget-body">

                                    <form id="my-form"  method="post" enctype="multipart/form-data">
                                        <fieldset>
                                            <input name="authenticity_token" type="hidden">

                                            <input id="path1" name="editorImagePath1" type = "hidden" >

                                            <div class="form-group">
                                                <label>Select Restaurant </label>
                                                <select id="restaurant" name="restaurant" class="form-control" required>
                                                    <?php
                                                    $rest = DB::query("select * from restaurants");
                                                    foreach($rest as $r)
                                                    {
                                                    ?>
                                                    <option value="<?=$r['id']?>" ><?=$r['name_en']?></option>

                                                    <?php } ?>
                                                </select>

                                            </div>

                                            <div class="form-group">
                                                <label>Select City </label>
                                                <select id="city" name="city" class="form-control" required>
                                                    <?php
                                                    $cities = DB::query("select * from cities ");
                                                    foreach($cities as $city)
                                                    {
                                                        ?>
                                                        <option value="<?=$city['id']?>"><?=$city['name_en']?></option>

                                                    <?php } ?>
                                                </select>

                                            </div>



                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="add_restaurant_city()" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Submit
                                            </div>
                                            <!--                                            <input type="submit" value="Submit" class="btn btn-primary btn-lg">-->
                                        </div>
                                    </form>

                                </div>
                                <!-- end widget content -->
                            </div>
                            </div>

                    </article>
                    <!-- WIDGET END -->

                </div>

                <!-- end row -->

                <!-- row -->

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



<?php

include 'footer.php';
