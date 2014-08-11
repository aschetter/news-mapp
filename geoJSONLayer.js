// GeoJSON LAYER STYLE

function style (feature, layer) {
    fillOpacity: 0.3;
    weight: 2;
    switch (feature.properties.picked) {
        case true: return {color: 'blue', fillOpacity: 0.2};
        case false: return {color: 'clear', fillOpacity: 0.2};
    }
};

var mouseOverStyle = {
    'fillOpacity' : 0.7
};

var mouseOutStyle = {
    'fillOpacity': 0.2
};

var pickedStyle = {
    "color": 'blue'
};

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
