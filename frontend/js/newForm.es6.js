import angular from 'angular';


import NewFormCtrl from './controllers/createForm.ctrl.es6.js';

//Custom directives
import fieldEditable from './directives/fieldEditable.es6.js';
import field from './directives/field.es6.js';
import fieldSettings from './directives/fieldSettings.es6.js';
import settingsStyle from './directives/settingsStyle.es6.js';
import settingsConfig from './directives/settingsConfig.es6.js';
import customSelect from './directives/select.es6.js';

//Vendor imports
import dndLists from 'angular-drag-and-drop-lists';
import uiNotification from 'angular-ui-notification';

//Services
import TemporaryFormsService from './services/tempForms.es6.js';
import GlobalConfigService from './services/globalConfig.es6.js';
import PseudoUsersService from './services/pseudoUsers.es6.js';


angular.module('app', ['dndLists', 'ui-notification'])
  .directive('fieldEditable', fieldEditable)
  .directive('fieldSettings', fieldSettings)
  .directive('settingsStyle', settingsStyle)
  .directive('settingsConfig', settingsConfig)
  .directive('field', field)
  .directive('customSelect', customSelect)
  .service('tempFormsService', TemporaryFormsService)
  .service('globalConfigService', GlobalConfigService)
  .service('pseudoUsersService', PseudoUsersService)
  .controller('NewFormCtrl', NewFormCtrl);
