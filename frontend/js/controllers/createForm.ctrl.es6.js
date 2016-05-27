class NewFormCtrl {

    constructor(tempFormsService) {

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
            if (this.form.fields.length === 1 && !this.id) {
                this.registerForm();
            }
        }
    }

    removeField() {
      var index = this.form.fields.indexOf(this.settingsField);
      if (index > -1) {
        this.form.fields.splice(index, 1);
      }
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
