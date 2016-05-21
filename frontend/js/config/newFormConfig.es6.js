function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/new");

    $stateProvider
        .state('new', {
            url: '/new',
            template: require('../templates/newForm.page.html'),
            controller: 'NewFormCtrl',
            controllerAs: 'newForm'
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];
