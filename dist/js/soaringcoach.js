$(document).ready(function() {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "https://protected-bayou-34428.herokuapp.com/health?echo=21",
        dataType: "jsonp",
        success: function(data){
              $('.bearing').append(data.bearing);
              $('.size').append(data.size);
            }
        }
        error : function(data){
                    console.log(data);
                   }
    })
});
