//SERVER HOST DETAIL

var host = "http://"+window.location.hostname;


// GET ALL CITIES
var allCitiesResp = null;

function displayAllCities() {

    $.ajax({

        url: host + "/restapi/index.php/get_all_cities",
        type: "post",
        data: "",


        success: function (response) {

            var result = JSON.parse(response);
            allCitiesResp = result;
            var str = '';

            for(var x=0; x<result.length;x++)
            {
               str += '<li><a onclick="storeUserSelectedCity('+x+')" href="#">'+result[x].name_en+'</a></li>';
            }


            console.log(str);

            $('#city_list').append(str);

        }

    });
}


function storeUserSelectedCity(index) {


    $('.btn-primary > span#text-span').text(allCitiesResp[index].name_en);

    localStorage.setItem("USER_CITY_ID", JSON.stringify(allCitiesResp[index].id));
    localStorage.setItem("USER_CITY_NAME", JSON.stringify(allCitiesResp[index].name_en));


}


function isCitySelected()
{
    if(localStorage.getItem("USER_CITY_ID") == undefined ||localStorage.getItem("USER_CITY_ID") == "" || localStorage.getItem("USER_CITY_ID") == null)
    {

        return false;
    }
    else
    {
        return true;
    }
}