'use strict';

class NewFormCtrl {

    constructor(Notification, tempFormsService, globalConfigService, pseudoUsersService, $window) {

        this.Notification = Notification;

        this.tempFormsService = tempFormsService;
        this.globalConfigService = globalConfigService;
        this.pseudoUsersService = pseudoUsersService;
        this.window = $window;

        this.form = {
            name: '',
            fields: [],
            description: '',
            style: {
                font: 'sans-serif',
                class: 'basic'
            },
            config: {
                email: '',
                verificationCode: '',
                beingVerified: false,
                requestSent: false,
                verified: false,
                submissions: 20,
                notify: 1,
                format: 'pdf',
                saveReference: undefined,
            },
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
                    result => {
                        this.Notification.error('Error communicating with server, have another go later');
                        console.error(result);
                    }
                );
        }

        this.window.onbeforeunload = function(e) {
            return 'You will lose any saved data if you close this window.';
        };

        this.tempFormsService.loadFormFromSession().then(
            result => {
                if (result.data.config) {this.form.config = result.data.config; }
                this.form.name = result.data.name || '';
                this.form.description = result.data.description || '';
                this.form.fields = result.data.fields || [];
                if (result.data.style) { this.form.style = result.data.style; }
            },
            error => {
                console.log(error);
                this.Notification.error('Error communicating with server, try reloading the page');
            }
        );

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
            this.saveForm();
        }
    }

    removeField() {
        var index = this.form.fields.indexOf(this.settingsField);
        if (index > -1) {
            this.form.fields.splice(index, 1);
        }
        this.settingsField = undefined;
    }

    saveForm(userInitiated) {
        this.tempFormsService.save(this.form, this.userId)
            .then(
                result => {
                    if (userInitiated) {
                        this.form.config.saveReference = result.data.saveReference;
                        this.Notification('Form saved!');
                    }
                },
                error => {
                    console.error(error);
                    this.Notification.error('Error communicating with the server... Hopefully everything will sort itself out');
                }
            );
    }

    submitForm() {
        if (this.form.fields === []) {
            return this.Notification.error('Please add few fields before submitting!');
        }
        console.log('submit Form!');
    }


    // This also attaches UserId if pUser has been created
    sendVerificationEmail() {
        this.Notification('Processing request...');
        this.form.config.requestSent = true;
        this.pseudoUsersService.sendVerification(this.form.config.email)
            .then(
                result => {
                    this.Notification.clearAll();
                    this.userId = result.data.pUserId;
                    this.form.config.requestSent = false;
                    if (result.data.verified) {
                        this.Notification.success('Email already verified!');
                        this.form.config.verified = true;
                    } else {
                        this.Notification('Email sent! Check your spam for an email from hello@montydawson.co.uk');
                        this.form.config.beingVerified = true;
                    }

                },
                error => {
                    console.error(error);
                    this.Notification.clearAll();
                    this.form.config.email = '';
                    this.form.config.requestSent = false;
                    this.Notification.error('Email could not be sent, please check the email address is valid');
                }
            );


    }

    checkVerificationCode() {
        this.pseudoUsersService.checkVerification(this.userId, this.form.config.verificationCode)
            .then(
                result => {
                    this.form.config.verified = result.data.verified;
                    if (result.data.verified) {
                        this.Notification.success('Email verified! Yay!');
                        this.saveForm();
                    } else {
                        this.Notification.error('Incorrect validation code');
                    }
                },
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

NewFormCtrl.$inject = ['Notification', 'tempFormsService', 'globalConfigService', 'pseudoUsersService', '$window'];

export default NewFormCtrl;
