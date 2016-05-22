'use strict';

class TemporaryFormsService {
    constructor($http) {
        this.$http = $http;
        this.urlBase = '/temporaryForms';
        this.config = {
            headers: {
                requestfrom: 'angular'
            }
        };
    }

    create() {
        return this.$http.get(this.urlBase, this.config);
    }

}

module.exports = TemporaryFormsService;
