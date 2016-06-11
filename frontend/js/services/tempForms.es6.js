'use strict';

class TemporaryFormsService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/temporaryForms/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    save(reqForm, reqUserId) {
        let formId = reqForm.config.id;
        return this.$http.put(this.urlBase, {
            saveReference: reqForm.config.saveReference,
            form: reqForm
        }, {
            headers: this.headers
        });
    }
}

TemporaryFormsService.$inject = ['$http'];

module.exports = TemporaryFormsService;
