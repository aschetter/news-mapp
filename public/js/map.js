// MAP TILE LAYER

var map = L.map('map', {
    center: [10, 0],
    zoom: 2,
    worldCopyJump: true,
    layers: geojsonTileLayer,
});

L.tileLayer('http://{s}.tiles.mapbox.com/v3/aschetter.j63jha01/{z}/{x}/{y}.png', {
    minZoom: 2,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);