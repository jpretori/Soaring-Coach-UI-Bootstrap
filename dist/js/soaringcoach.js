$("#uploadForm").submit(function(event){
   //Do stuff.  Like upload the file.
   var form = new FormData($('#uploadForm')[0]);

   var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://protected-bayou-34428.herokuapp.com/upload",
      //"url": "http://localhost:9876/upload",
      "type": "POST",
      "cache": false,
      "processData": false,
      "contentType": false,
      "data": form
   }

   $.ajax(settings).done(function (response) {
     console.log(response);
   });

   event.preventDefault();
});
