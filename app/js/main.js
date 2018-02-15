
(function detectUserAgent() {
  var b = document.documentElement;
  b.setAttribute('data-useragent',  navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform );
})();

(function detectGrid() {
  var innerContainer = document.getElementById("inner");
  var outerContainer = document.getElementById("outer");
  var containerStyle = window.getComputedStyle(innerContainer);
  console.log(innerContainer)
  console.log(outerContainer)
  console.log(containerStyle)
  var vals = Object.keys(containerStyle).map(function(key) {
      return containerStyle[key];
  });
  if (vals.indexOf("grid") <= 0) {
    outerContainer.className += " noGrid";
  }
})();

console.log('bb')
