var host = "http://"+window.location.hostname;


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

        url:  host+"/restapi/index.php/categories_with_items",
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

        url:  host+"/restapi/index.php/extras_with_subitems",
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

                    oneTypeStr += ' <div class="sperator"></div> <h3 style="text-align: left">'+extras.extra_with_subitems[x].name_en+'</h3>'+
                        '<div class="custom-drop-down">'+
                        '<input id="input'+x+'" placeholder="Please choose " readonly />'+
                        '<img style="width:13px; position:absolute; right:15px; top:50%; transform:translateY(-50%)" src="img/drop_down.png">'+
                        '<div class="custom-drop-down-list" style=" z-index: 99999;">'+
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
            $('#parent_type_multiple').show();


        },
        error: function(jqXHR, textStatus, errorThrown) {
            // console.log(textStatus, errorThrown);
        }
    });
}




function onOneTypeExtraSubItemSelected(extraIndex, subItemIndex, e) {

    var index = '#input'+extraIndex;

    $(index).val(e.innerHTML);

    var subItem  =     {"subItemId"       : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
        "replace_price"   : extras.extra_with_subitems[extraIndex].price_replace,
        "subItemPrice"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
        "subItemName"     : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
        "qty"             : 1};

    oneTypeSubItems[extraIndex][extras.extra_with_subitems[extraIndex].name_en] =  subItem;

}


function onExtraSubItemSelected(extraIndex, subItemIndex, index) {

    var id = '#checkbox-id-'+extraIndex+subItemIndex;

    var name = extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en;

    if($(id).is(':checked'))
    {
        var subItem  = {"subItemId"      : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].id,
            "subItemPrice"    : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].price,
            "subItemName"     : extras.extra_with_subitems[extraIndex].subitems[subItemIndex].name_en,
            "qty"             : 1};

        multipleTypeSubItems[index][name] = subItem;

    }
    else
    {
        multipleTypeSubItems[index][name] = null;
    }
}



function addOrderToServer() {

    if(oneTypeSubItems)

        $('#parent_type_one').hide();
    $('#parent_type_multiple').hide();


    // SAVE ORDER TO SERVER AGAINST USER
    var order = {"itemId"            : result.categories_items[currentCategoryId].items[currentItemId].id,
        "itemPrice"          : result.categories_items[currentCategoryId].items[currentItemId].price,
        "itemName"           : result.categories_items[currentCategoryId].items[currentItemId].name_en,
        "qty"                : 1 ,
        "subItemsOneType"    : oneTypeSubItems,
        "multiItemsOneType"  : multipleTypeSubItems};


    userObject.orders.push(order);

    generateTotalUpdateFoodCart();

    addOrder();
}


function generateTotalUpdateFoodCart()
{
    foodCartData = [];
    var total = 0;

    for(var x=0; x<userObject.orders.length ;x++)
    {
        var order = userObject.orders[x];
        var orderAmount = parseInt(order.itemPrice) * parseInt(order.qty);      // SET DEFAULT ITEM PRICE FOR ORDER
        var sumTotalAmount = 0;                                                 // TOTAL AMOUNT


        var cartItem = {
            "name": order.itemName,
            "price" : order.itemPrice ,
            "detail" : "" ,
            "orderIndex" : x ,
            "qty" : order.qty,
            "subItemOneIndex" : null,
            "subItemMultipleIndex" : null};


        foodCartData.push(cartItem);

        for (var y = 0; y < order.subItemsOneType.length; y++)
        {
            for (var key in order.subItemsOneType[y])
            {
                // REPLACE THE ORDER AMOUNT IF AMOUNT NEED TO BE REPLACE DUE TO EXTRA TYPE ONE REPLACE PRICE
                if (parseInt(order.subItemsOneType[y][key].replace_price) != 0)
                {
                    orderAmount = parseInt(order.subItemsOneType[y][key].subItemPrice) * parseInt(order.qty);
                    cartItem.price = parseInt(orderAmount);
                    cartItem.detail +=  key+":"+order.subItemsOneType[y][key].subItemName+", ";

                }
                // SUM THE AMOUNT 
                else
                {
                    if(parseInt(order.subItemsOneType[y][key].subItemPrice) != 0) {

                        var cartSubItem = {
                            "name": order.subItemsOneType[y][key].subItemName,
                            "price": order.subItemsOneType[y][key].subItemPrice,
                            "detail": "",
                            "qty" : order.subItemsOneType[y][key].qty,
                            "orderIndex" : x,
                            "subItemOneIndex" : y ,
                            "subItemMultipleIndex" : null
                        };


                        sumTotalAmount = parseInt(sumTotalAmount) +( parseInt(order.subItemsOneType[y][key].subItemPrice) * parseInt(order.subItemsOneType[y][key].qty));
                        foodCartData.push(cartSubItem);
                    }
                    else
                    {
                        cartItem.detail +=  order.subItemsOneType[y][key].subItemName+", ";
                    }
                }

            }
        }


        for (var y = 0; y < order.multiItemsOneType.length; y++)
        {
            for (var key in order.multiItemsOneType[y])
            {
                if(order.multiItemsOneType[y][key] != null)
                {

                    if(parseInt(order.multiItemsOneType[y][key].subItemPrice) != 0)
                    {
                        var cartSubItem = {
                            "name": order.multiItemsOneType[y][key].subItemName,
                            "price": order.multiItemsOneType[y][key].subItemPrice,
                            "detail": "",
                            "qty" : order.multiItemsOneType[y][key].qty,
                            "orderIndex" : x,
                            "subItemOneIndex" : null ,
                            "subItemMultipleIndex" : y
                        };

                        sumTotalAmount = parseInt(sumTotalAmount) + (parseInt(order.multiItemsOneType[y][key].subItemPrice) * parseInt(order.multiItemsOneType[y][key].qty) );
                        foodCartData.push(cartSubItem);
                    }
                    else
                    {
                        cartItem.detail +=  order.multiItemsOneType[y][key].subItemName+", ";
                    }
                }
            }
        }

        total = parseInt(total) +  ( parseInt(orderAmount) + parseInt(sumTotalAmount));
    }

    userObject.total = total;
    console.log('total :'+total);
    console.log(foodCartData);
}


function updateCartElements()
{
    var str = '';

    for(var x=0; x< foodCartData.length ;x++)
    {
        str += '<table>'+
            '<tr>'+
            '<th>'+foodCartData[x].name+'</th>'+
            '<th>'+foodCartData[x].price+' NIS</th>';

        str += '</tr>'+
            '<tr>'+
            '<td>'+foodCartData[x].detail+'</td>'+
            '<td>'+
            '<div class="switch-btn">';

        if(parseInt(foodCartData[x].qty) == 1) {

            str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="img/ic_cancel.png">';
        }
        else
        {
            str += '<img onclick="onQtyDecreasedButtonClicked(' + x + ')" class="left-btn" src="img/ic_reduce.png">';
        }

        str += '<span class="count">'+
            foodCartData[x].qty.toString()+
            '</span>'+
            '<img onclick="onQtyIncreaseButtonClicked('+x+')" class="increase-btn" src="img/ic_plus.png">'+
            '</div>'+
            '</td>'+
            '</tr>'+
            '</table>';

    }

    $('#orderItems').html(str);
    $('#totalAmount').html( userObject.total + " NIS");
}



function onQtyIncreaseButtonClicked(index) {

    // UPDATE ITEM MAIN

    if(foodCartData[index].orderIndex != null && foodCartData[index].subItemOneIndex == null && foodCartData[index].subItemMultipleIndex == null)
    {

        console.log('enter');
        userObject.orders[foodCartData[index].orderIndex].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].qty) + 1;

    }
    // UPDATE ITEM SUB FROM TYPE ONE
    else if(foodCartData[index].orderIndex != null && foodCartData[index].subItemOneIndex != null && foodCartData[index].subItemMultipleIndex == null)
    {

        for(var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex])
        {
            userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex][key].qty = parseInt( userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex][key].qty ) + 1;
        }

    }
    // UPDATE SUB ITEM MULTIPLE
    else
    {
        for(var key in userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex])
        {
            userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex][key].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex][key].qty) + 1;
        }

    }

    foodCartData[index].qty = parseInt(foodCartData[index].qty) + 1;


    userObject.total = parseInt(userObject.total) + parseInt(foodCartData[index].price);

    $('#totalAmount').html(userObject.total + " NIS");


    console.log(foodCartData);
    console.log(userObject);
}



function onQtyDecreasedButtonClicked(index) {

    // UPDATE ITEM MAIN

    if(foodCartData[index].orderIndex != null && foodCartData[index].subItemOneIndex == null && foodCartData[index].subItemMultipleIndex == null)
    {

        if(parseInt(userObject.orders[foodCartData[index].orderIndex].qty) != 1)
        {
            userObject.orders[foodCartData[index].orderIndex].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].qty) - 1;
        }

    }
    // UPDATE ITEM SUB FROM TYPE ONE
    else if(foodCartData[index].orderIndex != null && foodCartData[index].subItemOneIndex != null && foodCartData[index].subItemMultipleIndex == null)
    {
        for(var key in userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex]) {

            if (parseInt(userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex][key].qty) != 1)
            {
                userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex][key].qty = parseInt( userObject.orders[foodCartData[index].orderIndex].subItemsOneType[foodCartData[index].subItemOneIndex][key].qty ) - 1;
            }
        }
    }
    // UPDATE SUB ITEM MULTIPLE
    else
    {
        for(var key in userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex]) {
            if (parseInt(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex][key].qty) != 1) {
                userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex][key].qty = parseInt(userObject.orders[foodCartData[index].orderIndex].multiItemsOneType[foodCartData[index].subItemMultipleIndex][key].qty) - 1;
            }
        }

    }

    if( parseInt(foodCartData[index].qty != 1))
    {
        foodCartData[index].qty = parseInt(foodCartData[index].qty) - 1;
        userObject.total = parseInt(userObject.total) - parseInt(foodCartData[index].price);

    }

   $('#totalAmount').html(userObject.total + " NIS");

}


function OnOrderNowClicked() {

    generateTotalUpdateFoodCart();

    $('.totalBill').html(userObject.total + " NIS");
    $('#restAddress').html(userObject.restaurantAddress);

}

// VALIDATE EMAIL ADDRESS

function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}


// TAKE NAME AND EMAIL ADDRESS
function takeNameAndEmail()
{

    // EXCEPTION HANDLING

    // NAME CANNOT BE EMPTY

    $("#email").removeClass("red-border");
    $("#checkbox-id11").removeClass("red-border");
    $("#address").removeClass("red-border");

    if($("#name").val() == "")
    {
        document.getElementById("name-error").innerHTML = "Empty Name!";
        $("#name").addClass("red-border");
        return;
    }

    // EMAIL CANNOT BE EMPTY
    if($("#email").val() == ""){

        document.getElementById("email-error").innerHTML = "Empty Email!";
        $("#email").addClass("red-border");
        return;
    }
    if( !validateEmail($("#email").val())){
        document.getElementById("email-error").innerHTML = "Invalid Email!";
        $("#email").addClass("red-border");
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

    console.log();

    // DELIVER ADDRESS EMPTY
    if($('#checkbox-id12').is(':checked') && $("#address").val() == "")
    {
        $("#address").addClass("red-border");
        if($("#address").val() == ""){
            document.getElementById("address-error").innerHTML = "Empty Address!";
            document.getElementById("checkbox-error").innerHTML = "";
        }
        else{
            document.getElementById("address-error").innerHTML = "Empty Checkbox!";
        }

        return;
    }


    userObject.name     =  $("#name").val();
    userObject.email    =  $("#email").val();


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

    window.location.href = '../page3.html';

};





