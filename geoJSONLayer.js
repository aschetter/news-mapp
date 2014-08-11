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

function getStories (country, nprUrl, wikiUrl) {
    
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
