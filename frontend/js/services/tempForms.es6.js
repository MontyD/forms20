'use strict';

class TemporaryFormsService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/temporaryForms/';
        this.headers = {
            requestfrom: 'angular'
        };
    }

    save(reqForm, reqUserId, reqUserInitiated) {
        let formId = reqForm.config.id;
        return this.$http.put(this.urlBase, {
            saveReference: reqForm.config.saveReference,
            form: reqForm,
            userInitiated: reqUserInitiated
        }, {
            headers: this.headers
        });
    }
    loadFormFromSession() {
      return this.$http.get(this.urlBase + 'sessionForm', {
        headers: this.headers
      });
    }
}

TemporaryFormsService.$inject = ['$http'];

module.exports = TemporaryFormsService;
