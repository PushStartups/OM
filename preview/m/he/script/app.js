
// $(function () {
//
//
//     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     if (!(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
//     }
//
//
//     $("input").on("click", function () {
//
//     })
//
//
//     $('div.caption-input input.scroll').on('focus', function(){
//
//         var that = this;
//
//         var delayMillis = 500; //1 second
//
//         setTimeout(function() {
//
//             $(".inner-section").animate({
//
//                 scrollTop: 500
//
//             }, 200);
//
//
//         }, delayMillis);
//
//     })
//
//
//     $('input.scroll2').on('focus', function(){
//
//         var that = this;
//
//         var delayMillis = 500; //1 second
//
//         setTimeout(function() {
//
//             $(".inner-section").animate({
//
//                 scrollTop: 100
//
//             }, 200);
//
//         }, delayMillis);
//
//     })
//
//     $("#main-footer , #food-cart-popup .model-footer").on("click" , function(){
//         orderNow()
//     });
//
//     $("#error_alert img").on("click" , function(){
//
//         $("#error_alert").fadeOut();
//
//         if(!$("#food-cart-popup").is(":visible"))
//         {
//             $("#overlay").fadeOut();
//         }
//
//     });
//
//
//     $("#confimed-footer").on("click" , function(){
//         goToPaymentChoice();
//     });
//
//     $(document).on('click','.expandable input:checkbox',function(){
//
//
//         $(this).attr('checked', 'checked');
//
//     })
//
//
//     $(document).on('click','.add-row',function(){
//
//         $("#overlay").fadeIn();
//         $("#main-popup").slideDown();
//
//     })
//
//
//     $(".ic_close").on("click", function () {
//
//         $("#overlay").fadeOut();
//         $("#main-popup").slideUp();
//         $("#food-cart-popup").slideUp();
//         $("#coupon-popup").slideUp();
//         $("#payment-choice-popup").slideUp();
//         $("#creditcard-info-popup").slideUp();
//         $("#check-coupon-popup").slideUp();
//         userObject.isCoupon = false;
//         hideDots();
//         setDot("first-dot");
//
//     })
//
//     $(document).on('click','.increase-btn',function(){
//
//         var count = $(this).prev(".count");
//         count.text(parseInt(count.text()) + 1);
//
//         $(this).siblings(".left-btn").attr("src", "/m/en/img/ic_reduce.png");
//
//     })
//
//     $(document).on('click','.left-btn',function(){
//         var count = $(this).next(".count");
//
//         if (!(parseInt(count.text()) <= 1)) {
//             var val = parseInt(count.text());
//             count.text(val - 1);
//
//             if ((parseInt(count.text()) == 1)) {
//                 $(this).attr("src", "/m/en/img/ic_cancel.png")
//             }
//         }
//         else {
//             $(this).attr("src", "/m/en/img/ic_cancel.png")
//         }
//
//     })
//
//     function increaseCounter() {
//         $("#count-badge").html(parseInt($("#count-badge").html()) + 1);
//     }
//
// });
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

        // $("#food-cart-popup").slideDown();
        $("#food-cart-popup").modal('show');
        //$("#overlay").fadeIn();

    }

}

function orderNow(){

    var total = parseInt(userObject.total);

    if(total < minOrderLimit && (!ignoreMinOrderLimit))
    {
        $('#email-popup').modal('show');
    }
    else
    {
        $('#customer-info-popup').modal('show');
    }
}

//
// function addOrder(){
//
//     increaseCounter();
//     $("#overlay").fadeOut();
//     $("#main-popup").slideUp();
//     $("#food-cart-popup").slideUp();
//
// }


function increaseCounter() {

    $("#count-badge").show();

    $("#count-badge").html(parseInt($("#count-badge").html()) + 1);
}

function decreaseCounter() {

    if(parseInt($("#count-badge").html()) == 1)
    {
        $("#count-badge").hide();
    }

    $("#count-badge").html(parseInt($("#count-badge").html()) - 1);


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
// $(window).on("resize", function () {
//     resize()
// });

function resize() {

    var height = $("#main-popup .body").innerHeight();
    var topHeight = $("#top-half").outerHeight();

    $(".circle").css("width" , "45vw");
    $(".circle").css("height" , "45vw");

   // $("#main-popup").css("height", "89%");

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