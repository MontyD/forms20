'use strict';

class GlobalConfigService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/config/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    getThemes() {
        return this.$http.get(this.urlBase + 'themes', {
            headers: this.headers
        });
    }

}

GlobalConfigService.$inject = ['$http'];

module.exports = GlobalConfigService;
