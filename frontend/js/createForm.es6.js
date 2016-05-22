import angular from 'angular';
import uiRouter from 'angular-ui-router';

import NewFormCtrl from './controllers/createForm.ctrl.es6.js';
import StyleFormCtrl from './controllers/styleForm.ctrl.es6.js';

//Custom directives
import fieldEditable from './directives/fieldEditable.es6.js';
import field from './directives/field.es6.js';
import fieldSettings from './directives/fieldSettings.es6.js';
import customSelect from './directives/select.es6.js';

//Vendor directives
import dndLists from 'angular-drag-and-drop-lists';

//Services
import TemporaryFormsService from './services/tempForms';

//Config
import appConfig from './config/newFormConfig.es6.js';

angular.module('app', [uiRouter, 'dndLists'])
  .service('tempFormsService', TemporaryFormsService)
  .controller('NewFormCtrl', NewFormCtrl)
  .controller('StyleFormCtrl', StyleFormCtrl)
  .directive('fieldEditable', fieldEditable)
  .directive('field', field)
  .directive('fieldSettings', fieldSettings)
  .directive('customSelect', customSelect)
  .config(appConfig);
