function field() {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            settings: '&settings'
        },
        template: require('./templates/field.template.html'),

        link: function(scope, element, attrs) {

        }
    }
}

export default field;
