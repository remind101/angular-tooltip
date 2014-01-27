(function(angular) {
  'use strict';

  var module = angular.module('ngTooltip', ['ng']);

  module.provider('$tooltip', function() {
    // Default template for tooltips.
    var defaultTemplateUrl = 'template/ng-tooltip.html'
    this.setDefaultTemplateUrl = function(templateUrl) {
      defaultTemplateUrl = templateUrl;
    };

    /**
     * Returns a factory function for building a directive for tooltips.
     *
     * @param {String} name - The name of the directive.
     */
    this.$get = function($compile, $templateCache, $animate) {
      return function(name) {
        var templateUrl = defaultTemplateUrl;

        return {
          restrict: 'EA',
          scope: { content: '@' + name },
          link: function(scope, elem) {
            var template = $templateCache.get(templateUrl),
                tooltip = $compile(template)(scope),
                tetherInstance;

            /**
             * Attach a tether to the tooltip and the target element.
             */
            function tether() {
              tetherInstance = new Tether({
                element: tooltip,
                target: elem,
                attachment: 'top left',
                targetAttachment: 'bottom right'
              });
            };

            /**
             * Add the tooltip to the DOM.
             */
            function enter() {
              $animate.enter(tooltip, null, elem);
              tether();
            };

            /**
             * Remove the tooltip from the DOM.
             */
            function leave() {
              console.log('leave');
              $animate.leave(tooltip);
            };

            /**
             * Toggle the tooltip.
             */
            elem.hover(function() {
              scope.$apply(enter);
            }, function() {
              scope.$apply(leave);
            });

            /**
             * Destroy the tether when this tooltip is removed.
             */
            scope.$on('$destroy', function() {
              if (tetherInstance) {
                tetherInstance.destroy();
              };
            });
          }
        };
      };
    };
  });

  module.directive('ngTooltip', function($tooltip) {
    return $tooltip('ngTooltip');
  });

  module.run(function($templateCache) {
    $templateCache.put('template/ng-tooltip.html', '<div class="tooltip">{{content}}</div>');
  });

})(angular);
