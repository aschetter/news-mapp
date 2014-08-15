// SHOW ALL DIVS AFTER FIRST MAP CLICK

function showDivs () {
    $('#location').show();
    $('#city').show();
    $('#weather').css('visibility','visible').show();
    $('#newsSpace').show();
    $('#background').show();
};

// AJAX LOADER

var loaderHTML = "<img src='./images/ajax_loader.gif'>";

function showLoader () {
    $('#location').html(loaderHTML);
    $('#city').html(loaderHTML);
    $('#weather').hide();
    $('#newsSpace').html(loaderHTML);
    $('#backgroundSpace').html(loaderHTML);
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

// GeoJSON ONEACH FUNCTION

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
        $('#map').css('height','30rem');

        showDivs();
        showLoader();

        layer.setStyle(pickedStyle);
        feature.properties.picked = true;

        coord = e.latlng;
        var lat = (coord.lat).toFixed(2);
        var lng = (coord.lng).toFixed(2);

        map.fitBounds(map.getBounds());
        map.invalidateSize(false);
        map.setView([lat, lng]);
        apiCalls(country, lat, lng);
    });
}

// CREATE GeoJSON TILE LAYER

var geojsonTileLayer = new L.GeoJSON(countriesData, {
    style: style,
    onEachFeature: onEachFeature
});