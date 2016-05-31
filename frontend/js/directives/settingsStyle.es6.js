'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
            objectstyle: '=',
            themes: '='
        },

        template: require('./templates/settingsstyle.template.html'),

        link: (scope, element, attrs) => {

            scope.setTheme = theme => {
                if (!theme) {
                    return false;
                }
                scope.objectstyle.class = theme.class;
            };

        },

    };
}

export default fieldSettings;
