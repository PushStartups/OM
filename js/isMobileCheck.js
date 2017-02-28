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


if(!isMobile.any())
{
     if(window.location.hostname == "dev.m.orderapp.com")
     {
         window.location.href = 'http://dev.landing.orderapp.com';
     }
     else if(window.location.hostname == "staging.m.orderapp.com")
     {
         window.location.href = 'http://staging.orderapp.com';
     }
     else
    {
        window.location.href = 'http://orderapp.com';
    }
}