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
var selectedItemPrice           = 0;


//SERVER HOST DETAIL

$(document).ready(function() {


    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if(localStorage.getItem("USER_OBJECT") == undefined ||localStorage.getItem("USER_OBJECT") == "" || localStorage.getItem("USER_OBJECT") == null)
    {

        // SEND USER BACK TO HOME PAGE
        window.location.href = '/m/en/index.html';

    }


// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));



    result                      = null;                                            // SERVER RESPONSE RAW
    restName                    = userObject.restaurantTitle;                      // SELECTED RESTAURANT NAME
    restId                      = userObject.restaurantId;                         // SELECTED RESTAURANT ID
    currentCategoryId           = 0;                                               // CURRENT SELECTED CATEGORY
    currentItemIndex            = 0;                                               // CURRENT ITEM SELECTED
    oneTypeSubItems             = [];                                              // SUB-ITEMS TYPE ONE
    multipleTypeSubItems        = [];                                              // SUB-ITEMS TYPE MULTIPLE
    extras                      = null;                                            // EXTRAS FROM SERVER
    minOrderLimit               = localStorage.getItem('min_order_amount');        // MINIMUM ORDER LIMIT



    // REQUEST SERVER GET CATEGORIES WITH ITEMS
    commonAjaxCall("/restapi/index.php/categories_with_items",{"restaurantId" :  restId },getCategoriesWithItems);

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

        if(x == 0)
        {
            allCategoriesWithItems += '<li class="active">';
        }
        else
        {
            allCategoriesWithItems += '<li>';
        }

        allCategoriesWithItems += '<a class="opener">'+
            '<img src="'+result.categories_items[x].image_url+'" alt="images description">'+
            '<div class="text">'+
            '<h3>'+result.categories_items[x].name_en+'</h3>'+
            '</div>'+
            '</a>'+
            '<div class="slide">';


        for(var y=0;y<result.categories_items[x].items.length ; y++)
        {

            allCategoriesWithItems +=  '<div class="add-row" onclick="onItemSelected('+x+','+y+')">'+
                '<h4>'+result.categories_items[x].items[y].name_en+'<span>'+result.categories_items[x].items[y].price+' NIS</span></h4>'+
                '<div class="box">'+
                '<a  class="btn-icon"><img src="/m/en/img/add.png" alt="images description"></a>'+
                '<p>'+result.categories_items[x].items[y].desc_en+'</p>'+
                '</div>'+
                '</div>';


        }

        allCategoriesWithItems += '</div>'+
            '</li>';
    }


    // UPDATE ALL CATEGORIES

    $("#categories_list").append(allCategoriesWithItems);


    initAccordion();

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
                if (extras.extra_with_subitems[x].price_replace == 1)
                {
                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0) {

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+ oneTypeSubItems.length +',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  (' + extras.extra_with_subitems[x].subitems[y].price + ') </li>';
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

                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '  (+' + extras.extra_with_subitems[x].subitems[y].price + ') </li>';
                    }
                    else
                    {
                        temp += '<li onclick="onOneTypeExtraSubItemSelected(' + x + ',' + y +','+oneTypeSubItems.length+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en +'</li>';
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
                '<img style="width:13px; position:absolute; right:15px; top:19px" src="/m/en/img/drop_down.png">'+
                '<div class="custom-drop-down-list" style=" z-index: 99999;">'+
                '<ul>';

            oneTypeStr += temp;

            oneTypeStr += '</ul> </div><span style="font-size:8px; color:red; " id="error-one-type'+oneTypeSubItems.length+'"></span> </div>';

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
                    if(convertFloat(extras.extra_with_subitems[x].subitems[y].price) > 0)
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


    var index = '#input'+oneTypeIndex;
    $(index).val(e.innerHTML);

    // REMOVE ERROR MESSAGES ON SELECTION
    $(index).removeClass("red-border-c");
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
                var index = '#input' + x;


                $(index).addClass("red-border-c");
                scrollToError(index);


                var error = '#error-one-type'+x;
                $(error).html("Select Option!");
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
                '<th>' + foodCartData[x].price_without_subItems + ' NIS</th>';


            str += '</tr>' +
                '<tr>' +
                '<td>' + foodCartData[x].detail + '</td>' +
                '<td>' +
                '<div class="switch-btn">';


            // BUTTON DECREASE OR CANCEL DEPENDS ON QUANTITY
            if (convertFloat(foodCartData[x].qty) == 1) {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="/m/en/img/ic_cancel.png">';
            }
            else
            {

                str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="/m/en/img/ic_reduce.png">';
            }


            str += '<span class="count">' +
                foodCartData[x].qty.toString() +
                '</span>' +
                '<img onclick="onQtyIncreaseButtonClicked(' + x + ')" class="increase-btn" src="/m/en/img/ic_plus.png">' +
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

    increaseCounter();


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
            $("#food-cart-popup").slideUp();
            $("#overlay").fadeOut();

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
        document.getElementById("checkbox-error").innerHTML = "Please select at least one checkbox!";
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
        userObject.deliveryAddress = "";
    }
    // DELIVERY
    else
    {
        userObject.deliveryAddress =  $('#address').val();
        userObject.pickFromRestaurant = false;
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

        commonAjaxCall("/restapi/index.php/coupon_validation", {"code": code, "email": userObject.email},checkCouponCallBack);
    }
    else
    {
        // EXCEPTION EMPTY COUPON CODE

        $("#couponError").html("Enter Coupon Code!");
        $("#coponInput").addClass('red-border-c');
    }

};



function checkCouponCallBack(response)
{
    var responseCoupon = JSON.parse(response);

    var code = $("#coponInput").val();

    userObject.couponCode = code;

    console.log(responseCoupon);

    // COUPON IS VALID
    if (responseCoupon.success == true)
    {

        var newTotal = 0;

        userObject.discount = responseCoupon.amount;
        var discountedAmount = 0;

        if (responseCoupon.isFixAmountCoupon) {

            userObject.isFixAmountCoupon = true;

            discountedAmount = convertFloat(userObject.discount);

            newTotal = convertFloat(convertFloat(userObject.total) - convertFloat(userObject.discount));

            $('#discountAmount').html("-" + discountedAmount);
        }
        else {

            userObject.isFixAmountCoupon = false;

            discountedAmount = convertFloat(((convertFloat(userObject.total) * convertFloat(userObject.discount)) / 100));

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
    else
    {

        $('#coupon_section').hide();
        $("#coponInput").addClass('red-border-c');
        $("#couponError").html("Oops, this Coupons wrong, Try Again!");
        $("#coponInput").val('');
    }
}



// CREDIT CARD PAYMENT
function payment_credit_card(token) {


    commonAjaxCall("/restapi/index.php/stripe_payment_request", {"amount" : userObject.total, "email"  : userObject.email, "token"  : token},paymentCreditCardCallBack);

}


function paymentCreditCardCallBack(response) {

    var resp = '';

    try {

        resp = JSON.parse(response);
    }
    catch (e)
    {
        resp = response;
        console.log(resp);
    }

    if(response == "success")
    {
        onPaymentSuccess();
        hideLoading();
    }
    else
    {
        $(".payment-errors").html(resp);
        $(".payment-errors").show();
        hideLoading();

        var delayMillis = 500; //1 second

        setTimeout(function() {

            $("#creditSection").animate({

                scrollTop: 500

            }, 200);


        }, delayMillis);


    }

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
        str += "<b>"+foodCartData[x].name+" X "+foodCartData[x].qty+"</b>"+"<br>"+foodCartData[x].detail+"<br>";
    }

    $('#all_orders_str').html(str);



    str = "";
    // PAYMENT CHOICE
    if(paymentChoice == 'cash')
    {
        str += '<span > PAYMENT </span> <a href = "#"></a> <br> Cash';

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

        // str += '<span> COUPON CODE </span> <a href="#"> </a>'+
        //     '<br>'+
        //     'N/A';

        $('#couponParent').css("display","none");

    }
    else
    {

        $('#couponParent').css("display","block");


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

    commonAjaxCall("/restapi/index.php/add_order",{"user_order": userObject},callPage3CallBack);

};


function callPage3CallBack(response) {


    userObject = null;
    window.location.href = '/m/en/page3.html';
    hideLoading();


}


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


    $('#scroll_error').animate({

        scrollTop: 200

    }, 200);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function convertFloat(num)
{
    return parseFloat(parseFloat(num).toFixed(2));
}