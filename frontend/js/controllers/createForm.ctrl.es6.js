class NewFormCtrl {

    constructor(tempFormsService, $rootScope, $state, $scope) {

        this.$rootScope = $rootScope;

        this.$state = $state;

        this.$scope = $scope;

        this.tempFormsService = tempFormsService;

        this.form = {
            name: 'New Form',
            fields: [],
            description: '',
        };

        this.newQuestion = {
            text: '',
            type: 'smallText',
            help: '',
            submitted: false,
            options: ['', ''],
            allowMultiple: false,
            yes: 'Yes',
            no: 'No',
            fullWidth: false,
        };

        this.addingField = false;

        this.selected = undefined;

        this.settingsField = undefined;

        if (this.$rootScope.id && this.$rootScope.hash) {
          let self = this;
            this.tempFormsService.findPartial($rootScope.id, $rootScope.hash)
                .then(function(result) {
                    self.form.description = result.data.description;
                    self.form.name = result.data.name;
                    self.form.fields = result.data.fields;
                }, function(err) {
                    console.error(err);
                });
        }

    }

    continueArray() {
        if (this.newQuestion.options[this.newQuestion.options.length - 1] !== '') {
            this.newQuestion.options.push('');
        }
    }

    resetNewField() {
        this.newQuestion = {
            text: '',
            type: 'smallText',
            help: '',
            submitted: false,
            options: ['', ''],
            allowMultiple: false,
            yes: 'Yes',
            no: 'No'
        };
        this.addingField = false;
    }

    newField() {
        let question = this.newQuestion;
        if (question.text) {
            question.id = this.form.fields.length + 1;
            this.form.fields.push(question);
            this.resetNewField();
            if (this.form.fields.length === 1 && !this.$rootScope.id) {
                this.registerForm();
            }
        }
    }

    registerForm() {
        this.tempFormsService.create()
            .then(
                result => {
                    this.$rootScope.hash = result.data.hash;
                    this.$rootScope.id = result.data.id;
                },
                //TODO error trap;
                result => console.error(result)
            );
    }

    startAddingField() {
        this.addingField = true;
    }

    cancelAddingField() {
        this.addingField = false;
    }

    feildSettings(field) {
        this.settingsField = field;
    }

    go(location) {
        this.tempFormsService.update(this.$rootScope.id, this.$rootScope.hash, this.form)
            .then(result => {
                    console.log(result);
                    this.$state.go(location);
                },
                //TODO error trap;
                result => console.error(result)
            );
    }

}

export default NewFormCtrl;
