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

var smallLoaderHTML = "<img src='./images/ajax_loader.gif'>";
var bigLoaderHTML = "<img src='./images/ajax_loader1.gif'>";

function onEachFeature (feature, layer) {
    var coord;
    var country = '';

// LAYER MOUSEOVER EVENT HANDLER

    layer.on('mouseover', function () {
        layer.setStyle(mouseOverStyle);
        country = layer.feature.properties.name;
    });

// LAYER MOUSEOUT EVENT HANDLER

    layer.on('mouseout', function () {
        layer.setStyle(mouseOutStyle);
    });

// LAYER CLICK EVENT HANDLER

    layer.on('click', function (e) {
        $('#city').empty();
        $('#weather').css('visibility','hidden');
        $('#temp').empty();
        $('#newsSpace').empty();
        $('#backgroundSpace').empty();

        $('#city').append(smallLoaderHTML);
        $('#temp').append(smallLoaderHTML);
        $('#newsSpace').append(bigLoaderHTML);
        $('#backgroundSpace').append(bigLoaderHTML);

        layer.setStyle(pickedStyle);
        feature.properties.picked = true;

        coord = e.latlng;
        var lat = (coord.lat).toFixed(2);
        var lng = (coord.lng).toFixed(2);
        getStories(country, lat, lng);
    });
}

var geojsonTileLayer = new L.GeoJSON(countriesData, {
    style: style,
    onEachFeature: onEachFeature
});

map.addLayer(geojsonTileLayer);
