// SHOW ALL DIVS AFTER FIRST MAP CLICK

function showDivs () {

    $('#newsSpace').css('display','block');
    $('#background').css('display','block');
    $('#city').css('display','block');
    $('#temp').css('display','block');
    $('#weather').css('visibility','visible').css('display','block');

};

// AJAX LOADER

var loaderHTML = "<img src='./images/ajax_loader.gif'>";

function showLoader () {
    $('#city').empty();
    $('#city').append(loaderHTML);

    $('#weather').css('visibility','hidden');

    $('#temp').empty();
    $('#temp').append(loaderHTML);

    $('#newsSpace').empty();
    $('#newsSpace').append(loaderHTML);

    $('#backgroundSpace').empty();
    $('#backgroundSpace').append(loaderHTML);
};

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
        showDivs();
        showLoader();
        layer.setStyle(pickedStyle);
        feature.properties.picked = true;
        $('#map').css('height','30rem');

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

map.setMaxBounds(geojsonTileLayer.getBounds());