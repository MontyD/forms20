'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var temporaryForm = sequelize.define('temporaryForms', {
        saveReference: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        email: DataTypes.STRING,
        fields: DataTypes.JSON,
        style: DataTypes.JSON,
        config: DataTypes.JSON,
    }, {
        hooks: {
          // create saveRefeence - id + 'A' + 6 character random hash
            afterCreate: function(form, options, cb) {
                if (form.saveReference) {
                  return cb(null, options);
                }
                form.saveReference = form.id + 'A' + crypto.randomBytes(3).toString('hex');
                return cb(null, options);
            }
        }
    });

    return temporaryForm;
};
