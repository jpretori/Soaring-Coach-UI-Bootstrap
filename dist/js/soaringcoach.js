//Testing REST calls
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "https://protected-bayou-34428.herokuapp.com/health?echo=21",
        success: function(data){
          $('#bearing').append(data.bearing);
          $('#size').append(data.size);
            },
        error : function(data){
                    console.log(data.bearing);
                    console.log(data.size);
                   }
    })
});

//Upload flight & list thermals
// $(document).ready(function() {
//     $.("#fileUpload").click(function(){
//       $.post("https://protected-bayou-34428.herokuapp.com/upload",
//       $("#fileInput").val(),
//       function(data,status){
//
//       });
//             });
//     })
// });

//Examples for setting various bits of the DOM
// $(document).ready(function(){
//     $("#btn1").click(function(){
//         $("#test1").text("Hello world!");
//     });
//     $("#btn2").click(function(){
//         $("#test2").html("<b>Hello world!</b>");
//     });
//     $("#btn3").click(function(){
//         $("#test3").val("Dolly Duck");
//     });
//     $("button").click(function(){
//         $("#w3s").attr({
//             "href" : "https://www.w3schools.com/jquery",
//             "title" : "W3Schools jQuery Tutorial"
//         });
//     });
// });
