
var userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));

var result                      = null;                                            // SERVER RESPONSE RAW
var restName                    = userObject.restaurantTitle;                      // SELECTED RESTAURANT NAME
var restId                      = userObject.restaurantId;                         // SELECTED RESTAURANT ID
var currentCategoryId           = 0;                                               // CURRENT SELECTED CATEGORY
var currentItemId               = 0;                                               // CURRENT ITEM SELECTED
var currentExtraIndex           = 0;                                               // CURRENT EXTRA SELECTED
var oneTypeSubItems             = [];                                              // SUB-ITEMS TYPE ONE
var multipleTypeSubItems        = [];                                              // SUB-ITEMS TYPE MULTIPLE
var minOrderLimit               = 75;                                              // MINIMUM ORDER LIMIT


// FOOD CART DATA 
var foodCartData                = [];                                               // DISPLAY DATA FOR FOOD CART 



// GET ALL CATEGORIES WITH ITEMS FROM SERVER AGAINST RESTAURANT SELECTED

function  getCategoriesWithItems()
{
    // UPDATE RESTAURANT TITLE
    $('#restName').text(restName);


    $.ajax({

        url: "http://dev.bot2.orderapp.com/webclient/restapi/index.php/categories_with_items",
        type: "post",
        data: {"restaurantId" :  restId },

        success: function (response) {

            result = JSON.parse(response);

            var allCategories = "";

            for(var x=0 ;x <result.categories_items.length;x++)
            {
                //DISPLAY FIRST ELEMENT BY DEFAULT
                if(x == 0)
                {
                    $("#firstItem").attr('value', result.categories_items[x].name_en);
                    currentCategoryId = x;
                    onCategoryChange(x);

                }

                allCategories += '<li onclick="onCategoryChange('+x+')">'+result.categories_items[x].name_en +'</li>';
            }

            $("#categories_list").append(allCategories);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }

    });

}


function onCategoryChange(x) {

    currentCategoryId = x;

    var str = "";

    for(var y=0;y<result.categories_items[x].items.length ; y = y+2)
    {

        str += '<div class="cci-row">';


        str += '<div class="cci-col-50">'+
            '<div onclick="onItemSelected ('+y+')"  class="product-card">'+
            '<img src="'+result.categories_items[x].items[y].image_url+'" />'+
            '<div class="card-body">'+
            '<div class="header"> <span class="dark-text"> '+result.categories_items[x].items[y].name_en+' </span> <span class="cci-badge"> '+result.categories_items[x].items[y].price+' NIS </span> </div>'+
            '<div class="dim-text"> Freshly brewed coffee </div>'+
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
                '<div class="dim-text"> Freshly brewed coffee </div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        str += '</div>';

    }

    $('#cards').html(str);

}



function onItemSelected (y)
{
    currentItemId = y;
    oneTypeSubItems = [];
    multipleTypeSubItems = [];

    $('.circle').css("background-image","url("+result.categories_items[currentCategoryId].items[y].image_url+")");
    $('#itemPopUpTitle').html(result.categories_items[currentCategoryId].items[currentItemId].name_en);
    $('#itemPopUpPrice').html(result.categories_items[currentCategoryId].items[currentItemId].price+' NIS');

    // EXTRAS WITH SUB ITEMS AGAINST ITEM

    $.ajax({

        url: "http://dev.bot2.orderapp.com/webclient/restapi/index.php/extras_with_subitems",
        type: "post",
        data: {"itemId" :  result.categories_items[currentCategoryId].items[currentItemId].id},

        success: function (response) {

            extras  = JSON.parse(response);

            var oneTypeStr = "";
            var multipleTypeStr = "";
            var isOneExist = false;

            for(var x=0 ;x <extras.extra_with_subitems.length;x++)
            {
                if(extras.extra_with_subitems[x].type == "One") {

                    oneTypeStr += '<h3 style="text-align: left">'+extras.extra_with_subitems[x].name_en+'</h3>'+
                        '<div class="custom-drop-down">'+
                        '<input id="input'+x+'" placeholder="Please choose " />'+
                        '<img style="width:13px; position:absolute; right:15px; top:50%; transform:translateY(-50%)" src="img/drop_down.png">'+
                        '<div class="custom-drop-down-list">'+
                        '<ul>';

                    for(var y=0;y<extras.extra_with_subitems[x].subitems.length;y++)
                    {
                        oneTypeStr += '<li onclick="onOneTypeExtraSubItemSelected('+x+','+y+',this)"> ' + extras.extra_with_subitems[x].subitems[y].name_en + '</li>';
                    }

                    oneTypeStr += '</ul>'+
                        '</div>'+
                        '</div>';


                    var subItem = {};

                    subItem[extras.extra_with_subitems[x].name_en] = "";

                    oneTypeSubItems.push(subItem);

                    isOneExist = true;
                }
                else
                {
                    if(extras.extra_with_subitems[x].subitems.length != 0) {

                        // SUB ITEMS WITH MULTIPLE SELECTABLE OPTIONS
                        multipleTypeStr += '<div class="sperator" style="margin-top: 30px; margin-bottom: 30px; border-color: #BFBFBF"></div>' +
                            '<h3 style="text-align: left; margin-bottom: 8px"> ' + extras.extra_with_subitems[x].name_en + ' </h3>' +
                            '<ul id="subItems" class="checkbox-list">';


                        for (var y = 0; y < extras.extra_with_subitems[x].subitems.length; y++) {

                            multipleTypeStr += '<li> <input  type="checkbox" onclick="onExtraSubItemSelected('+x+','+y+','+multipleTypeSubItems.length+')"  id="checkbox-id-'+x.toString()+y.toString()+'" /> <label for="checkbox-id-'+x.toString()+y.toString()+'">' + extras.extra_with_subitems[x].subitems[y].name_en + '</label></li>';

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


        },
        error: function(jqXHR, textStatus, errorThrown) {
            // console.log(textStatus, errorThrown);
        }
    });
}



function onOneTypeExtraSubItemSelected(extraIndex, subItemIndex, e) {

    var index = '#input'+extraIndex;

    $(index).val(e.innerHTML);

    var subItem  =   {"subItemId"       : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
                      "replace_price"   : extras.extra_with_subitems[extraIndex].price_replace,
                      "subItemPrice"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
                      "subItemName"     : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en};

    oneTypeSubItems[extraIndex][extras.extra_with_subitems[extraIndex].name_en] =  subItem;

}


function onExtraSubItemSelected(extraIndex, subItemIndex, index) {

    var id = '#checkbox-id-'+extraIndex+subItemIndex;

    var name = extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en;

    if($(id).is(':checked'))
    {
        var subItem  =  {"subItemId"      : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
                        "subItemPrice"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
                        "subItemName"     : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en};

        multipleTypeSubItems[index][name] = subItem;

    }
    else
    {
        multipleTypeSubItems[index][name] = null;
    }
}



function addOrderToServer() {

    // SAVE ORDER TO SERVER AGAINST USER
    var order = {"itemId"             : result.categories_items[currentCategoryId].items[currentItemId].id,
                 "itemPrice"          : result.categories_items[currentCategoryId].items[currentItemId].price,
                 "itemName"           : result.categories_items[currentCategoryId].items[currentItemId].name_en,
                 "qty"                : 1 ,
                 "subItemsOneType"    : oneTypeSubItems,
                 "multiItemsOneType"  : multipleTypeSubItems};

    userObject.orders.push(order);
}


function generateTotalUpdateFoodCart()
{
    var total = 0;
    
    for(var x=0; x<userObject.orders.length ;x++) 
    {
        var order = userObject.orders[x];
        var orderAmount = order.itemPrice;      // SET DEFAULT ITEM PRICE FOR ORDER
        var sumTotalAmount = 0;                 // TOTAL AMOUNT

        var cartItem = {"name": order.itemName, "price" : order.itemPrice , "detail" : ""};

        foodCartData.push(cartItem);

        for (var y = 0; y < order.subItemsOneType.length; y++) 
        {
            for (var key in order.subItemsOneType[y])
            {

                // REPLACE THE ORDER AMOUNT IF AMOUNT NEED TO BE REPLACE DUE TO EXTRA TYPE ONE REPLACE PRICE
                if (parseInt(order.subItemsOneType[y][key].replace_price) != 0) 
                {
                    orderAmount = parseInt(order.subItemsOneType[y][key].replace_price);
                    cartItem.price = orderAmount;
                    cartItem.detail += " "+order.subItemsOneType[y][key].subItemName;

                }
                // SUM THE AMOUNT 
                else
                {

                    sumTotalAmount +=

                }

            }
        }
    }
}





function updateCartElements()
{
    var str = '';

    for(var x=0; x<userObject.orders.length ;x++)
    {
        str += '<table>'+
            '<tr>'+
            '<th>'+userObject.orders[x].itemName+'</th>'+
            '<th>'+userObject.orders[x].itemPrice.toString()+' NIS</th>';

        str += '</tr>'+
            '<tr>'+
            '<td>In a cream sauce, seasoned with garlic and fresh basil</td>'+
            '<td>'+
            '<div class="switch-btn">'+
            '<img onclick="onQtyDecreasedButtonClicked('+x+')" class="left-btn" src="img/ic_cancel.png">'+
            '<span class="count">'+
            userObject.orders[x].qty.toString()+
            '</span>'+
            '<img onclick="onQtyIncreaseButtonClicked('+x+')" class="increase-btn" src="img/ic_plus.png">'+
            '</div>'+
            '</td>'+
            '</tr>'+
            '</table>';


        for(var y=0;y<userObject.orders[x].subItemsOneType.length;y++)
        {
            for (var key in userObject.orders[x].subItemsOneType[y]) {

                if(parseInt(userObject.orders[x].subItemsOneType[y][key].subItemPrice) != 0) {

                    str += '<table>' +
                        '<tr>' +
                        '<th>' + key + '</th>' +
                        '<th>' + userObject.orders[x].subItemsOneType[y][key].subItemPrice + ' NIS</th>';

                    str += '</tr>' +
                        '<tr>' +
                        '<td>In a cream sauce, seasoned with garlic and fresh basil</td>' +
                        '<td>' +
                        '<div class="switch-btn">' +
                        '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="img/ic_cancel.png">' +
                        '<span class="count">' +
                        userObject.orders[x].qty.toString() +
                        '</span>' +
                        '<img onclick="onQtyIncreaseButtonClicked(' + x + ')" class="increase-btn" src="img/ic_plus.png">' +
                        '</div>' +
                        '</td>' +
                        '</tr>' +
                        '</table>';
                }
            }

        }

    }

    $('#orderItems').html(str);
    $('#totalAmount').html( userObject.total + " NIS");
}



function onQtyIncreaseButtonClicked(index) {

    userObject.orders[index].qty = parseInt(userObject.orders[index].qty) + 1;

    console.log(userObject.orders[index].qty);

    userObject.total = parseInt(userObject.total) + parseInt(userObject.orders[index].itemPrice);

    $('#totalAmount').html(userObject.total + " NIS");
}



function onQtyDecreasedButtonClicked(index) {

    if(parseInt(userObject.orders[index].qty) != 1) {

        userObject.orders[index].qty = parseInt(userObject.orders[index].qty) - 1;
        console.log(userObject.orders[index].qty);

        userObject.total = parseInt(userObject.total) - parseInt(userObject.orders[index].itemPrice);

        $('#totalAmount').html(userObject.total + " NIS");
    }
}


function OnOrderNowClicked() {

    $('.totalBill').html(userObject.total + " NIS");
    $('#restAddress').html(userObject.restaurantAddress);

}


function takeNameAndEmail()
{
    userObject.name =  $("#name").val();
    userObject.email =  $("#email").val();

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

        userObject[9].isCoupon = true;
        goToCoupon();
    }
    else
    {
        goToPAymentChoice();
    }


    console.log(userObject);

}


function confirmOrder(paymentChoice)
{
    var str = "";

    // ALL ORDERS IN ONE STRING DISPLAY FOR USER SUMMARY
    str += '<span> ORDER </span> <a href="#"> edit </a> <br>';

    for(var x=0;x< userObject.orders.length ;x++)
    {
        if( x == 0)
            str += userObject.orders[x].itemName;
        else
            str +=  ", "+userObject.orders[x].itemName;
    };

    $('#all_orders_str').html(str);


    str = "";
    // PAYMENT CHOICE
    if(paymentChoice == 'cash') {

        str += '<span > PAYMENT </span> <a href = "#"> edit </a> <br>'+paymentChoice;
    }
    $('#payment_choice').html(str);


    str = "";

    str = '<span> CUSTOMER INFO </span> <a href="#"> edit </a>'+
        '<br>'+
        userObject[2].name+'<br>'+userObject[3].email+'<br>';

    if(userObject[7].pickFromRestaurant)
    {
        str += "Pick from Restaurant : "+userObject[6].restaurantAddress;
    }
    else
    {
        str += "Delivery Address : "+userObject[5].deliveryAddress;
    }

    $('#userProvidedInfo').html(str);


    str = "";

    if(!userObject[9].isCoupon) {
        str += '<span> COUPON CODE </span> <a href="#"> edit </a>'+
            '<br>'+
            'N/A';
    }

    $('#coupon_detail').html(str);
}


function  callPage3() {

    window.location.href = '../webclient/page3.html';

};


