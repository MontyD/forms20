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

    checkVerification(id, hash) {
        return this.$http.post(this.urlBase + 'checkVerification', {userId: id, verificationCode: hash}, {
            headers: this.headers
        });
    }

}

PseudoUsersService.$inject = ['$http'];

module.exports = PseudoUsersService;
