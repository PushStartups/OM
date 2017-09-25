<?php
include "header.php";
?>
    <!-- MAIN PANEL -->
    <div id="main" role="main">


        <!-- MAIN CONTENT -->
        <div id="content">

            <!-- row -->
            <div class="row">

                <!-- col -->
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                    <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-motorcycle"></i>&nbsp;Delivery Groups</h1>
                </div>

                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                    <!-- sparks -->

                    <!-- end sparks -->
                </div>
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
                        <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false">

                            <header>
                                <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                                <h2>Delivery Groups </h2>
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

                                    <table id="datatable_fixed_column" class="table table-striped table-bordered" width="100%">

                                        <thead>

                                        <tr>
                                            <th data-class="expand">ID</th>
                                            <th >Delivery Team</th>
                                            <th data-hide="phone, tablet">City</th>
                                            <th data-hide="phone, tablet">Whatsapp Group Name</th>
                                            <th data-hide="phone, tablet">Balance</th>
                                            <th data-hide="phone,tablet">Comission</th>

                                        </tr>
                                        </thead>

                                        <tbody>
                                        <?php
                                        DB::query("set names utf8");
                                        DB::useDB('orderapp_b2b_b2c');
                                        $orders = DB::query("select * from delivery_groups");
                                        foreach ($orders as $order)
                                        {

                                            ?>
                                            <tr>
                                                <td><?=$order['id']?></td>

                                                <td><?=$order['delivery_team']?></td>

                                                <td><?=$order['city']?></td>

                                                <td><?=$order['whatsapp_group_name']?></td>

                                                <td><?=$order['balance']." NIS"?></td>

                                                <td><?=$order['comission']." NIS"?></td>

                                            </tr>
                                        <?php } ?>
                                        </tbody>

                                    </table>

                                </div>
                                <!-- end widget content -->

                            </div>
                            <!-- end widget div -->

                        </div>
                        <!-- end widget -->

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
    <!-- END MAIN PANEL -->
<?php
include "footer.php";
?>