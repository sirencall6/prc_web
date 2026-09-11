function initMap() {
      var mapPosition = {lat: 35.681236, lng: 139.767125};
      var mapArea = document.getElementById('maps');
      var mapOptions = {
        center: mapPosition,
        zoom: 16,
      };
      var map = new google.maps.Map(mapArea, mapOptions);
    }
