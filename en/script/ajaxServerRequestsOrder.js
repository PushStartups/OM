// GLOBAL VARIABLES

var userObject                  = null;                                           // MAIN USER OBJECT
var foodCartData                = [];                                             // DISPLAY DATA FOR FOOD CART
var selectedRest                = null;                                           // SELECTED RESTAURANT RESPONSE FROM SERVER
var result                      = null;                                           // SERVER RESPONSE RAW
var restName                    = null;                                           // SELECTED RESTAURANT NAME
var restId                      = null;                                           // SELECTED RESTAURANT ID
var currentCategoryId           = null;                                           // CURRENT SELECTED CATEGORY
var currentItemIndex            = null;                                           // CURRENT ITEM SELECTED
var oneTypeSubItems             = null;                                           // SUB-ITEMS TYPE ONE
var multipleTypeSubItems        = null;                                           // SUB-ITEMS TYPE MULTIPLE
var extras                      = null;                                           // EXTRAS FROM SERVER
var minOrderLimit               = null;                                           // MINIMUM ORDER LIMIT
var selectedItemPrice           = 0;


//SERVER HOST DETAIL

$(document).ready(function() {

    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if(localStorage.getItem("USER_OBJECT") == undefined ||localStorage.getItem("USER_OBJECT") == "" || localStorage.getItem("USER_OBJECT") == null)
    {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '/en/index.html';

    }

    // RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));

    // RETRIEVE SELECTED REST ID RAW RESPONSE
    selectedRest  = JSON.parse(localStorage.getItem("SELECTED_REST"));



    result                      = null;                                            // SERVER RESPONSE RAW
    restName                    = userObject.restaurantTitle;                      // SELECTED RESTAURANT NAME
    restId                      = userObject.restaurantId;                         // SELECTED RESTAURANT ID
    currentCategoryId           = 0;                                               // CURRENT SELECTED CATEGORY
    currentItemIndex            = 0;                                               // CURRENT ITEM SELECTED
    oneTypeSubItems             = [];                                              // SUB-ITEMS TYPE ONE
    multipleTypeSubItems        = [];                                              // SUB-ITEMS TYPE MULTIPLE
    extras                      = null;                                            // EXTRAS FROM SERVER
    minOrderLimit               = selectedRest.min_amount;                         // MINIMUM ORDER LIMIT



    // // REQUEST SERVER GET CATEGORIES WITH ITEMS
    commonAjaxCall("/restapi/index.php/categories_with_items", {"restaurantId" :  restId }, getCategoriesWithItems);

    displayRestDetail();

    if(userObject.orders.length != 0)
    {
        $('.col-second').css("visibility","visible");
        $('.col-one').css("visibility","hidden");
        generateTotalUpdateFoodCart();
        updateCartElements();
    }
    else
    {
        $('.col-second').css("visibility","hidden");
        $('.col-one').css("visibility","visible");
    }

});



// RESTAURANT DETAIL POPUP

function displayRestDetail() {


    // SETTING RESTAURANT DETAILS

    var temp =  '<div class="img-frame">'+
        '<a href="#"><img src="'+ selectedRest.logo +'" alt="logo-img"></a>'+
        '</div>'+
        '<h2>'+ selectedRest.name_en +'</h2>'+
        '<p>'+ selectedRest.address_en +'</p>'+
        '<span class="cart">Minimum Order '+ selectedRest.min_amount +' NIS</span>'+
        '<div class="wrap">'+
        '<p>'+ selectedRest.description_en +'</p>'+
        '</div>'+
        '<img class="mobile-sec" src="/en/img/delivery line.png">';

    $('#rest-detail').html(temp);



    // SETTING TIMING OF CURRENT RESTAURANT

    temp = '';

    for (i = 0; i < selectedRest.timings.length; i++)
    {

        temp += '<tr><td>'+ selectedRest.timings[i].week_en +'</td>'+
            '<td>'+ selectedRest.timings[i].opening_time + ' - ' + selectedRest.timings[i].closing_time +'</td></tr>';

    }

    $('#time-detail').html(temp);



    // SETTING DELIVERY FEE INFORMATION

    temp = '';

    for (i = 0; i < selectedRest.delivery_fee.length; i++)
    {

        temp += '<tr>'+
            '<td>' + selectedRest.delivery_fee[i].area_en +' : Fee '+ selectedRest.delivery_fee[i].fee +' NIS</td>'+
            '</tr>';

    }

    $('#discount-detail').html(temp);



    // SETTING GALLERY IMAGES

    temp = '';

    for (i = 0; i < selectedRest.gallery.length; i++)
    {

        if (i == 0)
            temp = '<div class="item active">';
        else
            temp += '<div class="item">';

        temp += '<img src="'+ selectedRest.gallery[i].url +'" alt="Chania" width="50%">'+
            '</div>';

    }

    $('#gallery-images').html(temp);



    // SETTING MINIMUM ORDER

    temp = '<p>Minimum Order '+ selectedRest.min_amount +' NIS</p>';

    $('#min-order').html(temp);



}



// GET ALL CATEGORIES WITH ITEMS FROM SERVER AGAINST RESTAURANT SELECTED
function  getCategoriesWithItems(response)
{

    // SET MIN ORDER LIMIT TO ERROR POPUP
    //$('#min_order').html("The minimum order is "+minOrderLimit+" NIS");


    // UPDATE RESTAURANT TITLE
    //$('#restName').text(restName);


    result = JSON.parse(response);
    var temp = '';
    var catItem = '';


    // SETTING RESTAURANT NAME AND CATEGORIES
    temp =  '<h1>'+selectedRest.name_en+'</h1>'+
        '<p>'+selectedRest.address_en+'</p>'+
        '<ul>';


    catItem += '<ul class="accordion multilevel-accordion">';

    for(var i = 0; i < result.categories_items.length; i++)
    {

        // temp +=  '<li> <a href="#" onclick="openSlide('+i+')">'+ result.categories_items[i].name_en +'</a></li>';



        if (i == 0)
            catItem += '<li class="active">';
        else
            catItem += '<li>';


        catItem +=  '<a  id="slideItem'+i+'"  href="#" class="opener">'+
            '<h3>'+result.categories_items[i].name_en+'</h3>'+
            '</a>'+
            '<div class="slide">';


        for(var y=0;y<result.categories_items[i].items.length ; y++)
        {

            catItem +=  '<div class="add-row" onclick="onItemSelected('+i+','+y+')">'+
                '<h4>'+ result.categories_items[i].items[y].name_en +'<span>'+result.categories_items[i].items[y].price+' NIS</span></h4>'+
                '<div class="box">'+
                '<a class="btn-icon">plus image</a>'+
                '<p>'+ result.categories_items[i].items[y].desc_en +'</p>'+
                '</div>'+
                '</div>';

        }


        catItem +=  '</div>'+
            '</li>';

    }

    catItem += '</ul>';

    temp +=  '</ul>';

    $('#rest-name-cat').html(temp);
    $('#categories-items').html(catItem);


    initAccordion();



    var div = document.getElementById('scrollable');

    div.setAttribute('ss-container', true);

    SimpleScrollbar.initAll();

}


function hideShowMinAmount( total )
{
    if ( total >= minOrderLimit )
    {
        $('#minAmount').hide();
    }
    else
    {
        $('#minAmount').show();
    }
}


function openSlide(index) {

    var id = "#slideItem"+index;

    $(id).click();

}


// ON ITEM SELECTED BY USER

function onItemSelected (x,y)
{
    currentCategoryId     = x;
    currentItemIndex      = y;                         // SELECTED ITEM INDEX
    oneTypeSubItems       = [];                       // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE ONE (SINGLE SELECTION)
    multipleTypeSubItems  = [];                       // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE MULTIPLE (MULTIPLE SELECTION)
    itemPrice             = result.categories_items[currentCategoryId].items[currentItemIndex].price;


    $('#special_request').val("");


    // DISPLAY ITEM (PRODUCT) DETAIL CARD


    // DISPLAY ITEM IMAGE ROUND
    //  $('.circle').css("background-image","url("+result.categories_items[currentCategoryId].items[y].image_url+")");

    // UPDATE ITEM NAME
    $('#itemPopUpTitle').html(result.categories_items[currentCategoryId].items[currentItemIndex].name_en);



    selectedItemPrice = result.categories_items[currentCategoryId].items[currentItemIndex].price;

    $('#itemPopUpPrice').html(selectedItemPrice+' NIS');


    // UPDATE DESCRIPTION
    $('#itemPopUpDesc').html(result.categories_items[currentCategoryId].items[currentItemIndex].desc_en);


    // CALL SERVER GET SELECTED ITEM EXTRAS WITH SUB ITEMS
    commonAjaxCall("/restapi/index.php/extras_with_subitems", {"itemId" :  result.categories_items[currentCategoryId].items[currentItemIndex].id},onItemSelectedCallBack);

}

function onItemSelectedCallBack(response)
{
    // SERVER RESPONSE
    extras  = JSON.parse(response);

    var oneTypeStr = "";
    var multipleTypeStr = "";
    var isOneExist = false;


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

            for(var y=0;y<extras.extra_with_subitems[x].subitems.length;y++)
            {


                if (extras.extra_with_subitems[x].price_replace == 1)
                {

                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0) {

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+ oneTypeSubItems.length +',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  (' + extras.extra_with_subitems[x].subitems[y].price + ') </li>';
                    }
                    else
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+ oneTypeSubItems.length +',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en +'</li>';
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

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  (+' + extras.extra_with_subitems[x].subitems[y].price + ') </li>';
                    }
                    else
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en +'</li>';
                    }

                }
            }


            oneTypeStr += '<div id="oneTypeDD'+oneTypeSubItems.length+'" class="add-row">'+
                '<label>' + extras.extra_with_subitems[x].name_en + '</label>'+
                '<div id="cards-drop" class="custom-drop-down">'+
                '<input id="input'+oneTypeSubItems.length+'" placeholder="Please Choose"  value ="'+ minSubItemName +'"  style="font-size: 18px" readonly="">'+
                '<img style="width:13px; position:absolute; right:15px; top:50%; transform:translateY(-50%)" src="/en/img/drop_down.png">'+
                '<div id="list" class="custom-drop-down-list" style="display: none;">'+
                '<ul id="categories_list">';

            oneTypeStr += temp;

            oneTypeStr += '</ul> </div><span class="red" id="error-one-type'+oneTypeSubItems.length+'">*Required field</span> </div>';

            if(minSubItemName ==  "")
            {
                // CREATE SUB ITEM DEFAULT OBJECT AND PUSH IN ONE TYPE ARRAY EMPTY AS DEFAULT
                // UPDATE VALUE FROM SUB ITEM SELECTION FROM DROP DOWN TYPE ONE
                var subItem = {};

                subItem[extras.extra_with_subitems[x].name_en] = null;
                oneTypeSubItems.push(subItem);

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

            isOneExist = true;

        }

        // // EXTRAS WITH TYPE MULTIPLE (MULTIPLE SELECTABLE)
        // // DISPLAY IS SERIES OF CHECK RADIO BOXES.

        else
        {
            if(extras.extra_with_subitems[x].subitems.length != 0)
            {
                // SUB ITEMS WITH MULTIPLE SELECTABLE OPTIONS

                multipleTypeStr += '<div class="add-row">' +
                    '<label style="text-align: left; margin-bottom: 20px">' + extras.extra_with_subitems[x].name_en + '</label>'+
                    '<ul class="checkbox-list">';

                for (var y = 0; y < extras.extra_with_subitems[x].subitems.length; y++)
                {
                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0)
                    {
                        // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                        multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' + x + ',' + y + ',' + multipleTypeSubItems.length+',this)"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
                            ' <label for="checkbox-id-' + x.toString() + y.toString() + '">'
                            + extras.extra_with_subitems[x].subitems[y].name_en.capitalize()+" (+"+extras.extra_with_subitems[x].subitems[y].price+")"+'</label></li>';
                    }
                    else
                    {
                        // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                        multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' + x + ',' + y + ',' + multipleTypeSubItems.length+',this)"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
                            ' <label for="checkbox-id-' + x.toString() + y.toString() + '">'
                            + extras.extra_with_subitems[x].subitems[y].name_en.capitalize() + '</label></li>';
                    }


                    // CREATE SUB ITEM OBJECT FOR ALL SUB ITEMS AVAILABLE AND SAVE VALUE ON USER SELECTION
                    // DEFAULT VALUE IS NULL
                    // UPDATE VALUE FROM CHECK BOX SELECTION
                    var subItem = {};
                    subItem[extras.extra_with_subitems[x].subitems[y].name_en] = null;
                    multipleTypeSubItems.push(subItem);
                }

                multipleTypeStr += '</ul>';
                multipleTypeStr += '</div>';
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
    $('#parent_type_multiple').show();


    var div = document.getElementById('scrollable2');

    div.setAttribute('ss-container', true);

    SimpleScrollbar.initAll();

    $('#myorder').modal('show');

}




// ON ONE TYPE EXTRA SELECTED BY USER
function onOneTypeExtraSubItemSelected(extraIndex, subItemIndex, oneTypeIndex , e) {

    if(convertFloat(extras.extra_with_subitems[extraIndex].price_replace) == 1)
    {
        $('#itemPopUpPrice').html(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price+' NIS');
    }
    else
    {
        if(convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price) > 0)
        {
            var temp = convertFloat(convertFloat(selectedItemPrice) + convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price));
            $('#itemPopUpPrice').html(temp+' NIS');
        }
    }


    var index  = '#input'+oneTypeIndex;
    var parent = '#oneTypeDD'+oneTypeIndex;
    $(index).val(e.innerHTML);


    // REMOVE ERROR MESSAGES ON SELECTION
    $(parent).removeClass("error");

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
}


// ON MULTIPLE TYPE EXTRA SELECTED
function onExtraSubItemSelected(extraIndex, subItemIndex, index) {

    var id = '#checkbox-id-'+extraIndex+subItemIndex;

    var name = extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en;

    // IF CHECK BOX SET CHECKED ADD SUB ITEM

    if($(id).is(':checked'))
    {
        // SUB ITEM OBJECT

        var subItem  = {

            "subItemId"      : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
            "subItemPrice"   : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
            "subItemName"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
            "subItemNameHe"  : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_he,
            "qty"            : 1}; // QUANTITY OF SUB-ITEM BY DEFAULT 1


        multipleTypeSubItems[index][name] = subItem;

        if(convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price) > 0)
        {
            selectedItemPrice = convertFloat(convertFloat(selectedItemPrice) + convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price));
            $('#itemPopUpPrice').html(selectedItemPrice+' NIS');
        }
    }

    // IF CHECK BOX NOT CHECKED REMOVE SUB ITEM

    else
    {
        multipleTypeSubItems[index][name] = null;
        if(convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price) > 0)
        {
            selectedItemPrice = convertFloat(convertFloat(selectedItemPrice) - convertFloat(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price));
            $('#itemPopUpPrice').html(selectedItemPrice+' NIS');
        }
    }
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
                var parent = '#oneTypeDD'+x;


                $(parent).addClass("error");

                setTimeout(function(){

                    var container = $('.scrollable-area.popup'),
                        scrollTo = $(parent);

                    // Or you can animate the scrolling:
                    container.animate({

                        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                    },500)

                }, 300);


                return;
            }

        }
    }



    $('#parent_type_one').hide();
    $('#parent_type_multiple').hide();


    // SAVE ORDER TO SERVER AGAINST USER
    var order = {
        "itemId"             : result.categories_items[currentCategoryId].items[currentItemIndex].id,
        "itemPrice"          : result.categories_items[currentCategoryId].items[currentItemIndex].price,
        "itemName"           : result.categories_items[currentCategoryId].items[currentItemIndex].name_en,
        "itemName"           : result.categories_items[currentCategoryId].items[currentItemIndex].name_en,
        "itemNameHe"         : result.categories_items[currentCategoryId].items[currentItemIndex].name_he,
        "qty"                : 1 ,
        "subItemsOneType"    : oneTypeSubItems,
        "multiItemsOneType"  : multipleTypeSubItems,
        "specialRequest"     : $('#special_request').val()};


    userObject.orders.push(order);
    generateTotalUpdateFoodCart();
    updateCartElements();


    $('#myorder').modal('hide');


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
            "specialRequest" : order.specialRequest ,
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
    // console.log('total :'+total);
    // console.log(foodCartData);


}


// UPDATE FOOD CART
function updateCartElements()
{
    var countItems = 0;

    // DISPLAY FOOD CART IF AT LEAST ONE ITEM TO DISPLAY
    if(foodCartData.length != 0)
    {
        var str = '';

        for (var x = 0; x < foodCartData.length; x++)
        {
            countItems = countItems +  foodCartData[x].qty;

            str += '<div class="row-holder">' +
                '<div class="row header-row  no-gutters">' +
                '<div class="col-md-9 col-xs-9">' +
                '<h2>' + foodCartData[x].name + '</h2>' +
                '</div>'+
                '<div class="col-md-3 col-xs-3">'+
                '<span class="dim">' + foodCartData[x].price_without_subItems  + ' NIS</span>'+
                '</div>'+
                '</div>'+
                '<div class="row no-gutters">' +
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
                '<div class="col-md-3 col-sm-3 col-xs-3">' +
                '<div class="switch-btn">';

            // BUTTON DECREASE OR CANCEL DEPENDS ON QUANTITY
            if (convertFloat(foodCartData[x].qty) == 1) {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="/en/img/ic_cancel.png">';
            }
            else
            {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="/en/img/ic_reduce.png">';
            }


            str += '<span id="count'+x+'" class="count">' +
                foodCartData[x].qty.toString() +
                '</span>' +
                '<img onclick="onQtyIncreaseButtonClicked(' + x + ')" class="increase-btn" src="/en/img/ic_plus.png">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

        }

        $('#nested-section').html(str);

        $('#totalAmount').html(userObject.total + " NIS");
        hideShowMinAmount(userObject.total);

        $('#minAmount').html("Minimum Order "+minOrderLimit + " NIS");

        $('.col-second').css("visibility","visible");
        $('.col-one').hide();

    }
    else {


        $('.col-second').css("visibility","hidden");
        $('.col-one').show();

    }

    $('.badge').html(countItems);

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

    $('#totalAmount').html(userObject.total + " NIS");
    hideShowMinAmount(userObject.total);

    var itemCountId = "#count"+index;

    $(itemCountId).html(foodCartData[index].qty.toString());

    $('.badge').html(parseInt($('.badge').html()) + 1);

    $('.left-btn').attr("src","/m/en/img/ic_reduce.png");

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

        if(foodCartData.length == 0)
        {
            $('.col-second').css("visibility","hidden");
            $('.col-one').show();

        }
        else
        {
            updateCartElements();

        }


    }

    if(foodCartData.length != 0 && foodCartData[index] != undefined  && (convertFloat(foodCartData[index].qty) != 1))
    {
        foodCartData[index].qty = convertFloat(foodCartData[index].qty) - 1;
        userObject.total = convertFloat(convertFloat(userObject.total) - convertFloat(foodCartData[index].price));

        var itemCountId = "#count"+index;
        $(itemCountId).html(foodCartData[index].qty.toString());
        $('.badge').html(parseInt($('.badge').html()) - 1);

        if(foodCartData[index].qty == 1)
        {
            $('.left-btn').attr("src","/m/en/img/ic_cancel.png");
        }

    }

    $('#totalAmount').html(userObject.total + " NIS");
    hideShowMinAmount(userObject.total);
}


// USER CLICKED ORDER NOW
function OnOrderNowClicked() {

    generateTotalUpdateFoodCart();

    if(convertFloat(userObject.total) < convertFloat(minOrderLimit) )
    {
        $("#minAmount").css("color","red");
    }
    else
    {
        localStorage.setItem("USER_OBJECT", JSON.stringify(userObject));
        localStorage.setItem("FOOD_CARD_DATA", JSON.stringify(foodCartData));

        $("#minAmount").css("color","black");
        window.location.href = '/en/confirm-order.html';
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function convertFloat(num)
{
    return parseFloat(parseFloat(num).toFixed(2));
}