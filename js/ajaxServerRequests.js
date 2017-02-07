//SERVER HOST DETAIL

var host = "http://"+window.location.hostname;


var allRestJson = null;  // RAW JSON FROM SERVER FOR ALL RESTAURANTS


// USER ORDER INFORMATION

var userObject = {
    'restaurantId': "",                // RESTAURANT ID SELECTED BY USER
    'restaurantTitle': "",             // SELECTED RESTAURANT TITLE
    'restaurantAddress': "",           // SELECTED RESTAURANT ADDRESS
    'name': "",                        // USER NAME
    'email': "",                       // USER EMAIL
    'orders': [],                      // USER ORDERS
    'total': 0,                        // TOTAL AMOUNT OF ORDER
    'pickFromRestaurant': false,       // USER PICK ORDER FROM RESTAURANT ? DEFAULT NO
    'deliveryAddress': "",             // USER ORDER DELIVERY ADDRESS
    'isCoupon': false,                 // USER HAVE COUPON CODE ?
    'isFixAmountCoupon' : false,       // IF DISCOUNT AMOUNT IS FIXED AMOUNT  IF TRUE IT WILL BE A FIX PERCENTAGE
    'discount'          : 0            // DISCOUNT ON COUPON VALUE
};



// GET ALL RESTAURANTS FROM SERVER
function  getAllRestaurants()
{
    $.ajax({

        url: host+"/restapi/index.php/get_all_restaurants",
        type: "post",
        data: "",

        success: function (response)
        {
            var result = JSON.parse(response);

            allRestJson = result;   // MAKE SERVER RESPONSE GLOBAL FOR ACCESS IN OTHER FUNTIONS

            var allRestaurants = "";

            for(var x=0 ;x <result.length;x++)
            {

                var temp = "";
                var tagsString  =  fromTagsToString (result[x]);

                // RESTAURANT CURRENTLY ACTIVE 
                if(result[x].availability)
                {

                    temp +=  '<div class="accordion-group animate-box fadeInUp animated">'+
                        '<div class="accordion-heading">'+
                        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+x+'">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                        '<div class="status_online">'+'</div>'+
                        '<div class="img_cernter_crop">'+
                        '<img src='+ result[x].logo +' class="picture-src">'+
                        '</div>'+
                        '<div id="right-triangle">'+'</div>'+
                        '<div class="resto_title" >'+
                        '<h3>'+result[x].name_en+'</h3>'+
                        '<span>"Kosher"</span>'+
                        '<p style="font-size: 16px">'+ tagsString +'</p>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</div>'+
                        '<div class="clearfix">'+'</div>'+
                        '<div id="collapse'+x+'"class="accordion-body collapse">'+
                        '<div class="accordion-inner">'+
                        '<p style="word-break: normal">'+ result[x].description_en +'</p>'+
                        '<div class="btn-group btn-group-justified">'+
                        '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"> <p style="word-break: normal">'+ result[x].address_en +'</p><span>New York</span></div>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="timings'+x+'" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left">Open Now<img src="img/dropdown.png"></p><span class="text-left">'+result[x].today_timings+'</span></a>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="pop'+x+'" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="img/video.png" style="margin:0 auto;"></p><span>View Gallery</span></a>'+
                        '</div>'+
                        '<a href="#" id="ordernow'+x+'" class="order_now">Order Now</a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                }
                // CURRENTLY NOT AVAILABLE 
                else {

                    temp += '<div class="accordion-group animate-box fadeInUp animated">'+
                        '<div class="accordion-heading">'+
                        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+x+'">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                        '<div class="status_offline"><span class="close_arrow" aria-hidden="true">×</span></div>'+
                        '<div class="img_cernter_crop">'+
                        '<img src='+ result[x].logo +' class="picture-src">'+
                        '</div>'+
                        '<div id="right-triangle"></div>'+
                        '<div class="resto_title" >'+
                        '<h3>'+result[x].name_en+'</h3>'+
                        '<span>Kosher</span>'+
                        '<h3 style="font-size: 16px">'+ tagsString +'</h3>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</div>'+
                        '<div class="clearfix"></div>'+
                        '<div id="collapse'+x+'" class="accordion-body collapse">'+
                        '<div class="accordion-inner">'+
                        '<p style="word-break: normal">'+ result[x].description_en +'</p>'+
                        '<div class="btn-group btn-group-justified">'+
                        '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"><p style="word-break: normal">'+ result[x].address_en +'</p> <span></span></div>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="timings'+x+'" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left">Closed Now<img src="img/dropdown.png"></p> <span class="text-left"></span></a>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="pop'+x+'" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="img/video.png" style="margin:0 auto;"></p> <span>View Gallery</span></a>'+
                        '</div>'+
                        '<a href="#" id="ordernow'+x+'" class="order_now_gray">Order Now <p>'+result[x].hours_left_to_open+'</p></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
                }

                allRestaurants += temp;

            }


            $("#accordion2").append(allRestaurants);

        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(textStatus, errorThrown);

        }

    });

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


    userObject.restaurantId      = allRestJson[clickedRestId].id;
    userObject.restaurantTitle   = allRestJson[clickedRestId].name_en;
    userObject.restaurantAddress = allRestJson[clickedRestId].address_en;

    // SAVE USER OBJECT IS CACHE FOR NEXT PAGE USAGE

    localStorage.setItem("USER_OBJECT", JSON.stringify(userObject));

   // MOVING TO PAGE 2
    window.location.href = '../page2.html';
});