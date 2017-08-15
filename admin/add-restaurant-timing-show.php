<?php
include "header.php";


if(isset($_SESSION['map_restaurant_id']))
{
    $restaurant_id = $_SESSION['map_restaurant_id'];

    $timings = getAllTimings($restaurant_id);

    $count = 1;
    $week1[] ="";
    $week2[] ="";
    $week3[] ="";
    $week4[] ="";
    $week5[] ="";
    $week6[] ="";
    $week7[] ="";

    foreach ($timings as $time)
    {
        if($count == 1)
        {
            $week1['id']                    =  $time['id'];
            $week1['opening_time']          =   $time['opening_time'];
            $week1['closing_time']          =   $time['closing_time'];
        }
        if($count == 2)
        {
            $week2['id']                    =  $time['id'];
            $week2['opening_time']          =   $time['opening_time'];
            $week2['closing_time']          =   $time['closing_time'];
        }
        if($count == 3)
        {
            $week3['id']                    =   $time['id'];
            $week3['opening_time']          =   $time['opening_time'];
            $week3['closing_time']          =   $time['closing_time'];
        }
        if($count == 4)
        {
            $week4['id']                    =   $time['id'];
            $week4['opening_time']          =   $time['opening_time'];
            $week4['closing_time']          =   $time['closing_time'];
        }
        if($count == 5)
        {
            $week5['id']                    =  $time['id'];
            $week5['opening_time']          =   $time['opening_time'];
            $week5['closing_time']          =   $time['closing_time'];
        }
        if($count == 6)
        {
            $week6['id']                    =  $time['id'];
            $week6['opening_time']          =   $time['opening_time'];
            $week6['closing_time']          =   $time['closing_time'];
        }
        if($count == 7)
        {
            $week7['id']                    =  $time['id'];
            $week7['opening_time']          =   $time['opening_time'];
            $week7['closing_time']          =   $time['closing_time'];
        }
        $count++;

    }


    $delivery_address = getAllDeliveryAddress($restaurant_id);


}
else
{
    header("location:logout.php");
}





?>

<style type="text/css">

    .logo-table {
        width: 220px;
        height: 50px;
    }

    #map {
        padding: 0;
        margin: 0;
        width: 450px;
        height: 350px;
    }

    #panel {
        width: 200px;
        font-family: Arial, sans-serif;
        font-size: 13px;
        float: right;
        margin: 10px;
    }
    #color-palette {
        clear: both;
    }
    .color-button {
        width: 14px;
        height: 14px;
        font-size: 0;
        margin: 2px;
        float: left;
        cursor: pointer;
    }
    #delete-button {
        margin-top: 5px;
    }

</style>

<div id="main" role="main">

    <!-- MAIN CONTENT -->
    <div id="content">
        <!-- row -->
        <div class="row">

            <!-- col -->
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-clock-o"></i> Add Restaurant Timings</h1>
            </div>

        </div>

        <!-- widget grid -->

        <section id="widget-grid">

            <div class="row">
                <!-- NEW WIDGET START -->
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div class="jarviswidget jarviswidget-color-darken" id="wid-id-0" data-widget-editbutton="false">

                        <header>
                            <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                            <h2>Restaurants Timing</h2>
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

                                <form method="post">

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
                                                    <input type="text" id="sunday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week1['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week1['id']; ?>" id="week1_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>

                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_sunday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="sunday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week1['closing_time'];?>">
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
                                                    <input type="text" id="monday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week2['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week2['id']; ?>" id="week2_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_monday_start_time"></span>

                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="monday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week2['closing_time'];?>">
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
                                                    <input type="text" id="tuesday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week3['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week3['id']; ?>" id="week3_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_tuesday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="tuesday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week3['closing_time'];?>">
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
                                                    <input type="text" id="wednesday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week4['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week4['id']; ?>" id="week4_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_wednesday_start_time"></span>

                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="wednesday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week4['closing_time'];?>">
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
                                                    <input type="text" id="thursday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week5['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week5['id']; ?>" id="week5_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_thursday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="thursday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week5['closing_time'];?>">
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
                                                    <input type="text" id="friday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week6['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week6['id']; ?>" id="week6_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_friday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="friday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week6['closing_time'];?>">
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
                                                    <input type="text" id="saturday_start_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week7['opening_time'];?>">
                                                    <input type="hidden" value="<?php echo $week7['id']; ?>" id="week7_id"/>
                                                    <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-time"></span>
                                                            </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_saturday_start_time"></span>
                                            </td>
                                            <td>
                                                <div class="input-group form-group clockpicker">
                                                    <input type="text" id="saturday_end_time" class="form-control" placeholder="Select Time"
                                                           value="<?php echo $week7['closing_time'];?>">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-time"></span>
                                                        </span>
                                                </div>
                                                <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="error_saturday_end_time"></span>
                                            </td>
                                        </tr>

                                        </tbody>

                                    </table>


                                    <?php if ($rolee == 1) {?>
                                        <div class="form-actions">
                                            <div onclick="add_timing('<?=$restaurant_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                                <i class="fa fa-save"></i>
                                                Submit
                                            </div>
                                        </div>
                                    <?php } ?>
                                </form>
                                <!--   RESTAURANT DELIVERY ADDRESS AND FEES-->

                            </div>

                        </div>

                    </div>
                </article>

            </div>


            <div class="row">

                <!-- col -->
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                    <h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-truck"></i>  Delivery Address</h1>
                </div>

            </div>


            <div class="row">
                <!-- NEW WIDGET START -->
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div id="add-delivery-address" >
                        <div  class="jarviswidget jarviswidget-color-darken" id="wid-id-3" data-widget-editbutton="false">
                            <div>
                                <!-- widget edit box -->
                                <div class="jarviswidget-editbox">
                                    <!-- This area used as dropdown edit box -->

                                </div>

                                <!-- end widget edit box -->
                                <?php $latlng1 = DB::queryFirstRow("select * from delivery_info where restaurant_id = '$restaurant_id'"); ?>
                                <form method="post">
                                    <fieldset><br>


                                        <div style="height:100%; width:100%;">
                                            <div id="color-palette"></div><br>
                                            <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="map_error"></span>
                                            <div>
                                                <!--                                            <button id="delete-button">Delete Selected Shape</button>-->
                                            </div>
                                            <div id="map"></div>
                                        </div>
                                        <br>
                                        <div class="form-group">
                                            <label>Delivery Zone</label>
                                            <input class="form-control" id="delivery_zone" value="<?=$latlng1['area_name_en'] ?>"  name="delivery_zone" placeholder="Enter Delivery Zone" type="text">
                                            <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="area_en_error"></span>
                                        </div>

                                        <div class="form-group">
                                            <label>Delivery Zone</label>
                                            <input style="direction: rtl" class="form-control" value="<?=$latlng1['area_name_he'] ?>" id="delivery_zone_he" name="delivery_zone_he" placeholder="Enter Delivery Zone" type="text">
                                            <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="area_he_error"></span>
                                        </div>


                                        <div class="form-group">
                                            <label>Fees</label>
                                            <input class="form-control" id="fee" value="<?=$latlng1['fee'] ?>" name="fee" placeholder="Enter Fees" type="text">
                                            <span style="font-size: 14px; color: red; width: 100%;text-align: left; padding: 9px;text-transform: none;" id="fee_error"></span>
                                        </div>
                                        <input type="hidden" id="pathh" value="" />
                                    </fieldset>
                                    <div class="form-actions">
                                        <div onclick="add_delivery_address_update('<?=$restaurant_id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                            <i class="fa fa-save"></i>
                                            Submit
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </article>

            </div><br>
            <div class="row">
                <!-- NEW WIDGET START -->
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false">

                        <header>
                            <span class="widget-icon"> <i class="fa fa-building"></i> </span>
                            <h2>Cities </h2>
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
                                        <th >Area Name</th>
                                        <th >Area Name He</th>
                                        <th >Fee</th>
                                        <th >View Map</th>

                                    </tr>
                                    </thead>

                                    <tbody>
                                    <?php
                                    $info     =  DB::query("select * from delivery_info where restaurant_id = '$restaurant_id'");
                                    foreach ($info  as $infoo)
                                    {
                                        ?>
                                        <tr>
                                            <td><?=$infoo['area_name_en']?></td>
                                            <td><?=$infoo['area_name_he']?></td>
                                            <td><?=$infoo['fee']?></td>
                                            <td><a href="view-map.php?id=<?=$infoo['id']?>"><button class="btn btn-labeled btn-primary bg-color-blueDark txt-color-white add" style="border-color: #4c4f53;"><i class="fa fa-fw fa-info"></i> View Map </button></a></td>
                                            
                                        </tr>
                                        <?php
                                    } ?>
                                    </tbody>

                                </table>

                            </div>
                            <!-- end widget content -->

                        </div>
                        <!-- end widget div -->

                    </div>
                    <!-- end widget -->

                </article>

            </div><br>

        </section>

        <!-- end widget grid -->
    </div>
    <!-- END MAIN CONTENT -->
</div>

</div>
<script>
    google.maps.event.addDomListener(window, 'load', initialize);
    var drawingManager;
    var selectedShape;
    var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
    var selectedColor;
    var pathli = [];
    //var pathh = [];
    var colorButtons = {};

    var bermudaTriangle;

    function clearSelection () {

        if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null;
        }
    }
    function setSelection (shape) {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
        selectColor(shape.get('fillColor') || shape.get('strokeColor'));
    }
    function deleteSelectedShape () {
        if (selectedShape) {
            selectedShape.setMap(null);
        }
    }
    function selectColor (color)
    {
        selectedColor = color;
        for (var i = 0; i < colors.length; ++i) {
            var currColor = colors[i];
            colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
        }

        var polygonOptions = drawingManager.get('polygonOptions');
        polygonOptions.fillColor = color;
        drawingManager.set('polygonOptions', polygonOptions);
    }
    function setSelectedShapeColor (color) {
        if (selectedShape) {
            if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                selectedShape.set('strokeColor', color);
            } else {
                selectedShape.set('fillColor', color);
            }
        }
    }
    function makeColorButton (color) {
        var button = document.createElement('span');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        google.maps.event.addDomListener(button, 'click', function () {
            selectColor(color);
            setSelectedShapeColor(color);
        });
        return button;
    }
    function buildColorPalette () {
        var colorPalette = document.getElementById('color-palette');
        for (var i = 0; i < colors.length; ++i) {
            var currColor = colors[i];
            var colorButton = makeColorButton(currColor);
            colorPalette.appendChild(colorButton);
            colorButtons[currColor] = colorButton;
        }
        selectColor(colors[0]);
    }
    function initialize() {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: new google.maps.LatLng(31.5546, 74.3572),
        });
        var triangleCoords = [
        <?php
        $latlng = DB::query("select * from delivery_info where restaurant_id = '$restaurant_id'");
        foreach($latlng as $latlngitude){
        ?>

            {lat:<?=$latlngitude['lat']?>, lng: <?=$latlngitude['lng']?>},

        <?php } ?>
        ];

        // Construct the polygon.
         bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);

        var polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            editable: true,
            draggable: true
        };
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControlOptions: {
                drawingModes: [ 'polygon']
            },
            polygonOptions: polyOptions,
            map: map
        });
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {

            if (e.type !== google.maps.drawing.OverlayType.MARKER)
            {
                // Switch back to non-drawing mode after drawing a shape.
                drawingManager.setDrawingMode(null);
                // Add an event listener that selects the newly-drawn shape when the user
                // mouses down on it.
                var newShape  = e.overlay;
                newShape.type = e.type;

                var len = newShape.getPath().getLength();

               var pathh = []; alert(len);
                for (var i = 0; i < len; i++)
                {
                    alert(i);

                    var xy = newShape.getPath().getAt(i);

                    pathh.push(xy.lat()+','+xy.lng()+'<br>');

                }
                //alert(pathh);
                document.getElementById('pathh').value = pathh;
                //bermudaTriangle.setMap(null);
                //bermudaTriangle = "";



                google.maps.event.addListener(newShape, "dragend", function(e){
                    //alert("drag");
                    var len = newShape.getPath().getLength();
                    pathh = [];
                    alert(len);
                    var htmlStr = "";
                    for (var i = 0; i < len; i++)
                    {
                        var xy = newShape.getPath().getAt(i);
                        pathh.push(xy.lat()+','+xy.lng());

                    }

                });


                google.maps.event.addListener(newShape, 'click', function (e) {
                    if (e.vertex !== undefined) {
                        if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
                            alert("polygon");
                            var path = newShape.getPaths().getAt(e.path);

                            path.removeAt(e.vertex);
                            if (path.length < 3) {
                                newShape.setMap(null);
                            }
                        }
                        if (newShape.type === google.maps.drawing.OverlayType.POLYLINE) {
                            alert("polyline");
                            var path = newShape.getPath();
                            path.removeAt(e.vertex);
                            if (path.length < 2) {
                                newShape.setMap(null);
                            }
                        }
                    }
                    setSelection(newShape);
                });
                setSelection(newShape);
            }
        });
        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
        google.maps.event.addListener(map, 'click', clearSelection);
        google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
        buildColorPalette();
    }
</script>
<!-- END MAIN PANEL -->
<?php
include "footer.php";
?>
