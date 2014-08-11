// BACKGROUND INFO TEMPLATE RENDERING

var backgroundInfo;

var renderBackgroundTemplate = function () {
  var backgroundTemplate = _.template($("#backgroundTemplate").html());
  var resultingHtml = backgroundTemplate({backgroundInfo: backgroundInfo});
  $("#backgroundSpace").html(resultingHtml);
};

// NEWS STORIES TEMPLATE RENDERING

var stories;

var renderNewsTemplate = function (country) {
  var newsTemplate = _.template($("#newsTemplate").html());
  var resultingHtml = newsTemplate({country: country, stories: stories});
  $("#newsSpace").html(resultingHtml);
};

// MAP TILE LAYER

var map = L.map('map', {
    center: [20, 10],
    zoom: 2,
});

L.tileLayer('http://{s}.tiles.mapbox.com/v3/aschetter.j63jha01/{z}/{x}/{y}.png', {
    minZoom: 2,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);


// GeoJSON LAYER STYLE

function style (feature, layer) {
    fillOpacity: 0.3;
    switch (feature.properties.picked) {
        case true: return {color: 'orange'};
        case false: return {color: 'blue'};
    }
};

var mouseOverStyle = {
    "fillOpacity": 0.7
};

var mouseOutStyle = {
    "fillOpacity": 0.3
};

var pickedStyle = {
    "color": "orange"
};

function getStories (country, nprUrl, wikiUrl) {
    
// NPR AJAX CALL

    $.getJSON(nprUrl).complete(function(data) {
        stories = data.responseJSON.list.story;
    }).complete(function () {

// FINISH NPR CALL AND MAKE WIKIPEDIA AJAX CALL

    $.getJSON(wikiUrl).complete(function(data) {
        var pages = data.responseJSON.query.pages
        for (var pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
                backgroundInfo = pages[pageId];
            }
            renderBackgroundTemplate();
        }

// RENDER NEWS AND BACKGROUND TEMPLATES AT SAME TIME

        renderNewsTemplate(country);
        });
    });
}


function onEachFeature (feature, layer) {
    var country = '';
    var nprUrl = '';
    var wikiUrl = '';

// LAYER MOUSEOVER EVENT HANDLER

    layer.on('mouseover', function () {
        layer.setStyle(mouseOverStyle);
        country = layer.feature.properties.name;
        var apiKey = 'PASSWORD';
        nprUrl = 'http://api.npr.org/query?searchTerm=' + country + '&numResults=5&output=JSON&apiKey=' + apiKey;
        wikiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=' + country + '&format=json&callback=?';
    });

// LAYER MOUSEOUT EVENT HANDLER

    layer.on('mouseout', function () {
        layer.setStyle(mouseOutStyle);
    });

// LAYER CLICK EVENT HANDLER

    layer.on('click', function () {
        feature.properties.picked = true;
        layer.setStyle(pickedStyle);
        getStories(country, nprUrl, wikiUrl);
    });
}

var geojsonTileLayer = new L.GeoJSON(countriesData, {
    style: style,
    onEachFeature: onEachFeature
});

map.addLayer(geojsonTileLayer);
