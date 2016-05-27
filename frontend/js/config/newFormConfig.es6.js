'use strict';

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/create');

    $stateProvider
        .state('create', {
            url: '/create',
            template: require('../templates/newForm.page.html'),
            controller: 'NewFormCtrl',
            controllerAs: 'newForm'
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];
