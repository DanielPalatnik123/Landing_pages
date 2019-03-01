
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

function topLargeTextPosition() {
  var thisValue = $('#title .large-text-value');
  var valueWidth = thisValue[0].clientWidth;
  var containerWidth = $('.content-section')[0].clientWidth - 25;
  if (valueWidth > containerWidth) {
    thisValue.css({
     'position' : 'relative',
     'display' : 'none'
    })
  }
}

$(window).on('load', topLargeTextPosition);


function largeTextFontSize(element,container,ratio,max) {
  var thisElement = $(element)
  var thisValue = thisElement.find('.large-text-value')
  var thisText = thisElement.find('.large-text-text')
  var thisValueFontSize = parseInt(window.getComputedStyle(thisValue[0]).getPropertyValue("font-size"))

  var valueWidth = thisValue[0].clientWidth
  var containerWidth = $(container)[0].clientWidth - 25
  var topRatio = containerWidth/valueWidth
  var firstBlockMargin = topRatio * 25

  if (thisElement.parent().hasClass('pardot-wrapper')) {
    var resultingValueFontSize = (thisValueFontSize*topRatio)
    $(thisText).css('transform', 'scale(' + topRatio +')')
    $($('.whole-content-block')[0]).css('margin-top', firstBlockMargin +'px')


  } else {
    var resultingValueFontSize = ((containerWidth/valueWidth)*thisValueFontSize)/ratio
    if (resultingValueFontSize >= max) {
      $(thisText).css('font-size',max)
      $(thisValue).css('font-size',max)

    } else if (resultingValueFontSize < max) {
      $(thisText).css('font-size',resultingValueFontSize)
      if ($(element)[0].className == 'bullet-image') {
        $(thisValue).css('font-size',resultingValueFontSize)
      }
    }
  }
}



function launchFontSizeTitle() {
  largeTextFontSize($('.content-title')[0],'.content-section',0.7,75);
}

$(window).on('load', launchFontSizeTitle);
$(window).on('resize', launchFontSizeTitle);


function commaSeparateNumber(val){
   while (/(\d+)(\d{3})/.test(val.toString())){
     val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }
   return val;
 }

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
                thisText.text(commaSeparateNumber(parseFloat(now).toFixed(size)));

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
        $($(innerElement).parent()).css('grid-template-columns', biggestWidth + 'px auto')
      })
    }
  })
}

$(window).on('load', launchWidthBullets);
$(window).on('resize', launchWidthBullets);





function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
