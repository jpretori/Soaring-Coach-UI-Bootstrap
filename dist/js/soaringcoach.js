$("#uploadForm").submit(function(event){
   var form = new FormData($('#uploadForm')[0]);

   var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://soaringcoach-develop.herokuapp.com/upload",
      //"url": "http://localhost:8080/upload",
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

     plotCirclingPercentage(response)

     plotStraightPhases(response);
     $('#straightPhases').html(getStraightPhasesList(response));
   });

   event.preventDefault();
});

function plotCirclingPercentage(response) {
   var circlingPercentageOptions = {
      series: {
          pie: {
              innerRadius: 0.5,
              show: true
          }
      },
      legend: {
         show: false
      }
   }

   var circlingData = [
      {label: "Circling", data: 0},
      {label: "Straight", data: 0}
   ];

   circlingData[0].data = response.percentageTimeCircling;
   circlingData[1].data = 100 - response.percentageTimeCircling;

   $.plot($("#circling-percentage-chart"), circlingData, circlingPercentageOptions);

};

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

   var straightPhaseObjects = response.straightPhases;
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
   var straightPhaseObjects = response.straightPhases.sort(function(a, b) {
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

   var html = "<ol><li>" +
      distances.join("</li><li>") +
    "</li></ul>";

    return html;
}
