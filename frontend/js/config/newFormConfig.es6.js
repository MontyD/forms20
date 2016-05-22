function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/create");

    $stateProvider
        .state('create', {
            url: '/create',
            template: require('../templates/newForm.page.html'),
            controller: 'NewFormCtrl',
            controllerAs: 'newForm'
        })
        .state('style', {
            url: '/style',
            template: require('../templates/styleForm.page.html'),
            controller: 'StyleFormCtrl',
            controllerAs: 'styleForm'
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];
