'use strict';

module.exports = function(sequelize, DataTypes) {
  var pseudoUser = sequelize.define('pseudoUsers', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address'
            }
        }
      },
    emailVerification: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN
  });
  return pseudoUser;
};
