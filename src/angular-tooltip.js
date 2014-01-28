(function(angular) {
  'use strict';

  function bind(fn, context) {
    return function() {
      fn.apply(context, arguments);
    };
  };

  var module = angular.module('ngTooltip', ['ng']),
      extend = angular.extend;

  module.provider('$Tooltip', function() {
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
      /**
       * Class the represents a tooltip.
       */
      function Tooltip(options) {
        options = options || {};

        this.options = extend({
          templateUrl: defaultTemplateUrl
        }, defaultOptions, options);

        var template = $templateCache.get(this.options.templateUrl),
            scope = this.options.scope || $rootScope.$new();

        this.elem = $compile(template)(scope);
        this.target = this.options.target;

        scope.$on('$destroy', bind(this.close, this));
      };

      extend(Tooltip.prototype, {
        /**
         * Show the tooltip, adding it to the DOM.
         */
        open: function() {
          $animate.enter(this.elem, null, this.target);
          this._attachTether();
          return this;
        },

        /**
         * Hide the tooltip, removing it from the DOM.
         */
        close: function() {
          $animate.leave(this.elem);
          this._detachTether();
          return this;
        },

        /**
         * Attach a tether to the tooltip and the target element.
         */
        _attachTether: function() {
          var options = extend({
            element: this.elem,
            target: this.target
          }, this.options.tether);

          this.tether = new Tether(options);

          return this.tether;
        },

        /**
         * Detach the thether.
         */
        _detachTether: function() {
          if (this.tether) {
            this.tether.destroy();
          }
        }
      });

      return Tooltip;
    }
  });

  module.provider('$tooltipDirective', function() {

    /**
     * Returns a factory function for building a directive for tooltips.
     *
     * @param {String} name - The name of the directive.
     */
    this.$get = function($Tooltip) {
      return function(name, options) {
        return {
          restrict: 'EA',
          scope: {
            content:  '@' + name,
            tether:  '=?' + name + 'Tether'
          },
          link: function(scope, elem, attrs) {
            var tooltip = new $Tooltip(extend({
              target: elem,
              scope: scope
            }, options));

            var open  = bind(tooltip.open, tooltip),
                close = bind(tooltip.close, tooltip);

            /**
             * Toggle the tooltip.
             */
            elem.hover(function() {
              scope.$apply(open);
            }, function() {
              scope.$apply(close);
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
