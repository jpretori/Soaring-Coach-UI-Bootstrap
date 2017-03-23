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

     $('#pilotName').html(getPilotName(response));

     $('#totalDistance').html(response.total_track_distance);

     $('#straightPhases').html(getStraightPhasesList(response));
   });

   event.preventDefault();
});

function getPilotName(flight) {
   return flight.pilot_name;
}

function getStraightPhasesList(response) {
   var straightPhaseObjects = response.straight_phases.sort(function(a, b) {
      return b.distance - a.distance;
   });
   var distances = new Array();

   for (i = 0; i < straightPhaseObjects.length; i++) {
      var dist = straightPhaseObjects[i].distance;

      dist = Math.round(dist); //get rid of centimeters
      dist = dist / 1000; //convert to kilometers

      distances.push(dist);
   }

   var html = "<ul><li>" +
      distances.join("</li><li>") +
    "</li></ul>";

    return html;
}
