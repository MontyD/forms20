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
        if (reqForm.config.saveReference) {
            let formId = reqForm.config.id;
            return this.$http.put(this.urlBase + formId, {
                saveReference: reqForm.config.saveReference,
                form: reqForm
            }, {
                headers: this.headers
            });
        }
        return this.$http.post(this.urlBase, {
            form: reqForm,
            userId: reqUserId
        }, {
            headers: this.headers
        });
    }

}

TemporaryFormsService.$inject = ['$http'];

module.exports = TemporaryFormsService;
