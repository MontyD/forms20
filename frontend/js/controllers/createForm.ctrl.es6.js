class NewFormCtrl {

    constructor(tempFormsService, globalConfigService) {

        this.tempFormsService = tempFormsService;
        this.globalConfigService = globalConfigService;

        this.form = {
            name: 'New Form',
            fields: [],
            description: '',
            style: {
              font: 'sans-serif',
              class: 'basic'
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

        this.addingField = false;

        this.selected = undefined;

        this.settings = 'field';

        this.settingsField = undefined;

        this.availableThemes = [];

        if(this.availableThemes.length === 0) {
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

export default NewFormCtrl;
