<?php
$id = $_GET['id'];

?>
<?php
include 'header.php';
?>
<style type="text/css">

    .logo-table {
        width: 220px;
        height: 50px;
    }

    #map {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 450px;
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
                                .map_canvas
                                {
                                    width: 500px;
                                    height: 300px;
                                    margin: 10px 20px 10px 0;
                                }
                            </style>

                            <div class="widget-body">
                                <?php $latlng1 = DB::queryFirstRow("select * from delivery_info where id = '$id'"); ?>
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
                                        <div onclick="add_delivery_address_update('<?=$id?>','<?=$_SERVER['REQUEST_URI']?>')" class="btn btn-primary btn-lg">
                                            <i class="fa fa-save"></i>
                                            Submit
                                        </div>
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

?>
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
    function setSelectedShapeColor(color)
    {
        if (selectedShape)
        {
            if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE)
            {
                selectedShape.set('strokeColor', color);
            } else {
                selectedShape.set('fillColor', color);
            }
        }
    }
    function makeColorButton (color)
    {
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


        <?php $latlng = DB::query("select * from delivery_info_detail where delivery_info_id = '$id'");
        foreach($latlng as $latlngitude){

            $lat = $latlngitude['lat'];
            $lng = $latlngitude['lng'];
        }?>
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: new google.maps.LatLng(<?=$lat?>, <?=$lng?>),
        });
        var triangleCoords = [
            <?php

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
