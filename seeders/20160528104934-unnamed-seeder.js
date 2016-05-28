'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('formThemes', [{
            id: 1,
            name: 'Basic',
            class: '',
            description: 'The starter theme',
            primaryColor: '#FFFFFF',
            secondaryColor: '#303F9F',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        }, {
            id: 2,
            name: 'Orange',
            class: 'orange',
            description: 'A bit more fun and in your face',
            primaryColor: '#FFA000',
            secondaryColor: '#FFFFFF',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        }, {
            id: 3,
            name: 'Blue',
            class: 'blue',
            description: 'Chilled and dark',
            primaryColor: '#303F9F',
            secondaryColor: '#FFFFFF',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        }], {});

    },

    down: function(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('formThemes', null, {});
    }
};
