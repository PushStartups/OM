function refend_amount(total,order_id,url,transaction_id){
    var refund_amount = "";
    refund_amount = parseInt(document.getElementById("refund").value);
    console.log("REFUND : "+refund_amount);
    console.log("TOTAL : "+total);

    if(parseInt(refund_amount) > parseInt(total))
    {
        $("#refund_message").html("Refund Amount is greater than Total Amount.");
        return false;
    }
    else if(parseInt(refund_amount) <= parseInt(total))
    {
        addLoading();
        $.ajax({
            url:"ajax/refund_amount.php",
            method:"post",
            data:{refund_amount:refund_amount,order_id:order_id,transaction_id:transaction_id},
            dataType:"json",
            success:function(data)
            {
                hideLoading();
                if(data == "success")
                {
                    alert("Refund Successful");
                }
                else{
                    alert("Refund Fail");
                }
                window.location.href = url;
            }
        });
    }
    else{
        $("#refund_message").html("Please enter valid amount");
        return false;
    }
}

$('#refund').bind('input', function() {
    document.getElementsByClassName("refund_message")[0].innerHTML = "";

});
