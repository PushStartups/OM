var host                = null;
var selectedCityId      = null;
var allRestJson         = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS
var userObject          = null;


// AFTER DOCUMENTED LOADED
function initialize() {

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
        'restaurantContact' : "",          // RESTAURANT CONTACT
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
        'deliveryArea':null,               // DELIVERY AREA
        'deliveryCharges':null,            // DELIVERY CHARGES
        'specialRequest':""                // SPECIAL REQUEST FROM USER
    };

    commonAjaxCall("/restapi/index.php/get_all_restaurants",{'city_id':selectedCityId},getAllRestaurants);      // GET LIST OF ALL RESTAURANTS FROM SERVER

}


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


        // RESTAURANT CURRENTLY ACTIVE

        if (true) { //result[x].availability


            temp += '<li>'+
                '<a href="#" class="opener">'+
                '<div class="image-box">'+
                '<img src="'+ result[x].logo + '">'+
                '</div>'+
                '<div class="txt">'+
                '<h2>' + result[x].name_he + '<span>כשר</span></h2>'+
                '<p>'+ tagsString +'</p>'+
                '</div>'+
                '</a>'+
                '<div class="slide">'+
                '<div class="block">'+
                '<p>'+ result[x].description_he +'</p> '+
                '</div>'+
                '<ul class="list">'+
                '<li>'+
                '<a data-toggle="modal" onclick="openDiscount('+x+')" data-target="#address-popup" href="#"><div class="address-add">'+ result[x].address_he +'</div><span>מחירון משלוחים </span></a>'+
                '</li>'+
                '<li>'+
                '<a data-toggle="modal" onclick="openTime('+x+')" data-target="#time-popup" href="#"><span>פתוח עכשיו</span>' +result[x].today_timings_he+ '</a>'+
                '</li>'+
                '<li class="last text-center">'+
                '<a onclick="openGallery('+ x +')"  href="#"><img  src="/m/en/img/gallery-img.png">גלריה</a>'+
                '</li>'+
                '</ul>'+
                '<a href="#" onclick="order_now('+ x +')" class="brn-submit">הזמן עכשיו</a>'+
                '</div>'+
                '</li>';


        }
        //CURRENTLY NOT AVAILABLE
        else {

            temp += '<li>'+
                '<a href="#" class="opener">'+
                '<div class="image-box gray">'+
                '<img src="'+ result[x].logo + '">'+
                '</div>'+
                '<div class="txt">'+
                '<h2>' + result[x].name_he + '<span>כשר</span></h2>'+
                '<p>'+ tagsString +'</p>'+
                '</div>'+
                '</a>'+
                '<div class="slide">'+
                '<div class="block">'+
                '<p>'+ result[x].description_he +'</p> '+
                '</div>'+
                '<ul class="list">'+
                '<li>'+
                '<a data-toggle="modal" onclick="openDiscount('+x+')" data-target="#address-popup" href="#"><div class="address-add">'+ result[x].address_he +'</div><span>delivery Fee</span></a>'+
                '</li>'+
                '<li>'+
                '<a data-toggle="modal" onclick="openTime('+x+')" data-target="#time-popup" href="#"><span>פתוח עכשיו</span>' +result[x].today_timings_he+ '</a>'+
                '</li>'+
                '<li class="last text-center">'+
                '<a onclick="openGallery('+ x +')"  href="#"><img  src="/m/en/img/gallery-img.png">גלריה</a>'+
                '</li>'+
                '</ul>'+
                '<a  class="brn-submit offline">הזמן עכשיו</a>'+
                '</div>'+
                '</li>';

        }



        allRestaurants += temp;

    }

    // APPEND AL RESTAURANTS DATA TO FRONT
    $("#scrollable").html(allRestaurants);
    initAccordion();

}


// CONVERT ALL RESTAUTANT TAGS TO STRING
function fromTagsToString (restaurant)
{
    var tags = restaurant.hechsher_he+"</br>";

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
    userObject.restaurantContact   = allRestJson[clickedRestId].contact;

    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT_HE", JSON.stringify(userObject));
    localStorage.setItem("SELECTED_REST_HE", JSON.stringify(allRestJson[clickedRestId]));

    minOrderLimit = allRestJson[clickedRestId].min_amount;

    localStorage.setItem("min_order_amount_he", minOrderLimit);


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');

    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));

    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/m/he/'+selectedCityName+"/"+ restaurantTitle+"/order";

};


// SET RESTAURANT TIMINGS IN rest-time POPUP
function openTime(index) {

    var temp = '';

    for (i = 0 ; i < allRestJson[index].timings.length; i++)
    {
        temp += '<tr><td>'+allRestJson[index].timings[i].week_he+'</td>'+
            '<td>'+ allRestJson[index].timings[i].opening_time_he + ' - ' + allRestJson[index].timings[i].closing_time_he +'</td></tr>';
    }

    $("#rest-time").html(temp);
}


// SET GALLERY IMAGES IN gallery-imgs POPUP
function openGallery(index) {

    var temp = '';
    for (var i = 0 ; i < allRestJson[index].gallery.length; i++)
    {
        if (i == 0)
        {
            temp = '<div class="item active">';
        }
        else
        {
            temp += '<div class="item">';
        }

        temp += '<img src="'+ allRestJson[index].gallery[i].url +'" alt="Chania" width="50%">'+
            '</div>';
    }

    $("#gallery-imgs").html(temp);

    $('#slider-popup').modal('show');
}

// SET DELIVERY CHARGES TO discount-pop POPUP
function openDiscount(index) {

    var temp = ' <span class="add-title">'+ allRestJson[index].address_he +'</span>';


    for (i = 0; i < allRestJson[index].delivery_fee.length; i++)
    {
        temp += '<p>'+ allRestJson[index].delivery_fee[i].area_he +" : "+ allRestJson[index].delivery_fee[i].fee +' ש״ח '+'</p>';
    }

    $("#discount-pop").html(temp);

}


