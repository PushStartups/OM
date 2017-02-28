$(function () {


    $('.dropdown-menu a').on('click', function () {
        $('.btn-primary > span#text-span').text($(this).text());
    });


    $('.dropdown').data('open', false);


    $('#menu1').click(function () {
        if ($('.dropdown').data('open')) {
            $('.dropdown').data('open', false);
            $(this).css("opacity", "1");
        }
        else {
            $(this).css("opacity", "0");
            $('.dropdown').data('open', true);
        }

    });


    $(document).click(function () {

        if ($('.dropdown').data('open')) {

            $('.dropdown').data('open', false);
            $('#menu1').css("opacity", "1");
        }
    });

});




