// BACKGROUND INFO TEMPLATE RENDERING

var renderBackgroundTemplate = function (backgroundInfo) {
    var backgroundTemplate = _.template($("#backgroundTemplate").html());
    var resultingHtml = backgroundTemplate({backgroundInfo: backgroundInfo});
    $("#backgroundSpace").html(resultingHtml);
};

// NEWS STORIES TEMPLATE RENDERING

var renderNewsTemplate = function (country, stories) {
    var newsTemplate = _.template($("#newsTemplate").html());
    var resultingHtml = newsTemplate({country: country, stories: stories});
    $("#newsSpace").html(resultingHtml);
};

// CITY TEMPLATE RENDERING

var renderCityTemplate = function (city, country) {
    var cityTemplate = _.template($("#cityTemplate").html());
    var resultingHtml = cityTemplate({city: city, country: country});
    $("#city").html(resultingHtml);
};

// TEMP TEMPLATE RENDERING

var renderTempTemplate = function (temp) {
    var weatherTemplate = _.template($("#tempTemplate").html());
    var resultingHtml = weatherTemplate({temp: temp});
    $("#temp").html(resultingHtml);
};

// WEATHER TEMPLATE RENDERING

var renderWeatherTemplate = function (condition) {

    if (condition.indexOf("cloud") > -1) {
      output = "CLOUDY";
    }
    else if (condition.indexOf("clear") > -1 && condition.indexOf("day") > -1) {
      output = "CLEAR_DAY";
    }
    else if (condition.indexOf("fog") > -1) {
      output = "FOG";
    }
    else if (condition.indexOf("clear") > -1 && condition.indexOf("night") > -1) {
      output = "CLEAR_NIGHT";
    }
    else if (condition.indexOf("part") > -1 && condition.indexOf("day") > -1) {
      output = "PARTLY_CLOUDY_DAY";
    }
    else if (condition.indexOf("part") > -1 && condition.indexOf("night") > -1) {
      output = "PARTLY_CLOUDY_NIGHT";
    }
    else if (condition.indexOf("rain") > -1 || condition.indexOf("storm") > -1) {
      output = "RAIN";
    }
    else if (condition.indexOf("sleet") > -1) {
      output = "SLEET";
    }
    else if (condition.indexOf("snow") > -1) {
      output = "SNOW";
    }
    else if (condition.indexOf("wind") > -1) {
      output = "WIND";
    }
    else {
      output = "CLEAR_DAY";
    }

    var display = "Skycons." + output;
    var skycons = new Skycons({"color": "black"});

    skycons.add("icon1", eval(display));
};
