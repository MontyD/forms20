function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
          field: '=',
        },

        template: require('./templates/fieldSettings.template.html'),

        link: (scope, element, attrs) => {

           scope.continueArray = () => {
             scope.field.options.push('');
           }
           scope.removeOption = (index) => {
             scope.field.options.splice(index, 1);
           }
       },

    }
}

export default fieldSettings;
