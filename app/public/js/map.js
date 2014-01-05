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

function success(pos) {
  centerCoord = pos.coords;
  var latLng = new google.maps.LatLng(centerCoord.latitude, centerCoord.longitude);
  map.setCenter(latLng);
  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: "Noel",
                    // html: infoWindowContent(winery.winery),
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

var latLng = new google.maps.LatLng(36.1208963, -115.1937808);
var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: "Test",
                  // html: infoWindowContent(winery.winery),
                  icon: 'http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Users-Police-icon.png'
              });