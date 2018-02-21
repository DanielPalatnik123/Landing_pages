
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

if ($('.counter-value').length > 0) {
  var widthsArray = []

  function countersMinWidth() {
    $('.bullet-image').map(function(a,b) {
      var thisWidth = $(b).width()
      widthsArray.push(thisWidth)
    });

    var biggestWidth = Math.max.apply(null, widthsArray);
    console.log(biggestWidth)

    $('.bullet-image').map(function(a,b) {
      $(b).css('min-width', biggestWidth)
    })
  };

  setTimeout(countersMinWidth, 1800);

  // Animate the counters
  function animateCounters (counterItem) {
    var counterTarget = $(counterItem).find(">.counter-text");
    var counterVal = $(counterItem).find(">.counter-value");
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
    var thisCounterVal = $(b).find('.bullet-image>.counter-value');
    animateCounters(thisCounter[0]);
  })
};
