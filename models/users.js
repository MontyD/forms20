'use strict';

var bcrypt = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: {
                    args: [5, 20],
                    msg: 'Please enter a username between five and twenty characters long'
                }
            }
        },
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
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 40],
                    msg: 'Please enter a password between five and 40 characters long'
                }
            }
        },
        salt: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: function(user, options, cb) {
              user.firstName = user.fullName.split(' ')[0] || '';
              user.lastName = user.fullName.split(' ')[1] || '';
                bcrypt.genSalt(12, function(err, salt) {
                    if (err) {
                        cb(err, options);
                    }
                    user.salt = salt;
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        if (err) {
                            cb(err, options);
                        }
                        user.password = hash;
                        user.salt = salt;
                        return cb(null, options);
                    });
                });
            }
        }
    });

    return user;
};
