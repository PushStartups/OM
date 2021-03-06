
$('#name_en').bind('input', function() {

    document.getElementById('name_en_error').innerHTML = "";

});

$('#name_he').bind('input', function() {

    document.getElementById('name_he_error').innerHTML = "";

});

$('#desc_en').bind('input', function() {

    document.getElementById('desc_en_error').innerHTML = "";

});

$('#desc_he').bind('input', function() {

    document.getElementById('desc_he_error').innerHTML = "";

});


$('#prrice').bind('input', function() {

    if(!this.value.match(/^\d+$/))
    {
        document.getElementById('prrice_error').innerHTML = "Wrong Number!";
    }
    else
    {
        document.getElementById('prrice_error').innerHTML = "";
    }

});

function delete_item(item_id,url)
{
    addLoading();
    $.ajax({
        url:"ajax/delete_item.php",
        method:"post",
        data:{item_id:item_id},
        dataType:"json",
        success:function(data)
        {
            hideLoading();
            alert("Subitems deleted successfully");
            window.location.href = url;
        }
    });
}

function edit_item(item_id,url)
{
    var name_en                    =  $('#name_en').val();
    var name_he                    =  $('#name_he').val();
    var desc_en                    =  $('#desc_en').val();
    var desc_he                    =  $('#desc_he').val();
    var price                      =  $('#prrice').val();


    if(name_en == "")
    {
        $('#name_en_error').html('Required*');
        return;
    }

    if(name_he == "")
    {
        $('#name_he_error').html('Required');
        return;
    }

    if(desc_en == "")
    {
        $('#desc_en_error').html('Required*');
        return;
    }

    if(desc_he == "")
    {
        $('#desc_he_error').html('Required');
        return;
    }

    if(prrice == "")
    {
        $('#prrice_error').html('Required');
        return;
    }



    var postForm = { //Fetch form data

        'name_en'                 :  $('#name_en').val(),
        'name_he'                 :  $('#name_he').val(),

        'desc_en'          :  $('#desc_en').val(),
        'desc_he'          :  $('#desc_he').val(),

        'price'                   :  $('#prrice').val(),

        'hide'                    :  $('#hide').val(),

        'item_id'             :   item_id,


        'cash_pickup_exception'                      :  $('#cash_pickup_exception').val(),
        'min_order_exception'                      :  $('#min_order_exception').val(),


    };

    addLoading();
    $.ajax({
        url:"ajax/edit_item.php",
        method:"post",
        data:postForm,
        dataType:"json",
        success:function(data)
        {
            hideLoading();
            alert("item added successfully");
            window.location.href = url;
        }
    });
}
