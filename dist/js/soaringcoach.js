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

     plotStraightPhases(response);
     $('#straightPhases').html(getStraightPhasesList(response));
   });

   event.preventDefault();
});

function plotStraightPhases(response) {
   var barOptions = {
     series: {
         bars: {
             show: true,
             barWidth: 25000,
             align: "center"
         }
     },
     xaxis: {
         mode: "time",
         timeformat: "%H:%M",
         minTickSize: [1, "minute"]
     },
     grid: {
         hoverable: true
     },
     legend: {
         show: true
     },
     tooltip: true,
     tooltipOpts: {
         content: "time: %x, distance: %y"
     }
   };

   var barData = {
      label: "Distance in km",
      data: []
   };

   var straightPhaseObjects = response.straight_phases;
   var distances = new Array();

   for (i = 0; i < straightPhaseObjects.length; i++) {
      var dist = straightPhaseObjects[i].distance;
      var time = straightPhaseObjects[i].start_point.data.timestamp;

      dist = Math.round(dist); //get rid of centimeters
      dist = dist / 1000; //convert to kilometers

      distances.push([time, dist]);
   }

   barData.data = distances;

   $.plot($("#straight-phases-chart"), [barData], barOptions);
}

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

      var short_phase_description = "Distance: ".concat(
            dist,
            "; Time: ",
            straightPhaseObjects[i].start_point.timestamp);
      
      distances.push(short_phase_description);
   }

   var html = "<ul><li>" +
      distances.join("</li><li>") +
    "</li></ul>";

    return html;
}
