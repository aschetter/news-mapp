function getStories (country, nprUrl, wikiUrl, lat, lng) {
    
// WEATHER/CITY AJAX CALL

    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&mode=json&units=imperial'

    $.getJSON(weatherUrl).complete(function(data) {
        var city = data.responseJSON.name;
        var temp = data.responseJSON.main.temp;
        temp = parseInt(temp);
        var condition = data.responseJSON.weather[0].main.toLowerCase();
        
        renderCityTemplate(city, country);
        renderTempTemplate(temp);
        renderWeatherTemplate(condition);
    });
    
// NPR AJAX CALL

    $.getJSON(nprUrl).complete(function(data) {
        var stories = data.responseJSON.list.story;
        renderNewsTemplate(country, stories);
    });

// BACKGROUND INFO AJAX CALL

    $.getJSON(wikiUrl).complete(function(data) {
        var pages = data.responseJSON.query.pages
        for (var pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
                var backgroundInfo = pages[pageId];
                renderBackgroundTemplate(backgroundInfo);
            }
        }
    });
}
