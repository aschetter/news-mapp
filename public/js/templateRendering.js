// CITY TEMPLATE RENDERING

var renderCityTemplate = function (city, country) {
    var cityTemplate = _.template($("#cityTemplate").html());
    var resultingHtml = cityTemplate({city: city, country: country});
    $("#citySpace").html(resultingHtml);
};

// WEATHER TEMPLATE RENDERING

var renderWeatherTemplate = function (temp, condition) {
    var weatherTemplate = _.template($("#weatherTemplate").html());
    var resultingHtml = weatherTemplate({temp: temp, condition: condition});
    $("#weatherSpace").html(resultingHtml);
};

// WEATHER ICON TEMPLATE RENDERING

var renderIconTemplate = function (condition) {

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

    skycons.add("iconSpace", eval(display));
};

// NEWS STORIES TEMPLATE RENDERING

var renderNewsTemplate = function (stories) {
    var newsTemplate = _.template($("#newsTemplate").html());
    var resultingHtml = newsTemplate({stories: stories});
    $("#newsSpace").html(resultingHtml);
};

// BACKGROUND INFO TEMPLATE RENDERING

var renderBackgroundTemplate = function (backgroundInfo, country) {
    var backgroundTemplate = _.template($("#backgroundTemplate").html());
    var resultingHtml = backgroundTemplate({backgroundInfo: backgroundInfo, country: country});
    $("#backgroundSpace").html(resultingHtml);
};
