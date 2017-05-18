function add_user_tab()
{
    $("#wid-id-2").show();
}

function delete_company_user(email,company_id,url)
{
    addLoading();
    $.ajax({
        url:"ajax/delete_company_user.php",
        method:"post",
        data:{email:email,company_id:company_id},
        dataType:"text",
        success:function(data)
        {
            hideLoading();


           // window.location.href = url;
        }
    });
}
