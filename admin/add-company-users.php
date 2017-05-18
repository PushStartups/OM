<?php
include "header.php";
?>
<div id="main" role="main">
    <?php
    if(isset($_GET['companies_id']))
    {
        $companies_id = $_GET['companies_id'];
        $company_name = getCompanyName($companies_id);
        $users = getUsersOfSpecificCompany($companies_id);
    }
    ?>

    <!-- MAIN CONTENT -->
    <div id="content">

        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-briefcase "></i> <?=$company_name?> </h1>
            </div>
            <!-- end col -->

            <!-- right side of the page with the sparkline graphs -->
            <!-- col -->
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">

                <a onclick="add_user_tab()" style="float:right"  class="btn btn-lg bg-color-purple txt-color-white"><i class="fa-fw fa fa-plus "></i> Add New User</a>

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

                    <div style="display:none" class="jarviswidget" id="wid-id-2" data-widget-colorbutton="false" data-widget-editbutton="false">



                        <div>

                            <div class="widget-body">

                                <form  action="import-users.php" method="post"  enctype="multipart/form-data">
                                    <fieldset>
                                        <input name="authenticity_token" type="hidden">
                                        <div class="form-group">
                                            <label>B2B Users</label>
                                            <input class="form-control" id="file" name="file"  type="file" required>
                                            <input type="hidden" value="<?=$companies_id?>" name="company_id" id="company_id">
                                            <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error-name"></span>
                                        </div>
                                        *Please Download the sample CSV file. <a href="sample.csv" download>Click Here</a>
                                    </fieldset>
                                    <footer>
                                        <button name="Import" type="submit" class="btn btn-primary"  data-loading-text="Loading...">
                                            Import CSV File
                                        </button>

                                    </footer>

                                </form>
                            </div>
                        </div>
                    </div>


                    <?php if(!empty($users))
                    {  ?>
                        <!-- Widget ID (each widget will need unique ID)-->
                        <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false">

                            <header>
                                <span class="widget-icon"> <i class="fa fa-user"></i> </span>
                                <h2>B2B Users </h2>
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
                                            <th >Email</th>
                                            <th >Address</th>
                                            <th >Discount</th>
                                            <th >Contact</th>
                                            <th >Language</th>
<!--                                            <th>Delete</th>-->
                                        </tr>
                                        </thead>

                                        <tbody id="content">
                                        <?php

                                        foreach ($users as $user)
                                        {
                                            ?>
                                            <tr>
                                                <td><?=$user['id']?></td>
                                                <td><?=$user['smooch_id']?></td>
                                                <td><?=$user['address']?></td>
                                                <td><?=$user['discount']?></td>
                                                <td><?=$user['contact']?></td>
                                                <td><?=$user['language']?></td>
                                            </tr>
                                        <?php } ?>
                                        </tbody>

                                    </table>

                                </div>
                                <!-- end widget content -->

                            </div>
                            <!-- end widget div -->

                        </div>
                    <?php  } else { echo "<h2>No User Found In This Company</h2>"; } ?>
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
