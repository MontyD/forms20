'use strict';

class NewFormCtrl {

    constructor(tempFormsService, globalConfigService, pseudoUsersService) {

        this.tempFormsService = tempFormsService;
        this.globalConfigService = globalConfigService;
        this.pseudoUsersService = pseudoUsersService;

        this.form = {
            name: 'New Form',
            fields: [],
            description: '',
            style: {
                font: 'sans-serif',
                class: 'basic'
            },
            configuration: {
                email: 'ThisISAnEmail@hello.com',
                submissions: 20,
                notify: 1,
                format: 'pdf',
            }
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

        this.settings = 'field';

        this.settingsField = undefined;

        this.availableThemes = [];

        if (this.availableThemes.length === 0) {
            this.globalConfigService.getThemes()
                .then(
                    result => this.availableThemes = result.data,
                    // TODO error handling
                    result => console.error(result)
                );

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
            if (this.form.fields.length > 0 && !this.id) {
                this.registerForm();
            }
            this.resetNewField();
        }
    }

    removeField() {
        var index = this.form.fields.indexOf(this.settingsField);
        if (index > -1) {
            this.form.fields.splice(index, 1);
        }
        this.settingsField = undefined;
    }

    registerForm() {
        this.tempFormsService.create()
            .then(
                result => {
                    this.hash = result.data.hash;
                    this.id = result.data.id;
                },
                //TODO error trap;
                result => console.error(result)
            );
    }

    sendVerificationEmail() {
      console.log('here');
        this.pseudoUsersService.sendVerification()
            .then(
                result => {
                    //TODO confirmation message;
                    console.log('yes!');
                },
                // TODO error trap;
                error => {
                    console.error(error);
                }
            );


    }

    startAddingField() {
        this.addingField = true;
    }

    cancelAddingField() {
        this.addingField = false;
    }

    feildSettings(field) {
        this.settings = 'field';
        this.settingsField = field;
    }

    setSettings(section) {
        if (section) {
            this.settings = section;
        }
    }

}

NewFormCtrl.$inject = ['tempFormsService', 'globalConfigService', 'pseudoUsersService'];

export default NewFormCtrl;
