'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
          styleObject: '='
        },

        template: require('./templates/settingsstyle.template.html'),

        link: (scope, element, attrs) => {

       },

    };
}

export default fieldSettings;