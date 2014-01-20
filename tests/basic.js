describe('window.onerror', function() {
  var spy;
  beforeEach(function(){
      spy = jasmine.createSpy('whatAmI')
      window.onerror = spy
      var synatx_error = document.createElement('script');
      synatx_error.text = "(function() var a = []; b[1]})()"
      document.body.appendChild(synatx_error)
  })
  it('should be called when a syntax error happend', function() {
      expect(spy).toHaveBeenCalled();
  })
})
