describe('ngTooltip', function() {

  beforeEach(module('ngTooltip'));

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
