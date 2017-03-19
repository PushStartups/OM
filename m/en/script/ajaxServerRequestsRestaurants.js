//SERVER HOST DETAIL

var selectedCityId      = null;
var allRestJson         = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS
var minOrderLimit       = 0;     // MINIMUM ORDER LIMIT
var userObject          = null;


$(document).ready(function() {

// EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if (localStorage.getItem("USER_CITY_ID") == undefined || localStorage.getItem("USER_CITY_ID") == "" || localStorage.getItem("USER_CITY_ID") == null) {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '/m/en/index.html';
    }

// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    selectedCityId = JSON.parse(localStorage.getItem("USER_CITY_ID"));


// USER ORDER INFORMATION

    userObject = {

        'language': 'en',                  // USER LANGAGUE ENGLISH
        'restaurantId': "",                // RESTAURANT ID SELECTED BY USER
        'restaurantTitle': "",             // SELECTED RESTAURANT TITLE
        'restaurantTitleHe': "",           // SELECTED RESTAURANT TITLE
        'restaurantAddress': "",           // SELECTED RESTAURANT ADDRESS
        'name': "",                        // USER NAME
        'email': "",                       // USER EMAIL
        'contact': "",                     // USER CONTACT
        'orders': [],                      // USER ORDERS
        'total': 0,                        // TOTAL AMOUNT OF ORDER
        'pickFromRestaurant': false,       // USER PICK ORDER FROM RESTAURANT ? DEFAULT NO
        'deliveryAddress': "",             // USER ORDER DELIVERY ADDRESS
        'isCoupon': false,                 // USER HAVE COUPON CODE ?
        'couponCode': '',                  // COUPON CODE OF USER
        'isFixAmountCoupon': false,        // IF DISCOUNT AMOUNT IS FIXED AMOUNT  IF TRUE IT WILL BE A FIX PERCENTAGE
        'discount': 0,                     // DISCOUNT ON COUPON VALUE
        'Cash_Card': null,                 // USER WANT TO PAY CASH OR CREDIT CARD
        'Cash_Card_he': null,              // USER WANT TO PAY CASH OR CREDIT CARD
        'cartData': null,                  // COMPUTED CART DATA
        'totalWithoutDiscount': null       // TOTAL WITHOUT DISCOUNT
    };


    commonAjaxCall("/restapi/index.php/get_min_order_amount","",getMinimumValue);  // GET MINIMUM ORDER VALUE
    commonAjaxCall("/restapi/index.php/get_all_restaurants", {'city_id':selectedCityId},getAllRestaurants); // GET LIST OF ALL RESTAURANTS

});


// GET MINIMUM ORDER VALUE FROM SERVER
function getMinimumValue(response) {


    var result = JSON.parse(response);
    minOrderLimit = parseInt(result[0].value); // MINIMUM ORDER AMOUNT SET FROM SERVER

}


// GET ALL RESTAURANTS FROM SERVER
function  getAllRestaurants(response)
{

    var result = JSON.parse(response);

    allRestJson = result;   // MAKE SERVER RESPONSE GLOBAL FOR ACCESS IN OTHER FUNTIONS


    var allRestaurants = "";

    for(var x=0 ;x <result.length;x++)
    {

        var temp = "";
        var tagsString = fromTagsToString(result[x]);

        // RESTAURANT CURRENTLY ACTIVE
        if (result[x].availability) {

            temp += '<div class="accordion-group animate-box fadeInUp animated">' +
                '<div class="accordion-heading">' +
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + x + '">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                '<div class="status_online">' + '</div>' +
                '<div class="img_cernter_crop">' +
                '<img src=' + result[x].logo + ' class="picture-src">' +
                '</div>' +
                '<div id="right-triangle">' + '</div>' +
                '<div class="resto_title" >' +
                '<h3><b>' + result[x].name_en + '</b></h3>' +
                '<span><b>' + result[x].hechsher_en + '</b></span>' +
                '<p style="font-size: 14px"><b>' + tagsString + '</b></p>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>' +
                '<div class="clearfix">' + '</div>' +
                '<div id="collapse' + x + '"class="accordion-body collapse">' +
                '<div class="accordion-inner">' +
                '<p style="word-break: normal"><b>' + result[x].description_en + '</b></p>' +
                '<div class="btn-group btn-group-justified">' +
                '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"> <p style="word-break: normal">' + result[x].address_en + '</p></div>' +
                '<a href="#" onClick="return false;" onClick="return false;" id="timings' + x + '" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left">Open Now<img src="/m/en/img/dropdown.png"></p><span class="text-left"><b>' + result[x].today_timings + '</b></span></a>' +
                '<a href="#" onClick="return false;" onClick="return false;" id="pop' + x + '" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="/m/en/img/video.png" style="margin:0 auto;"></p><span>View Gallery</span></a>' +
                '</div>' +
                '<a href="#" id="ordernow' + x + '" class="order_now">Order Now</a>' +
                '</div>' +
                '</div>' +
                '</div>';

        }
        // CURRENTLY NOT AVAILABLE
        else {

            temp += '<div class="accordion-group animate-box fadeInUp animated">' +
                '<div class="accordion-heading">' +
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + x + '">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                '<div class="status_offline"><span class="close_arrow" aria-hidden="true">×</span></div>' +
                '<div class="img_cernter_crop">' +
                '<img src=' + result[x].logo + ' class="picture-src">' +
                '</div>' +
                '<div id="right-triangle"></div>' +
                '<div class="resto_title" >' +
                '<h3><b>' + result[x].name_en + '</b></h3>' +
                '<span><b>' + result[x].hechsher_en + '</b></span>' +
                '<p style="font-size: 14px"><b>' + tagsString + '</b></p>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '<div id="collapse' + x + '" class="accordion-body collapse">' +
                '<div class="accordion-inner">' +
                '<p style="word-break: normal"><b>' + result[x].description_en + '</b></p>' +
                '<div class="btn-group btn-group-justified">' +
                '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"><p style="word-break: normal">' + result[x].address_en + '</p></div>' +
                '<a href="#" onClick="return false;" onClick="return false;" id="timings' + x + '" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left"><b>Closed Now</b><img src="/m/en/img/dropdown.png"></p> <span class="text-left"></span></a>' +
                '<a href="#" onClick="return false;" onClick="return false;" id="pop' + x + '" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="/m/en/img/video.png" style="margin:0 auto;"></p> <span>View Gallery</span></a>' +
                '</div>' +
                '<a href="#" id="ordernow' + x + '" class="order_now_gray">Order Now <p>' + result[x].hours_left_to_open + '</p></a>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        allRestaurants += temp;


    }


    $("#accordion2").append(allRestaurants);

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

$(document).on('click','.order_now',function() {


    // RESTAURANT CLICKED BY USER
    var clickedRestId = $(this).attr('id').replace('ordernow','');


    userObject.restaurantId        = allRestJson[clickedRestId].id;
    userObject.restaurantTitle     = allRestJson[clickedRestId].name_en;
    userObject.restaurantTitleHe   = allRestJson[clickedRestId].name_he;
    userObject.restaurantAddress   = allRestJson[clickedRestId].address_en;


    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT", JSON.stringify(userObject));
    localStorage.setItem("min_order_amount", minOrderLimit);


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/m/en/'+selectedCityName+"/"+ restaurantTitle+"/order";
});


