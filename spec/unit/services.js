describe('$tooltip', function() {

  beforeEach(module('ngTooltip'));

  it('builds a tooltip', inject(function($tooltip) {
    var directive = $tooltip('ngTooltip');

    expect(directive.restrict).to.eq('EA');

    expect(directive.scope).to.deep.eq({
      content: '@ngTooltip',
      tether: '=?ngTooltipTether'
    });
  }));
});
