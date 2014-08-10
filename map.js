// BACKGROUND INFO TEMPLATE RENDERING

var backgroundInfo;

var renderBackgroundTemplate = function () {
  var backgroundTemplate = _.template($("#backgroundTemplate").html());
  var resultingHtml = backgroundTemplate({backgroundInfo: backgroundInfo});
  $("#backgroundSpace").html(resultingHtml);
};

// NEWS STORIES TEMPLATE RENDERING

var stories;

var renderNewsTemplate = function () {
  var newsTemplate = _.template($("#newsTemplate").html());
  var resultingHtml = newsTemplate({country: country, stories: stories});
  $("#newsSpace").html(resultingHtml);
};

// MAP TILE LAYER

var map = L.map('map', {
    center: [20, 10],
    zoom: 3,
});

L.tileLayer('http://{s}.tiles.mapbox.com/v3/aschetter.j63jha01/{z}/{x}/{y}.png', {
    minZoom: 2,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

// GeoJSON TILE LAYER

var mouseOverStyle = {
    "fillOpacity": 0.7
};

var mouseOutStyle = {
    "fillOpacity": 0.3
};

var pickedStyle = {
    "color": "green"
};

// var notPickedStyle = {
//     "color": "blue"
// };

var country = '';
var nprUrl = '';
var wikiUrl = '';

var geojsonTileLayer = new L.GeoJSON(countriesData, {

// GeoJSON STYLING

    style: function(feature) {
        fillOpacity: 0.3;
        switch (feature.properties.picked) {
            case true: return {color: 'green'};
            case false: return {color: 'blue'};
        }
    },

// GeoJSON EVENT HANDLERS

    onEachFeature: function (feature, layer) {
        // layer.bindPopup(feature.properties.name);
        layer.on('mouseover', function () {
            layer.setStyle(mouseOverStyle);
            country = layer.feature.properties.name;
            var apiKey = 'PASSWORD';
            nprUrl = 'http://api.npr.org/query?searchTerm=' + country + '&numResults=5&output=JSON&apiKey=' + apiKey;
            wikiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=' + country + '&format=json&callback=?';

            // 'http://en.wikipedia.org/w/api.php?action=parse&page=' + country + '&prop=text|images&section=0&format=json&callback=?'
            // 'http://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&exintro&titles=' + country + '&format=json&callback=?';

            console.log('country: ' + country);
            console.log('nprUrl: ' + nprUrl);
            console.log('wikiUrl: ' + wikiUrl);
        });
        layer.on('mouseout', function () {
            layer.setStyle(mouseOutStyle);
        });
        layer.on('click', function () {
            // if (feature.properties.picked == true) {
            //     feature.properties.picked = false;
            //     layer.setStyle(notPickedStyle);
            // } else {
                feature.properties.picked = true;
                layer.setStyle(pickedStyle);
            // }
            console.log('Picked: ' + feature.properties.picked);

// WIKIPEDIA AJAX CALL

            $.getJSON(wikiUrl).complete(function(data) {
                var pages = data.responseJSON.query.pages
                for (var pageId in pages) {
                    if (pages.hasOwnProperty(pageId)) {
                        console.log(pages[pageId].title);
                        backgroundInfo = pages[pageId];
                    }
                }
            });
            
// NPR AJAX CALL

            $.getJSON(nprUrl).complete(function(data) {
                stories = data.responseJSON.list.story;
                console.log(stories);
                renderNewsTemplate();
                renderBackgroundTemplate();
            });

        })
    }
});

map.addLayer(geojsonTileLayer);