var USER_LANGUAGE = localStorage.getItem("USER_LANGUAGE");

var isMobile = {

    Android: function() {

        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {

        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {

        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {

        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {

        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {

        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


// IF DEVICE IS NOT MOBILE
if(!isMobile.any())
{

    if(window.location.hostname == "orderapp.com")
    {
        if (location.protocol != 'https:')
        {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }

        if(USER_LANGUAGE == 'EN') {

            window.location.href = 'https://orderapp.com/en/';
        }
        else
        {
            window.location.href = 'https://orderapp.com/he/';
        }
    }


    else if(window.location.hostname == "dev.orderapp.com")
    {

        if (location.protocol != 'https:')
        {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }

        if(USER_LANGUAGE == 'EN') {

            window.location.href = 'https://dev.orderapp.com/en/';

        }
        else {


            window.location.href = 'https://dev.orderapp.com/he/';
        }

    }

    else if(window.location.hostname == "qa.orderapp.com")
    {

        if (location.protocol != 'https:')
        {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }

        if(USER_LANGUAGE == 'EN') {

            window.location.href = 'https://qa.orderapp.com/en/';
        }
        else
        {
            window.location.href = 'https://qa.orderapp.com/he/';
        }

    }

    else if(window.location.hostname == "staging.orderapp.com")
    {
        if (location.protocol != 'https:')
        {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }

        if(USER_LANGUAGE == 'EN') {

            window.location.href = 'https://staging.orderapp.com/en/';
        }
        else
        {
            window.location.href = 'https://staging.orderapp.com/he/';
        }
    }
}
