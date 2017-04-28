var host                = null;
var selectedCityId      = null;
var allRestJson         = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS
var userObject          = null;
var selectedCityName    = null;

// AFTER DOCUMENTED LOADED
$(document).ready(function() {

    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if (localStorage.getItem("USER_CITY_ID") == undefined || localStorage.getItem("USER_CITY_ID") == "" || localStorage.getItem("USER_CITY_ID") == null) {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '../index.html';
    }


// RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    selectedCityId = JSON.parse(localStorage.getItem("USER_CITY_ID"));
    selectedCityName = JSON.parse(localStorage.getItem("USER_CITY_NAME"));

    $('#city-name').text('Restaurants in '+selectedCityName);


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
        'isFixAmountCoupon': false,        // IF DISCOUNT AMOUNT IS FIXED AMOUNT  IF TRUE IT WILL BE A FIX PERCENTAGE
        'discount': 0,                     // DISCOUNT ON COUPON VALUE
        'Cash_Card': null,                 // USER WANT TO PAY CASH OR CREDIT CARD
        'Cash_Card_he': null,              // USER WANT TO PAY CASH OR CREDIT CARD
        'cartData': null,                  // COMPUTED CART DATA
        'totalWithoutDiscount': null       // TOTAL WITHOUT DISCOUNT
    };

    commonAjaxCall("/restapi/index.php/get_all_restaurants",{'city_id':selectedCityId},getAllRestaurants);      // GET LIST OF ALL RESTAURANTS FROM SERVER

});


// GET ALL RESTAURANTS FROM COMMON AJAXCALL
function  getAllRestaurants(response)
{
    var result = JSON.parse(response);
    allRestJson = result;   // MAKE SERVER RESPONSE GLOBAL FOR ACCESS IN OTHER FUNTIONS

    var allRestaurants = "";

    for(var x = 0; x < result.length; x++)
    {

        var temp = "";
        var tagsString = fromTagsToString(result[x]);
        var str = result[x].address_en;



        // RESTAURANT CURRENTLY ACTIVE
        if (result[x].availability) {

           temp +=  '<li>'+
                    '<a href="#" class="opener">'+
                    '<div class="image-box">'+
                    '<img src="'+ result[x].logo +'">'+
                    '</div>'+
                    '<div class="txt">'+
                    '<h2>'+ result[x].name_en +'<span>כשר</span></h2>'+
                    '<p>'+ tagsString +'</p>'+
                    '</div>'+
                    '</a>'+
                    '<div class="slide">'+
                    '<div class="block">'+
                    '<p>'+ result[x].description_en +'</p>'+
                    '</div>'+
                    '<ul class="list">'+
                    '<li>'+
                    '<a onclick="openDelivery('+ x +')" data-toggle="modal" data-target="#address-popup" href="#"><em class="address">'+ str +'</em><span>delivery Fee</span></a>'+
                    '</li>'+
                    '<li>'+
                    '<a onclick="openTime('+ x +')" data-toggle="modal" data-target="#time-popup" href="#"><span>Open Now</span>'+ result[x].today_timings +'</a>'+
                    '</li>'+
                    '<li class="last text-center">'+
                    '<a onclick="openGallery('+ x +')" data-toggle="modal" data-target="#slider-popup" href="#"><img src="/m/en/img/gallery-img.png"> Gallery</a>'+
                    '</li>'+
                    '</ul>'+
                    '<a href="#" class="brn-submit">Order Now</a>'+
                    '</div>'+
                    '</li>';

        }
        //CURRENTLY NOT AVAILABLE
        else
        {
            temp += '<li>'+
                    '<a href="#" class="opener">'+
                    '<div class="image-box offline">'+
                    '<img src="'+ result[x].logo +'">'+
                    '</div>'+
                    '<div class="txt">'+
                    '<h2>'+ result[x].name_en +'<span>כשר</span></h2>'+
                    '<p>'+ tagsString +'</p>'+
                    '</div>'+
                    '</a>'+
                    '<div class="slide">'+
                    '<div class="block">'+
                    '<p>'+ result[x].description_en +'</p>'+
                    '</div>'+
                    '<ul class="list">'+
                    '<li>'+
                    '<a onclick="openDelivery('+ x +')" data-toggle="modal" data-target="#address-popup" href="#">'+ str +'<span>delivery Fee</span></a>'+
                    '</li>'+
                    '<li>'+
                    '<a onclick="openTime('+ x +')" data-toggle="modal" data-target="#time-popup" href="#"><span>Open Now</span>'+ result[x].today_timings +'</a>'+
                    '</li>'+
                    '<li class="last text-center">'+
                    '<a onclick="openGallery('+ x +')" data-toggle="modal" data-target="#slider-popup" href="#"><img src="/m/en/img/gallery-img.png"> Gallery</a>'+
                    '</li>'+
                    '</ul>'+
                    '<a href="#" class="brn-submit">Order Now</a>'+
                    '</div>'+
                    '</li>';
        }

        allRestaurants += temp;


    }

    // APPEND ALL RESTAURANTS DATA
    $("#rest-list").append(allRestaurants);

    initAccordion();
}


// CONVERT RESTAUTANT TAGS TO STRING
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

    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT", JSON.stringify(userObject));
    localStorage.setItem("SELECTED_REST", JSON.stringify(allRestJson[clickedRestId]));


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/en/'+selectedCityName+"/"+ restaurantTitle+"/order";

};


// SET TIME TO TIME POPUP
function openTime(index) {

    var temp = '';

    for (i = 0; i < allRestJson[index].timings.length; i++) {

        temp += '<tr><td>' + allRestJson[index].timings[i].week_en + '</td>' +
                '<td>' + allRestJson[index].timings[i].opening_time + ' - ' + allRestJson[index].timings[i].closing_time + '</td></tr>';

    }

    $("#rest-time").html(temp);

}


// SET GALLERY IMAGES TO GALLERY POPUP
function openGallery(index) {

    var temp = '';
    for (i = 0 ; i < allRestJson[index].gallery.length; i++)
    {
        if (i == 0)
            temp = '<div class="item active">';

        else
            temp += '<div class="item">';

        temp += '<img src="'+ allRestJson[index].gallery[i].url +'" alt="Chania" width="50%">'+
                '</div>';

        // SET IMAGES TO FRONT
        $("#gallery-imgs").html(temp);

    }

}


// SET DELIVERY DETAIL TO DELIVERY POPUP
function openDelivery(index) {

    var temp = '';

    for (i = 0; i < allRestJson[index].delivery_fee.length; i++)
    {
        temp += '<p>'+ allRestJson[index].delivery_fee[i].area_en +' : Fee '+ allRestJson[index].delivery_fee[i].fee +' NIS</p>';

    }

    $("#delivery-popup").html(temp);


    temp = '<h3>Delivery Fee</h3>'+
            '<h4>Minimum for delivery '+ allRestJson[index].min_delivery +' NIS</h4>';

    $("#min-delivery").html(temp);

}


