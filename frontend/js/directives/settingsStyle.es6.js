'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
          styleObject: '=',
          themes: '='
        },

        template: require('./templates/settingsstyle.template.html'),

        link: (scope, element, attrs) => {

       },

    };
}

export default fieldSettings;
