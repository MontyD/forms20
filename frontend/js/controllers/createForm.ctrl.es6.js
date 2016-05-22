class NewFormCtrl {

    constructor(tempFormsService) {

        this.tempFormsService = tempFormsService;

        this.form = {
            name: 'New Form',
            fields: [],
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
            if (this.form.fields.length === 1) {
                this.tempFormsService.create()
                    .then(result => console.log(result.data), result => console.log(result));
            }
        }
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
}

export default NewFormCtrl;
