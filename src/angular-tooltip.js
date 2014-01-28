(function(angular) {
  'use strict';

  var module = angular.module('ngTooltip', ['ng']),
      extend = angular.extend;

  module.provider('$tooltip', function() {
    // Default template for tooltips.
    var defaultTemplateUrl = 'template/ng-tooltip.html'
    this.setDefaultTemplateUrl = function(templateUrl) {
      defaultTemplateUrl = templateUrl;
    };

    var defaultOptions = {
      tether: {
        attachment: 'top middle',
        targetAttachment: 'bottom middle'
      }
    };
    this.setDefaultOptions = function(options) {
      extend(defaultOptions, options);
    };

    this.$get = function($rootScope, $animate, $compile, $templateCache) {
      return function(options) {
        options = options || {};
        options = extend({ templateUrl: defaultTemplateUrl }, defaultOptions, options);

        var template = $templateCache.get(options.templateUrl),
            scope    = options.scope || $rootScope.$new(),
            target   = options.target,
            elem     = $compile(template)(scope),
            tether;

        /**
         * Attach a tether to the tooltip and the target element.
         */
        function attachTether() {
          tether = new Tether(extend({
            element: elem,
            target: target
          }, options.tether));
        };

        /**
         * Detach the tether.
         */
        function detachTether() {
          if (tether) {
            tether.destroy();
          }
        };

        /**
         * Open the tooltip
         */
        function open() {
          $animate.enter(elem, null, target);
          attachTether();
        };

        /**
         * Close the tooltip
         */
        function close() {
          $animate.leave(elem);
          detachTether();
        };

        // Close the tooltip when the scope is destroyed.
        scope.$on('$destroy', close);

        return {
          open: open,
          close: close
        };
      };
    }
  });

  module.provider('$tooltipDirective', function() {

    /**
     * Returns a factory function for building a directive for tooltips.
     *
     * @param {String} name - The name of the directive.
     */
    this.$get = function($tooltip) {
      return function(name, options) {
        return {
          restrict: 'EA',
          scope: {
            content:  '@' + name,
            tether:  '=?' + name + 'Tether'
          },
          link: function(scope, elem, attrs) {
            var tooltip = $tooltip(extend({
              target: elem,
              scope: scope
            }, options));

            /**
             * Toggle the tooltip.
             */
            elem.hover(function() {
              scope.$apply(tooltip.open);
            }, function() {
              scope.$apply(tooltip.close);
            });
          }
        };
      };
    };
  });

  module.directive('ngTooltip', function($tooltipDirective) {
    return $tooltipDirective('ngTooltip');
  });

  module.run(function($templateCache) {
    $templateCache.put('template/ng-tooltip.html', '<div class="tooltip">{{content}}</div>');
  });

})(angular);
