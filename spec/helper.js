var disableHTTP = function(context) {
  var httpBackend;

  context.beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    this.$httpBackend = httpBackend;
  }));

  context.afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  var proxy = {};

  var proxyMethod = function(method) {
    proxy[method] = function() { return httpBackend[method].apply(httpBackend, arguments); };
  };

  angular.forEach(['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], function(verb) {
    proxyMethod('expect' + verb);
  });

  proxyMethod('flush');

  return proxy;
};
