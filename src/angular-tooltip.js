(function(angular) {
  'use strict';

  var module = angular.module('ngTooltip', ['ng']);

  module.provider('$tooltip', function() {
    var defaultTemplate = 'template/ng-tooltip.html'

    this.$get = function($compile, $templateCache, $animate) {
      return function(prefix, options) {
        options = options || {};

        if (!options.template && !options.templateUrl) {
          options.templateUrl = defaultTemplate;
        }

        if (!options.trigger) {
          options.trigger = 'hover';
        }

        var triggerAttr = prefix + '-trigger';

        function getTemplate() {
          if (options.templateUrl) {
            return $templateCache.get(options.templateUrl);
          } else {
            return options.template;
          }
        };

        return {
          restrict: 'EA',
          link: function(scope, elem, attrs) {
            var template = getTemplate(),
                tooltip = $compile(template)(scope);

            var trigger = attrs[triggerAttr] || options.trigger;

            var enter = function() {
              $animate.enter(tooltip, null, elem);
            };

            var leave = function() {
              $animate.leave(tooltip);
            };

            var handlers = {
              hover: function() {
                elem.hover(function() {
                  scope.$apply(enter);
                }, function() {
                  scope.$apply(leave);
                });
              },
              manual: function() {
              }
            }

            handlers[trigger]();
          }
        };
      };
    }
  });

  module.directive('ngTooltip', function($tooltip) {
    return $tooltip('ng-tooltip');
  });

})(angular);
