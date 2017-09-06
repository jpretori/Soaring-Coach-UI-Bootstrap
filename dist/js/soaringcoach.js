$("#uploadForm").submit(function(event){
   $('#flightDetails').fadeOut();
   spinner = startSpinner();

   var form = new FormData($('#uploadForm')[0]);

   var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://soaringcoach.herokuapp.com/upload",
      //"url": "https://soaringcoach-develop.herokuapp.com/upload",
      //"url": "http://localhost:8080/upload",
      "type": "POST",
      "cache": false,
      "processData": false,
      "contentType": false,
      "data": form
   }

   $.ajax(settings).done(function (response) {
     console.log(response);

     $('#pilotName').html(response.pilotName);

     distKm = response.totalGroundTrackDistance / 1000;
     $('#totalDistance').html(distKm.toLocaleString() + " km");

     $('#flightDate').html(response.flightDate);

     plotCirclingPercentage(response)

     plotStraightPhases(response);
     $('#straightPhases').html(getStraightPhasesList(response));

     spinner.stop();
     $('#flightDetails').fadeIn();
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

function startSpinner() {
   var opts = {
      lines: 13 // The number of lines to draw
      , length: 28 // The length of each line
      , width: 14 // The line thickness
      , radius: 42 // The radius of the inner circle
      , scale: 1 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#000' // #rgb or #rrggbb or array of colors
      , opacity: 0.25 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 1 // Rounds per second
      , trail: 60 // Afterglow percentage
      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the spinner
      , top: '50%' // Top position relative to parent
      , left: '50%' // Left position relative to parent
      , shadow: false // Whether to render a shadow
      , hwaccel: false // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
   }
   var target = document.getElementById('uploadForm')
   var spinner = new Spinner(opts).spin(target);
   return spinner;
}
