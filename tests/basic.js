function force_syntax_error_in_document(){
    var synatx_error = document.createElement('script');
    synatx_error.text = '(function() var a = []; b[1]})()'
    document.body.appendChild(synatx_error)
}

function teardown(){
    ErrorHandler.teardown()
    window.onerror = undefined
    var images = new Sizzle('img.window_onerror_report')
    _.each(images, function(e){ e.parentNode.removeChild(e)})
}

function get_parsed_url_of_report_image(){
    var error_images = new Sizzle("img.window_onerror_report"),
        error_image = error_images[0]
    expect(error_images.length).toBe(1)
    return purl(error_image.src)
}

describe('Calling thourgh the original window.onerror', function(){
    beforeEach(function(){
        spy = jasmine.createSpy('old error handler')
        window.onerror = spy
        ErrorHandler.setup()
        force_syntax_error_in_document()
    })

    afterEach(function(){
        teardown()
    })

    it('should call any original onerror handler', function() {
        expect(spy).toHaveBeenCalled();
    })
})

describe('Configurablitiy', function() {
    beforeEach(function(){
        ErrorHandler.set_reporting_endpoint('http://error.io/error')
        ErrorHandler.setup()
        force_syntax_error_in_document()
    })

    afterEach(function(){
        teardown()
    })

    it('should be configurable to report to any endpoint', function() {
        var param = get_parsed_url_of_report_image()
        expect(param.data.attr['base']).toBe('http://error.io')
        expect(param.data.attr['path']).toBe('/error')
    })
})

describe('Reporting on syntax error', function() {
    beforeEach(function(){
        ErrorHandler.setup()
        force_syntax_error_in_document()
    })

    afterEach(function(){
        teardown()
    })

    it('should create an image element containing the error msg, url and lineno in the src', function() {
        var param = get_parsed_url_of_report_image().param()
        expect(param['msg']).toContain('SyntaxError:')
        expect(param['lineno']).not.toBe(undefined)
        expect(param['url']).not.toBe(undefined)
    })
})
