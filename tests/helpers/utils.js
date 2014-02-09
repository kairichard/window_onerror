function force_syntax_error_in_document(){
    var synatx_error = document.createElement('script');
    synatx_error.text = "(function() var a = []; b[1]})()"
    document.body.appendChild(synatx_error)
}

function teardown(){
      ErrorHandler.teardown()
      window.onerror = undefined
      var images = Sizzle("img.window_onerror_report")
      for(a in images){
        images[a].remove()
      }
}

function get_parsed_url_of_report_image(){
      var error_images = Sizzle("img.window_onerror_report")
      var error_image = error_images[0]
      expect(error_images.length).toBe(1)
      return purl(error_image.src)
}
