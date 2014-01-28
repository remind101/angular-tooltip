var expect = chai.expect;

chai.use(function(chai, utils) {
  chai.Assertion.addMethod('tethered', function(options) {
    var obj = utils.flag(this, 'object');

    function assertion(prefix, string) {
      var classes = string.split(' ');

      classes.forEach(function(klass) {
        new chai.Assertion(obj).to.have.class('tether-' + prefix + '-attached-' + klass);
      });
    };

    if (options.element) {
      assertion('element', options.element);
    };

    if (options.target) {
      assertion('target', options.target);
    };
  });
});
