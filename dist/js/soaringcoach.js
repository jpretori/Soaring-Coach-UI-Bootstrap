$(document).ready(function() {
    $.ajax({
        url: "https://protected-bayou-34428.herokuapp.com/health?echo=21"
    }).then(function(data) {
       $('.bearing').append(data.bearing);
       $('.size').append(data.size);
    });
});
