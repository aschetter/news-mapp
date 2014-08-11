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
