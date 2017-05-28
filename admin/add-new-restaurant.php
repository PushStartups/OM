<?php
include "header.php";
?>

<script>

    var Cropper;
    var container;
    var image;
    var cropper;


    window.onload = function () {

        'use strict';
        // document.getElementById('myform').style.display = 'block';
        // document.getElementById('cropper').style.display = 'none';
        Cropper = window.Cropper;
        container = document.querySelector('.img-container');
        image = container.getElementsByTagName('img').item(0);
        var download = document.getElementById('download');
        var actions = document.getElementById('actions');

        var options = {
            aspectRatio: "1/1",
            preview: '.img-preview',
            ready: function (e) {
                console.log(e.type);

            },
            cropstart: function (e) {
                console.log(e.type, e.detail.action);
            },
            cropmove: function (e) {
                console.log(e.type, e.detail.action);
            },
            cropend: function (e) {
                console.log(e.type, e.detail.action);
            },


            crop: function (e) {
                var data = e.detail;

                console.log(e.type);

            },
            zoom: function (e) {
                console.log(e.type, e.detail.ratio);
            }
        };




        cropper = new Cropper(image, options);

        // Tooltip
        $('[data-toggle="tooltip"]').tooltip();


        // Buttons
        if (!document.createElement('canvas').getContext) {
            $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
        }

        if (typeof document.createElement('cropper').style.transition === 'undefined') {
            $('button[data-method="rotate"]').prop('disabled', true);
            $('button[data-method="scale"]').prop('disabled', true);
        }


        if (typeof download.download === 'undefined') {
            download.className += ' disabled';
        }




        // Options
        actions.querySelector('.docs-toggles').onclick = function (event)
        {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            var cropBoxData;
            var canvasData;
            var isCheckbox;
            var isRadio;

            if (!cropper) {
                return;
            }

            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentNode;
            }

            if (target.tagName.toLowerCase() === 'label') {
                target = target.getElementsByTagName('input').item(0);
            }

            isCheckbox = target.type === 'checkbox';
            isRadio = target.type === 'radio';

            if (isCheckbox || isRadio)
            {
                if (isCheckbox)
                {
                    options[target.name] = target.checked;
                    cropBoxData = cropper.getCropBoxData();
                    canvasData = cropper.getCanvasData();

                    options.ready = function () {
                        console.log('ready');
                        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                    };
                }
                else
                {
                    options[target.name] = target.value;
                    options.ready = function () {
                        console.log('ready');
                    };
                }

                // Restart
                cropper.destroy();
                cropper = new Cropper(image, options);
            }
        };



        // Methods

        actions.querySelector('.docs-buttons').onclick = function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            var result;
            var input;
            var data;

            if (!cropper) {
                return;
            }

            while (target !== this) {
                if (target.getAttribute('data-method')) {
                    break;
                }

                target = target.parentNode;
            }

            if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
                return;
            }

            data = {
                method: target.getAttribute('data-method'),
                target: target.getAttribute('data-target'),
                option: target.getAttribute('data-option'),
                secondOption: target.getAttribute('data-second-option')
            };

            if (data.method) {
                if (typeof data.target !== 'undefined') {
                    input = document.querySelector(data.target);

                    if (!target.hasAttribute('data-option') && data.target && input) {
                        try {
                            data.option = JSON.parse(input.value);
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }

                if (data.method === 'getCroppedCanvas') {

                    data.option = JSON.parse(data.option);
                }

                result = cropper[data.method](data.option, data.secondOption);

                switch (data.method) {
                    case 'scaleX':
                    case 'scaleY':
                        target.setAttribute('data-option', -data.option);
                        break;

                    case 'getCroppedCanvas':
                        if (result)
                        {
                            LoadImageFromCropper(result.toDataURL('image/jpeg'));
                        }

                        break;

                    case 'destroy':
                        cropper = null;
                        break;
                }

                if (typeof result === 'object' && result !== cropper && input) {
                    try {
                        input.value = JSON.stringify(result);
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        };

        document.body.onkeydown = function (event) {
            var e = event || window.event;

            if (!cropper || this.scrollTop > 300) {
                return;
            }

            switch (e.keyCode) {
                case 37:
                    e.preventDefault();
                    cropper.move(-1, 0);
                    break;

                case 38:
                    e.preventDefault();
                    cropper.move(0, -1);
                    break;

                case 39:
                    e.preventDefault();
                    cropper.move(1, 0);
                    break;

                case 40:
                    e.preventDefault();
                    cropper.move(0, 1);
                    break;
            }
        };




        google.maps.event.trigger(map, 'resize');
        map.setCenter(myLatLng);

    };


</script>
<div id="main" role="main">

    <!-- MAIN CONTENT -->
    <div id="content">
        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-cutlery "></i> Add A Restaurant</h1>
            </div>

        </div>
        <!-- end row -->
        <!--
        The ID "widget-grid" will start to initialize all widgets below
        You do not need to use widgets if you dont want to. Simply remove
        the <section></section> and you can use wells or panels instead  -->

        <div id="cropper"  style="display: none">



            <div class="container">
                <div class="row">
                    <div class="col-md-9">
                        <!-- <h3 class="page-header">Demo:</h3> -->
                        <div  style=" margin-top: 30px" class="img-container">
                            <img src="" alt="Picture">
                        </div>
                    </div>

                    <div class="row" id="actions">

                        <div class="col-md-9 docs-buttons">

                            <div class="btn-group btn-group-crop">

                                <div id="b256" style="display: none; margin-left: 10px">
                                    <p><b>* Upload Image :</b></p><label class="btn btn-primary ">
                                        <input type="radio" value="1" class="sr-only" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 256, &quot;height&quot;: 256 }">
									    <span class="docs-tooltip" data-toggle="tooltip" title="">
                                            256&times;256 Save
                                        </span>
                                    </label><br/>
                                </div>

                            </div>




                            <div>
                                <!--       Show the cropped image in modal-->
                                <div class="modal fade docs-cropped" id="getCroppedCanvasModal" role="dialog" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="getCroppedCanvasTitle">Cropped</h4>
                                            </div>
                                            <div class="modal-body"></div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <a class="btn btn-primary" id="download" href="javascript:void(0);" download="cropped.jpg">Download</a>
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- /.modal

						</div><!-- /.docs-buttons -->

                                <div class="col-md-3 docs-toggles">

                                </div><!-- /.docs-toggles -->
                            </div>
                        </div>

                        <!-- Footer -->
                        <footer class="docs-footer">
                            <div class="container">
                                <p class="heart"></p>
                            </div>
                        </footer>

                        <!-- Scripts -->
                        <script src="js/custom/tether.min.js"></script>
                        <!--                        <script src="assets/js/bootstrap.min.js"></script>-->
                        <script src="js/custom/cropper.js"></script>
                        <!--<script src="js/main.js"></script>-->

                    </div>

                </div>

            </div>
        </div>







        <!-- widget grid -->
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

                                    <form>
                                        <fieldset>
                                            <input name="authenticity_token" type="hidden">

                                            <input id="path1" name="editorImagePath1" type = "hidden" >
<!--                                            <div class="form-group">-->
<!--                                                <label>Restaurant Logo</label>-->
<!--                                                <input class="form-control" name="logo1" id="file" onchange="readURL(this,1);"  type="file">-->
<!--                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="logo_error"></span>-->
<!--                                                <img style="display:block" id="new_image1" src="#" alt="" width="256" height="256" />-->
<!--                                            </div>-->
                                            <div class="form-group">
                                                <label>Restaurant Name</label>
                                                <input class="form-control" id="name_en" name="name_en" placeholder="Enter Restaurant" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">שם המסעדה</label>
                                                <input style="direction:RTL;" class="form-control" id="name_he" name="name_he" placeholder="שם המסעדה" type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="name_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Contact</label>
                                                <input class="form-control" id="contact" name="contact" placeholder="Enter Contact" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="contact_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Minimum Amount</label>
                                                <input class="form-control" id="min_amount" name="min_amount" placeholder="Enter Amount" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="min_amount_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Sort</label>
                                                <input class="form-control" id="sort" name="sort" placeholder="Sorting" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="sort_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Pickup</label>
                                                <select id="pickup_hide" name="pickup_hide" class="form-control">
                                                    <option value="1" selected>Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>City </label>
                                                <select id="city" name="city" class="form-control">
                                                    <?php $city = getAllCities();
                                                    foreach($city as $cities)
                                                    { ?>
                                                        <option value = <?=$cities['id']?>><?=$cities['name_en']?></option>
                                                        <?php
                                                    }
                                                    ?>

                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label> Coming Soon </label>
                                                <select id="coming_soon" name="coming_soon" class="form-control">
                                                    <option value="0" selected>Off</option>
                                                    <option value="1">On</option>

                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Restaurant Hide / Show </label>
                                                <select id="hide" name="hide" class="form-control">
                                                    <option value="0" selected>Show</option>
                                                    <option value="1">Hide</option>

                                                </select>
                                                <span style="font-size: 14px; color: red; width: 100%; padding: 9px;text-transform: none;"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Description </label>
                                                <textarea class="form-control" id="description_en" name="description_en" placeholder="Enter Description" type="text"></textarea>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="description_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">תיאור </label>
                                                <textarea style="direction:RTL;" class="form-control" id="description_he" name="description_he" placeholder="הזן תיאור בעברית" type="text"></textarea>
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="description_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Address </label>
                                                <input class="form-control" id="address_en" name="address_en" placeholder="Enter Address in English" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="address_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">כתובת </label>
                                                <input style="direction:RTL;" class="form-control" id="address_he" name="address_he" placeholder="הזן כתובת בעברית" type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="address_he_error"></span>
                                            </div>

                                            <div class="form-group">
                                                <label>Hechsher </label>
                                                <input class="form-control" id="hechsher_en" name="hechsher_en" placeholder="Enter Hechsher" type="text">
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="hechsher_en_error"></span>
                                            </div>
                                            <div class="form-group">
                                                <label dir="rtl">הכשרת </label>
                                                <input style="direction:RTL;" class="form-control" id="hechsher_he" name="hechsher_he" placeholder="הזן הכשרת" type="text">
                                                <span style="direction:RTL;font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="hechsher_he_error"></span>
                                            </div>


                                            <br>


                                        </fieldset>
                                        <div class="form-actions">
                                            <div onclick="add_restaurant()" class="btn btn-primary btn-lg">
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



<script type="text/javascript">

    globalVal = 0;
    var scroll_position ;


    $("#new_image1").hide();
    $("#new_image2").hide();
    $("#new_image3").hide();
    $("#new_image4").hide();

    function readURL(input,val)
    {

        globalVal = val;

        if(val == 1) {

            $("#new_image1").show();

        }


        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                if(val == 1) {
                    $('#new_image1').attr('src', e.target.result);
                }

            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    var _URL = window.URL || window.webkitURL;

    $("#file").change(function(e) {
        var file, img;


        if ((file = this.files[0])) {

            img = new Image();
            img.onload = function() {


                $("#new_image1").hide();

                // alert(this.width + " " + this.height);
                $(function () {

                    toDataUrl(img.src, function(base64Img) {



                        var options =
                        {
                            aspectRatio: 1 / 1,
                            preview: '.img-preview',
                            ready: function (e) {
                                console.log(e.type);

                            },
                            cropstart: function (e) {
                                console.log(e.type, e.detail.action);
                            },
                            cropmove: function (e) {
                                console.log(e.type, e.detail.action);
                            },
                            cropend: function (e) {
                                console.log(e.type, e.detail.action);
                            },


                            crop: function (e) {
                                var data = e.detail;

                                console.log(e.type);

                            },
                            zoom: function (e) {
                                console.log(e.type, e.detail.ratio);
                            }
                        };


                        scroll_position = document.body.scrollTop;
                        $("#myform").hide();
                        $("#cropper").show();
                        $("#b256").show();
                       // document.getElementById('myform').style.display = 'none';
                       // document.getElementById('cropper').style.display = 'block';
                       // document.getElementById('b256').style.display = '';


                        cropper.destroy();
                        cropper = new Cropper(image, options);
                        cropper.reset().replace(base64Img);
                        window.scrollTo(0,0);


                    });



                });

            };
            img.onerror = function() {
                alert( "not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }

    });

    function toDataUrl(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    }
    function LoadImageFromCropper(data) {

        if (globalVal == 1) {


            $('#new_image1').attr('src', data);
            $("#new_image1").show();

            document.getElementById("path1").value = data;
            document.getElementById('myform').style.display = '';
            document.getElementById('cropper').style.display = 'none';
            document.getElementById('b256').style.display = 'none';

            $("#myform").show();
            $("#cropper").hide();
            $("#b256").hide();

            window.scrollTo(0, scroll_position);

        }
    }

</script>

<script  type = "text/javascript">

    function LoadModalDiv()
    {

        var bcgDiv = document.getElementById("divBackground");

        bcgDiv.style.display="block";

    }

    function HideModalDiv()

    {

        var bcgDiv = document.getElementById("divBackground");

        bcgDiv.style.display="none";

    }

</script>
<div id="divBackground" style="position: fixed; z-index: 999; height: 100%; width: 100%;
        top: 0; left:0; background-color: Black; filter: alpha(opacity=60); opacity: 0.6; -moz-opacity: 0.8;display:none">
</div>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
