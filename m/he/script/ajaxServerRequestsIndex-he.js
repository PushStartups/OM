// GET ALL CITIES
var allCitiesResp = null;


// ON DOCUMENT READY CALL TO DISPLAY ALL CITIES
$(document).ready(function() {

    localStorage.setItem("USER_LANGUAGE", 'HE');
    commonAjaxCall("/restapi/index.php/get_all_cities", '', displayAllCitiesCallBack);

});


function displayAllCitiesCallBack(response) {


    // DISPLAY ALL CITIES TO USER FROM SERVER
    var result = JSON.parse(response);
    allCitiesResp = result;

    var str = '';

    for(var x=0; x<result.length;x++)
    {
        str += '<li><a onclick="storeUserSelectedCity('+x+')" href="#">'+result[x].name_he+'</a></li>';
    }


    $('#city_list').html(str);

}


// STORE SELECTED CITY IN CACHE
function storeUserSelectedCity(index) {


    $('.btn-primary > span#text-span').text(allCitiesResp[index].name_he);

    $(".dropdown").removeClass("error");
    $('#error-text').css('display', 'none');

    localStorage.setItem("USER_CITY_ID_HE", JSON.stringify(allCitiesResp[index].id));
    localStorage.setItem("USER_CITY_NAME_HE", JSON.stringify(allCitiesResp[index].name_he));
    localStorage.setItem("USER_CITY_NAME", JSON.stringify(allCitiesResp[index].name_en));

    start_ordering();

}


// CITY AVAILABLE IN CACHE ?
function isCitySelected()
{
    if(localStorage.getItem("USER_CITY_ID_HE") == undefined ||localStorage.getItem("USER_CITY_ID_HE") == "" || localStorage.getItem("USER_CITY_ID_HE") == null)
    {

        return false;
    }
    else
    {
        return true;
    }

}