$(function () {

    $(".custom-drop").on("click", function (e) {

        if ($(e.target).is("li")) {

            $(".custom-drop input").val($(e.target).text());
        }

        $(this).find(".options").slideToggle();
    })


    $('body').on('click', '.more-toggle', function(e) {

        var that = this;
        $(this).siblings().find(".toggle-content").fadeToggle().promise().done(function () {
            if ($(that).find(".more").text().indexOf("more") != -1) {
                $(that).find(".more").text("less info")
                $(that).find(".sign").text("-")
            }
            else {
                $(that).find(".more").text("more info")
                $(that).find(".sign").text("+")
            }
        });;

    })

    var autoScroll = false;
    var scrollTop = 0;
    var scrollTopDiff = 0;

    $('body').on('click', '.time-drop-down', function(e) {

        var container = $('#scrollable1');
        var scrollTo = $(this);

        setTimeout(function(){

            // Or you can animate the scrolling:
            container.animate({

                scrollTop: ((scrollTo.offset().top - container.offset().top + container.scrollTop() ) - 225)

            },500)

        }, 300);


        var that = this;


        setTimeout(function () {

            try {

                if (!$(".time-popup").is(":visible"))

                    $(".time-popup").fadeToggle();

                else

                    $(".time-popup").fadeOut();


                //show the menu directly over the placeholder
                $(".time-popup").css({

                    position: "absolute",
                    top: (scrollTo.offset().top + 50) + "px",
                    left : (scrollTo.offset().left - 20) + "px"

                }).show();

                var offset = (($(".time-popup").height() +  $(".time-popup").offset().top) -   $(window).height());

                if(offset > 0)
                {
                    console.log(offset);
                    $(".time-popup").css({ top: ($(".time-popup").offset().top - offset) + "px"
                    });

                }

            }
            catch (e)
            {
                console.log(e);
            }

        }, 900);

        e.stopPropagation();

    });


    $('body').on('click', '.discount-drop-down', function(e) {


        var container = $('#scrollable1');
        var scrollTo = $(this);

        setTimeout(function(){

            // Or you can animate the scrolling:
            container.animate({

                scrollTop: ((scrollTo.offset().top - container.offset().top + container.scrollTop() ) - 225)

            },500)

        }, 300);


        var that = this;


        setTimeout(function () {

            try {

                if (!$(".discount-popup").is(":visible"))

                    $(".discount-popup").fadeToggle();

                else

                    $(".discount-popup").fadeOut();


                //show the menu directly over the placeholder
                $(".discount-popup").css({

                    position: "absolute",
                    top: (scrollTo.offset().top + 30) + "px",
                    left : (scrollTo.offset().left - 20) + "px"

                }).show();

                var offset = (($(".discount-popup").height() +  $(".discount-popup").offset().top) -   $(window).height());

                if(offset > 0)
                {
                    console.log(offset);
                    $(".discount-popup").css({ top: ($(".discount-popup").offset().top - offset) + "px"
                    });

                }

            }
            catch (e)
            {
                console.log(e);
            }

        }, 900);

        e.stopPropagation();

    });



    $('.container').on("scroll", function () {
        if (!autoScroll)
            $(".time-popup").fadeOut();


        setTimeout(function () {
            autoScroll = false;
        }, 1000)
    })

    $(window).on("resize", function () {
        $(".time-popup").fadeOut();
    })

    //
    // $('body').on('click', '.time-drop-down .fa', function(e) {
    //
    //     $(".overlay").fadeIn();
    //     $(".time-popup").fadeOut();
    //     $("#carousel-popup").fadeIn();
    //     e.stopPropagation();
    //
    //
    // })
    //
    //
    // $('body').on('click', '.discount-drop-down .fa', function(e) {
    //     $(".overlay").fadeIn();
    //     $(".discount-popup").fadeOut();
    //     $("#carousel-popup").fadeIn();
    //     e.stopPropagation();
    // })


    $(".overlay").on("click", function () {
        $(".overlay").fadeOut();
        $("#carousel-popup").fadeOut()
    })


    $('body').on('click', '.modal', function(e) {

        if($(event.target).is('#about') || $(event.target).is('#popup-info') || $(event.target).is('#myorder') )
        {
            $('.modal').modal('hide');
        }
    });




    // $("#about").on("click", function () {
    //
    //     $(".overlay").fadeIn();
    //     //$("#myModal").modal();
    //     $("#detail-popup").fadeIn();
    //
    //
    // })



    $(document).click(function () {

        $(".time-popup").fadeOut();
        $(".discount-popup").fadeOut();


    })

    // $(".increase-btn").on("click", function () {
    //     var count = $(this).prev(".count");
    //     count.text(parseInt(count.text()) + 1);
    //
    //     $(this).siblings(".left-btn").attr("src", "images/ic_reduce.png");
    //
    // })
    // $(".left-btn").on("click", function () {
    //     var count = $(this).next(".count");
    //
    //     if (!(parseInt(count.text()) <= 1)) {
    //         var val = parseInt(count.text());
    //         count.text(val - 1);
    //
    //         if ((parseInt(count.text()) == 1)) {
    //             $(this).attr("src", "images/ic_cancel.png")
    //         }
    //     }
    //     else {
    //         $(this).attr("src", "images/ic_cancel.png")
    //     }
    //
    // })


    /*Customer info page*/
    $(".panel-title > a").on("click", function () {
        $(this).find("img").toggleClass("rotate-180");
        $(".panel-title > a").not(this).find("img").removeClass("rotate-180");
    });

    $('#credit-card-rad').click(function () {
        $(".credit-card-detail").slideDown()
    });

    $('#cash-rad').click(function () {
        $(".credit-card-detail").slideUp()
    });


    /*choose menu*/
    $("table td.add-img").on("click", function () {
        var src = "images/add.png";

        if ($(this).find("img").attr('src').indexOf("active") != -1)
            src = "images/add.png"
        else
            src = "images/add-active.png"

        $(this).find("img").attr("src", src)
    });

    function centerDiv(that) {
        $('section').animate({
            scrollTop: $(that).offset().top
        }, 500);
    }


})