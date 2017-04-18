$(function () {

// fsd

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
    // $(".more-toggle").on("click", function () {
    //
    // })

    var autoScroll = false;
    var scrollTop = 0;
    var scrollTopDiff = 0;

    $('body').on('click', '.time-drop-down', function(e) {
        var pop = $(this).offset().top;
        var bottomOfVisibleWindow = $(window).height();
        var bottom = bottomOfVisibleWindow - pop - 250;

        if (bottom < 0) {
            autoScroll = true;

            scrollTop = $('.container').scrollTop();

            $('.container').animate({ scrollTop: $('.container').scrollTop() + (bottom * -1) + 50 }, 300);
            setTimeout(function () {
                scrollTopDiff = $('.container').scrollTop() - scrollTop;
            }, 300)
        }
        else
            scrollTopDiff = 0;

        var that = this;

        setTimeout(function () {
            $(".time-popup").css("bottom", "unset")
            if (!$(".time-popup").is(":visible"))
                $(".time-popup").fadeToggle();

            if ($(that).closest('.separator').is(':last-child') && bottom < 50) {
                $(".time-popup").css("top", "unset")
                $(".time-popup").css("bottom", 0)
                $(".time-popup").css("left", e.clientX - ($(".time-popup").outerWidth() / 2));
            }
            else {
                $(".time-popup").css("top", e.clientY + 10 - scrollTopDiff)
                $(".time-popup").css("left", e.clientX - ($(".time-popup").outerWidth() / 2));
            }

        }, 500)

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


    $('body').on('click', '.time-drop-down .fa', function(e) {
        $(".overlay").fadeIn();
        $(".time-popup").fadeOut();
        $("#carousel-popup").fadeIn();
        e.stopPropagation();
    })

    $(".overlay").on("click", function () {
        $(".overlay").fadeOut();
        $("#carousel-popup").fadeOut()
    })

    $("#about").on("click", function () {
        $(".overlay").fadeIn();
        //$("#myModal").modal();
        $("#detail-popup").fadeIn();
    })

    $(document).click(function () {
        $(".time-popup").fadeOut();
    })

    $(".increase-btn").on("click", function () {
        var count = $(this).prev(".count");
        count.text(parseInt(count.text()) + 1);

        $(this).siblings(".left-btn").attr("src", "img/ic_reduce.png");

    })
    $(".left-btn").on("click", function () {
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
        var src = "img/add.png";

        if ($(this).find("img").attr('src').indexOf("active") != -1)
            src = "img/add.png"
        else
            src = "img/add-active.png"

        $(this).find("img").attr("src", src)
    });

    function centerDiv(that) {
        $('section').animate({
            scrollTop: $(that).offset().top
        }, 500);
    }


})