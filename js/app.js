
$(function () {


    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (!(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
    }

    // var lastScrollTop = 0;
    //
    // $("#mid-scroll").scroll(function(event)
    // {
    //     // IF NOT SCROLL ABLE DONT DO ANY THING
    //     if($(this)[0].scrollHeight > $("#main-popup .body").innerHeight() - 150)
    //     {
    //
    //         var st = $(this).scrollTop();
    //
    //         console.log(st);
    //
    //         if (st > lastScrollTop)
    //         {
    //             // downscroll code
    //             console.log("downscroll")
    //
    //             if($(".circle").height() > 80){
    //                 $(".circle").css("min-width" , "80px")
    //                 $(".circle").css("min-height" , "80px")
    //                 $(".circle").css("width" , $(".circle").width() - st);
    //                 $(".circle").css("height" , $(".circle").height() - st);
    //                 $("#mid-scroll").css("height" ,$("#mid-scroll").height() + st);
    //                 $("div.popup .product-circle .circle-badge").addClass("mini");
    //                 $("#itemPopUpTitle").css("margin-bottom" , "8px")
    //                 $("#itemPopUpTitle").css("margin-top" , "8px");
    //                 $("#itemPopUpTitle").css("font-size" , "12px");
    //                 $("#main-popup p").css("font-size" , "9px")
    //             }
    //         }
    //         else {
    //
    //             if (st < 5)
    //             {
    //
    //                 $(".circle").css("width", "45vw");
    //                 $(".circle").css("height", "45vw");
    //                 $("div.popup .product-circle .circle-badge").removeClass("mini")
    //                 var height = $("#main-popup .body").innerHeight();
    //                 $("#itemPopUpTitle").css("margin-bottom", "20px")
    //                 $("#itemPopUpTitle").css("margin-top", "20px")
    //                 $("#main-popup p").css("font-size", "12px")
    //
    //                 $("#itemPopUpTitle").css("font-size", "15px");
    //                 $("#mid-scroll").css("height", height - $("#top-half").outerHeight() - 50 + "px")
    //             }
    //
    //         }
    //         lastScrollTop = st;
    //     }
    // });


    $("input").on("click", function () {
       
    })


    $('div.caption-input input.scroll').on('focus', function(){

        var that = this;

        var delayMillis = 500; //1 second

        setTimeout(function() {

            $(".inner-section").animate({

                scrollTop: 500

            }, 200);


        }, delayMillis);

    })


    $('input.scroll2').on('focus', function(){

        var that = this;

        var delayMillis = 500; //1 second

        setTimeout(function() {

            $(".inner-section").animate({

                scrollTop: 100

            }, 200);

        }, delayMillis);

    })

    $("#main-footer , #food-cart-popup .model-footer").on("click" , function(){
        orderNow()
    });

    $("#error_alert img").on("click" , function(){

        $("#error_alert").fadeOut();

        if(!$("#food-cart-popup").is(":visible"))
        {
            $("#overlay").fadeOut();
        }

    });


    $("#confimed-footer").on("click" , function(){
        goToPaymentChoice();
    });

    $(document).on('click','.expandable input:checkbox',function(){


        $(this).attr('checked', 'checked');

    })


    $(document).on('click','.product-card',function(){

        $("#overlay").fadeIn();
        $("#main-popup").slideDown();

    })


    $(".ic_close").on("click", function () {

        $("#overlay").fadeOut();
        $("#main-popup").slideUp();
        $("#food-cart-popup").slideUp();
        $("#coupon-popup").slideUp();
        $("#payment-choice-popup").slideUp();
        $("#creditcard-info-popup").slideUp();
        $("#check-coupon-popup").slideUp();
        hideDots();
        setDot("first-dot");

    })

    $(document).on('click','.increase-btn',function(){

        var count = $(this).prev(".count");
        count.text(parseInt(count.text()) + 1);

        $(this).siblings(".left-btn").attr("src", "img/ic_reduce.png");

    })

    $(document).on('click','.left-btn',function(){
        var count = $(this).next(".count");

        if (!(parseInt(count.text()) <= 1)) {
            var val = parseInt(count.text());
            count.text(val - 1);

            if ((parseInt(count.text()) == 1)) {
                $(this).attr("src", "img/ic_cancel.png")
            }
        }
        else {
            $(this).attr("src", "img/ic_cancel.png")
        }

    })

    function increaseCounter() {
        $(".count-badge").html(parseInt($(".count-badge").html()) + 1);
    }

})
function setUpPopup(id){

    $("#overlay").fadeIn();

    $("#"+id).slideDown();

    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100)
}

function hidePopup(id){
    $("#overlay").fadeOut();
    $("#" + id).slideUp();
    hideDots();
}

function goToCoupon(){

    setUpPopup("coupon-popup");
    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100);

    setDot("second-dot");
}

function goToConfirmCoupon(){

    $("#coupon-popup").slideDown();

    setUpPopup("check-coupon-popup");

    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100);
    setDot("third-dot");
}
function goToPaymentChoice(){

    $("#check-coupon-popup").slideUp();
    $("#coupon-popup").slideUp();
    $("#creditcard-info-popup").slideUp();

    setUpPopup("payment-choice-popup");
    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100);
    setDot("fourth-dot");
}


function goToCards(){

    $("#payment-choice-popup").slideUp();

    setUpPopup("creditcard-info-popup");
    $("#user_name").val(userObject.name);
    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100)

}


function goToConfirmOrder(){

    $("#creditcard-info-popup").slideUp();
    setUpPopup("confirm-order-popup");
    setTimeout(function(){
        $("#overlay").fadeIn();
    } , 100)
}

function showCartElements(){


    if(userObject.orders.length != 0) {

        $("#food-cart-popup").slideDown();
        $("#overlay").fadeIn();

    }

}

function orderNow(){

    var total = parseInt(userObject.total);

    if(total < minOrderLimit)
    {
        setUpPopup("error_alert");
        hideDots();
    }
    else
    {
        $("#food-cart-popup").slideUp();
        setUpPopup("customer-popup");
        displayDots();
    }
}


function addOrder(){

    increaseCounter();
    $("#overlay").fadeOut();
    $("#main-popup").slideUp();

    $("#food-cart-popup").slideUp();

}


function increaseCounter() {

    $(".count-badge").show();

    $(".count-badge").html(parseInt($(".count-badge").html()) + 1);
}

function decreaseCounter() {

    if(parseInt($(".count-badge").html()) == 1)
    {
        $(".count-badge").hide();
    }

    $(".count-badge").html(parseInt($(".count-badge").html()) - 1);


}

function displayDots(){
    $("#footer-dots").show();
}

function hideDots(){
    $("#footer-dots").hide();
}

function setDot(index){
    $("#footer-dots").find(".active").removeClass("active")
    $("#"+ index).addClass("active")
}
$(window).on("resize", function () {
    resize()
});

function resize() {
    var height = $("#main-popup .body").innerHeight();
    var topHeight = $("#top-half").outerHeight();

    $(".circle").css("width" , "45vw");
    $(".circle").css("height" , "45vw");

    $("#main-popup").css("height", "89%");

    setTimeout(function () {

        if ($("#mid-scroll").find("#parent_type_multiple").text() == "" &&
            ($("#mid-scroll").find("#parent_type_one").text() == "" ||
            !$("#mid-scroll").find("#parent_type_one").is(":visible"))) {

            $("#main-popup").css("height", "auto");

        }
        else
        {
            $("#main-popup").css("height", "89%");
        }
    }, 700)


}