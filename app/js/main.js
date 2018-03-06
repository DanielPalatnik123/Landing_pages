
(function detectUserAgent() {
  var b = document.documentElement;
  b.setAttribute('data-useragent',  navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform );
})();

(function detectBgAndColumns() {
  var toggleOptions = $('.page-toggle').children()
  toggleOptions.map(function(index, element){
    var toggle = $(element)
    var toggleValue = toggle[0].className

    function hasNumber(val) {
      return /\d/.test(val);
    };

    if (hasNumber(toggleValue)==true){
      $('#outline').addClass(toggleValue)

    } else if (hasNumber(toggleValue)==false) {
      $('.page-wrapper').addClass(toggleValue)

    }
  })
})();

(function detectGrid() {
  var titleContainer = document.getElementById("title");
  var outerContainer = document.getElementById("outer");
  var containerStyle = window.getComputedStyle(titleContainer);
  var vals = Object.keys(containerStyle).map(function(key) {
      return containerStyle[key];
  });
  if (vals.indexOf("grid") <= 0) {
    outerContainer.className += " noGrid";
  }
})();


(function largeTextContent() {
  $('.content-block').map(function(index,element) {

    if ($(element).find('.large-text-value').length > 0) {
      var theseValues = $(element).find('.large-text-value')
      var theseTexts = $(element).find('.large-text-text')

      theseValues.map(function(innerIndex,innerElement) {
        var thisValue = $(innerElement).html()
        $(theseTexts[innerIndex]).html(thisValue)
      })
    }
  })
})();

(function appendBeforeAfter(){
  $(function() {
    $('.side-image').before('<div class="before-image"></div>');
    $('.side-image').after('<div class="after-image"></div>');
  });
})()

function largeTextFontSize(element,container,ratio,max) {
  var thisValue = $(element).find('.large-text-value')
  var thisText = $(element).find('.large-text-text')
  var thisElement = $(element)
  var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("font-size"))
  var valueWidth = thisValue.width()
  var containerWidth = $(container).width()
  var resultingValueFontSize = ((containerWidth/valueWidth)*thisValueFontSize)/ratio

  if (resultingValueFontSize >= max) {
    $(thisText).css('font-size',max)
    $(thisValue).css('font-size',max)

  } else if (resultingValueFontSize < max){
    $(thisText).css('font-size',resultingValueFontSize)
    if ($(element)[0].className == 'bullet-image') {
      $(thisValue).css('font-size',resultingValueFontSize)
    }
  }
}



function launchFontSizeTitle() {
  largeTextFontSize($('.content-title')[0],'.content-section',0.6,88);
}


$(window).on('load', launchFontSizeTitle);
$(window).on('resize', launchFontSizeTitle);



// Animate the counters
function animateCounters (counterItem) {
  var counterTarget = $(counterItem).find(".large-text-text");
  var counterVal = $(counterItem).find(".large-text-value").html();
  var counterValParsed = parseInt(counterVal)
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



function launchFontSizeBullets() {

  $('.content-block').map(function(index,element) {
    var widthsArray = []

    if (($(element).find('.large-text-value').length > 0) && ($(element).find('.bullet-image').length > 0)) {
      var theseBullets = $(element).find('.bullet-image')

      theseBullets.map(function(innerIndex,innerElement,container,ratio) {
        largeTextFontSize(innerElement,'.bullet-list',3.5, 96)
      });
    }
  })
}

$(window).on('load', launchFontSizeBullets);
$(window).on('resize', launchFontSizeBullets);


function launchWidthBullets() {

  $('.content-block').map(function(index,element) {
    var widthsArray = []

    if (($(element).find('.large-text-value').length > 0) && ($(element).find('.bullet-image').length > 0)) {
      var theseBullets = $(element).find('.bullet-image')

      theseBullets.map(function(innerIndex,innerElement,container,ratio) {
          var thisElement = $(innerElement)
          var thisValue = $(innerElement).find('.large-text-value')
          var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("width"))
          var thisSymbol = $(innerElement).find('.large-text-symbol')
          var valueWidth = thisValue.width()
          var symbolWidth = thisSymbol.width()
          var textSummedWidth = valueWidth + symbolWidth + 20
          widthsArray.push(textSummedWidth)

      });

      var biggestWidth = Math.max.apply(null, widthsArray);

      theseBullets.map(function(innerIndex,innerElement) {
        $(innerElement).css('min-width', biggestWidth)
      })
    }
  })
}

$(window).on('load', launchWidthBullets);
$(window).on('resize', launchWidthBullets);



function launchAnimationBullets() {

  $('.content-block').map(function(index,element) {

    if (($(element).find('.large-text-value').length > 0) && ($(element).find('.bullet-image').length > 0)) {
      var theseBullets = $(element).find('.bullet-image')

      theseBullets.map(function(innerIndex,innerElement,container,ratio) {
        var thisCounter = $(innerElement).find('.bullet-image');
        var thisCounterVal = $(innerElement).find('.bullet-image .large-text-value');
        animateCounters(innerElement);

      });
    }
  })
}

$(window).on('load', launchAnimationBullets);



function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
