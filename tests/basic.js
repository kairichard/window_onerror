describe('window.onerror', function() {
  var spy;
  function noop(){}
  beforeEach(function(){
      spy = jasmine.createSpy('window_onerror')
      window.onerror = spy
      var synatx_error = document.createElement('script');
      synatx_error.text = "(function() var a = []; b[1]})()"
      document.body.appendChild(synatx_error)
  })
  afterEach(function() {
    window.onerror = noop
  })
  it('should be called when a syntax error happend', function() {
      expect(spy).toHaveBeenCalled();
  })
  it('should be called with errmsg, url and lineno', function() {
      expect(spy).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String), jasmine.any(Number));
  })
})
