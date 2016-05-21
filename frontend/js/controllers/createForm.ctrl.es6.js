class NewFormCtrl {

    constructor() {

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

        this.fieldCounter = this.form.fields.length;

        this.addingField = false;

        this.selected;

        this.settingsField;

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
        if (question.text && (question.type !== 'select' || (question.options.length > 1))) {
            question.id = this.fieldCounter + 1;
            this.form.fields.push(question);
            this.resetNewField();
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
