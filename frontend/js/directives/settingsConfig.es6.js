'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
          config: '=objectconfig'
        },

        template: require('./templates/settingsConfig.template.html'),

        link: (scope, element, attrs) => {

        },

    };
}

export default fieldSettings;
