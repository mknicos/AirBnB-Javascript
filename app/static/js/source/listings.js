/* global google, places:true */
/* jshint camelcase: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var map, lat, lng;
  var markers = [];



  function initialize(){
    initMap(36, -86, 5);
    for(var i = 0; i < places.length; i ++){
      addMarker(places[i]);
    }

    findMyLocation();
    $('#search').click(clickSearch);
  }

  function clickSearch(){
    var url = '/listings/query?lat='+lat+'&lng=' + lng;
    $.getJSON(url, function(data){
      console.log(data);
    });
  }



  function findMyLocation(){
    getLocation();
  }

  function getLocation(){
    //BELOW: how accurate is your location accuracy, maximum timeout
    //change get curent position to watch position to track location
    //on success call first function, on fail call second function, 3rd option set in var below
    var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  function geoSuccess(location) {
    lat = location.coords.latitude;
    lng = location.coords.longitude;
    $('#search').show();
  }

  function geoError() {
    console.log('Sorry, no position available.');
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function addMarker(location){
    var position = new google.maps.LatLng(location.lat, location.lng);
    //BELOW: map: map designates which map to do this on
    //position is where you want the marker
    //title is what it would say when you clicked on it
    var marker = new google.maps.Marker({map:map, position:position, title:location.address});
    markers.push(marker);
  }

})();

