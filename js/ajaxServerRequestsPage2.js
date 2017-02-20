//SERVER HOST DETAIL

var host = "http://"+window.location.hostname;


// EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
if(localStorage.getItem("USER_OBJECT") == undefined ||localStorage.getItem("USER_OBJECT") == "" || localStorage.getItem("USER_OBJECT") == null)
{
    // SEND USER BACK TO HOME PAGE
    window.location.href = '../index.html';
}

// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
var userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));


var result                      = null;                                            // SERVER RESPONSE RAW
var restName                    = userObject.restaurantTitle;                      // SELECTED RESTAURANT NAME
var restId                      = userObject.restaurantId;                         // SELECTED RESTAURANT ID
var currentCategoryId           = 0;                                               // CURRENT SELECTED CATEGORY
var currentItemIndex            = 0;                                               // CURRENT ITEM SELECTED
var oneTypeSubItems             = [];                                              // SUB-ITEMS TYPE ONE
var multipleTypeSubItems        = [];                                              // SUB-ITEMS TYPE MULTIPLE
var extras                      = null;                                            // EXTRAS FROM SERVER
var minOrderLimit               = localStorage.getItem('min_order_amount');        // MINIMUM ORDER LIMIT


// FOOD CART DATA 
var foodCartData                = [];                                              // DISPLAY DATA FOR FOOD CART
// GET ALL CATEGORIES WITH ITEMS FROM SERVER AGAINST RESTAURANT SELECTED
function  getCategoriesWithItems()
{
    // SET MIN ORDER LIMIT TO ERROR POPUP
    $('#min_order').html("The minimum order is "+minOrderLimit+" NIS");

    // UPDATE RESTAURANT TITLE
    $('#restName').text(restName);

    // SHOW LOADING BEFORE SERVER CALL
    addLoading();


    $.ajax({

        url:  host+"/restapi/index.php/categories_with_items",
        type: "post",
        data: {"restaurantId" :  restId }, // SEND SELECTED RESTAURANT PARAMETER

        // IF SERVER RESPONSE RECEIVED SUCCESSFULLY

        success: function (response) {

            result = JSON.parse(response);

            var allCategories = "";

            for(var x=0 ;x <result.categories_items.length;x++)
            {
                //DISPLAY FIRST ELEMENT BY DEFAULT SELECTED
                if(x == 0)
                {
                    $("#firstItem").attr('value', result.categories_items[x].name_en);
                    currentCategoryId = x;

                    // CALLING FIRST ELEMENT ON CHANGE TO SET CARDS FOR FIRST CATEGORY BY DEFAULT
                    onCategoryChange(x);
                }

                allCategories += '<li onclick="onCategoryChange('+x+')">'+result.categories_items[x].name_en +'</li>';
            }

            // UPDATE ALL CATEGORIES

            $("#categories_list").append(allCategories);



            hideLoading();

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }

    });

}



// USER CHANGED THE SELECTED CATEGORY CHANGE USER ITEMS CARD

function onCategoryChange(x)
{

    $("#firstItem").attr('value', result.categories_items[x].name_en);

    addLoading();

    // SELECTED CATEGORY ID
    currentCategoryId = x;

    // UPDATE SELECTED CATEGORY AVAILABLE ITEM CARDS

    var str = "";

    for(var y=0;y<result.categories_items[x].items.length ; y = y+2)
    {
        str += '<div class="cci-row">';

        str += '<div class="cci-col-50">'+
            '<div onclick="onItemSelected ('+y+')"  class="product-card">'+
            '<img src="'+result.categories_items[x].items[y].image_url+'" />'+
            '<div class="card-body">';

        str+= '<div class="header"> <span class="dark-text"> '+result.categories_items[x].items[y].name_en+' </span> <span class="cci-badge"> '+result.categories_items[x].items[y].price+' NIS </span> </div>'+
            '<div class="dim-text"><span class="wrapDesc"> '+result.categories_items[x].items[y].desc_en+' </span> </div>'+
            '</div>'+
            '</div>'+
            '</div>';

        if(result.categories_items[x].items[y+1] != undefined) {

            var temp = y+1;

            str +=  '<div class="cci-col-50">' +
                '<div onclick="onItemSelected ('+temp+')" class="product-card">' +
                '<img src="'+result.categories_items[x].items[y+1].image_url+'" />' +
                '<div class="card-body">' +
                '<div class="header"> <span class="dark-text"> '+result.categories_items[x].items[y+1].name_en+' </span> <span class="cci-badge"> '+result.categories_items[x].items[y+1].price+' NIS </span> </div>' +
                '<div class="dim-text" ><span class="wrapDesc"> '+result.categories_items[x].items[y+1].desc_en+' </span></div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        str += '</div>';

    }

    // ADD DYNAMIC DATA DISPLAY ALL ITEMS CARDS
    $('#cards').html(str);

    hideLoading();
}



// ON ITEM SELECTED BY USER

function onItemSelected (y)
{
    addLoading();


    currentItemIndex = y;                 // SELECTED ITEM INDEX
    oneTypeSubItems = [];                 // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE ONE (SINGLE SELECTION)
    multipleTypeSubItems = [];            // REINITIALIZE ALL SUB ITEMS SELECTED BY USER TYPE MULTIPLE (MULTIPLE SELECTION)
    itemPrice = result.categories_items[currentCategoryId].items[currentItemIndex].price;

    // DISPLAY ITEM (PRODUCT) DETAIL CARD

    // DISPLAY ITEM IMAGE ROUND
    $('.circle').css("background-image","url("+result.categories_items[currentCategoryId].items[y].image_url+")");

    // UPDATE ITEM NAME
    $('#itemPopUpTitle').html(result.categories_items[currentCategoryId].items[currentItemIndex].name_en);

    $('#itemPopUpPrice').html(result.categories_items[currentCategoryId].items[currentItemIndex].price+' NIS');

    // UPDATE DESCRIPTION

    $('#itemPopUpDesc').html(result.categories_items[currentCategoryId].items[currentItemIndex].desc_en);


    // EXTRAS WITH SUB ITEMS AGAINST ITEM
    $.ajax({

        url:  host+"/restapi/index.php/extras_with_subitems",
        type: "post",
        data: {"itemId" :  result.categories_items[currentCategoryId].items[currentItemIndex].id}, // CURRENT ITEM ID AS PARAMETER TO SERVER

        // RESPONSE RECEIVE SUCCESSFULLY

        success: function (response) {

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

                    for(var y=0;y<extras.extra_with_subitems[x].subitems.length;y++)
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected('+oneTypeSubItems.length+','+y+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '</li>';

                        if (extras.extra_with_subitems[x].price_replace == 1)
                        {
                            if (y ==0 || (parseInt(extras.extra_with_subitems[x].subitems[y].price) < minPrice))
                            {
                                minPrice = extras.extra_with_subitems[x].subitems[y].price;
                                minSubItemName = extras.extra_with_subitems[x].subitems[y].name_en;
                                minY = y;
                            }
                        }
                    }

                    if(first == false)
                    {
                        oneTypeStr += '<div class="sperator"></div>';
                    }
                    else {
                        first = true;
                    }

                    oneTypeStr += '<h3 style="text-align: left" >' + extras.extra_with_subitems[x].name_en + '</h3>'+
                        '<div class="custom-drop-down">'+
                        '<input id="input'+oneTypeSubItems.length+'" value ="'+ minSubItemName +' " readonly />'+
                        '<img style="width:13px; position:absolute; right:15px; top:19px" src="img/drop_down.png">'+
                        '<div class="custom-drop-down-list" style=" z-index: 99999;">'+
                        '<ul>';

                    oneTypeStr += temp;

                    oneTypeStr += '</ul> </div><span style="font-size:8px; color:red;" id="error-one-type'+oneTypeSubItems.length+'"></span> </div>';

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
                        // SUB ITEMS WITH MULTIPLE SELECTABLE OPTIONS

                        if(first == false)
                        {
                            multipleTypeStr += '<div class="sperator" style="margin-top: 30px; margin-bottom: 30px; border-color: #BFBFBF"></div>';
                        }
                        else {
                            first = true;
                        }

                        multipleTypeStr += '<h3 style="text-align: left; margin-bottom: 8px">'+extras.extra_with_subitems[x].name_en+'</h3>' +
                            '<ul id="subItems" class="checkbox-list">';

                        for (var y = 0; y < extras.extra_with_subitems[x].subitems.length; y++)
                        {
                            if(parseInt(extras.extra_with_subitems[x].subitems[y].price) > 0)
                            {
                                // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                                multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' + x + ',' + y + ',' + multipleTypeSubItems.length + ')"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
                                    ' <label for="checkbox-id-' + x.toString() + y.toString() + '">'
                                    + extras.extra_with_subitems[x].subitems[y].name_en.capitalize()+" (+"+extras.extra_with_subitems[x].subitems[y].price+")"+'</label></li>';
                            }
                            else
                            {
                                // ON CLICK PASSING EXTRA ID AND SUB ITEM ID
                                multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected(' + x + ',' + y + ',' + multipleTypeSubItems.length + ')"  id="checkbox-id-' + x.toString() + y.toString() + '" />' +
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


            resize();
            hideLoading();

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // console.log(textStatus, errorThrown);
        }
    });
}



// ON ONE TYPE EXTRA SELECTED BY USER
function onOneTypeExtraSubItemSelected(extraIndex, subItemIndex, e) {

    if(parseInt(extras.extra_with_subitems[extraIndex].price_replace) == 1)
    {
        $('#itemPopUpPrice').html(extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price+' NIS');
    }

    var index = '#input'+extraIndex;
    $(index).val(e.innerHTML);

    // REMOVE ERROR MESSAGES ON SELECTION
    $(index).removeClass("red-border-c");
    var error = '#error-one-type'+extraIndex;
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
    oneTypeSubItems[extraIndex][extras.extra_with_subitems[extraIndex].name_en] =  subItem;
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

    }

    // IF CHECK BOX NOT CHECKED REMOVE SUB ITEM

    else
    {
        multipleTypeSubItems[index][name] = null;
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
                var index = '#input' + x;


                $(index).addClass("red-border-c");
                scrollToError(index);


                var error = '#error-one-type'+x;
                $(error).html("Select options!");
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
        "multiItemsOneType"  : multipleTypeSubItems};


    userObject.orders.push(order);

    generateTotalUpdateFoodCart();

    addOrder(); // FRONT END UPDATE CALL
}


// COMPUTATION TO GENERATE TOTAL AND UPDATED FOOD ITEM CART DATA
function generateTotalUpdateFoodCart()
{
    foodCartData = [];
    var total = 0;

    for(var x=0; x<userObject.orders.length ;x++)
    {

        var order          = userObject.orders[x]; // GET USER ORDERS ONE BY ONE
        var orderAmount    = parseInt(order.itemPrice) * parseInt(order.qty); // SET DEFAULT ITEM PRICE FOR ORDER
        var sumTotalAmount = 0;  // TOTAL AMOUNT

        // FOOD CARD ITEM  FOR MAIN ITEM
        var cartItem = {
            "name": order.itemName,
            "name_he": order.itemNameHe,
            "price" : order.itemPrice ,
            "detail" : "" ,
            "detail_he" : "" ,
            "orderIndex" : x ,
            "qty" : order.qty,
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

                if (parseInt(order.subItemsOneType[y][key].replace_price) != 0)
                {
                    orderAmount = parseInt(order.subItemsOneType[y][key].subItemPrice) * parseInt(order.qty);
                    cartItem.price = parseInt(orderAmount);
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


                }
                // SUM THE SUB ITEM AMOUNT
                // SUM THE AMOUNT 
                else
                {
                    if(parseInt(order.subItemsOneType[y][key].subItemPrice) != 0) {

                        sumTotalAmount = parseInt(sumTotalAmount) +( parseInt(order.subItemsOneType[y][key].subItemPrice) * parseInt(order.subItemsOneType[y][key].qty));

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
                    if(parseInt(order.multiItemsOneType[y][key].subItemPrice) != 0)
                    {
                        sumTotalAmount = parseInt(sumTotalAmount) + (parseInt(order.multiItemsOneType[y][key].subItemPrice) * parseInt(order.multiItemsOneType[y][key].qty) );

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
        cartItem.price = ((parseInt(orderAmount) + parseInt(sumTotalAmount)) / parseInt(order.qty));

        total = parseInt(total) +  ( parseInt(orderAmount) + parseInt(sumTotalAmount));
    }


    userObject.total = total;
//  console.log('total :'+total);
//  console.log(foodCartData);
}


// UPDATE FOOD CART
function updateCartElements()
{

    // DISPLAY FOOD CART IF AT LEAST ONE ITEM TO DISPLAY
    if(foodCartData.length != 0)
    {
        addLoading();

        var str = '';

        for (var x = 0; x < foodCartData.length; x++)
        {

            str += '<table>' +
                '<tr>' +
                '<th>' + foodCartData[x].name + '</th>' +
                '<th>' + foodCartData[x].price + ' NIS</th>';


            str += '</tr>' +
                '<tr>' +
                '<td>' + foodCartData[x].detail + '</td>' +
                '<td>' +
                '<div class="switch-btn">';


            // BUTTON DECREASE OR CANCEL DEPENDS ON QUANTITY
            if (parseInt(foodCartData[x].qty) == 1) {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="img/ic_cancel.png">';
            }
            else
            {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="img/ic_reduce.png">';
            }


            str += '<span class="count">' +
                foodCartData[x].qty.toString() +
                '</span>' +
                '<img onclick="onQtyIncreaseButtonClicked(' + x + ')" class="increase-btn" src="img/ic_plus.png">' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '</table>';

        }

        $('#orderItems').html(str);
        $('#totalAmount').html(userObject.total + " NIS");

        hideLoading();
    }
}

// USER WANT TO INCREASE THE QUANTITY OF ITEMS FROM ORDER

function onQtyIncreaseButtonClicked(index) {

    // UPDATE ITEM MAIN
    userObject.orders[foodCartData[index].orderIndex].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].qty) + 1;

    // INCREASE THE QTY OF SUB ITEMS ONE TYPE
    for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].subItemsOneType.length;x++)
    {
        for (var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x])
        {
            if(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key] != null) {

                userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty =
                    parseInt(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty) + 1;
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
                    (parseInt(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty) + 1);
            }
        }
    }

    foodCartData[index].qty = parseInt(foodCartData[index].qty) + 1;

    userObject.total = parseInt(userObject.total) + parseInt(foodCartData[index].price);


    $('#totalAmount').html(userObject.total + " NIS");

    increaseCounter();


}


// USER WANT TO DECREASE THE QUANTITY OR REMOVE OF ITEMS FROM ORDER

function onQtyDecreasedButtonClicked(index) {

    // UPDATE ITEM MAIN

    // DECREASE QUANTITY
    if(parseInt(userObject.orders[foodCartData[index].orderIndex].qty) != 1)
    {

        userObject.orders[foodCartData[index].orderIndex].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].qty) - 1;

        // DECREASE THE QTY OF SUB ITEMS ONE TYPE
        for(var x=0;x<userObject.orders[foodCartData[index].orderIndex].subItemsOneType.length;x++)
        {
            for (var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x])
            {
                if(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key] != null) {

                    userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty =
                        parseInt(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[x][key].qty) -  1;
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
                        (parseInt(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[x][key].qty) - 1);
                }
            }
        }


    }
    // REMOVE ITEM
    else
    {
        // IF MAIN ITEM DELETED ALL SUB ITEMS ALSO DELETED

        userObject.total = parseInt(userObject.total) - parseInt(foodCartData[index].price);

        userObject.orders.splice(foodCartData[index].orderIndex, 1);

        generateTotalUpdateFoodCart();

        if(foodCartData.length == 0)
        {
            $("#food-cart-popup").slideUp();
            $("#overlay").fadeOut();

        }
        else
        {
            updateCartElements();

        }


    }


    if(foodCartData.length != 0 && foodCartData[index] != undefined  && (parseInt(foodCartData[index].qty) != 1))
    {
        foodCartData[index].qty = parseInt(foodCartData[index].qty) - 1;
        userObject.total = parseInt(userObject.total) - parseInt(foodCartData[index].price);
    }

    decreaseCounter();
    $('#totalAmount').html(userObject.total + " NIS");
}



// USER CLICKED ORDER NOW

function OnOrderNowClicked() {


    generateTotalUpdateFoodCart();

    $('.totalBill').html(userObject.total + " NIS");
    $('#restAddress').html(userObject.restaurantAddress);


    orderNow(); // CALL TO FRONT END  // MOVE USER TO TAKE PERSONAL INFORMATION
}



// VALIDATE EMAIL ADDRESS

function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}



// SAVE USER INFORMATION
function takeNameAndEmail()
{
    // EXCEPTION HANDLING

    // NAME CANNOT BE EMPTY

    $("#email").removeClass("red-border");
    $("#contact").removeClass("red-border");
    $("#checkbox-id11").removeClass("red-border");
    $("#address").removeClass("red-border");

    if($("#name").val() == "")
    {
        document.getElementById("name-error").innerHTML = "*Required Field";
        $("#name").addClass("red-border");
        return;
    }


    // EMAIL CANNOT BE EMPTY
    if($("#email").val() == ""){

        document.getElementById("email-error").innerHTML = "*Required Field";
        $("#email").addClass("red-border");
        return;
    }

    if( !validateEmail($("#email").val())){
        document.getElementById("email-error").innerHTML = "Invalid Email!";
        $("#email").addClass("red-border");
        return;
    }

    // CONTACT NO CANNOT BE EMPTY

    if($("#contact").val() == ""){

        document.getElementById("contact-error").innerHTML = "*Required Field";
        $("#contact").addClass("red-border");
        return;
    }


    // VALIDATION OF CONTACT NO NOT CONTAIN CHAR EXCEPT +

    var contact = $("#contact").val().replace('+','');

    if(!(/^\d+$/.test(contact)))
    {
        document.getElementById("contact-error").innerHTML = "Invalid Phone Number!";
        $("#contact").addClass("red-border");
        return;
    }


    // NEED TO CHECK ATLEAST ONE CHECK BOX
    if(!$('#checkbox-id11').is(':checked') &&  !$('#checkbox-id12').is(':checked'))
    {
        $("#checkbox-id11").addClass("red-border");
        document.getElementById("checkbox-error").innerHTML = "Please select atleast one checkbox!";
        document.getElementById("address-error").innerHTML = "";
        return;
    }


    // DELIVER ADDRESS EMPTY
    if($('#checkbox-id12').is(':checked') && $("#address").val() == "")
    {
        $("#address").addClass("red-border");

        if($("#address").val() == ""){
            document.getElementById("address-error").innerHTML = "Empty Address!";
            document.getElementById("checkbox-error").innerHTML = "";
        }
        else
        {
            document.getElementById("address-error").innerHTML = "Empty Checkbox!";
        }

        return;
    }


    userObject.name       =  $("#name").val();
    userObject.email      =  $("#email").val();
    userObject.contact    =  $("#contact").val();


    // PICK FROM RESTAURANT
    if($('#checkbox-id11').is(':checked')) {

        userObject.pickFromRestaurant = true;
    }
    // DELIVERY
    else
    {
        userObject.deliveryAddress =  $('#address').val();
    }


    $("#customer-popup").slideUp();


    // COUPON CODE
    if($('#checkbox-id13').is(':checked'))
    {

        $('#coupon_section').show();
        userObject.isCoupon = true;
        $("#coponInput").removeClass('red-border-c');
        $('#couponError').html('');
        goToCoupon();    // MOVE USER TO TAKE COUPON CODE
    }
    else
    {
        $('#coupon_section').hide();
        goToPaymentChoice();   // MOVE USER DIRECT TO PAYMENTS SKIP COUPON
    }


    console.log(userObject);
}



function hideCoupon() {

    userObject.isCoupon = false;
    $('#coupon_section').hide();
}



function CheckCouponFromServer() {


    $("#couponError").html("");

    var code = $("#coponInput").val();

    if (code != "") {

        addLoading();

        //  REQUEST COUPON VALIDATION
        $.ajax({

            url: host + "/restapi/index.php/coupon_validation",
            type: "post",
            data: {
                "code": code,
                "email": userObject.email
            }, // COUPON CODE TO VALIDATE AND USER EMAIL

            // RESPONSE RECEIVE SUCCESSFULLY

            success: function (response) {

                var responseCoupon = JSON.parse(response);

                console.log(responseCoupon);

                // COUPON IS VALID
                if (responseCoupon.success == true) {
                    var newTotal = 0;
                    userObject.discount = responseCoupon.amount;
                    var discountedAmount = 0;

                    if (responseCoupon.isFixAmountCoupon) {
                        userObject.isFixAmountCoupon = true;

                        discountedAmount = parseInt(userObject.discount);

                        newTotal = parseInt(userObject.total) - parseInt(userObject.discount);

                        $('#discountAmount').html("-" + discountedAmount);
                    }
                    else {

                        userObject.isFixAmountCoupon = false;

                        discountedAmount = ((parseInt(userObject.total) * parseInt(userObject.discount)) / 100);

                        newTotal = userObject.total - discountedAmount;

                        $('#discountAmount').html("-" + userObject.discount+"%");

                    }

                    $('.totalBill').html(newTotal + " NIS");
                    $('#code').val(code);
                    $('#oldTotal').html(userObject.total);
                    $('#newTotal').html(newTotal);

                    userObject.totalWithoutDiscount = userObject.total;
                    userObject.total = newTotal;

                    $('#coupon_section').show();
                    goToConfirmCoupon();  // COUPON IS VALID GO TO NEXT POPUP TO DISPLAY COUPON DETAIL
                }
                // INVALID COUPON CODE
                else {
                    $('#coupon_section').hide();
                    $("#coponInput").addClass('red-border-c');
                    $("#couponError").html("Oops, this Coupons wrong, Try Again!");
                    $("#coponInput").val('');
                }


                hideLoading();

            },
            error: function (jqXHR, textStatus, errorThrown) {

                hideLoading();
            }
        });

    }
    else {

        // EXCEPTION EMPTY COUPON CODE

        $("#couponError").html("Enter Coupon Code!");
        $("#coponInput").addClass('red-border-c');
    }

};



// CREDIT CARD PAYMENT
function payment_credit_card() {

    addLoading();

    //  REQUEST COUPON VALIDATION
    $.ajax({

        url: host + "/restapi/index.php/get_credit_card_payment_url",
        type: "post",
        data: {
            "amount": userObject.total,
            "email": userObject.email
        }, //  AMOUNT OF ORDER AND USER EMAIL

        // RESPONSE RECEIVE SUCCESSFULLY

        success: function (response) {

            var resp = decodeURIComponent(JSON.parse(response));
            console.log(resp);

            $('#payment_guard').html("<iframe src='"+resp+"' width='100%' height='100%' frameBorder='0'/>");

            goToCards();
            hideLoading();

        },
        error: function (jqXHR, textStatus, errorThrown) {

            hideLoading();
        }
    });

}

function onPaymentCancel() {

    goToPaymentChoice();
}


function onPaymentSuccess()
{
    confirmOrder('creditCard');
    goToConfirmOrder();
}


// PAYMENT OPTION WHAT USER CHOOSE CASH OR CREDIT
function confirmOrder(paymentChoice)
{
    var str = "";

    // ALL ORDERS IN ONE STRING DISPLAY FOR USER SUMMARY
    str += '<span> ORDER </span> <a href="#"></a> <br>';

    for(var x=0;x< foodCartData.length ;x++)
    {
       str += "<b>"+foodCartData[x].name+"</b>"+"<br>"+foodCartData[x].detail+"<br>";
    }

    $('#all_orders_str').html(str);



    str = "";
    // PAYMENT CHOICE
    if(paymentChoice == 'cash')
    {
        str += '<span > PAYMENT </span> <a href = "#"></a> <br>'+paymentChoice;

        userObject['Cash_Card'] = "CASH";
        userObject['Cash_Card_he'] = "כסף מזומן";

    }
    else if(paymentChoice == 'creditCard')
    {
        str += '<span > PAYMENT </span> <a href = "#"> </a> <br>'+'payment received through credit card';

        userObject['Cash_Card'] = "Credit Card";
        userObject['Cash_Card_he'] = "כרטיס אשראי";
    }

    $('#payment_choice').html(str);

    str = "";

    str = '<span> CUSTOMER INFO </span> <a href="#"> </a>'+
        '<br>'+
        userObject.name+'<br>'+userObject.email+'<br>'+userObject.contact+'<br>';

    if(userObject.pickFromRestaurant)
    {
        str += "Pick from Restaurant : "+userObject.restaurantAddress;
    }
    else
    {
        str += "Delivery Address : "+userObject.deliveryAddress;
    }

    $('#userProvidedInfo').html(str);


    str = "";

    if(!userObject.isCoupon) {
        str += '<span> COUPON CODE </span> <a href="#"> </a>'+
            '<br>'+
            'N/A';
    }
    else
    {
        if(userObject.isFixAmountCoupon) {

            str += '<span> COUPON CODE </span> <a href="#"> </a>' +
                '<br>' +
                'Discount = -'+userObject.discount;
        }
        else
        {
            str += '<span> COUPON CODE </span> <a href="#"> </a>' +
                '<br>' +
                'Discount = -'+userObject.discount+"%";
        }
    }

    $('#coupon_detail').html(str);
}


// SEND ORDER USER TO SERVER & CALL PAGE 3

function  callPage3() {

    userObject.cartData = foodCartData;

    localStorage.setItem("USER_OBJECT", "");

    addLoading();

    $.ajax({

        url: host + "/restapi/index.php/add_order",
        type: "post",
        data: {
            "user_order": userObject
        }, // COUPON CODE TO VALIDATE AND USER EMAIL

        // RESPONSE RECEIVE SUCCESSFULLY

        success: function (response) {

            userObject = null;
            window.location.href = '../page3.html';
            hideLoading();
        },
        error: function (jqXHR, textStatus, errorThrown) {

            alert("Server Error");
            hideLoading();
        }
    });

};


//SHOW LOADER ON AJAX CALLS
function addLoading(){

    $("body").addClass("blur-class");
    $("#loader").css("display" , "block");
}

// HIDE LOADING ON AJAX CALLS

function hideLoading(){
    setTimeout(function() {
        $("body").removeClass("blur-class");
        $("#loader").css("display" , "none");
    }, 1000);
}

function scrollToError(id) {


    $('#mid-scroll').animate({

        scrollTop: 70

    }, 200);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}