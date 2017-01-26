
// GET ALL RESTAURANTS FROM SERVER

function  getAllRestaurants()
{
    $.ajax({

        url: "http://dev.bot2.orderapp.com/webclient/restapi/index.php/get_all_restaurants_he",
        type: "post",
        data: "",

        success: function (response) {


            var result = JSON.parse(response);

            return (result[0][0].tags[0]);


        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }

    });

}

