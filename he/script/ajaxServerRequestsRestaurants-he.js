var host                = null;
var selectedCityId      = null;
var allRestJson         = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS
var userObject          = null;


// AFTER DOCUMENTED LOADED
$(document).ready(function() {




    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if (localStorage.getItem("USER_CITY_ID_HE") == undefined || localStorage.getItem("USER_CITY_ID_HE") == "" || localStorage.getItem("USER_CITY_ID_HE") == null) {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '../index.html';
    }


// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    selectedCityId = JSON.parse(localStorage.getItem("USER_CITY_ID_HE"));


// USER ORDER INFORMATION
    userObject = {

        'language': 'he',                  // USER LANGAGUE HEBREW
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
        'specialRequest':""                // SPECIAL REQUEST FROM USER
    };

    commonAjaxCall("/restapi/index.php/get_all_restaurants",{'city_id':selectedCityId},getAllRestaurants);      // GET LIST OF ALL RESTAURANTS FROM SERVER

});


// GET ALL RESTAURANTS FROM COMMON AJAX CALL
function  getAllRestaurants(response)
{
    var result = JSON.parse(response);
    allRestJson = result;   // MAKE SERVER RESPONSE GLOBAL FOR ACCESS IN OTHER FUNTIONS

    var allRestaurants = "";

    for(var x=0 ;x <result.length;x++)
    {

        var temp = "";
        var tagsString = fromTagsToString(result[x]);

        var str2  = ' ';
        var str1  = result[x].description_he;

        // RESTAURANTS DESCRIPTION LENGTH CHECK
        if (result[x].description_he.length > 200)
        {
            var yourString = result[x].description_he ; //replace with your string.
            var maxLength = 200 // maximum number of characters to extract

            //trim the string to the maximum length
            var trimmedString = yourString.substr(0, maxLength);

            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            str1  = trimmedString;
            str2  += result[x].description_he.replace(trimmedString,"");
        }

        // RESTAURANT CURRENTLY ACTIVE
        if   (true) //( result[x].availability )
        {


            temp +=

                '<div class="row separator">'+
                '<div class="col-md-2 col-sm-2 col-xs-2 center-content top-offset">'+
                '<div class="order-now-box">'+
                '<div onclick="order_now('+ x +')" class="header">הזמן <br> עכשיו</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-md-8 col-sm-8 col-xs-8">'+
                '<div class="row">'+
                '<div class="col-md-12 col-sm-12 col-xs-12">'+
                '<h2 class="row-heading">'+ result[x].name_he +
                '<div class="title-frame">'+
                '<span class="title">כשר</span>' +
                '<div class="tooltip-popup">'+
                '<p>'+ result[x].hechsher_he +'</p>'+
                '</div>'+
                '</div>'+
                '</h2>'+
                '<p class="detail">'+

                str1+

                '<span class="toggle-content">';


            if (str2.length > 0)
            {
                temp += str2;
            }


            temp += '</span>'+
                '</p>'+
                '<div class="more-toggle">';


            if (str2.length > 0)
            {
                temp +=

                    '<span class="more"> מידע נוסף </span>'+
                    '<span class="sign"> + </span>';

            }
            // HIDE BUTTON ON SHORT DESCRIPTION
            else
            {
                temp +=

                    '<span class="more" style="display: none"> מידע נוסף </span>'+
                    '<span class="sign" style="display: none"> + </span>';

            }

            temp +=

                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="row vertical-divider" style="margin-top:15px !important;">'+
                '<div class="col-md-5 col-sm-5 col-xs-5 col-lg-5">'+
                '<span class="rest-address"> מינימום הזמנה '+ result[x].min_amount +' ש״ח </span>'+
                '<span class="discount-drop-down" onclick="openDiscount('+ x +')">משלוח '+ result[x].min_delivery+'ש״ח - '+result[x].max_delivery +' ש״ח<img style="padding-right: 5px;" src="/he/img/drop-down.png"></span>'+
                '</div>'+
                '<div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">'+
                '<span class="rest-address"><span>'+ result[x].address_he +'</span>'+
                '<div class="tooltip-popup">'+
                '<p>'+ result[x].address_he +'</p>'+
                '</div>'+
                '</span>'+
                '<span onclick="openTime('+ x +')" class="time-drop-down">'+ result[x].today_timings +'<img style="padding-right: 5px;" src="/he/img/drop-down.png"></span>'+
                '</div>'+
                '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1"><a onclick="openGallery('+ x +')" data-toggle="modal" data-target="#slider-popup">'+
                '<img src="/he/img/gallery.png" alt="image description"></a>'+
                '</div>'+
                '</div>'+

                '</div>'+
                '<div class="col-md-2 col-sm-2 col-xs-2 center-content">'+
                '<div class="circular-logo">'+
                '<span class="status"></span>'+
                '<div class="logo-container">'+
                '<img class="rest_img" src="'+ result[x].logo + '">'+
                '</div>'+
                '<div class="arrow"></div>'+
                '</div>'+
                '</div>'+
                '<div class="custom-hr"></div>'+
                '</div>';

        }
        //CURRENTLY NOT AVAILABLE
        else {



            temp +=

                '<div class="row separator">'+
                '<div class="col-md-2 col-sm-2 col-xs-2 center-content top-offset">'+
                '<div class="order-now-box offline">'+
                '<div class="header">הזמן <br> עכשיו</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-md-8 col-sm-8 col-xs-8">'+
                '<div class="row">'+
                '<div class="col-md-12 col-sm-12 col-xs-12">'+
                '<h2 class="row-heading">'+ result[x].name_he +
                '<div class="title-frame">'+
                '<span class="title">כשר</span>' +
                '<div class="tooltip-popup">'+
                '<p>'+ result[x].hechsher_he +'</p>'+
                '</div>'+
                '</h2>'+
                '<p class="detail">'+

                str1+

                '<span class="toggle-content">';


            if (str2.length > 0)
            {
                temp += str2;
            }


            temp += '</span>'+
                '</p>'+
                '<div class="more-toggle">';


            if (str2.length > 0)
            {
                temp +=

                    '<span class="more"> מידע נוסף </span>'+
                    '<span class="sign"> + </span>';

            }
            // HIDE BUTTON ON SHORT DESCRIPTION
            else
            {
                temp +=

                    '<span class="more" style="display: none"> מידע נוסף </span>'+
                    '<span class="sign" style="display: none"> + </span>';

            }

            temp +=

                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="row vertical-divider" style="margin-top:15px !important;">'+
                '<div class="col-md-5 col-sm-5 col-xs-5 col-lg-5">'+
                '<span class="rest-address"> מינימום הזמנה '+ result[x].min_amount +' ש״ח </span>'+
                '<span class="discount-drop-down" onclick="openDiscount('+ x +')">משלוח '+ result[x].min_delivery+'ש״ח - '+result[x].max_delivery +' ש״ח<img style="padding-right: 5px;" src="/he/img/drop-down.png"></span>'+
                '</div>'+
                '<div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">'+
                '<span class="rest-address"><span>'+ result[x].address_he +'</span>'+
                '<div class="tooltip-popup">'+
                '<p>'+ result[x].address_he +'</p>'+
                '</div>'+
                '</span>'+
                '<span onclick="openTime('+ x +')" class="time-drop-down">'+ result[x].today_timings +'<img style="padding-right: 5px;" src="/he/img/drop-down.png"></span>'+
                '</div>'+
                '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1"><a onclick="openGallery('+ x +')" data-toggle="modal" data-target="#slider-popup">'+
                '<img src="/he/img/gallery.png" alt="image description"></a>'+
                '</div>'+
                '</div>'+

                '</div>'+
                '<div class="col-md-2 col-sm-2 col-xs-2 center-content">'+
                '<div class="circular-logo">'+
                '<span class="status offline"></span>'+
                '<div class="logo-container">'+
                '<img class="rest_img" src="'+ result[x].logo + '">'+
                '</div>'+
                '<div class="arrow"></div>'+
                '</div>'+
                '</div>'+
                '<div class="custom-hr"></div>'+
                '</div>';
        }

        allRestaurants += temp;


    }

    // APPEND AL RESTAURANTS DATA TO FRONT
    $("#scrollable1").append(allRestaurants);

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
            tags += restaurant.tags[i]['name_he'];

        else
            tags += ", "+restaurant.tags[i]['name_he'] ;
    }

    return tags;
}



// CLICK LISTENER FOR RESTAURANT (ORDER NOW)

function order_now(clickedRestId) {


    userObject.restaurantId        = allRestJson[clickedRestId].id;
    userObject.restaurantTitle     = allRestJson[clickedRestId].name_en;
    userObject.restaurantTitleHe   = allRestJson[clickedRestId].name_he;
    userObject.restaurantAddress   = allRestJson[clickedRestId].address_he;

    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT_HE", JSON.stringify(userObject));
    localStorage.setItem("SELECTED_REST_HE", JSON.stringify(allRestJson[clickedRestId]));


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/he/'+selectedCityName+"/"+ restaurantTitle+"/order";

};

function openTime(index) {

    var temp = '';
    for (i = 0 ; i < allRestJson[index].timings.length; i++)
    {
        temp += '<tr><td>'+allRestJson[index].timings[i].week_he+'</td>'+
            '<td>'+ allRestJson[index].timings[i].opening_time_he + ' - ' + allRestJson[index].timings[i].closing_time_he +'</td></tr>';
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

// ON DELIVERY CLICK
function openDiscount(index) {

    var temp = '';

    for (i = 0; i < allRestJson[index].delivery_fee.length; i++)
    {
        temp += '<p>'+ allRestJson[index].delivery_fee[i].area_he +' : דמי משלוח '+ allRestJson[index].delivery_fee[i].fee +' ש"ח</p>';

    }

    $("#discount-pop").html(temp);


    // HIDE TIME POPUP WHEN DISCOUNT POPUP OPENS
    $(".time-popup").fadeOut();

}


