'use strict';

class NewFormCtrl {

    constructor(Notification, tempFormsService, globalConfigService, pseudoUsersService) {

        this.Notification = Notification;

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
            config: {
                email: '',
                verificationCode: '',
                verified: false,
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

        this.userId = undefined;

        this.addingField = false;

        this.selected = undefined;

        this.settings = 'field';

        this.settingsField = undefined;

        this.availableThemes = [];

        if (this.availableThemes.length === 0) {
            this.globalConfigService.getThemes()
                .then(
                    result => {
                        this.availableThemes = result.data;

                    },
                    // TODO error handling
                    result => {
                        this.Notification.error('Error communicating with server, please try again later');
                        console.error(result);
                    }
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
                error => {
                    console.error(error);
                    this.Notification.error('Error communicating with the server... Hopefully everything will sort itself out');
                }
            );
    }


    // This also attaches UserId if pUser has been created
    sendVerificationEmail() {
        this.pseudoUsersService.sendVerification(this.form.config.email)
            .then(
                result => {
                    this.Notification.success('Email sent! Check your spam for an email from hello@montydawson.co.uk');
                    this.userId = result.data.pUserId;
                },
                error => {
                    console.error(error);
                    this.Notification.error('Email could not be sent, please check the email address. Else there is probably something wrong...');
                }
            );


    }

    checkVerificationCode() {
        this.pseudoUsersService.checkVerification(this.userId, this.form.config.verificationCode)
            .then(
                result => {
                    //TODO confirmation message;
                    this.form.config.verified = result.data.verified;
                    this.Notification.success('Email verified! Yay!');
                },
                // TODO error trap;
                error => {
                  console.error(error);
                  this.Notification.error('Email could not be verified, please check the code and try again.');
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

NewFormCtrl.$inject = ['Notification', 'tempFormsService', 'globalConfigService', 'pseudoUsersService'];

export default NewFormCtrl;
