(function (win, nav, $) {
  'use strict'
  // Attach to the onerror method
  window.onerror = function(msg, url, lineno) {
    var i = new Image()
    i.src = "here.html"
      + "?url=" + encodeURIComponent(url)
      + "&msg=" + encodeURIComponent(msg)
      + "&lineno=" + encodeURIComponent(lineno)
    i.className = "window_onerror_report"
    document.body.appendChild(i)
  }

})(window, navigator);
