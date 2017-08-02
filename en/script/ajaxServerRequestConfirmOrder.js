// GLOBAL VARIABLES

var userObject                  = null;                                           // MAIN USER OBJECT
var foodCartData                = [];                                             // DISPLAY DATA FOR FOOD CART
var restName                    = null;                                           // SELECTED RESTAURANT NAME
var restId                      = null;                                           // SELECTED RESTAURANT ID
var selectedRest                = null;

var customerInfoFlag            = false;
var addressInfoFlag             = false;
var paymentInfoFlag             = false;

var couponApplied               = false;
var paymentReceived             = false;

var cash_pickup_exception       = false;

var cash_pickup_from_link       = false;



//SERVER HOST DETAIL

$(document).ready(function() {

    // EXCEPTION IF USER OBJECT NOT RECEIVED UN-DEFINED
    if(localStorage.getItem("USER_OBJECT") == undefined ||localStorage.getItem("USER_OBJECT") == "" || localStorage.getItem("USER_OBJECT") == null)
    {
        // SEND USER BACK TO HOME PAGE
        window.location.href = '/en/index.html';

    }

    // RETRIEVE USER OBJECT RECEIVED FROM PREVIOUS PAGE
    userObject  = JSON.parse(localStorage.getItem("USER_OBJECT"));

    // RETRIEVE SELECTED REST ID RAW RESPONSE
    foodCartData  = JSON.parse(localStorage.getItem("FOOD_CARD_DATA"));

    // RETRIEVE SELECTED REST ID RAW RESPONSE
    selectedRest  = JSON.parse(localStorage.getItem("SELECTED_REST"));


    restName                    = userObject.restaurantTitle;                      // SELECTED RESTAURANT NAME
    restId                      = userObject.restaurantId;                         // SELECTED RESTAURANT ID


    $('#rest-title').html(userObject.restaurantTitle);


    // HIDE SUBMIT ORDER BUTTON ON START

    $('#submitOrder').hide();


    // CHECK IF USER IS ALREADY LOGIN


    if(localStorage.getItem("USER_SMOOCH_ID") != undefined && localStorage.getItem("USER_SMOOCH_ID") != "" && localStorage.getItem("USER_SMOOCH_ID") != null) {


        //  USER ALREADY LOGIN WELCOME USER

        LoginSuccessFullState();

    }
    else
    {
        if(localStorage.getItem("IS_LOGIN") != undefined && localStorage.getItem("IS_LOGIN") != "" && localStorage.getItem("IS_LOGIN") != null) {


            if(localStorage.getItem("IS_LOGIN") == 'true')
            {
                // DISPLAY LOGIN OPTION TO USER
                SignInDefault();
                userObject.smooch_id = '';

            }
        }

    }


    if(userObject.pickup_hide == true)
    {
        $('#pickup_option').hide();
        $('#checkbox-id-23').prop('checked', true);
        $('#deliveryFieldsParent').addClass('show');

    }
    else {

        // SET DEFAULT VALUES ON ADDRESS AND DELIVERY SELECTION
        $('#checkbox-id-12').prop('checked', true);

    }


    $('.dropdown-nav').show();


    userObject.pickFromRestaurant = true;

    $('#checkbox-id-13').prop('checked', true);

    userObject.Cash_Card = "CASH";
    userObject.Cash_Card_he = "מזומן";

    $('#address-text').html(userObject.restaurantAddress);

    var ignore_pickup = localStorage.getItem("IGNORE_DELIVERY");

    if(ignore_pickup == "false") {


        var temp = '<option value="-1">Select Area</option>';

        for (var x = 0; x < selectedRest.delivery_fee.length; x++) {
            temp += '<option value="' + x + '">' + selectedRest.delivery_fee[x].area_en + ' : Fee ' + selectedRest.delivery_fee[x].fee + 'NIS</option>';
        }

        $('#delivery-areas').html(temp);
        cash_pickup_from_link = false;
    }
    else {

        $('#delivery-parent').hide();
        cash_pickup_from_link = true;

    }



    updateCartElements();

    initAccordion();

});


$('#delivery-areas').on('change', function() {

    var index =  this.value;

    if(index == -1)
    {
        userObject.deliveryArea = null;
        userObject.deliveryCharges = 0;
        $("#error-area").html('Select One!');
        $("#area").addClass("error");
        $("#error-area").show();
    }
    else
    {
        userObject.deliveryArea = selectedRest.delivery_fee[index].area_en;
        userObject.deliveryCharges = selectedRest.delivery_fee[index].fee;
        $("#error-area").html('');
        $("#error-area").hide();
        $("#area").removeClass("error");


    }

    updateCartElements();

});


// UPDATE FOOD CART
function updateCartElements()
{
    var countItems = 0;
    var newTotal = userObject.total;
    cash_pickup_exception = false;

    // DISPLAY FOOD CART IF AT LEAST ONE ITEM TO DISPLAY

    var str = '';

    for (var x = 0; x < foodCartData.length; x++)
    {
        countItems = countItems +  foodCartData[x].qty;


        str += '<div class="row-holder">' +
            '<div class="row header-row no-gutters">' +
            '<div class="col-md-9 col-xs-9">' +
            '<h2>' + foodCartData[x].name + '</h2>' +
            '</div>'+
            '<div class="col-md-3 col-xs-3">'+
            '<span class="dim">'+ foodCartData[x].qty.toString() +' x ' + foodCartData[x].price  + ' NIS</span>'+
            '</div>'+
            '</div>'+
            '<div class="row no-gutters">' +
            '<div class="col-md-9 col-sm-9 col-xs-9">';


        if(foodCartData[x].specialRequest != "")
        {

            if(foodCartData[x].detail != "") {

                str += '<p>' + foodCartData[x].detail + ', special request : ' + foodCartData[x].specialRequest + '</p>';
            }
            else
            {
                str += '<p>' + foodCartData[x].detail + ' special request : ' + foodCartData[x].specialRequest + '</p>';
            }
        }
        else {

            str += '<p>' + foodCartData[x].detail +'</p>';

        }


        str += '</div>'+
            '</div>'+
            '</div>';


        if(foodCartData[x].cash_pickup_exception == 1)
        {
            cash_pickup_exception = true;
        }


    }


    $('#nested-section').html(str);
    $('#summary_items').html(str);

    $('#totalAmountWithoutDiscount').html(userObject.total + " NIS");
    $('#totalAmountWithoutDiscount2').html(userObject.total + " NIS");


    $('.badge').html(countItems);


    if(!userObject.isCoupon)
    {
        $('#showDiscount').hide();
        $('#showDiscount2').hide();
    }
    else
    {

        $('#showDiscount').show();
        $('#showDiscount2').show();

        $('#totalAmountWithoutDiscount').html(userObject.totalWithoutDiscount + " NIS");
        $('#totalAmountWithoutDiscount2').html(userObject.totalWithoutDiscount + " NIS");

        newTotal = userObject.total;
    }


    if($('#checkbox-id-12').is(":checked"))
    {
        $('#deliveryDetail').hide();
        $('#deliveryDetail2').hide();
    }
    else
    {
        if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {

            $('#area-charges').html(userObject.deliveryCharges + " NIS");
            $('#area-charges2').html(userObject.deliveryCharges + " NIS");
            newTotal = convertFloat(convertFloat(newTotal) + convertFloat(userObject.deliveryCharges));
            $('#deliveryDetail').show();
            $('#deliveryDetail2').show();
        }
        else
        {
            $('#deliveryDetail').hide();
            $('#deliveryDetail2').hide();
        }
    }

    $('#totalAmount').html('Total '+newTotal + " NIS");
    $('#totalAmount2').html('Total '+newTotal + " NIS");


    if(cash_pickup_exception)
    {
        $('#delivery-parent').hide();
    }

}


function saveUserInfo() {

    // EXCEPTION HANDLING
    // NAME CANNOT BE EMPTY

    $("#email").removeClass("error");
    $("#contact").removeClass("error");
    $("#name").removeClass("error");
    $("#error-name").hide();
    $("#error-email").hide();
    $("#error-contact").hide();


    if($("#name_text").val() == "")
    {
        $("#name").addClass("error");
        $("#error-name").html('*Required Field');
        $("#error-name").show();

        return;
    }

    // EMAIL CANNOT BE EMPTY
    if($("#email_text").val() == ""){

        $("#email").addClass("error");
        $("#error-email").html('*Required Field');
        $("#error-email").show();

        return;
    }

    if( !validateEmail($("#email_text").val())){

        $("#email").addClass("error");
        $("#error-email").html('Invalid Email!');
        $("#error-email").show();
        return;
    }

    // CONTACT NO CANNOT BE EMPTY

    if($("#contact_text").val() == ""){

        $("#contact").addClass("error");
        $("#error-contact").html('*Required Field');
        $("#error-contact").show();
        return;
    }


    // VALIDATION OF CONTACT NO NOT CONTAIN CHAR EXCEPT +

    var contact = $("#contact_text").val().replace('+','');

    if(!(/^\d+$/.test(contact)))
    {
        $("#contact").addClass("error");
        $("#error-contact").html('Invalid Phone Number!');
        $("#error-contact").show();
        return;
    }

    userObject.name       =  $("#name_text").val();
    userObject.email      =  $("#email_text").val();
    userObject.contact    =  $("#contact_text").val();


    customerInfoFlag = true;

    if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
    {
        $('#submitOrder').show();
    }
    else
    {
        $('#submitOrder').hide();
    }

    $('#deliveryInfoParent').addClass("active");
    $('#customerInfoParent').removeClass("active");
    $('#paymentParent').removeClass("active");
    $('#specialRequestParent').removeClass("active");


    showSlide($('#deliverySlider')).hide().slideDown(300);
    hideSlide($('#customerSlider'));

}




function deliveryAddress()
{

    userObject.delivery_lat = $('#lat').val();
    userObject.delivery_lng = $('#lng').val();

    $("#appt-no").removeClass("error");
    $("#address").removeClass("error");
    $("#area").removeClass("error");
    $("#error-appt-no").hide();
    $("#error-address").hide();
    $("#error-area").hide();

    // DELIVER ADDRESS EMPTY
    if($('#checkbox-id-12').is(':checked'))
    {
        userObject.pickFromRestaurant = true;

        $('#deliveryInfoParent').removeClass("active");
        $('#customerInfoParent').removeClass("active");
        $('#paymentParent').addClass("active");
        $('#specialRequestParent').removeClass("active");


        if(!cash_pickup_exception && !cash_pickup_from_link) {

            $('#cash_parent').hide();
            $('#cash_message').show();

        }

        addressInfoFlag = true;

        if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
        {
            $('#submitOrder').show();
        }
        else
        {
            $('#submitOrder').hide();
        }

        $("#user_name").val(userObject.name);

        showSlide($('#paymentSlider')).hide().slideDown(300);
        hideSlide($('#deliverySlider'));


        $('#checkbox-id-13').prop('checked', false);
        $('#checkbox-id-24').prop('checked', true);
        $('#show_credit_card').addClass('show');

    }
    else
    {
        // if($("#appt-no").val() == "")
        // {
        //     $("#appt-no").addClass("error");
        //     $("#error-appt-no").html('*Required Field');
        //     $("#error-appt-no").show();
        //     return;
        // }


        if($("#address").val() == "")
        {
            $("#address").addClass("error");
            $("#error-address").html('*Required Field');
            $("#error-address").show();
            return;
        }

        if($('#lat').val() == "" || $('#lng').val() == "")
        {


            $("#address").addClass("error");
            $("#error-address").html('Please Select From Suggestions');
            $("#error-address").show();

            return;
        }


        if(userObject.deliveryArea == null)
        {
            $("#area").addClass("error");
            $("#error-area").html('Select One!');
            $("#error-area").show();
            return;
        }

        userObject.pickFromRestaurant = false;

        userObject.deliveryAddress = $("#address").val();
        userObject.deliveryAptNo = $("#appt-no").val();


        $('#deliveryInfoParent').removeClass("active");
        $('#customerInfoParent').removeClass("active");
        $('#paymentParent').addClass("active");
        $('#specialRequestParent').removeClass("active");
        $('#cash_parent').show();
        $('#cash_message').hide();
        $("#user_name").val(userObject.name);


        addressInfoFlag = true;

        if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
        {
            $('#submitOrder').show();
        }
        else
        {
            $('#submitOrder').hide();
        }

        showSlide($('#paymentSlider')).hide().slideDown(300);
        hideSlide($('#deliverySlider'));

        $('#checkbox-id-24').prop('checked', false);
        $('#checkbox-id-13').prop('checked', true);
        $('#show_credit_card').removeClass('show');


    }



    console.log(userObject);
}



function ClosePayment()
{

    $("#error-card").removeClass("error");
    $('#error-card-no').html("");

    $("#error-cvv-parent").removeClass("error");
    $("#exp_error").removeClass("error");

    $('.payment-errors').html("");
    $('.payment-errors').hide();


    // IF PAYMENT THROUGH CREDIT CARD

    if ($('#checkbox-id-24').is(":checked")) {

        // CARD NO SHOULD NOT BE EMPTY
        if ($('#card_no').val() == "") {

            $("#error-card").addClass("error");
            $('#error-card-no').html("*Required Field");
            return;

        }

        if((!$('#card_no').val().match(/^\d+$/)))
        {
            if($("#card_no").val() != ''){

                $("#error-card").addClass("error");
                $('#error-card-no').html("Invalid Card Number!");
                return;
            }
        }


        // CVV SHOULD NOT BE EMPTY
        if ($('#cvv').val() == "") {
            $("#error-cvv-parent").addClass("error");
            $('.payment-errors').html("*Required Field CVV");
            $('.payment-errors').show();

            return;
        }

        // MONTH SHOULD NOT BE EMPTY
        if ($('#month').val() == "") {
            $("#exp_error").addClass("error");
            $('.payment-errors').html("*Card Expiry Date Month (MM) Required");
            $('.payment-errors').show();
            return;
        }

        // MONTH SHOULD NOT BE EMPTY
        if ($('#year').val() == "") {
            $("#exp_error").addClass("error");
            $('.payment-errors').html("*Card Expiry Date Year (YY) Required");
            $('.payment-errors').show();
            return;
        }

    }

    $('#coupon').removeClass('error');
    $("#error-coupon").html("");
    $("#error-coupon").hide();

    // USER WANT TO USE COUPON
    if($('#coupon-txt').val() != "")
    {
        var code  = $('#coupon-txt').val();

        if(!couponApplied)
        {
            var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));

            commonAjaxCall("/restapi/index.php/coupon_validation", {"code": code, "email": userObject.email,
                "total": userObject.total,"rest_title" : userObject.restaurantTitle,
                "rest_city" : selectedCityName, "delivery_fee" : userObject.deliveryCharges, "user_order" : userObject },checkCouponCallBack);
        }

    }
    else
    {

        paymentInfoFlag = true;

        if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
        {
            $('#submitOrder').show();
        }
        else
        {
            $('#submitOrder').hide();
        }

        showSlide($('#specialRequest')).hide().slideDown(300);
        hideSlide($('#paymentSlider'));
    }

}



function saveCashDetail()
{

    $('#order-summary').modal('hide');
    processPayments();
}


function checkCouponCallBack(response)
{
    var responseCoupon = JSON.parse(response);
    var code = $("#coupon-txt").val();


    console.log(responseCoupon);

    // COUPON IS VALID
    if (responseCoupon.success == true)
    {

        var newTotal = 0;

        userObject.discount = responseCoupon.amount;
        var discountedAmount = 0;


        // NOT A DELIVERY FREE COUPON
        if(!responseCoupon.deliveryFree) {

            if (responseCoupon.isFixAmountCoupon) {


                userObject.isFixAmountCoupon = true;

                discountedAmount = convertFloat(userObject.discount);

                if(userObject.total < userObject.discount)
                {
                    userObject.discount = userObject.total;
                    discountedAmount = userObject.total;
                }

                newTotal = convertFloat(userObject.total) - convertFloat(userObject.discount);

                $('#discountValue').html("-" + discountedAmount + " NIS");
                $('#discountValue2').html("-" + discountedAmount + " NIS");
            }
            else {


                userObject.isFixAmountCoupon = false;

                discountedAmount = convertFloat((convertFloat(userObject.total) * convertFloat(userObject.discount)) / 100);

                newTotal = convertFloat(convertFloat(userObject.total) - convertFloat(discountedAmount));

                $('#discountValue').html("-" + discountedAmount + " NIS");
                $('#discountValue2').html("-" + discountedAmount + " NIS");

                $('#discountTitle').html("Coupon Discount " + userObject.discount + "%");
                $('#discountTitle2').html("Coupon Discount " + userObject.discount + "%");

            }


        }
        else
        {
            userObject.isFixAmountCoupon = true;

            discountedAmount = convertFloat(userObject.deliveryCharges);

            newTotal = convertFloat(userObject.total) - convertFloat(userObject.deliveryCharges);

            $('#discountValue').html("Delivery Free -" + discountedAmount + " NIS");
            $('#discountValue2').html("Delivery Free -" + discountedAmount + " NIS");

        }


        userObject.totalWithoutDiscount = userObject.total;
        userObject.total = newTotal;

        userObject.isCoupon = true;
        updateCartElements();

        $('#coupon_parent').hide();
        couponApplied = true;
        $('#coupon-txt').val("");

        paymentInfoFlag = true;

        if(customerInfoFlag && paymentInfoFlag && addressInfoFlag)
        {
            $('#submitOrder').show();
        }
        else
        {
            $('#submitOrder').hide();
        }

        showSlide($('#specialRequest')).hide().slideDown(300);
        hideSlide($('#paymentSlider'));


    }
    // INVALID COUPON CODE
    else
    {

        userObject.isCoupon = false;
        $('#coupon').addClass('error');
        $("#coupon-txt").val("");
        $("#error-coupon").html("Error - this coupon is not valid.");
        $("#error-coupon").show();
        updateCartElements();
        showSlide($('#paymentSlider')).hide().slideDown(300);

    }

    console.log(userObject);
}


function processPayments()
{
    if ($('#checkbox-id-13').is(':checked') && ( (!userObject.pickFromRestaurant) || cash_pickup_exception || cash_pickup_from_link  )) {

        userObject.Cash_Card = "CASH";
        userObject.Cash_Card_he = "מזומן";
        onPaymentSuccess();
    }
    else
    {
        if(!paymentReceived)
        {
            $('#payment-form').submit();
        }
    }
}


// CREDIT CARD PAYMENT
function payment_credit_card(cardNo, cvv, exp) {

    userObject.cartData = foodCartData;


    if(userObject.deliveryArea == null)
    {
        userObject.deliveryArea = '';
    }


    if(userObject.specialRequest == null)
    {
        userObject.specialRequest = '';
    }


    var  newTotal = userObject.total;


    if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {


        newTotal = convertFloat(convertFloat(userObject.total) + convertFloat(userObject.deliveryCharges));


    }

    commonAjaxCall("/restapi/index.php/stripe_payment_request", {"amount" : newTotal, "user_order": userObject , "cc_no"  : cardNo, "exp_date"  : exp, "cvv"  : cvv },paymentCreditCardCallBack);

}


function paymentCreditCardCallBack(response) {

    var resp = '';

    try {

        resp = JSON.parse(response);
    }
    catch (e)
    {
        resp = response;
        console.log(resp);
    }

    if(resp.response == "success")
    {
        paymentReceived = true;
        userObject.Cash_Card = "Credit Card";
        userObject.Cash_Card_he = "כרטיס אשראי";
        userObject.trans_id = resp.trans_id;
        onPaymentSuccess();
    }
    else
    {
        $(".payment-errors").html(resp.response);
        $(".payment-errors").show();
        showSlide($('#paymentSlider')).hide().slideDown(300);
    }

}


function specialRequestSave()
{
    var sr = $('#specialRequestText').val();

    if(sr != null && sr != "")
    {
        userObject.specialRequest = sr;
    }

    hideSlide($('#specialRequest'));


    $('#deliveryInfoParent').removeClass("active");
    $('#customerInfoParent').removeClass("active");
    $('#paymentParent').removeClass("active");
    $('#specialRequestParent').removeClass("active");

}



function onPaymentSuccess()
{
    sectionPayment = true;

    $('#deliveryInfoParent').removeClass("active");
    $('#customerInfoParent').removeClass("active");
    $('#paymentParent').removeClass("active");
    $('#specialRequestParent').addClass("active");

    callPage3();
}


// SEND ORDER USER TO SERVER & CALL PAGE 3

function  callPage3() {

    userObject.cartData = foodCartData;

    if(userObject.deliveryArea == null)
    {
        userObject.deliveryArea = '';
    }

    if(userObject.specialRequest == null)
    {
        userObject.specialRequest = '';
    }

    if(userObject.deliveryCharges != null && userObject.deliveryCharges != 0) {

        var  newTotal = convertFloat(convertFloat(userObject.total) + convertFloat(userObject.deliveryCharges));



        userObject.total = newTotal;
    }


    if(userObject.totalWithoutDiscount == null || userObject.totalWithoutDiscount == "")
    {
        userObject.totalWithoutDiscount = userObject.total;
    }

    var browserName = BrowserInfo();


    userObject.rest_lat = selectedRest.rest_lat;
    userObject.rest_lng = selectedRest.rest_lng;


    commonAjaxCall("/restapi/index.php/add_order",{"user_order": userObject,"user_platform": 'ENG Desktop',"browser_info":browserName},callPage3CallBack);

};


function callPage3CallBack(response) {


    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    userObject = null;
    localStorage.setItem("USER_OBJECT", "");

    // MOVING TO ORDER PAGE
    window.location.href = '/en/'+selectedCityName+"/"+ restaurantTitle+"/complete-order";

}


// VALIDATE EMAIL ADDRESS
function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


// accordion slide visibility
var showSlide = function(slide) {
    return slide.css({position:'', top: '', left: '', width: '' });
};


var hideSlide = function(slide) {
    return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
};


function convertFloat(num)
{
    return parseFloat(parseFloat(num).toFixed(2));
}


function goBack()
{
    var restaurantTitle     =   userObject.restaurantTitle.replace(/\s/g, '');
    var selectedCityName    =   JSON.parse(localStorage.getItem("USER_CITY_NAME"));
    selectedCityName        =   selectedCityName.replace(/\s/g, '');

    // MOVING TO ORDER PAGE
    window.location.href = '/en/'+selectedCityName+"/"+ restaurantTitle+"/order";
}


// LOGIN / SIGN UP STATES

function LoginSuccessFullState() {

    var email     =     ""
    var smooch_id =     localStorage.getItem("USER_SMOOCH_ID");
    var name      =     "";

    commonAjaxCall("/restapi/index.php/get_user",{"smooch_id":smooch_id},getUserLogin);


}

function getUserLogin(response) {

    resp = JSON.parse(response);

    if(resp == "not found")
    {
        localStorage.setItem("USER_SMOOCH_ID","");
        SignInDefault();
    }
    else {

        userObject.uid = resp.smooch_id;
        userObject.email = resp.email;
        userObject.name = resp.name;
        userObject.contact = resp.contact;

        // DISPLAY LOGIN SUCCESS

        $('#loginBtnText').html("Hi "+userObject.email);
        $("#loginMessage").show();
        $("#success-message").html("Hey "+resp.name+", Nice to meet you :)");

        // HIDE FORM S

        $('#signup-message').hide();
        $('#manual-signup').hide();
        $('#signUpForm').hide();


        $('#email_text').val(userObject.email);
        $('#name_text').val(userObject.name);
        $('#contact_text').val(userObject.contact);

    }
}


function SignInDefault()
{
    $('#signin').show();
    $('#signup').hide();
}


function BrowserInfo() {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
// In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
    }
// In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    }
// In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
// In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
// In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
        (verOffset=nAgt.lastIndexOf('/')) )
    {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
// trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion,10);
    }

    return browserName;

}