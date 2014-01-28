describe('ngTooltip', function() {

  beforeEach(module('ngTooltip'));

  describe('$Tooltip', function() {
    describe('constructor', function() {
      it('initializes a new tooltip', inject(function($rootScope, $Tooltip) {
        var scope = $rootScope.$new();

        var tooltip = new $Tooltip({
          scope: scope
        });

        expect(tooltip.options).to.deep.eq({
          templateUrl: 'template/ng-tooltip.html',
          scope: scope,
          tether: {
            attachment: 'top middle',
            targetAttachment: 'bottom middle'
          }
        });

        expect(tooltip.elem).to.exist;
      }));
    });
  });

  describe('$tooltipDirective', function() {

    it('builds a tooltip', inject(function($tooltipDirective) {
      var directive = $tooltipDirective('ngTooltip');

      expect(directive.restrict).to.eq('EA');

      expect(directive.scope).to.deep.eq({
        content: '@ngTooltip',
        tether: '=?ngTooltipTether'
      });
    }));
  });
});
