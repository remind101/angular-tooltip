describe('ngTooltip', function() {

  beforeEach(module('ngTooltip'));

  describe('ngTooltipDirective', function() {
    var elem, scope, body;

    /**
     * Build a tooltip.
     */
    function build(content) {
      return inject(function($rootScope, $compile) {
        elem = angular.element('<div>' + content + '</div>');
        scope = $rootScope;
        $compile(elem)(scope);
        scope.$digest();
      });
    };

    /**
     * Open the tooltip.
     */
    function enter() {
      elem.find('a').trigger('mouseenter');
    };

    /**
     * Close the tooltip.
     */
    function leave() {
      elem.find('a').trigger('mouseleave');
    };

    /**
     * The tooltip
     */
    function tooltip() {
      return $(document.body).find('.tooltip');
    };

    // Cleanup any tooltips attached to body
    afterEach(function() {
      tooltip().remove();
    });

    describe('simple tooltip', function() {
      it('allows me to specify a simple tooltip', function() {
        build('<a href="" ng-tooltip="Hello World"></a>');
        enter();
        expect(tooltip()).to.have.text('Hello World');
      });
    });
  });
});
