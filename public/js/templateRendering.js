// LOCATION TEMPLATE RENDERING

var renderLocationTemplate = function (city, country) {
    var locationTemplate = _.template($("#locationTemplate").html());
    var resultingHtml = locationTemplate({city: city, country: country});
    $("#location").html(resultingHtml);
};

// CITY TEMPLATE RENDERING

var renderCityTemplate = function (temp, condition) {
    var cityTemplate = _.template($("#cityTemplate").html());
    var resultingHtml = cityTemplate({temp: temp, condition: condition});
    $("#city").html(resultingHtml);
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

    skycons.add("weather", eval(display));
};

// NEWS STORIES TEMPLATE RENDERING

var renderNewsTemplate = function (stories) {
    var newsTemplate = _.template($("#newsTemplate").html());
    var resultingHtml = newsTemplate({stories: stories});
    $("#newsSpace").html(resultingHtml);
};

// BACKGROUND INFO TEMPLATE RENDERING

var renderBackgroundTemplate = function (backgroundInfo) {
    var backgroundTemplate = _.template($("#backgroundTemplate").html());
    var resultingHtml = backgroundTemplate({backgroundInfo: backgroundInfo});
    $("#backgroundSpace").html(resultingHtml);
};
