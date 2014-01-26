describe('window.onerror', function() {
  beforeEach(function(){
      var synatx_error = document.createElement('script');
      synatx_error.text = "(function() var a = []; b[1]})()"
      document.body.appendChild(synatx_error)
  })
  xit('should call any original onerror handler', function() {
  })

  it('should create an image element containing the error msg, url and lineno in the src', function() {
      var error_images = Sizzle("img.window_onerror_report")
      var error_image = error_images[0]
      var param = purl(error_image.src).param()
      expect(error_images.length).toBe(1)
      expect(param["msg"]).toContain("SyntaxError:")
      expect(param["lineno"]).not.toBe(undefined)
      expect(param["url"]).not.toBe(undefined)
  })
})
