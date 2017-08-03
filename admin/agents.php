<?php
include "header.php";

$rolee = $_SESSION['b2c_admin_role'];
?>
<div id="main" role="main">


    <!-- MAIN CONTENT -->
    <div id="content">

        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-user-secret "></i> Sales Agents</h1>
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

                    <div class="row" id="order_detail">
                        <div class="col-xs-4"></div>
                        <div class="col-xs-4" style="margin: 15px;">
                            <a href="b2cAgentReport.csv" download="b2cAgentReport.csv"  class="btn-lg btn-primary m-t-10" > Print CSV Report</a>
                        </div>
                        <div class="col-xs-4"></div>
                    </div>
                    <!-- Widget ID (each widget will need unique ID)-->
                    <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false">

                        <header>
                            <span class="widget-icon"> <i class="fa fa-building"></i> </span>
                            <h2>Agents </h2>
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
                                        <th >Agent</th>
                                        <th >Sales Count</th>

                                    </tr>
                                    </thead>

                                    <tbody>
                                    <?php  $file = fopen("b2cAgentReport.csv","w");
                                    $list = array
                                    (
                                        "ID,Agent Name,Sales Count"
                                    );
                                    foreach ($list as $line)
                                    {
                                        fputcsv($file,explode(',',$line));
                                    }
                                    ?>
                                    <?php
                                    DB::useDB('orderapp_user');
                                    $agent = DB::query("select * from agents");
                                    foreach ($agent as $agents)
                                    {
                                        $arr[] = "";
                                        ?>
                                        <tr>
                                            <td><?=$agents['id']?></td>
                                            <?php  $arr[0] = $agents['id'];  ?>


                                            <td><?=$agents['name']?></td>
                                            <?php  $arr[1] = $agents['name'];  ?>


                                            <td><?=$agents['sales_count']?></td>
                                            <?php  $arr[2] = $agents['sales_count'];  ?>

                                        </tr>
                                        <?php
                                        fputcsv($file,$arr);
                                    } fclose($file); ?>
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
