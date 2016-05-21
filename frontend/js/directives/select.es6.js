function customSelect() {
    return {
        restrict: 'E',
        scope: {
            target: '=',
            options: '='
        },

        template: require('./templates/select.template.html'),

        link: (scope, element, attrs) => {

          scope.activeItem = '';

          scope.open = false;

          scope.selected = (entry) => {

            scope.activeItem = typeof entry.text === 'string' ? entry.text : entry;
            if (scope.target && entry.value) {
              scope.target = entry.value;
            }
            scope.open = false;

          }

          scope.openSelect = () => {

            scope.open = !scope.open;

          }

        },

    }
}

export default customSelect;
