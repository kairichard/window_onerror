(function (win, nav, $) {
  'use strict'
  win.ErrorHandler = (function(){
    var old_error_handler;
    var reporting_endpoint = '/client_error'
    function set_reporting_endpoint(e){
      reporting_endpoint = e
    }
    function setup(){
      old_error_handler = window.onerror
      window.onerror = function(msg, url, lineno) {
        if( "function" == typeof old_error_handler ){
          old_error_handler(msg, url, lineno)
        }
        var i = new Image()
        i.src = reporting_endpoint
          + "?url=" + encodeURIComponent(url)
          + "&msg=" + encodeURIComponent(msg)
          + "&lineno=" + encodeURIComponent(lineno)
        i.className = "window_onerror_report"
        document.body.appendChild(i)
      }
    }
    function teardown(){
      window.onerror = old_error_handler
    }
    return {
      setup: setup,
      teardown: teardown,
      set_reporting_endpoint: set_reporting_endpoint
    }
  })()
})(window, navigator);
