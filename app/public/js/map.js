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


function success(pos) {
  var crd = pos.coords;
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  map.setCenter(latlng);

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
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