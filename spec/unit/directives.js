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
    function enter(event) {
      event = event || 'mouseenter';
      elem.find('a').trigger(event);
    };

    /**
     * Close the tooltip.
     */
    function leave(event) {
      event = event || 'mouseleave';
      elem.find('a').trigger(event);
    };

    /**
     * The tooltip
     */
    function tooltip() {
      return $(document.body).find('.tooltip');
    };

    // Cleanup any tooltips attached to body
    afterEach(function() {
      scope.$destroy();
    });

    describe('simple tooltip', function() {
      beforeEach(function() {
        build('<a href="" ng-tooltip="Hello World"></a>');
        enter();
      });

      it('allows me to trigger the tooltip on hover', function() {
        expect(tooltip()).to.have.text('Hello World');
      });

      it('allows me to close the tooltip on blur', function() {
        leave();
        expect(tooltip()).to.not.exist;
      });

      it('is attached by default', function() {
        expect(tooltip()).to.be.tethered({
          element: 'top middle',
          target: 'bottom middle'
        });
      });
    });

    describe('tethering', function() {
      beforeEach(function() {
        build('<a href="" ng-tooltip="Hello World" ng-tooltip-tether="{ targetAttachment: \'top right\' }"></a>');
        enter();
      });

      it('allows me to specify target tethering', function() {
        expect(tooltip()).to.be.tethered({
          element: 'top middle',
          target: 'top right'
        });
      });
    });
  });
});
