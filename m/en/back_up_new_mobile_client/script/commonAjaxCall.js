

// COMMON AJAX CALLS AND HANDLING

function commonAjaxCall(url,data,callBcak)
{

    // LOADING
    addLoading();

    //SERVER HOST DETAIL
    var host = "http://"+window.location.hostname;

    $.ajax({

        url:  host + url,
        type: "post",
        data: data,


        success: function (response) {

            hideLoading();
            callBcak(response);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            // HIDE LOADING
            hideLoading();


            // ERROR OCCUR TAKE USER ACTION
                if(!alertify.errorAlert)
                {
                    //define a new errorAlert base on alert
                    alertify.dialog('errorAlert',function factory(){

                        return{

                            build:function(){

                                var errorHeader = '<span class="fa fa-times-circle fa-2x" ' +
                                                  'style="vertical-align:middle;color:#e10000;">' +
                                                  '</span>&nbsp &nbsp Server Error';

                                this.setHeader(errorHeader);
                            },
                            setup:function(){

                                return {

                                    buttons:[{text: "try again", key:27/*Esc*/}],
                                    focus: { element:1 }

                                };
                            },
                            callback:function(closeEvent){

                                commonAjaxCall(url,data);
                            }
                        }


                    },true,'alert');
                }
                alertify.errorAlert("No Response From Server <br/><br/><br/>");


            }

    });

}

// SHOW LOADER ON AJAX CALLS
function addLoading(){

    $("body").addClass("blur-class");
    $("#loader").css("display" , "block");
}




// HIDE LOADING ON AJAX CALLS
function hideLoading(){
    setTimeout(function() {
        $("body").removeClass("blur-class");
        $("#loader").css("display" , "none");
    }, 1000);
}
