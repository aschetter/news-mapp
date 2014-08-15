function getStories (country, lat, lng) {
    
// NPR AJAX CALL

    var nprUrl = '/search/' + country

    $.getJSON(nprUrl).complete(function(data) {
        var stories = data.responseJSON;
        renderNewsTemplate(stories);
        $('#newsSpace').css('display','block');
    });

// BACKGROUND INFO AJAX CALL

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=' + country + '&format=json&callback=?';

    $.getJSON(wikiUrl).complete(function(data) {
        var pages = data.responseJSON.query.pages;
        for (var pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
                var backgroundInfo = pages[pageId];
                renderBackgroundTemplate(backgroundInfo);
                $('#background').css('display','block');
            }
        }
    });
    
// WEATHER/CITY AJAX CALL

    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&mode=json&units=imperial'

    $.getJSON(weatherUrl).complete(function(data) {
        var city = data.responseJSON.name;
        var temp = data.responseJSON.main.temp;
        temp = parseInt(temp);
        var condition = data.responseJSON.weather[0].main.toLowerCase();
        
        renderCityTemplate(city, country);
        $('#city').css('display','block');

        renderTempTemplate(temp);
        $('#temp').css('display','block');

        renderWeatherTemplate(condition);
        $('#weather').css('visibility','visible').css('display','block');
    });
    
}