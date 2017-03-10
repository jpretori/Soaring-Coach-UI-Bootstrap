$(document).ready(function() {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "https://protected-bayou-34428.herokuapp.com/health?echo=21",
        dataType: "jsonp",
        success: function(data){
          console.log(data.bearing);
          console.log(data.size);
            },
        error : function(data){
                    console.log(data.bearing);
                    console.log(data.size);
                   }
    })
});
