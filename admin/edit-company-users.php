<?php
include "header.php";

if(isset($_GET['id']))
{
    $user_id                 =    $_GET['id'];
    $users_id                    =    getSpecificCompanyUser($user_id);

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
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-cutlery "></i> Update Company Users</h1>
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

                                    <form method="post">
                                        <fieldset>

                                            <div class="form-group">
                                                <label>Name</label>
                                                <input class="form-control" id="name" name="name" value="<?=$users_id['name'];?>" placeholder="Enter Name" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Email</label>
                                                <input class="form-control" id="smooch_id" name="smooch_id" placeholder="Enter Email" value="<?=$users_id['smooch_id'];?>" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="email_error"></span>
                                            </div>



                                            <div class="form-group">
                                                <label>Contact</label>
                                                <input class="form-control" id="contact" name="contact" placeholder="Enter Contact" value="<?=$users_id['contact'];?>" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="contact_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Address</label>
                                                <input class="form-control" id="address" name="address" placeholder="Enter Address" value="<?=$users_id['address'];?>" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="address_error"></span>
                                            </div>

                                            <input type="hidden" name="user_id" id="user_id" value="<?=$user_id;?>"/>


                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="edit_company_user('<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Submit
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



<div id="divBackground" style="position: fixed; z-index: 999; height: 100%; width: 100%;
        top: 0; left:0; background-color: Black; filter: alpha(opacity=60); opacity: 0.6; -moz-opacity: 0.8;display:none">
</div>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
