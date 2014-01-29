## Angular Tooltip

Simple and extensible abstraction for tooltips with AngularJS. Based on
[tether](http://github.hubspot.com/tether/).

## Installation

1. Install with bower:

   ```bash
   $ bower install ng-modal --save-dev
   ```

2. Include angular-tooltip and tether:

   ```html
   <script src="/bower_components/tether/tether.js"></script>
   <script src="/bower_components/angular-tooltip/dist/angular-tooltip.js"></script>
   ```

## Usage

### Simple Tooltips

Angular Tooltip gives you an `ng-tooltip` directive that you can use for simple
text only tooltips:

```html
<a href="" ng-tooltip="Click Me!">Go</a>
```

### Advanced Tooltips

While the directive is nice for simple tooltips that are text based, more often
than not you want to show dynamic content within the tooltip. Angular Tooltip
gives you a `$tooltip` service to build tooltips. The object returned by this
function provides you with `open` and `close` methods that you can use to
show and hide the tooltip.

```javascript
module.directive('myTooltip', function($tooltip) {
  return {
    restrict: 'EA',
    scope: { show: '=myTooltip' },
    link: function(scope, elem) {
      var tooltip = $tooltip({
        target: elem,
        scope: scope,
        templateUrl: 'template/my-tooltip.html'
      });

      scope.$watch('show', function(value) {
        if (value) {
          tooltip.open();
        } else {
          tooltip.close();
        }
      })
    }
  };
});
```

### Animations

Angular Tooltip uses ngAnimate under the hood, so you can easily add animation
support to your tooltips with the `ng-enter` and `ng-leave` classes.
