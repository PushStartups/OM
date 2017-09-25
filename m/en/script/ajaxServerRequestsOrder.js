// GLOBAL VARIABLES
var userObject                  = null;                                           // MAIN USER OBJECT
var foodCartData                = [];                                             // DISPLAY DATA FOR FOOD CART
var result                      = null;                                           // SERVER RESPONSE RAW
var restName                    = null;                                           // SELECTED RESTAURANT NAME
var restId                      = null;                                           // SELECTED RESTAURANT ID
var currentCategoryId           = null;                                           // CURRENT SELECTED CATEGORY
var currentItemIndex            = null;                                           // CURRENT ITEM SELECTED
var oneTypeSubItems             = null;                                           // SUB-ITEMS TYPE ONE
var multipleTypeSubItems        = null;                                           // SUB-ITEMS TYPE MULTIPLE
var extras                      = null;                                           // EXTRAS FROM SERVER
var minOrderLimit               = null;                                           // MINIMUM ORDER LIMIT
var selectedRest                = null;
var selectedItemPriceOrg        = 0;
var selectedItemPrice           = 0;
var ignoreMinOrderLimit         = false;

var cash_pickup_from_link       = false;

var paymentReceived = false;


//SERVER HOST DETAIL
$( document ).ready(function() {

    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if(localStorage.getItem("USER_OBJECT") == undefined ||localStorage.getItem("USER_OBJECT") == "" || localStorage.getItem("USER_OBJECT") == null)
    {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '/m/en/index.html';

    }

    // RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));



    result                      = null;                                                          // SERVER RESPONSE RAW
    restName                    = userObject.restaurantTitle;                                    // SELECTED RESTAURANT NAME
    restId                      = userObject.restaurantId;                                       // SELECTED RESTAURANT ID
    currentCategoryId           = 0;                                                             // CURRENT SELECTED CATEGORY
    currentItemIndex            = 0;                                                             // CURRENT ITEM SELECTED
    oneTypeSubItems             = [];                                                            // SUB-ITEMS TYPE ONE
    multipleTypeSubItems        = [];                                                            // SUB-ITEMS TYPE MULTIPLE
    extras                      = null;                                                          // EXTRAS FROM SERVER
    minOrderLimit               = localStorage.getItem('min_order_amount');                      // MINIMUM ORDER LIMIT
    selectedRest                = JSON.parse(localStorage.getItem("SELECTED_REST"));             // MINIMUM ORDER LIMIT



    if(userObject.pickup_hide)
    {

        $('#order-pick-link').hide();
    }
    else {


        $('#order-pick-link').show();

    }





    if(localStorage.getItem("USER_SMOOCH_ID") != undefined && localStorage.getItem("USER_SMOOCH_ID") != "" && localStorage.getItem("USER_SMOOCH_ID") != null) {


        //  USER ALREADY LOGIN WELCOME USER

        LoginSuccessFullState();

    }
    else
    {
        if(localStorage.getItem("IS_LOGIN") != undefined && localStorage.getItem("IS_LOGIN") != "" && localStorage.getItem("IS_LOGIN") != null) {


            if(localStorage.getItem("IS_LOGIN") == 'true')
            {
                // DISPLAY LOGIN OPTION TO USER
                SignInDefault();
                userObject.smooch_id = '';

            }
        }

    }


    $('#checkbox-id213').prop('checked', true);
    $('#checkbox-id112').prop('checked', false);
    $('#delivery-info').show();


    if(userObject.pickup_hide == true)
    {
        $('#pickup_option').hide();
        $('#checkbox-id213').prop('checked', true);
        $('#delivery-info').show();

    }


    // SET RESTAURANT TITLE
    $('#rest-title').html(restName);


    // REQUEST SERVER GET CATEGORIES WITH ITEMS
    commonAjaxCall("/restapi/index.php/categories_with_items",{"restaurantId" :  restId },getCategoriesWithItems);

    infoPopup();

});



// GET ALL CATEGORIES WITH ITEMS FROM SERVER AGAINST RESTAURANT SELECTED
function  getCategoriesWithItems(response)
{
    // SET MIN ORDER LIMIT TO ERROR POPUP
    $('#min_order').html("The minimum order is "+minOrderLimit+" NIS");

    // UPDATE RESTAURANT TITLE
    $('#restName').text(restName);

    result = JSON.parse(response);

    var allCategoriesWithItems = "";

    for(var x=0 ;x <result.categories_items.length;x++)
    {

        allCategoriesWithItems += '<li >';
        allCategoriesWithItems += '<a class="opener">'+
            '<img src="'+result.categories_items[x].image_url+'" alt="images description">'+
            '<div class="text">'+
            '<h3>'+result.categories_items[x].name_en+'</h3>'+
            '</div>'+
            '</a>'+
            '<div class="slide">';


        for(var y=0;y<result.categories_items[x].items.length ; y++)
        {

            allCategoriesWithItems +=  '<div class="add-row"  onclick="onItemSelected('+x+','+y+')">'+
                '<h4>'+result.categories_items[x].items[y].name_en+'<span>'+result.categories_items[x].items[y].price+' NIS</span></h4>'+
                '<div class="box">'+
                '<a  href="#" class="btn-icon" data-toggle="modal" ><img src="/m/en/img/add.png" alt="images description"></a>'+
                '<p>'+result.categories_items[x].items[y].desc_en+'</p>'+
                '</div>'+
                '</div>';


        }

        allCategoriesWithItems += '</div>'+ '</li>';
    }



    $('#address-text').html(userObject.restaurantAddress);

    var temp = '<option value="-1">Select Area</option>';

    for(var x=0;x<selectedRest.delivery_fee.length;x++)
    {
        temp += '<option value="'+x+'">'+selectedRest.delivery_fee[x].area_en +' : Fee '+ selectedRest.delivery_fee[x].fee +'NIS</option>';
    }

    $('#delivery-areas').html(temp);



    // UPDATE ALL CATEGORIES

    $("#rest_categories_list").html(allCategoriesWithItems);

    initAccordion();
}


// RESTAURANT INFORMATION POPUP DATA RENDERING
function infoPopup() {


    // RENDERING DATA IN HEADER OF INFO POPUP
    var temp =  '<a class="btn-phone" href="#"><img src="/m/en/img/ic_phone.png"></a>'+
        '<div class="img-frame">'+
        '<a href="#"><img src="'+ selectedRest.logo +'" alt="logo-img"></a>'+
        '</div>'+
        '<h2>'+ selectedRest.name_en +'</h2>'+
        '<p>'+ selectedRest.address_en +'</p>'+
        '<span class="cart">Min '+ minOrderLimit +' NIS</span>'+
        '<div class="wrap">'+
        '<p>'+ selectedRest.description_en +'</p>'+
        '</div>'+
        '<img class="mobile-sec" src="/m/en/img/delivery line.png">';


    $('#info-popup-header').html(temp);

    // SET CONTACT INFO

    temp = '';

    var contact = userObject['restaurantContact'];

    temp += '<a class="btn-tel" href="tel:'+contact+'">'+contact+'</a>';

    $('#info-popup-contact').html(temp);


    // SET TIMINGS IN INFO POPUP
    temp = '';

    for (var i = 0 ; i < selectedRest.timings.length; i++)
    {

        temp += '<tr>'+
            '<td>'+ selectedRest.timings[i].week_en +'</td>'+
            '<td>'+ selectedRest.timings[i].opening_time + ' - ' + selectedRest.timings[i].closing_time +'</td>'+
            '</tr>';
    }

    $('#info-popup-timing').html(temp);



    // SET DELIVERY FEE IN INFO POPUP
    temp = '';

    for (i = 0; i < selectedRest.delivery_fee.length; i++)
    {
        temp += '<tr>'+
            '<td>'+ selectedRest.delivery_fee[i].area_en +'</td>'+
            '<td>'+ selectedRest.delivery_fee[i].fee +' NIS</td>'+
            '</tr>';
    }

    $('#info-popup-delivery-fee').html(temp);



    // SET GALLERY IMAGES IN INFO POPUP
    temp = '';

    for (i = 0 ; i < selectedRest.gallery.length; i++)
    {
        if (i == 0)
        {
            temp = '<div class="item active">';
        }
        else
        {
            temp += '<div class="item">';
        }

        temp += '<img src="'+ selectedRest.gallery[i].url +'" alt="Chania" width="50%">'+ '</div>';

    }

    $("#info-popup-gallery").html(temp);

}

// ON ITEM SELECTED BY USER
function onItemSelected (x,y)
{

    currentCategoryId     = x;
    currentItemIndex      = y;                         // SELECTED ITEM INDEX
    oneTypeSubItems       = [];                       // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE ONE (SINGLE SELECTION)
    multipleTypeSubItems  = [];                       // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE MULTIPLE (MULTIPLE SELECTION)
    itemPrice             = result.categories_items[currentCategoryId].items[currentItemIndex].price;


    // DISPLAY ITEM (PRODUCT) DETAIL CARD

    // UPDATE ITEM NAME
    $('#itemPopUpTitle').html(result.categories_items[currentCategoryId].items[currentItemIndex].name_en);

    var orderPopupHeader = '<div class="heading-wrap">'+
        '<h2>'+ result.categories_items[currentCategoryId].items[currentItemIndex].name_en +'</h2>'+
        '</div> '+
        '<p>'+ result.categories_items[currentCategoryId].items[currentItemIndex].desc_en +'</p>'+
        '</div>';


    $('#order-popup-header').html(orderPopupHeader);

    selectedItemPrice = result.categories_items[currentCategoryId].items[currentItemIndex].price;

    selectedItemPriceOrg = selectedItemPrice;


    $('#itemPriceOrderPopup').html(selectedItemPrice+' NIS');

    // UPDATE DESCRIPTION
    $('#itemPopUpDesc').html(result.categories_items[currentCategoryId].items[currentItemIndex].desc_en);

    // CALL SERVER GET SELECTED ITEM EXTRAS WITH SUB ITEMS
    commonAjaxCall("/restapi/index.php/extras_with_subitems", {"itemId" :  result.categories_items[currentCategoryId].items[currentItemIndex].id},onItemSelectedCallBack);
}



// ITEM SELECTED CALL BACK
function onItemSelectedCallBack(response)
{
    // SERVER RESPONSE
    extras  = JSON.parse(response);

    var oneTypeStr = "";

    var multipleTypeStr = "";
    var isOneExist = false;

    var first = true;

    // DISPLAY ALL AVAILABLE EXTRAS
    for(var x=0 ;x <extras.extra_with_subitems.length;x++)
    {
        // EXTRAS WITH TYPE ONE (SINGLE SELECTABLE)
        // DISPLAY IS DROP DOWN

        if(extras.extra_with_subitems[x].type == "One") {

            var temp    = "";
            var minSubItemName = "";
            var minPrice = 0;
            var minY = 0;
            isOneExist = true;

            for(var y=0;y<extras.extra_with_subitems[x].subitems.length;y++)
            {
                if (extras.extra_with_subitems[x].price_replace == 1)
                {
                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0) {

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+ oneTypeSubItems.length +',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  [' + extras.extra_with_subitems[x].subitems[y].price + '] </li>';
                    }
                    else
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+ oneTypeSubItems.length + ',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en +'</li>';
                    }

                    if (y ==0 || (convertFloat(extras.extra_with_subitems[x].subitems[y].price) < minPrice))
                    {
                        minPrice = extras.extra_with_subitems[x].subitems[y].price;
                        minSubItemName = extras.extra_with_subitems[x].subitems[y].name_en;
                        minY = y;
                    }
                }
                else
                {

                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0) {

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  [+' + extras.extra_with_subitems[x].subitems[y].price + '] </li>';
                    }
                    else
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en +'</li>';
                    }

                }
            }


            if(!first)
            {
                oneTypeStr += '<div style="height: 1px; width: 100%; background-color:#979797; margin-top: 19px;"></div>';
            }
            else
            {
                first = false;
            }


            oneTypeStr += '<h3>' + extras.extra_with_subitems[x].name_en + '</h3>'+
                '<div class="custom-drop-down" id="oneTypeDD'+oneTypeSubItems.length+'">'+
                '<input id="input'+oneTypeSubItems.length+'" placeholder="Please Select!"  value ="'+ minSubItemName +'" readonly />'+
                '<img style="width:13px; position:absolute; right:15px; top:50%; transform:translateY(-50%)" src="/m/en/img/drop_down.png">'+
                '<div class="custom-drop-down-list">'+
                '<ul>';

            oneTypeStr += temp;

            oneTypeStr += '</ul> </div></div><span class="red" id="error-one-type'+oneTypeSubItems.length+'"></span> </div>';




            if(minSubItemName ==  "")
            {
                // CREATE SUB ITEM DEFAULT OBJECT AND PUSH IN ONE TYPE ARRAY EMPTY AS DEFAULT
                // UPDATE VALUE FROM SUB ITEM SELECTION FROM DROP DOWN TYPE ONE
                var subItem = {};

                subItem[extras.extra_with_subitems[x].name_en] = null;
                oneTypeSubItems.push(subItem);
                isOneExist = true;
            }
            else
            {
                // SUB ITEM OBJECT

                var temp = {

                    "subItemId"       : extras.extra_with_subitems[x].subitems[minY].id,
                    "replace_price"   : extras.extra_with_subitems[x].price_replace,
                    "subItemPrice"    : extras.extra_with_subitems[x].subitems[minY].price,
                    "subItemName"     : extras.extra_with_subitems[x].subitems[minY].name_en,
                    "subItemNameHe"   : extras.extra_with_subitems[x].subitems[minY].name_he,
                    "qty"             : 1};   // QUANTITY OF SUB-ITEM BY DEFAULT 1


                var subItem = {};

                subItem[extras.extra_with_subitems[x].name_en] = temp;
                oneTypeSubItems.push(subItem);
            }

        }

        // EXTRAS WITH TYPE MULTIPLE (MULTIPLE SELECTABLE)
        // DISPLAY IS SERIES OF CHECK RADIO BOXES.

        else
        {

            if(extras.extra_with_subitems[x].subitems.length != 0)
            {
                var multiTypeItemSet = [];

                // SUB ITEMS WITH MULTIPLE SELECTABLE OPTIONS

                if(!first)
                {

                    multipleTypeStr += '<div style="height: 1px; width: 100%; background-color:#979797; margin-top: 19px;"></div>';
                }
                else
                {
                    first = false;
                }


                multipleTypeStr +=  '<h3>'+extras.extra_with_subitems[x].name_en+'</h3>' +
                    '<span id="error-'+x+'"  style=" color: red; display: block; text-align: left; margin-bottom: 16px;"></span>'+
                    '<ul id="subItems" class="checkbox-list">';


                for (var y = 0; y < extras.extra_with_subitems[x].subitems.length; y++)
                {
                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0)
                    {
                        // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                        multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' +multipleTypeSubItems.length+','+ x + ',' + y + ',' + multiTypeItemSet.length+',this)"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
                            ' <label for="checkbox-id-' + x.toString() + y.toString() + '">'
                            + extras.extra_with_subitems[x].subitems[y].name_en.capitalize()+" [+"+extras.extra_with_subitems[x].subitems[y].price+"]"+'</label></li>';
                    }
                    else
                    {
                        // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                        multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' +multipleTypeSubItems.length+','+ x + ',' + y + ',' + multiTypeItemSet.length+',this)"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
                            ' <label for="checkbox-id-' + x.toString() + y.toString() + '">'
                            + extras.extra_with_subitems[x].subitems[y].name_en.capitalize() + '</label></li>';
                    }


                    // CREATE SUB ITEM OBJECT FOR ALL SUB ITEMS AVAILABLE AND SAVE VALUE ON USER SELECTION
                    // DEFAULT VALUE IS NULL
                    // UPDATE VALUE FROM CHECK BOX SELECTION
                    var subItem = {};
                    subItem[extras.extra_with_subitems[x].subitems[y].name_en] = null;
                    multiTypeItemSet.push(subItem);

                }

                multipleTypeSubItems.push(multiTypeItemSet);

                multipleTypeStr += '</ul>';
                $('#parent_type_multiple').show();
            }
        }
    }

    if(isOneExist)
    {

        $('#parent_type_one').show();
        $('#parent_type_one').html(oneTypeStr);
    }
    else
    {
        $('#parent_type_one').hide();
    }


    $('#parent_type_multiple').html(multipleTypeStr);


    $('#order-popup').modal('show');

}




// ON ONE TYPE EXTRA SELECTED BY USER
function onOneTypeExtraSubItemSelected(extraIndex, subItemIndex, oneTypeIndex , e) {

    var index = '#input'+oneTypeIndex;
    var parent = '#oneTypeDD'+oneTypeIndex;

    $(index).val(e.innerHTML);


    // REMOVE ERROR MESSAGES ON SELECTION
    $(parent).removeClass("red-border-c");
    var error = '#error-one-type'+oneTypeIndex;
    $(error).html("");

    // SUB ITEM OBJECT

    var subItem = {

        "subItemId"       : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
        "replace_price"   : extras.extra_with_subitems[extraIndex].price_replace,
        "subItemPrice"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
        "subItemName"     : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
        "subItemNameHe"   : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_he,
        "qty"             : 1};   // QUANTITY OF SUB-ITEM BY DEFAULT 1

    // AS ONE TYPE EXTRA OVER RIDE TO EXISTING VALUE
    oneTypeSubItems[oneTypeIndex][extras.extra_with_subitems[extraIndex].name_en] =  subItem;

    updatedSelectedItemPrice();
}


// ON MULTIPLE TYPE EXTRA SELECTED
function onExtraSubItemSelected(ex,extraIndex, subItemIndex, index, e) {

    var id = '#checkbox-id-'+extraIndex+subItemIndex;

    var name = extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en;

    // IF CHECK BOX SET CHECKED ADD SUB ITEM

    if($(id).is(':checked'))
    {

        var limit = parseInt(extras.extra_with_subitems[extraIndex].limit);

        if(limit == 0) {


            // SUB ITEM OBJECT

            var subItem = {

                "subItemId": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
                "subItemPrice": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
                "subItemName": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
                "subItemNameHe": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_he,
                "qty": 1
            }; // QUANTITY OF SUB-ITEM BY DEFAULT 1


            multipleTypeSubItems[ex][index][name] = subItem;


        }
        else
        {

            var countSelectedItems = 0;

            for(var x =0;x<multipleTypeSubItems[ex].length;x++)
            {
                for (var key in multipleTypeSubItems[ex][x]) {

                    if (multipleTypeSubItems[ex][x][key] != null && multipleTypeSubItems[ex][x][key] != undefined) {
                        countSelectedItems++;
                    }
                }
            }

            if(countSelectedItems >= limit)
            {
                // alert("limit over");
                var errorId = "#error-"+extraIndex;

                $(errorId).html('The limit is ' + limit);

                $(id).prop('checked', false);

                setTimeout(function(){

                    var container = $('.box-frame.new'),
                        scrollTo = $(errorId);

                    // Or you can animate the scrolling:
                    container.animate({

                        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 30
                    },500)

                }, 300);

            }
            else {

                var subItem = {

                    "subItemId": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
                    "subItemPrice": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
                    "subItemName": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
                    "subItemNameHe": extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_he,
                    "qty": 1
                }; // QUANTITY OF SUB-ITEM BY DEFAULT 1


                multipleTypeSubItems[ex][index][name] = subItem;

            }

        }
    }

    // IF CHECK BOX NOT CHECKED REMOVE SUB ITEM

    else
    {
        multipleTypeSubItems[ex][index][name] = null;
        var errorId = "#error-"+extraIndex;
        $(errorId).html('');

    }

    updatedSelectedItemPrice();
}



function updatedSelectedItemPrice() {

    var replace = selectedItemPriceOrg;
    var sum = 0;

    for (var y = 0; y < oneTypeSubItems.length; y++)
    {
        for (var key in oneTypeSubItems[y])
        {

            // ITEM PRICE DEPENDS ON SUB ITEM CHOICE
            // REPLACE THE ORDER AMOUNT IF AMOUNT NEED TO BE REPLACE DUE TO EXTRA TYPE ONE REPLACE PRICE

            if(oneTypeSubItems[y][key] != null) {


                if (convertFloat(oneTypeSubItems[y][key].replace_price) == 0) {

                    sum = convertFloat(sum) + convertFloat(oneTypeSubItems[y][key].subItemPrice);
                }
                else {
                    replace = oneTypeSubItems[y][key].subItemPrice;

                }
            }
        }
    }


    for (var y = 0; y <  multipleTypeSubItems.length; y++) {

        for (var t = 0; t <  multipleTypeSubItems[y].length; t++) {

            for (var key in  multipleTypeSubItems[y][t]) {

                if (multipleTypeSubItems[y][t][key] != null) {

                    if (convertFloat(multipleTypeSubItems[y][t][key].subItemPrice) != 0) {

                        sum = convertFloat(sum) + convertFloat(multipleTypeSubItems[y][t][key].subItemPrice);

                    }

                }
            }
        }
    }


    selectedItemPrice = convertFloat(sum) + convertFloat(replace);


    $('#itemPriceOrderPopup').html(selectedItemPrice+' NIS');
}





// ADD USER ORDER  (ADD TO MY ORDER CLICKED)
function addUserOrder()
{
    // CHECK IF USER SELECTED ON TYPE SUB ITEMS OR NOT (REQUIRED)
    for(var x=0;x<oneTypeSubItems.length;x++)
    {

        // GET ONE TYPE SUB ITEM NAME AS KEY
        for (var key in oneTypeSubItems[x])
        {

            // IF ONE TYPE SUB ITEM NULL
            if(oneTypeSubItems[x][key] == null)
            {
                // EXCEPTION HANDLING
                var index = '#input' + x;

                var parent = '#oneTypeDD'+x;

                $(parent).addClass("red-border-c");

                var error = '#error-one-type'+x;
                $(error).html("Select Option!");


                setTimeout(function(){

                    var container = $('.box-frame.new'),
                        scrollTo = $(parent);

                    // Or you can animate the scrolling:
                    container.animate({

                        scrollTop: scrollTo.offset().top - (container.offset().top + container.scrollTop() + 30 )
                    },500)

                }, 300);


                return;
            }

        }
    }


    $('#parent_type_one').hide();
    $('#parent_type_multiple').hide();


    // Convert Multi Type 2D array to One Type Array

    var multiItemsArray = [];

    for(var x =0;x<multipleTypeSubItems.length;x++)
    {
        for(var y=0;y<multipleTypeSubItems[x].length;y++)
        {
            multiItemsArray.push(multipleTypeSubItems[x][y]);
        }
    }


    multipleTypeSubItems = multiItemsArray;



    // SAVE ORDER TO SERVER AGAINST USER
    var order = {
        "itemId"             : result.categories_items[currentCategoryId].items[currentItemIndex].id,
        "itemPrice"          : result.categories_items[currentCategoryId].items[currentItemIndex].price,
        "itemName"           : result.categories_items[currentCategoryId].items[currentItemIndex].name_en,
        "itemNameHe"         : result.categories_items[currentCategoryId].items[currentItemIndex].name_he,
        "cash_pickup_exception"   : result.categories_items[currentCategoryId].items[currentItemIndex].cash_pickup_exception,
        "min_order_exception"   : result.categories_items[currentCategoryId].items[currentItemIndex].min_order_exception,
        "qty"                : 1 ,
        "subItemsOneType"    : oneTypeSubItems,
        "multiItemsOneType"  : multipleTypeSubItems,
        "specialRequest"     : $('#special_request').val()};


    userObject.orders.push(order);

    generateTotalUpdateFoodCart();

    increaseCounter();

    // SHOWING BADGE ON ADD ORDER BUTTON CLICKED
    $("#count-badge").show();

    $('#order-popup').modal('hide');

}


// COMPUTATION TO GENERATE TOTAL AND UPDATED FOOD ITEM CART DATA
function generateTotalUpdateFoodCart()
{
    foodCartData = [];
    var total = 0;

    for(var x=0; x<userObject.orders.length ;x++)
    {

        var order          = userObject.orders[x]; // GET USER ORDERS ONE BY ONE
        var orderAmount    = convertFloat(convertFloat(order.itemPrice) * convertFloat(order.qty)); // SET DEFAULT ITEM PRICE FOR ORDER
        var sumTotalAmount = 0;  // TOTAL AMOUNT

        // FOOD CARD ITEM  FOR MAIN ITEM
        var cartItem = {
            "name": order.itemName,
            "name_he": order.itemNameHe,
            "price" : order.itemPrice ,
            "price_without_subItems" : order.itemPrice,
            "detail" : "" ,
            "detail_he" : "" ,
            "orderIndex" : x ,
            "qty" : order.qty,
            "cash_pickup_exception" : order.cash_pickup_exception,
            "min_order_exception" : order.min_order_exception,
            "specialRequest" : order.specialRequest,
            "subItemOneIndex" : null,
            "subItemMultipleIndex" : null};


        // PUSH MAIN ITEM  FOOD CART OBJECT
        foodCartData.push(cartItem);

        // CHECK ONE TYPE SUB ITEMS IF ANY

        for (var y = 0; y < order.subItemsOneType.length; y++)
        {

            for (var key in order.subItemsOneType[y])
            {

                // ITEM PRICE DEPENDS ON SUB ITEM CHOICE
                // REPLACE THE ORDER AMOUNT IF AMOUNT NEED TO BE REPLACE DUE TO EXTRA TYPE ONE REPLACE PRICE

                if (convertFloat(order.subItemsOneType[y][key].replace_price) != 0)
                {
                    orderAmount = convertFloat(convertFloat(order.subItemsOneType[y][key].subItemPrice) * convertFloat(order.qty));
                    cartItem.price = convertFloat(orderAmount);
                    if(cartItem.detail == "")
                    {
                        cartItem.detail +=  key+":"+order.subItemsOneType[y][key].subItemName;
                        cartItem.detail_he +=  key+":"+order.subItemsOneType[y][key].subItemNameHe;
                    }
                    else
                    {
                        cartItem.detail +=  ", "+key+":"+order.subItemsOneType[y][key].subItemName;
                        cartItem.detail_he +=  ", "+key+":"+order.subItemsOneType[y][key].subItemNameHe;
                    }

                    cartItem.price_without_subItems = convertFloat(order.subItemsOneType[y][key].subItemPrice);

                }
                // SUM THE SUB ITEM AMOUNT
                // SUM THE AMOUNT
                else
                {
                    if(convertFloat(order.subItemsOneType[y][key].subItemPrice) != 0) {

                        sumTotalAmount = convertFloat(convertFloat(sumTotalAmount) +( convertFloat(order.subItemsOneType[y][key].subItemPrice) * convertFloat(order.subItemsOneType[y][key].qty)));

                        if(cartItem.detail == "")
                        {
                            cartItem.detail +=  order.subItemsOneType[y][key].subItemName+" (+"+order.subItemsOneType[y][key].subItemPrice+")";
                            cartItem.detail_he +=  order.subItemsOneType[y][key].subItemNameHe+" (+"+order.subItemsOneType[y][key].subItemPrice+")";
                        }
                        else
                        {
                            cartItem.detail +=  ", "+order.subItemsOneType[y][key].subItemName+" (+"+order.subItemsOneType[y][key].subItemPrice+")";
                            cartItem.detail_he += ", "+order.subItemsOneType[y][key].subItemNameHe+" (+"+order.subItemsOneType[y][key].subItemPrice+")";

                        }


                    }
                    else
                    {

                        // THOSE ITEMS HAVE PRICE ZERO WILL NOT DISPLAY AS CART ITEM AND DISPLAY AS

                        if(cartItem.detail == "")
                        {
                            cartItem.detail +=  order.subItemsOneType[y][key].subItemName;
                            cartItem.detail_he +=  order.subItemsOneType[y][key].subItemNameHe;
                        }
                        else
                        {
                            cartItem.detail +=  ", "+order.subItemsOneType[y][key].subItemName;
                            cartItem.detail_he +=  ", "+order.subItemsOneType[y][key].subItemNameHe;
                        }

                    }
                }

            }

        }

        // CHECK MULTIPLE SELECTABLE SUB ITEMS


        for (var y = 0; y < order.multiItemsOneType.length; y++)
        {

            for (var key in order.multiItemsOneType[y])
            {
                if(order.multiItemsOneType[y][key] != null)
                {
                    if(convertFloat(order.multiItemsOneType[y][key].subItemPrice) != 0)
                    {
                        sumTotalAmount = convertFloat(convertFloat(sumTotalAmount) + (convertFloat(order.multiItemsOneType[y][key].subItemPrice) * convertFloat(order.multiItemsOneType[y][key].qty)));

                        if(cartItem.detail == "")
                        {
                            cartItem.detail +=  order.multiItemsOneType[y][key].subItemName+" (+"+order.multiItemsOneType[y][key].subItemPrice+")";
                            cartItem.detail_he +=  order.multiItemsOneType[y][key].subItemNameHe+" (+"+order.multiItemsOneType[y][key].subItemPrice+")";

                        }
                        else
                        {
                            cartItem.detail +=  ", "+order.multiItemsOneType[y][key].subItemName+" (+"+order.multiItemsOneType[y][key].subItemPrice+")";
                            cartItem.detail_he +=  ", "+order.multiItemsOneType[y][key].subItemNameHe+" (+"+order.multiItemsOneType[y][key].subItemPrice+")";

                        }
                    }
                    else
                    {
                        // THOSE ITEMS HAVE PRICE ZERO WILL NOT DISPLAY AS CART ITEM AND DISPLAY AS

                        if(cartItem.detail == "")
                        {
                            cartItem.detail +=  order.multiItemsOneType[y][key].subItemName;
                            cartItem.detail_he +=  order.multiItemsOneType[y][key].subItemNameHe;
                        }
                        else
                        {
                            cartItem.detail +=  ", "+order.multiItemsOneType[y][key].subItemName;
                            cartItem.detail_he +=  ", "+order.multiItemsOneType[y][key].subItemNameHe;
                        }
                    }
                }


            }


        }

        // TOTAL OF ITEM WITH SUB ITEMS
        cartItem.price = convertFloat(((convertFloat(orderAmount) + convertFloat(sumTotalAmount)) / convertFloat(order.qty)));

        total = convertFloat(convertFloat(total) +  ( convertFloat(orderAmount) + convertFloat(sumTotalAmount)));
    }


    userObject.total = total;
}


// UPDATE FOOD CART
function updateCartElements()
{
    var countItems = 0;
    var newTotal = userObject.total;
    ignoreMinOrderLimit = false;
    cash_pickup_exception = false;

    // DISPLAY FOOD CART IF AT LEAST ONE ITEM TO DISPLAY
    if(foodCartData.length != 0)
    {
        var str = '';

        for (var x = 0; x < foodCartData.length; x++)
        {
            countItems = countItems +  foodCartData[x].qty;

            if (x == 0)
            {
                str = '<div class="add-row first">';
            }
            else
            {
                str += '<div class="add-row">';
            }

            str += '<div class="row-holder">'+
                '<div class="row header-row no-gutters">'+
                '<div class="col-md-9 col-xs-9" style="padding: 0 5px 0 0;">'+
                '<h2>'+ foodCartData[x].name +'</h2>'+
                '</div>'+
                '<div class="col-md-3 col-xs-3">'+
                '<span class="dim">'+ foodCartData[x].price +' NIS</span>'+
                '</div>'+
                '</div>'+
                '<div class="row no-gutters">'+
                '<div class="col-md-9 col-sm-9 col-xs-9">';


            if(foodCartData[x].specialRequest != "")
            {

                if(foodCartData[x].detail != "") {

                    str += '<p>' + foodCartData[x].detail + ', special request : ' + foodCartData[x].specialRequest + '</p>';
                }
                else
                {
                    str += '<p>' + foodCartData[x].detail + ' special request : ' + foodCartData[x].specialRequest + '</p>';
                }
            }
            else {

                str += '<p>' + foodCartData[x].detail +'</p>';

            }

            str += '</div>'+
                '<div class="col-md-3 col-sm-3 col-xs-3">'+
                '<div class="switch-btn">';

            if (convertFloat(foodCartData[x].qty) == 1)
            {
                globalx = x;
                //str += '<img onclick="cartItemRemoveConfirmation('+ x +')" class="left-btn" src="/m/en/img/ic_cancel.png">';
                str += '<img onclick="onQtyDecreasedButtonClicked('+ x +')" class="left-btn" src="/m/en/img/ic_cancel.png">';
            }
            else
            {
                str += '<img onclick="onQtyDecreasedButtonClicked('+ x +')" class="left-btn" src="/m/en/img/ic_reduce.png">';
            }

            str += '<span class="count">'+ foodCartData[x].qty.toString() +'</span>'+
                '<img onclick="onQtyIncreaseButtonClicked(' + x + ')" class="increase-btn" src="/m/en/img/ic_plus.png">'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';


            if(foodCartData[x].min_order_exception == 1)
            {
                ignoreMinOrderLimit = true;
            }


            if(foodCartData[x].cash_pickup_exception == 1)
            {
                cash_pickup_exception = true;
            }


        }


        if(cash_pickup_exception)
        {
            $('#delivery-parent').hide();
        }



        $('#totalWithoutDiscount').html(userObject.total + " NIS");
        $('#food-cart-data').html(str);
        $('#count-badge').html(countItems);



        if(!userObject.isCoupon)
        {
            $('#coupon-fee-parent').hide();
        }
        else
        {

            $('#coupon-fee-parent').show();
            $('#totalWithoutDiscount').html(userObject.totalWithoutDiscount + " NIS");
            newTotal = userObject.total;
        }





        if($('#checkbox-id112').is(":checked"))
        {
            $('#delivery-fee-parent').css('display','none');
            userObject.deliveryCharges = 0;
            $("#appt_no").val('');
            $("#address").val('');
            $('#lat').val('');
            $('#lng').val('');
            $('#delivery-info').hide();
            userObject.deliveryArea = null;
            $("#delivery-areas").prop('selectedIndex',0);

        }
        else
        {

            if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {

                $('#delivery-fee-parent').css('display','block');
                $('#delivery-fee').html(userObject.deliveryCharges + " NIS");
                newTotal = convertFloat(convertFloat(userObject.total) + convertFloat(userObject.deliveryCharges));


            }

        }


        $('.total').html(newTotal + " NIS");

    }
    else {

        $('#food-cart-popup').modal('hide');

    }
}


// USER WANT TO INCREASE THE QUANTITY OF ITEMS FROM ORDER

function onQtyIncreaseButtonClicked(index) {

    // UPDATE ITEM MAIN
    userObject.orders[foodCartData[index].orderIndex].qty = convertFloat(userObject.orders[foodCartData[index].orderIndex].qty) + 1;

    // INCREASE THE QTY OF SUB ITEMS ONE TYPE
    for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].subItemsOneType.length;x++)
    {
        for (var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x])
        {
            if(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key] != null) {

                userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty =
                    convertFloat(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty) + 1;
            }
        }
    }

    // INCREASE THE QTY OF SUB ITEMS MULTIPLE TYPE
    for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].multiItemsOneType.length;x++)
    {
        for (var key in userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x])
        {
            if(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key] != null) {

                userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty =
                    (convertFloat(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty) + 1);
            }
        }
    }

    foodCartData[index].qty = convertFloat(foodCartData[index].qty) + 1;

    userObject.total = convertFloat(convertFloat(userObject.total) + convertFloat(foodCartData[index].price));


    $('.total').html(userObject.total + " NIS");

    updateCartElements();


}


// USER WANT TO DECREASE THE QUANTITY OR REMOVE OF ITEMS FROM ORDER

function onQtyDecreasedButtonClicked(index) {

    // UPDATE ITEM MAIN

    // DECREASE QUANTITY
    if(convertFloat(userObject.orders[foodCartData[index].orderIndex].qty) != 1)
    {

        userObject.orders[foodCartData[index].orderIndex].qty = convertFloat(userObject.orders[foodCartData[index].orderIndex].qty) - 1;

        // DECREASE THE QTY OF SUB ITEMS ONE TYPE
        for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].subItemsOneType.length;x++)
        {
            for (var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x])
            {
                if(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key] != null) {

                    userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty =
                        convertFloat(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty) -  1;
                }
            }
        }

        // DECREASE THE QTY OF SUB ITEMS MULTIPLE TYPE
        for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].multiItemsOneType.length;x++)
        {
            for (var key in userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x])
            {
                if(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key] != null) {

                    userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty =
                        (convertFloat(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty) - 1);
                }
            }
        }


    }
    // REMOVE ITEM
    else
    {
        // IF MAIN ITEM DELETED ALL SUB ITEMS ALSO DELETED

        userObject.total = convertFloat(convertFloat(userObject.total) - convertFloat(foodCartData[index].price));

        userObject.orders.splice(foodCartData[index].orderIndex, 1);

        generateTotalUpdateFoodCart();

    }


    if(foodCartData.length != 0 && foodCartData[index] != undefined  && (convertFloat(foodCartData[index].qty) != 1))
    {
        foodCartData[index].qty = convertFloat(foodCartData[index].qty) - 1;
        userObject.total = convertFloat(convertFloat(userObject.total) - convertFloat(foodCartData[index].price));
    }


    $('.total').html(userObject.total + " NIS");

    updateCartElements();
}



// USER CLICKED ORDER NOW




function OnOrderNowClicked() {


        generateTotalUpdateFoodCart();
        updateCartElements();

        $('.totalBill').html(userObject.total + " NIS");
        $('#restAddress').html(userObject.restaurantAddress);

        $('#food-cart-popup').modal('hide');

        userObject.subTotal = userObject.total;

        cash_pickup_from_link = false;

        $('#delivery-parent').show();

        $('#delivery-info').show();

        $('#delivery-info').addClass('show');

        orderNow(); // CALL TO FRONT END  // MOVE USER TO TAKE PERSONAL INFORMATION


}

function OnOrderPickUpClicked()
{

    generateTotalUpdateFoodCart();
    updateCartElements();

    cash_pickup_from_link = true;

    $('.totalBill').html(userObject.total + " NIS");
    $('#restAddress').html(userObject.restaurantAddress);


    $('#checkbox-id112').prop('checked', true);

    $('#food-cart-popup').modal('hide');

    userObject.subTotal = userObject.total;

    $('#delivery-parent').hide();

    $('#delivery-info').hide();

    $('#delivery-info').removeClass('show');

    $('#customer-info-popup').modal('show');
}



function validateCustomerInfo() {

    $('#customer-name-field').removeClass('error');
    $('#customer-email-field').removeClass('error');
    $('#customer-number-field').removeClass('error');

    var name    = $('#customer-name').val();
    var email   = $('#customer-email').val();
    var number  = $('#customer-number').val();


    if (name.length == 0)
    {
        $('#customer-name-field').addClass('error');
        $('#name-error').html("*required field");
        return;
    }
    if (email.length == 0)
    {
        $('#customer-email-field').addClass('error');
        $('#email-error').html("*required field");
        return;
    }
    if(!validateEmail(email))
    {
        $('#customer-email-field').addClass('error');
        $('#email-error').html("invalid email");
        return;
    }
    if (number.length == 0)
    {
        $('#customer-number-field').addClass('error');
        $('#contact-error').html("*required field");
        return;
    }

    // VALIDATION OF CONTACT NO NOT CONTAIN CHAR EXCEPT +

    var contact = number.replace('+','');

    if(!(/^\d+$/.test(contact)))
    {
        $('#customer-number-field').addClass('error');
        $('#contact-error').html("invalid number");
        return;
    }


    userObject.name       =  name;
    userObject.email      =  email;
    userObject.contact    =  number;



    $('.box-frame.new').css('height' , 'calc(100% - 220px)');

    $('#customer-info-popup').modal('hide');

    if(cash_pickup_from_link == false)
    {
        $('#delivery-popup').modal('show');
    }
    else {

        userObject.pickFromRestaurant = true;
        $('#summary-popup').modal('show');
        $('#delivery-fee-parent').hide();
    }



}


// VALIDATE EMAIL ADDRESS

function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}


$('#delivery-areas').on('change', function() {

    var index =  this.value;

    if(index == -1)
    {
        userObject.deliveryArea = null;
        userObject.deliveryCharges = 0;
        $("#error-area").html('Select One!');
        $("#area_parent").addClass("error");
        $("#error-area").show();
        $('.box-frame.new').scrollTop(800);
    }
    else
    {
        userObject.deliveryArea = selectedRest.delivery_fee[index].area_en;
        userObject.deliveryCharges = selectedRest.delivery_fee[index].fee;
        $("#error-area").html('');
        $("#error-area").hide();
        $("#area_parent").removeClass("error");


    }

    updateCartElements();

});


$("#appt_no").change(function() {

    $("#apt-parent").removeClass("error");
    $("#error-apt").hide();
});


function deliveryAddress() {


    userObject.delivery_lat = $('#lat').val();
    userObject.delivery_lng = $('#lng').val();

    $("#apt-parent").removeClass("error");
    $("#address-parent").removeClass("error");
    $("#area_parent").removeClass("error");
    $("#error-apt").hide();
    $("#error-address").hide();
    $("#error-area").hide();

    // DELIVER ADDRESS EMPTY
    if($('#checkbox-id112').is(':checked'))
    {

        userObject.pickFromRestaurant = true;


    }
    else
    {

        if($("#appt_no").val() == "")
        {
            $("#apt-parent").addClass("error");
            $("#error-apt").html('*Required Field');
            $("#error-apt").show();
            $('.box-frame.new').scrollTop(800);
            return;
        }

        if($('#lat').val() == "" || $('#lng').val() == "")
        {


            $("#address").addClass("error");
            $("#error-apt").html('Please Select From Suggestions');
            $("#error-apt").show();

            return;
        }


        if($("#address").val() == "")
        {
            $("#address-parent").addClass("error");
            $("#error-address").html('*Required Field');
            $("#error-address").show();
            $('.box-frame.new').scrollTop(800);
            return;
        }





        if(userObject.deliveryArea == null)
        {
            $("#area_parent").addClass("error");
            $("#error-area").html('Select One!');
            $("#error-area").show();
            $('.box-frame.new').scrollTop(800);
            return;
        }

        userObject.pickFromRestaurant = false;

        userObject.deliveryAddress  = $("#appt_no").val();
        userObject.deliveryAptNo    = $("#address").val();

    }


    $('#delivery-popup').modal('hide');
    $('#summary-popup').modal('show');
}


function submitCoupon() {

    // USER WANT TO USE COUPON
    if($('#coupon-txt').val() != "")
    {
        submit_summary();
    }
    else
    {
        $("#error-coupon").html("Enter Code!");
        $("#error-coupon").show();
        $('#coupon').addClass('error');
    }
}



function submit_summary() {

    $("#error-coupon").html("");


    var sr = $('#specialRequestText').val();

    if(sr != null && sr != "")
    {
        userObject.specialRequest = sr;
    }


    // USER WANT TO USE COUPON
    if($('#coupon-txt').val() != "")
    {
        var code  = $('#coupon-txt').val();

        var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));


        commonAjaxCall("/restapi/index.php/coupon_validation", {"code": code, "email": userObject.email,
            "total": userObject.total,"rest_title" : userObject.restaurantTitle,
            "rest_city" : selectedCityName, "delivery_fee" : userObject.deliveryCharges, "user_order" : userObject },checkCouponCallBack);



    }
    else {

        $('#coupon').removeClass('error');


        if((userObject.pickFromRestaurant && (!cash_pickup_exception)))
        {
            if(!cash_pickup_from_link)
               $('#cashBtn').hide();
            else
               $('#cashBtn').show();
        }
        else
        {
            $('#cashBtn').show();
        }

        $('#user_name').val(userObject.name);
        $('#summary-popup').modal('hide');
        $('#payment-popup').modal('show');

    }

}


function checkCouponCallBack(response)
{
    var responseCoupon = JSON.parse(response);
    var code = $("#coupon-txt").val();


    console.log(responseCoupon);

    // COUPON IS VALID
    if (responseCoupon.success == true)
    {

        var newTotal = 0;

        userObject.discount = responseCoupon.amount;
        var discountedAmount = 0;

        userObject.couponCode = code;


        if (responseCoupon.isFixAmountCoupon) {

            userObject.isFixAmountCoupon = true;

            discountedAmount = convertFloat(userObject.discount);

            if(userObject.total < userObject.discount)
            {
                userObject.discount = userObject.total;
                discountedAmount = userObject.total;
            }

            newTotal = convertFloat(userObject.total) - convertFloat(userObject.discount);

            $('#coupon-fee').html("-" + discountedAmount +" NIS");
        }
        else
        {

            userObject.isFixAmountCoupon = false;

            discountedAmount = convertFloat((convertFloat(userObject.total) * convertFloat(userObject.discount)) / 100);

            newTotal = convertFloat(convertFloat(userObject.total) - convertFloat(discountedAmount));

            $('#coupon-fee').html("-" + discountedAmount +" NIS");

            $('#coupon_detail').html("Coupon Discount " + userObject.discount+"%");

        }


        if(responseCoupon.campaign != null)
        {
            userObject.coupon_campaign = responseCoupon.campaign;
        }




        userObject.totalWithoutDiscount = userObject.total;

        userObject.total = newTotal;

        userObject.isCoupon = true;

        updateCartElements();

        $('#coupon-fee-parent').show();
        $('#coupon_parent').hide();

        $('#coupon-txt').val("");

        $('#user_name').val(userObject.name);


        if(userObject.pickFromRestaurant)
        {
            $('#cashBtn').hide();
        }
        else
        {
            $('#cashBtn').show();
        }

        // $('#summary-popup').modal('hide');
        // $('#payment-popup').modal('show');
        //
        //

    }
    // INVALID COUPON CODE
    else
    {

        userObject.isCoupon = false;
        $('#coupon').addClass('error');
        $("#coupon-txt").val("");
        $("#error-coupon").html("Error - this coupon is not valid.");
        $("#error-coupon").show();
        $('.box-frame.new').scrollTop(800);
        updateCartElements();

    }

    console.log(userObject);
}

function selectCC() {

    setTimeout(function(){

        $('.box-frame.new').scrollTop(800);

    }, 500);
    
    $('#cashBtn').removeClass('active');
    $('#ccBtn').addClass('active');
    $('#show_credit_card').addClass('show');
    $('#cash-text').hide();

}

function selectCash() {

    $('#cashBtn').addClass('active');
    $('#ccBtn').removeClass('active');
    $('#show_credit_card').removeClass('show');
    $('#cash-text').show();
}

var clickInProgress = false;


function processPayment() {


    if(!clickInProgress) {


        $('#error-card').removeClass('error');
        $('.payment-errors').html("");
        $('.payment-errors').hide();

        if (!($('#show_credit_card').hasClass('show')) && ( (!userObject.pickFromRestaurant) || cash_pickup_exception || cash_pickup_from_link)) {

            userObject.Cash_Card = "CASH";
            userObject.Cash_Card_he = "מזומן";
            onPaymentSuccess();
        }
        else {
            if (!paymentReceived) {
                var cardNumber = $('#card_no').val();
                var cvv = $('#cvv').val();

                // CARD NO IS EMPTY
                if (cardNumber == "") {
                    $('#error-card').addClass('error');
                    $('#error-card-no').html("*required field");
                    return;
                }

                if (!(/^\d+$/.test(cardNumber))) {
                    $('#error-card').addClass('error');
                    $('#error-card-no').html("invalid card number");
                    $('.box-frame.new').scrollTop(800);
                    return;
                }

                // CVV

                if (cvv == "") {
                    $('.payment-errors').html("*required field");
                    $('.box-frame.new').scrollTop(800);
                    return;
                }

                if (!(/^\d+$/.test(cardNumber))) {
                    $('.payment-errors').html("invalid cvv");
                    $('.payment-errors').show();
                    $('.box-frame.new').scrollTop(800);
                    return;
                }


                // MONTH SHOULD NOT BE EMPTY
                if ($('#month').val() == "") {
                    $("#exp_error").addClass("error");
                    $('.payment-errors').html("*Card Expiry Date Month (MM) Required");
                    $('.payment-errors').show();
                    $('.box-frame.new').scrollTop(800);
                    return;
                }

                // MONTH SHOULD NOT BE EMPTY
                if ($('#year').val() == "") {
                    $("#exp_error").addClass("error");
                    $('.payment-errors').html("*Card Expiry Date Year (YY) Required");
                    $('.payment-errors').show();
                    $('.box-frame.new').scrollTop(800);
                    return;
                }


                clickInProgress = true;

                // SUBMIT PAYMENT FORM
                $('#payment-form').submit();
            }
            else {

                onPaymentSuccess();
            }
        }

    }
}


// CREDIT CARD PAYMENT
function payment_credit_card(cardNo, cvv, exp) {

    userObject.cartData = foodCartData;


    if(userObject.deliveryArea == null)
    {
        userObject.deliveryArea = '';
    }


    if(userObject.specialRequest == null)
    {
        userObject.specialRequest = '';
    }


    var  newTotal = userObject.total;


    if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {


        newTotal = convertFloat(convertFloat(userObject.total) + convertFloat(userObject.deliveryCharges));


    }


    if(userObject.totalWithoutDiscount == null || userObject.totalWithoutDiscount == "")
    {
        userObject.totalWithoutDiscount = newTotal;
    }


    commonAjaxCall("/restapi/index.php/stripe_payment_request", {"amount" : newTotal, "user_order": userObject , "cc_no"  : cardNo, "exp_date"  : exp, "cvv"  : cvv },paymentCreditCardCallBack);

}


function paymentCreditCardCallBack(response) {


    var resp = response;


    if(resp.response == "success")
    {
        paymentReceived = true;
        userObject.Cash_Card = "Credit Card";
        userObject.Cash_Card_he = "כרטיס אשראי";
        userObject.trans_id = resp.trans_id;
        onPaymentSuccess();

    }
    else
    {
        $(".payment-errors").html(resp.response);
        $(".payment-errors").show();
        $('.box-frame.new').scrollTop(800);
        clickInProgress = false;
    }

}


function onPaymentSuccess()
{
    clickInProgress = true;
    callPage3();
}


// SEND ORDER USER TO SERVER & CALL PAGE 3

function  callPage3() {


    userObject.cartData = foodCartData;

    if(userObject.deliveryArea == null)
    {
        userObject.deliveryArea = '';
    }

    if(userObject.specialRequest == null)
    {
        userObject.specialRequest = '';
    }

    if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {

        var  newTotal = convertFloat(convertFloat(userObject.total) + convertFloat(userObject.deliveryCharges));

        userObject.total = newTotal;

    }

    if(userObject.totalWithoutDiscount == null || userObject.totalWithoutDiscount == "")
    {
        userObject.totalWithoutDiscount = userObject.total;
    }

    addLoading();
    commonAjaxCall("/restapi/index.php/add_order",{"user_order": userObject,"user_platform": 'ENG mobile'},callPage3CallBack);

};


function callPage3CallBack(response) {



    // CALLING SMOOCH BOT FOR NATIVE APP

    //
    // try
    // {
    //     app.orderNowEvent();
    // }
    // catch (err)
    // {
    //
    // }


    clickInProgress = false;

    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    userObject = null;
    localStorage.setItem("USER_OBJECT", "");

    refresh = true;

    // MOVING TO ORDER PAGE
    window.location.href = '/m/en/feedback';

}


// LOGIN / SIGN UP STATES

function LoginSuccessFullState() {

    var email     =     ""
    var smooch_id =     localStorage.getItem("USER_SMOOCH_ID");
    var name      =     "";

    commonAjaxCall("/restapi/index.php/get_user",{"smooch_id":smooch_id},getUserLogin);


}

function getUserLogin(response) {

    resp = JSON.parse(response);

    if(resp == "not found")
    {
        localStorage.setItem("USER_SMOOCH_ID","");
        SignInDefault();
    }
    else {

        userObject.uid = resp.smooch_id;
        userObject.email = resp.email;
        userObject.name = resp.name;
        userObject.contact = resp.contact;

        // DISPLAY LOGIN SUCCESS

        $("#loginMessage").show();
        $("#success-message").html("Hey "+resp.name+", Nice to meet you :)");

        // HIDE FORM S

        $('#signup-message').hide();
        $('#manual-signup').hide();
        $('#signUpForm').hide();

        $('#signup-popup').modal('hide');
        $('#login-popup').modal('hide');
        $('#welcome-popup').modal('hide');


        $('#customer-email').val(userObject.email);
        $('#customer-name').val(userObject.name);
        $('#customer-number').val(userObject.contact);

    }
}



function SignInDefault()
{
    $('#signup-popup').modal('hide');
    $('#login-popup').modal('show');
    $('#welcome-popup').modal('hide');

}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



function convertFloat(num)
{
    return parseFloat(parseFloat(num).toFixed(2));
}
