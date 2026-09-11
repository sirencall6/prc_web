function initMap() {
  //解説2：変数
  var mapPosition = {lat: 35.170662, lng: 136.923430};

  var mapArea = document.getElementById('maps');
  var mapOptions = {
    center: mapPosition,
    zoom: 16,
  };

  //解説1：マップを生成するMapクラス
  var map = new google.maps.Map(mapArea, mapOptions);
}