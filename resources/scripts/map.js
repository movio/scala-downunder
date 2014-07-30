var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}];

var centerPosition = new google.maps.LatLng(-36.853522, 174.760981);
var venuePosition = new google.maps.LatLng(-36.862549,174.7603857);
var hotelPosition = new google.maps.LatLng(-36.846738, 174.761957);

var options = {
  zoom: 14,
  center: centerPosition,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  scaleControl: false,
	scrollwheel: false,
  styles: styles
};

var map = new google.maps.Map(document.getElementById('map'), options);

new google.maps.Marker({
  position: venuePosition,
  map: map,
  title: 'Movio',
  icon: 'resources/images/marker-venue.png'
});

new google.maps.Marker({
  position: hotelPosition,
  map: map,
  title: 'Heritage Hotel',
  icon: 'resources/images/marker-hotel.png'
});
