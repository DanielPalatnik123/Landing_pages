
(function detectUserAgent() {
  var b = document.documentElement;
  b.setAttribute('data-useragent',  navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform );
})();

(function detectGrid() {
  var innerContainer = document.getElementById("inner");
  var outerContainer = document.getElementById("outer");
  var containerStyle = window.getComputedStyle(innerContainer);
  var vals = Object.keys(containerStyle).map(function(key) {
      return containerStyle[key];
  });
  if (vals.indexOf("grid") <= 0) {
    outerContainer.className += " noGrid";
  }
})();

(function displayLargeText() {
  if ($('.largeText-text').html().length == 0) {
    var valueText = $('.largeText-value').html()
    $('.largeText-text').html(valueText)
  }
})();

function largeFontSize(element,container,ratio,max) {
  var thisText = $(element).find('.largeText-text')
  var thisValue = $(element).find('.largeText-value')
  var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("font-size"))
  var valueWidth = thisValue.width()
  var containerWidth = $(container).width()
  var resultingValueFontSize = ((containerWidth/valueWidth)*thisValueFontSize)/ratio

  if (resultingValueFontSize >= max) {
    thisText.css('font-size',max)
  } else {
    thisText.css('font-size',resultingValueFontSize)
  }
}

function launchFontSize() {
  largeFontSize('.content-title-block','.content-block',.5,88);
}

$(window).on('load', launchFontSize);
$(window).on('resize', launchFontSize);



// Functions the counters only
if ($('.counter').length > 0) {

  function largeFontSizeAndPlacing() {
    var widthsArray = [];

    $('.bullet-image').map(function(index,element,container,ratio) {
      largeFontSize(element,'.bullet-list',3.5, 120)
    });

    $('.bullet-image').map(function(index,element) {
      var thisValue = $(element).find('.largeText-value')
      var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("font-size"))
      var valueWidth = thisValue.width()
      var containerWidth = $('.bullet-list').width()
      var resultingValueFontSize = ((containerWidth/valueWidth)*thisValueFontSize)/3.5

      thisValue.css('font-size',resultingValueFontSize)
    })

    $('.bullet-image').map(function(index,element) {
      var thisValue = $(element).find('.largeText-value')
      var thisSymbol = $(element).find('.largeText-symbol')
      var valueWidth = thisValue.width()
      var symbolWidth = thisSymbol.width()
      var textSummedWidth = valueWidth + symbolWidth +15
      widthsArray.push(textSummedWidth)
    });

    var biggestWidth = Math.max.apply(null, widthsArray);

    $('.bullet-image').map(function(index,element) {
      $(element).css('min-width', biggestWidth)
    });
  }

  $(window).on('load', largeFontSizeAndPlacing);
  $(window).on('resize', largeFontSizeAndPlacing);

  // Animate the counters
  function animateCounters (counterItem) {
    var counterTarget = $(counterItem).find(".largeText-text");
    var counterVal = $(counterItem).find(".largeText-value");
    var counterValParsed = parseInt($(counterVal)[0].innerHTML)

    $({someValue: 0}).animate({someValue: counterValParsed}, {
        duration: 1800,
        easing:'swing', // can be anything
        step: function() { // called on every step
          // Update the element's text with rounded-up value:
          counterTarget.text(commaSeparateNumber(Math.round(this.someValue)));
        }
    });

   function commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return val;
    }
  }

  $('.bullet-list>li').map(function(a,b) {
    var thisCounter = $(b).find('.bullet-image');
    var thisCounterVal = $(b).find('.bullet-image .largeText-value');
    animateCounters(thisCounter[0]);
  })
};
