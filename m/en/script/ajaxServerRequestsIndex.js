// GET ALL CITIES
var allCitiesResp = null;


// DISPLAY ALL CITIES TO USER

function displayAllCities(response)
{
    var result = JSON.parse(response);
    allCitiesResp = result;

    var str = '';

    for (var x = 0; x < result.length; x++) {

        str += '<li><a onclick="storeUserSelectedCity(' + x + ')" href="#">' + result[x].name_en + '</a></li>';

    }

    $('#city_list').append(str); // APPEND CITY LIST TO MAIN PAGE
}


// STORE SELECTED CITY IN CACHE

function storeUserSelectedCity(index) {


    $('.btn-primary > span#text-span').text(allCitiesResp[index].name_en);
    localStorage.setItem("USER_CITY_ID", JSON.stringify(allCitiesResp[index].id));
    localStorage.setItem("USER_CITY_NAME", JSON.stringify(allCitiesResp[index].name_en));


}

// CITY AVAILABLE IN CACHE ?

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