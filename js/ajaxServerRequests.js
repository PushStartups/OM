
var allRestJson = null;


// GET ALL RESTAURANTS FROM SERVER

function  getAllRestaurants()
{
    $.ajax({

        url: "http://dev.bot2.orderapp.com/webclient/restapi/index.php/get_all_restaurants",
        type: "post",
        data: "",

        success: function (response) {

            var result = JSON.parse(response);

            allRestJson = result;

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
                        '<p style="font-size: 16px">'+ tagsString +'</p>'+
                        '<span>"Kosher"</span>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</div>'+
                        '<div class="clearfix">'+'</div>'+
                        '<div id="collapse'+x+'"class="accordion-body collapse">'+
                        '<div class="accordion-inner">'+
                        '<p>'+ result[x].description_en +'</p>'+
                        '<div class="btn-group btn-group-justified">'+
                        '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"> <p>'+ result[x].address_en +'</p><span>New York</span></div>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="timings'+x+'" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left">Open Now<img src="img/dropdown.png"></p><span class="text-left">'+result[x].today_timings+'</span></a>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="pop" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="img/video.png" style="margin:0 auto;"></p><span>View Gallery</span></a>'+
                        '</div>'+
                        '<a href="#" class="order_now">Order Now</a>'+
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
                        '<h3 style="font-size: 16px">'+ tagsString +'</h3>'+
                        '<span>Kosher</span>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</div>'+
                        '<div class="clearfix"></div>'+
                        '<div id="collapse'+x+'" class="accordion-body collapse">'+
                        '<div class="accordion-inner">'+
                        '<p>'+ result[x].description_en +'</p>'+
                        '<div class="btn-group btn-group-justified">'+
                        '<div class="btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left;"><p>'+ result[x].address_en +'</p> <span></span></div>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="timings'+x+'" class="slideLeftRight btn btn-primary" style="border-right: solid 1px rgba(255, 255, 255, 0.63) !important; text-align:left !important;"><p class="text-left">Closed Now<img src="img/dropdown.png"></p> <span class="text-left"></span></a>'+
                        '<a href="#" onClick="return false;" onClick="return false;" id="pop" class="slideLeftRight1 btn btn-primary" style="border-right:0px;"><p><img src="img/video.png" style="margin:0 auto;"></p> <span>View Gallery</span></a>'+
                        '</div>'+
                        '<a href="#" class="order_now_gray">Order Now <p>Open in 5 hr</p></a>'+
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



/**
 * @param result  RESPONSE OF SERVER
 * @returns {Array of all tags  }
 *  return array of all tags for each restaurant
 *  each index of array have tags string for particular restaurant
 */


function fromTagsToString (restaurant){

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

