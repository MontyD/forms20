'use strict';

function fieldSettings() {
    return {
        restrict: 'E',
        scope: {
            config: '=objectconfig',
            sendVerificationEmail: '&sendverification',
            checkVerificationCode: '&checkverification'
        },

        template: require('./templates/settingsConfig.template.html'),

        link: (scope, element, attrs) => {

            scope.verified = false;

            scope.cancel = () => {
                scope.config.beingVerified = false;
                scope.config.email = '';
                scope.config.verified = false;
            };

            scope.sendVerification = () => {
                if (scope.config.requestSent || scope.config.email === '') {
                    return;
                }
                scope.sendVerificationEmail();
            };

        },

    };
}

export default fieldSettings;
