'use strict';

class PseudoUsersService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/pseudousers/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    sendVerification() {
        return this.$http.post(this.urlBase + 'emailVerification', {
            headers: this.headers
        });
    }

}

PseudoUsersService.$inject = ['$http'];

module.exports = PseudoUsersService;
