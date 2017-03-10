$(document).ready(function() {
    $.ajax({
        url: "https://protected-bayou-34428.herokuapp.com/upload"
    }).then(function(data) {
       $('.bearing').append(data.bearing);
       $('.size').append(data.size);
    });
});
