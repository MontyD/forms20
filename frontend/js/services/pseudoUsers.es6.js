'use strict';

class PseudoUsersService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/pseudousers/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    sendVerification(email) {
        return this.$http.post(this.urlBase + 'emailVerification', {email: email}, {
            headers: this.headers
        });
    }

}

PseudoUsersService.$inject = ['$http'];

module.exports = PseudoUsersService;
