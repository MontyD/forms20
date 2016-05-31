'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {

        },

        template: require('./templates/settingsConfig.template.html'),

        link: (scope, element, attrs) => {

        },

    };
}

export default fieldSettings;
