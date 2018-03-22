
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
  var hasGrid = false;

  $(containerStyle).map(function(index,element) {
    var tryGrid = new RegExp("grid-");
    var tryGridIE = new RegExp("msGrid");

    if (tryGrid.test(element) || tryGridIE.test(element)) {
      hasGrid = true;
    }
  })

  if (hasGrid === false) {
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

function wrapImageHeight(){
  var wrapTextBlock = $('.image-paragraph-wrap-around .whole-content-block')
  var thisValueFontSize = parseInt(wrapTextBlock[0].clientHeight)

  $('.wrap-around-image-container .side-image').css('max-height',wrapTextBlock[0].clientHeight)
  $('.wrap-around-image-container .side-image').css('max-height',wrapTextBlock[0].clientHeight)
  $('.wrap-around-image-container .side-image').css('max-height',wrapTextBlock[0].clientHeight)
}

if ($('.wrap-around-image-container').length > 0) {
  $(window).on('load', wrapImageHeight);
  $(window).on('resize', wrapImageHeight);
}

function largeTextFontSize(element,container,ratio,max) {
  var thisValue = $(element).find('.large-text-value')
  var thisText = $(element).find('.large-text-text')
  var thisElement = $(element)
  var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("font-size"))
  var valueWidth = thisValue.width()
  var containerWidth = $(container).width()
  var resultingValueFontSize = ((containerWidth/valueWidth)*thisValueFontSize)/ratio
  // 
  // var widdth = parseInt(window.getComputedStyle(window).getPropertyValue("width"))
  //
  //
  // console.log(widdth)
  // console.log(containerWidth)
  // console.log(valueWidth)
  // console.log(thisValueFontSize)
  // // console.log(ratio)
  // console.log(resultingValueFontSize)
  // console.log('a')


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
  largeTextFontSize($('.content-title')[0],'.content-section',0.7,75);
}

$(window).on('load', launchFontSizeTitle);
$(window).on('resize', launchFontSizeTitle);


function startCounter(){

  $(".counter li").each(function (index, element) {
    var thisText = $(this).find(".large-text-text");
    var thisValue = $(this).find(".large-text-value");

  	thisValue.each(function (index) {
          var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
  	    $(this).prop('Counter',0).animate({
  	        Counter: $(this).text()
  	    }, {
  	        duration: 2000,
  	        easing: 'swing',
  	        step: function (now) {
                thisText.text(parseFloat(now).toFixed(size));
  	        }
  	    });
  	});
  })
}

startCounter();

function launchFontSizeBullets() {

  $('.content-block').map(function(index,element) {
    var widthsArray = []

    if (($(element).find('.large-text-value').length > 0) && ($(element).find('.bullet-image').length > 0)) {
      var theseBullets = $(element).find('.bullet-image')

      theseBullets.map(function(innerIndex,innerElement,container,ratio) {
        largeTextFontSize(innerElement,'.bullet-list',4.5, 96)
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



// function launchAnimationBullets() {
//
//   $('.content-block').map(function(index,element) {
//
//     if (($(element).find('.large-text-value').length > 0) && ($(element).find('.bullet-image').length > 0)) {
//       var theseBullets = $(element).find('.bullet-image')
//
//       theseBullets.map(function(innerIndex,innerElement,container,ratio) {
//         var thisCounter = $(innerElement).find('.bullet-image');
//         var thisCounterVal = $(innerElement).find('.bullet-image .large-text-value');
//         animateCounters(innerElement);
//
//       });
//     }
//   })
// }
//
// $(window).on('load', launchAnimationBullets);



function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
