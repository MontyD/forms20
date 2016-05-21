function fieldEditable() {
    return {
        scope: {
            value: '=',
        },
        template: '<span ng-bind="value || initial"></span><input class="outline editable" type="text" ng-model="value"></input>',

        link: function(scope, element, attrs) {
            scope.editing = false;
            scope.initial = attrs.initial;

            var input = angular.element(element.children()[1]);

            scope.edit = function() {
                scope.editing = true;
                element.addClass('active');
                input[0].focus();
            };

            input.prop('onblur', function() {
                scope.editing = false;
                element.removeClass('active');
            });

            element.bind('click', scope.edit);

        }
    }
}

export default fieldEditable;
