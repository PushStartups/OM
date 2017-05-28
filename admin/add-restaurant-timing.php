<?php
include "header.php";

if(isset($_GET['id']))
{
    $restaurant_id = $_GET['id'];

    $timings = getAllTimings($restaurant_id);
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
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-briefcase "></i> Add Restaurant Timings</h1>
            </div>

        </div>

        <!-- widget grid -->

        <section id="widget-grid"  id="myform">



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

                                <form>
                                    <table id="" class="table table-striped table-bordered" width="100%">

                                        <thead>

                                        <tr>
                                            <th data-class="expand">Day</th>

                                            <th >Start Time</th>

                                            <th>Close Time</th>

                                        </tr>
                                        </thead>

                                        <tbody>
                                        <?php

                                        foreach($timings as $timing) {

                                            ?>
                                            <tr>

                                                <td><?=$timing['week_en']?></td>

                                                <td>
                                                    <div class="input-group form-group clockpicker">
                                                        <input type="text" id="sunday_start_time" class="form-control" placeholder="Select Time" value="<?=$timing['opening_time']?>">
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                    </div>
                                                    <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_sunday_start_time"></span>
                                                </td>

                                                <td>
                                                    <div class="input-group form-group clockpicker">
                                                        <input type="text" id="sunday_end_time" class="form-control" placeholder="Select Time" value="<?=$timing['closing_time']?>">
                                                        <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                    </div>
                                                    <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_sunday_end_time"></span>

                                                </td>

                                            </tr>
                                        <?php  } ?>
                                        </tbody>

                                    </table>

                                    <table id="" class="table table-striped table-bordered" width="100%">

                                        <thead>

                                        <tr>
                                            <th data-class="expand">Day</th>

                                            <th >Start Time</th>

                                            <th>Close Time</th>

                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>
                                                Sunday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="sunday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>

                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_sunday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="sunday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>

                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_sunday_end_time"></span>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Monday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="monday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_monday_start_time"></span>

                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="monday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_monday_end_time"></span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Tuesday
                                            </td>
                                            <td>

                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="tuesday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_tuesday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="tuesday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_tuesday_end_time"></span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Wednesday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="wednesday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_wednesday_start_time"></span>

                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="wednesday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_wednesday_end_time"></span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Thursday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="thursday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_thursday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="thursday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_thursday_end_time"></span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Friday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="friday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_friday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="friday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_friday_end_time"></span>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Saturday
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="saturday_start_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_saturday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="saturday_end_time" class="form-control" placeholder="Select Time">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_saturday_end_time"></span>
                                            </td>
                                        </tr>

                                        </tbody>

                                    </table>



                                    <div class="form-actions">
                                        <div onclick="add_timing('<?=$restaurant_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                            <i class="fa fa-save"></i>
                                            Submit
                                        </div>
                                    </div>

                                </form>


                            </div>

                        </div>

                    </div>
                </article>

            </div>


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
