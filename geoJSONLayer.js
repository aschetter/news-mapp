// GeoJSON LAYER STYLE

function style (feature, layer) {
    fillOpacity: 0.3;
    switch (feature.properties.picked) {
        case true: return {color: 'blue'};
        case false: return {color: '#fcac40'};
    }
};

var mouseOverStyle = {
    'fillOpacity' : 0.7
};

var mouseOutStyle = {
    'fillOpacity': 0.3
};

var pickedStyle = {
    "color": 'blue'
};


function getStories (country, nprUrl, wikiUrl, lat, lng) {
    
// WEATHER/ CITY API CALL

    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&mode=json&units=imperial'

    $.getJSON(weatherUrl).complete(function(data) {
        var city = data.responseJSON.name;
        renderCityTemplate(city, country);
    });
    
// NPR AJAX CALL

    var stories;

    $.getJSON(nprUrl).complete(function(data) {
        stories = data.responseJSON.list.story;
    }).complete(function () {

// FINISH NPR CALL AND MAKE WIKIPEDIA AJAX CALL

    $.getJSON(wikiUrl).complete(function(data) {
        var pages = data.responseJSON.query.pages
        for (var pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
                var backgroundInfo = pages[pageId];

// RENDER BACKGROUND TEMPLATE

                renderBackgroundTemplate(backgroundInfo);
            }
        }

// RENDER NEWS TEMPLATE

        renderNewsTemplate(country, stories);
        });
    });
}

// weather.responseJSON.main.temp
// weather.responseJSON.weather[0].main


function onEachFeature (feature, layer) {
    var coord;
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

    layer.on('click', function (e) {
        layer.setStyle(pickedStyle);
        feature.properties.picked = true;

        coord = e.latlng;
        var lat = (coord.lat).toFixed(2);
        var lng = (coord.lng).toFixed(2);
        getStories(country, nprUrl, wikiUrl, lat, lng);
    });
}


var geojsonTileLayer = new L.GeoJSON(countriesData, {
    style: style,
    onEachFeature: onEachFeature
});

map.addLayer(geojsonTileLayer);
