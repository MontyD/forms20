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
          scope.beingVerified = false;

          scope.verified = false;

          scope.verifyEmail = () => {
            scope.beingVerified = true;
            scope.sendVerificationEmail();
          };

        },

    };
}

export default fieldSettings;
