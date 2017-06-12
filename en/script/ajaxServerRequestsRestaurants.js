var host                = null;
var selectedCityId      = null;
var allRestJson         = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS
var userObject          = null;
var rawResponse         = null;


// AFTER DOCUMENTED LOADED
$(document).ready(function() {




    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if (localStorage.getItem("USER_CITY_ID") == undefined || localStorage.getItem("USER_CITY_ID") == "" || localStorage.getItem("USER_CITY_ID") == null) {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '../index.html';
    }


// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    selectedCityId = JSON.parse(localStorage.getItem("USER_CITY_ID"));


// USER ORDER INFORMATION
    userObject = {

        'uid' : '',                        // UNIQUE USER ID
        'language': 'en',                  // USER LANGAGUE ENGLISH
        'restaurantId': "",                // RESTAURANT ID SELECTED BY USER
        'restaurantTitle': "",             // SELECTED RESTAURANT TITLE
        'pickup_hide': false,              // IS PICK UP OPTION HIDE
        'restaurantTitleHe': "",           // SELECTED RESTAURANT TITLE
        'restaurantAddress': "",           // SELECTED RESTAURANT ADDRESS
        'name': "",                        // USER NAME
        'email': "",                       // USER EMAIL
        'contact': "",                     // USER CONTACT
        'orders': [],                      // USER ORDERS
        'total': 0,                        // TOTAL AMOUNT OF ORDER
        'pickFromRestaurant': false,       // USER PICK ORDER FROM RESTAURANT ? DEFAULT NO
        'deliveryAptNo': "",               // USER DELIVERY APARTMENT NO
        'deliveryAddress': "",             // USER ORDER DELIVERY ADDRESS
        'isCoupon': false,                 // USER HAVE COUPON CODE ?
        'couponCode': '',                  // COUPON CODE OF USER
        'isFixAmountCoupon': false,        // IF DISCOUNT AMOUNT IS FIXED AMOUNT  IF TRUE IT WILL BE A FIX PERCENTAGE
        'discount': 0,                     // DISCOUNT ON COUPON VALUE
        'Cash_Card': null,                 // USER WANT TO PAY CASH OR CREDIT CARD
        'Cash_Card_he': null,              // USER WANT TO PAY CASH OR CREDIT CARD
        'cartData': null,                  // COMPUTED CART DATA
        'totalWithoutDiscount': null,      // TOTAL WITHOUT DISCOUNT
        'deliveryArea': null,              // DELIVERY AREA
        'deliveryCharges':null,            // DELIVERY CHARGES
        'specialRequest':"",               // SPECIAL REQUEST FROM USER
        'trans_id':""                      // SPECIAL REQUEST FROM USER

    };

    commonAjaxCall("/restapi/index.php/get_all_restaurants",{'city_id':selectedCityId},getAllRestaurants);      // GET LIST OF ALL RESTAURANTS FROM SERVER

});



function onFilterChange() {

    if(rawResponse == null) {

        commonAjaxCall("/restapi/index.php/get_all_restaurants", {'city_id': selectedCityId}, getAllRestaurants);      // GET LIST OF ALL RESTAURANTS FROM SERVER
    }
    else {

        getAllRestaurants(rawResponse);

    }
}


// GET ALL RESTAURANTS FROM COMMON AJAX CALL
function  getAllRestaurants(response)
{

    rawResponse = response;

    var result = JSON.parse(response);

    allRestJson = result;   // MAKE SERVER RESPONSE GLOBAL FOR ACCESS IN OTHER FUNTIONS

    var allRestaurants = "";

    for(var x=0 ;x <result.length;x++)
    {
        var isShow = false;


        if((!$('#cb_milky').is(":checked")) && (!$('#cb_meat').is(":checked")) &&  (!$('#cb_health').is(":checked")) &&  (!$('#cb_pizzeria').is(":checked")) && (!$('#cb_hamburger').is(":checked"))
        && (!$('#cb_sushi').is(":checked")) && (!$('#cb_mehadrin').is(":checked")) )
        {
            isShow = true;
        }
        else
        {

            for (var y = 0; y < result[x].tags.length; y++) {

                if ($('#cb_milky').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];


                    if ((tag.toLowerCase()).includes('dairy')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_meat').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('meat')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_health').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('health')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_pizzeria').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('pizza')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_hamburger').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('burgers')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_sushi').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('sushi')) {
                        isShow = true;
                        break;
                    }

                }
                if ($('#cb_mehadrin').is(":checked")) {

                    var tag = result[x].tags[y]['name_en'];

                    if ((tag.toLowerCase()).includes('mehadrin')) {
                        isShow = true;
                        break;
                    }

                }


            }

        }

        if(isShow) {

            var temp = "";
            var tagsString = fromTagsToString(result[x]);

            var str2 = ' ';
            var str1 = result[x].description_en;

            // RESTAURANTS DESCRIPTION LENGTH CHECK
            if (result[x].description_en.length > 200) {
                var yourString = result[x].description_en; //replace with your string.
                var maxLength = 200 // maximum number of characters to extract

                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);

                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

                str1 = trimmedString;
                str2 += result[x].description_en.replace(trimmedString, "");
            }

            // RESTAURANT CURRENTLY ACTIVE
            if (result[x].availability || window.location.hostname == "dev.orderapp.com") //(result[x].availability)
            {

                temp +=

                    '<div class="row separator">' +
                    '<div class="col-md-2 col-sm-2 col-xs-2 center-content">' +
                    '<div class="circular-logo">';

                if (result[x].coming_soon == 0) {
                    temp += '<span class="status"></span>';
                }
                else {
                    temp += '<span class="status offline"></span>';
                }
                temp += '<div class="logo-container">' +
                    '<img class="rest_img" src="' + result[x].logo + '">' +
                    '</div>' +
                    '<div class="arrow"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-8 col-sm-8 col-xs-8">' +
                    '<div class="row">' +
                    '<div class="col-md-12 col-sm-12 col-xs-12">' +
                    '<h2 class="row-heading">' + result[x].name_en +
                    '<div class="title-frame">' +
                    '<span class="title">כשר</span>' +
                    '<div class="tooltip-popup"><p>' + result[x].hechsher_en + '</p></div>' +
                    '</div>' +
                    '</h2>' +
                    '<p class="detail">' +
                    str1 +
                    '<span class="toggle-content">';

                if (str2.length > 0) {
                    temp += str2;
                }

                temp += '</span>' +
                    '<div class="more-toggle">';

                if (str2.length > 0) {
                    temp += '<span class="more"> more info </span>' +
                        '<span class="sign"> + </span>';
                }
                // HIDE BUTTON ON SHORT DESCRIPTION
                else {
                    temp += '<span class="more" style="display: none"> more info </span>' +
                        '<span class="sign" style="display: none"> + </span>';
                }

                temp +=
                    '</div>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row vertical-divider" style="margin-top:15px !important;">' +
                    '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1">' +


                    // ONCLICK CALL OPEN GALLERY FUNCTION
                    '<a onclick="openGallery(' + x + ')"   data-toggle="modal" data-target="#slider-popup">' +
                    '<img src="/en/img/gallery.png" alt="image description">' +
                    '</a>' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">' +
                    '<span class="rest-address">' + '<span>' + result[x].address_en + '</span>' + '<div class="tooltip-popup"><p>' + result[x].address_en + '</p></div>' + '</span>' +

                    // ONCLICK CALL OPEN TIME FUNCTION
                    '<span onclick="openTime(' + x + ')" class="time-drop-down">' + result[x].today_timings + '<img style="padding-left: 5px;" src="/en/img/drop-down.png"></span>' +
                    '</div>' +
                    '<div class="col-md-5 col-sm-5 col-xs-5 col-lg-5">' +
                    '<span class="rest-address"> Minimum ' + result[x].min_amount + ' NIS </span>' +


                    // ONCLICK CALL OPEN DISCOUNT FUNCTION
                    '<span class="discount-drop-down" onclick="openDiscount(' + x + ')">Delivery ' + result[x].min_delivery + 'NIS - ' + result[x].max_delivery + 'NIS <img src="/en/img/drop-down.png"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-2 col-xs-2 center-content top-offset">';


                if (result[x].coming_soon == 0) {

                    temp +=
                        '<div class="order-now-box">' +
                        '<div onclick="order_now(' + x + ')" class="header" >' +
                        'ORDER<br>' +
                        'NOW';
                }
                else {

                    temp += '<div class="order-now-box offline">' +
                        '<div class="header" >' +
                        'Coming<br>' +
                        'Soon';

                }

                temp += '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="custom-hr"></div>' +
                    '</div>';

            }
            //CURRENTLY NOT AVAILABLE
            else {

                temp +=

                    '<div class="row separator">' +
                    '<div class="col-md-2 col-sm-2 col-xs-2 center-content">' +
                    '<div class="circular-logo">' +
                    '<span class="status offline"></span>' +
                    '<div class="logo-container">' +
                    '<img class="rest_img" src="' + result[x].logo + '">' +
                    '</div>' +
                    '<div class="arrow"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-8 col-sm-8 col-xs-8">' +
                    '<div class="row">' +
                    '<div class="col-md-12 col-sm-12 col-xs-12">' +
                    '<h2 class="row-heading">' +
                    result[x].name_en +
                    '<div class="title-frame">' +
                    '<span class="title">כשר</span>' +
                    '<div class="tooltip-popup"><p>' + result[x].hechsher_en + '</p></div>' +
                    '</div>' +
                    '</h2>' +
                    '<p class="detail">' +
                    str1 +
                    '<span class="toggle-content">';

                if (str2.length > 0) {
                    temp += str2;
                }

                temp += '</span>' +
                    '<div class="more-toggle">';

                if (str2.length > 0) {
                    temp += '<span class="more"> more info </span>' +
                        '<span class="sign"> + </span>';
                }
                // HIDE BUTTON ON SHORT DESCRIPTION
                else {
                    temp += '<span class="more" style="display: none"> more info </span>' +
                        '<span class="sign" style="display: none"> + </span>';
                }

                temp +=
                    '</div>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row vertical-divider" style="margin-top:15px !important;">' +
                    '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1">' +


                    // ONCLCIK CALL OPEN GALLERY FUNCTION
                    '<a onclick="openGallery(' + x + ')"   data-toggle="modal" data-target="#slider-popup">' +
                    '<img src="/en/img/gallery.png" alt="image description">' +
                    '</a>' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">' +
                    '<span class="rest-address">' + result[x].address_en + '</span>' +


                    // ONCLICK CALL OPEN TIME FUNCTION
                    '<span onclick="openTime(' + x + ')" class="time-drop-down">' + result[x].today_timings + '<img style="padding-left: 5px;" src="/en/img/drop-down.png"></span>' +
                    '</div>' +
                    '<div class="col-md-5 col-sm-5 col-xs-5 col-lg-5">' +
                    '<span class="rest-address"> Minimum ' + result[x].min_amount + ' NIS </span>' +


                    // ON CLICK CALL OPEN DISCOUNT FUNCTION
                    '<span class="discount-drop-down" onclick="openDiscount(' + x + ')">Delivery ' + result[x].min_delivery + 'NIS - ' + result[x].max_delivery + 'NIS <img src="/en/img/drop-down.png"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-2 col-xs-2 center-content top-offset">' +
                    '<div class="order-now-box offline">' +
                    '<div class="header">';

                if (result[x].coming_soon == 0) {

                    temp += 'ORDER<br>' +
                        'NOW';
                }
                else {

                    temp += 'Coming<br>' +
                        'Soon';
                }

                temp += '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="custom-hr"></div>' +
                    '</div>';
            }

            allRestaurants += temp;
        }

    }

// APPEND AL RESTAURANTS DATA TO FRONT
    $("#scrollable1").html(allRestaurants);

// APPEND LAST ROW
    var lastRow = '<div class="row separator last">';
    $("#scrollable1").append(lastRow);

}


// CONVERT ALL RESTAUTANT TAGS TO STRING
function fromTagsToString (restaurant)
{
    var tags = "";

    for (var i=0 ; i < restaurant.tags.length ; i++)
    {
        if ( i == 0)
            tags += restaurant.tags[i]['name_en'];

        else
            tags += ", "+restaurant.tags[i]['name_en'] ;
    }

    return tags;
}



// CLICK LISTENER FOR RESTAURANT (ORDER NOW)

function order_now(clickedRestId) {


    userObject.restaurantId        = allRestJson[clickedRestId].id;
    userObject.restaurantTitle     = allRestJson[clickedRestId].name_en;
    userObject.restaurantTitleHe   = allRestJson[clickedRestId].name_he;
    userObject.restaurantAddress   = allRestJson[clickedRestId].address_en;

    if(parseInt(allRestJson[clickedRestId].pickup_hide) == 1) {

        userObject.pickup_hide = true;

    }

    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT", JSON.stringify(userObject));
    localStorage.setItem("SELECTED_REST", JSON.stringify(allRestJson[clickedRestId]));


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/en/'+selectedCityName+"/"+ restaurantTitle+"/order";

};

function openTime(index) {

    var temp = '';
    for (i = 0 ; i < allRestJson[index].timings.length; i++)
    {
        temp += '<tr><td>'+allRestJson[index].timings[i].week_en+'</td>'+
            '<td>'+ allRestJson[index].timings[i].opening_time + ' - ' + allRestJson[index].timings[i].closing_time +'</td></tr>';
    }


    $("#rest-time").html(temp);

    // HIDE DISCOUNT POPUP ON WHEN TIME POPUP OPENS
    $(".discount-popup").fadeOut();

}


// GALLERY IMAGES SET TO FRONT END
function openGallery(index) {

    var temp = '';
    for (i = 0 ; i < allRestJson[index].gallery.length; i++)
    {
        if (i == 0)
        {
            temp = '<div class="item active">';
        }
        else
            temp += '<div class="item">';

        temp += '<img src="'+ allRestJson[index].gallery[i].url +'" alt="Chania" width="50%">'+
            '</div>';

        // SET IMAGES TO FRONT
        $("#gallery-imgs").html(temp);
    }

}

// ON DISCOUNT CLICK
function openDiscount(index) {

    var temp = '';

    for (i = 0; i < allRestJson[index].delivery_fee.length; i++)
    {
        temp += '<p>'+ allRestJson[index].delivery_fee[i].area_en +' : '+ allRestJson[index].delivery_fee[i].fee +' NIS</p>';

    }

    $("#discount-pop").html(temp);


    // HIDE TIME POPUP WHEN DISCOUNT POPUP OPENS
    $(".time-popup").fadeOut();

}


