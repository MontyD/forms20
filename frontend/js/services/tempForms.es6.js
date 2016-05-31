'use strict';

class TemporaryFormsService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/temporaryForms/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    create() {
        return this.$http.post(this.urlBase, {}, {
            headers: this.headers
        });
    }

    findPartial(id, reqhash) {
        return this.$http.get(this.urlBase + id + '?hash=' + reqhash, {
            headers: this.headers
        });
    }

    update(id, reqhash, data) {
        return this.$http.put(this.urlBase + id, {
            hash: reqhash,
            payload: data
        }, {
            headers: this.headers
        });
    }

}

TemporaryFormsService.$inject = ['$http'];

module.exports = TemporaryFormsService;
