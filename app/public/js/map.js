var geoLocOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var mapOptions = {
  // center: new google.maps.LatLng(crd.latitude, crd.longitude),
  zoom: 16
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

var centerCoord;
var central_marker;

function success(pos) {
  centerCoord = pos.coords;
  var latLng = new google.maps.LatLng(centerCoord.latitude, centerCoord.longitude);
  map.setCenter(latLng);
  central_marker = new google.maps.Marker({
                           position: latLng,
                           map: map,
                           title: "Noel",
                           icon: 'http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Users-Police-icon.png'
                          });

  for (var i=0;i<10;i++) {
    var random = Math.random() * (0.005 - 0.001) + 0.001;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    lat = centerCoord.latitude+(plusOrMinus*random);
    random = Math.random() * (0.005 - 0.001) + 0.001;
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    lng = centerCoord.longitude+(plusOrMinus*random);
    // console.log(plusOrMinus*random);
    latLng = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
                      position: latLng,
                      map: map,
                      title: "Test",
                      // html: infoWindowContent(winery.winery),
                      icon: 'http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Users-Police-icon.png'
                  });
  };

  console.log('Your current position is:');
  console.log('Latitude : ' + centerCoord.latitude);
  console.log('Longitude: ' + centerCoord.longitude);
  console.log('More or less ' + centerCoord.accuracy + ' meters.');

  (function poll(){
      $.ajax({ url: "/status", success: function(data){
          updateFeed(data.status);
      }, dataType: "json", complete: poll, timeout: 3000 });
  })();

};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, geoLocOptions);
  } else {
      console.warn("Your browser does not support geolocation")
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

// var markersArray = [];

// mimmic police presence around center

// var latLng = new google.maps.LatLng(centerCoord.latitude, centerCoord.longitude);
// var marker = new google.maps.Marker({
//                   position: latLng,
//                   map: map,
//                   title: "Test",
//                   // html: infoWindowContent(winery.winery),
//                   icon: 'http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Users-Police-icon.png'
//               });

// var latLng = new google.maps.LatLng(36.1208963, -115.1937808);
// var marker = new google.maps.Marker({
//                   position: latLng,
//                   map: map,
//                   title: "Test",
//                   // html: infoWindowContent(winery.winery),
//                   icon: '/images/Users-Police-icon-blue.gif'
//                   // icon: 'http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Users-Police-icon.png'
//               });

var current_status;

function updateFeed(polled_status){
  if (polled_status !== current_status){
    current_status = polled_status;
    console.log(current_status);
    var status = "<p class='curStat'>"
    switch(current_status)
    {
    case 0:
      status = "<div style='display:none' class='alert alert-success'>All is well!</div>";
      break;
    case 1:
      status = status + "<div style='display:none' class='alert alert-info'>Officer opened holster.</div>";
      central_marker.setIcon("/images/Users-Police-icon-green.gif");
      break;
    case 2:
      status = status + "<div style='display:none' class='alert alert-warning'>Officer pulled taser.</div>";
      central_marker.setIcon("/images/Users-Police-icon-pink.gif");
      break;
    case 3:
      status = status + "<div style='display:none' class='alert alert-danger'>Officer pulled gun.</div>";
      central_marker.setIcon("/images/Users-Police-icon-blue.gif");
      break;
    case 4:
      status = status + "<div style='display:none' class='alert alert-danger'><strong>Officer Down!</strong></div>";
      central_marker.setIcon("/images/Users-Police-icon-red.gif");
      break;
    }
    $(status).appendTo(".alerts").fadeIn('slow');
    // $(".alerts").append(status).fadeIn('slow');
  }
}

// (function poll(){
//     $.ajax({ url: "/status", success: function(data){
//         updateFeed(data.status);
//     }, dataType: "json", complete: poll, timeout: 3000 });
// })();
