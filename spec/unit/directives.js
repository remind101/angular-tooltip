describe('ngTooltip', function() {

  beforeEach(module('ngTooltip'));

  beforeEach(inject(function($templateCache) {
    $templateCache.put('template/ng-tooltip.html', '<div class="tooltip">Tooltip</div>');
  }));

  describe('ngTooltipDirective', function() {
    var elem, scope;

    beforeEach(inject(function($rootScope, $compile) {
      elem = angular.element('<a href="" ng-tooltip></a>');
      scope = $rootScope;
      $compile(elem)(scope);
      scope.$digest();
    }));

    it('does something', function() {
      console.log(elem.html());
    });
  });
});
