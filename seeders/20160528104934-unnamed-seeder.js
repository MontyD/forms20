'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('formThemes', [{
            id: 1,
            name: 'Basic',
            class: 'basic',
            description: 'The starter theme',
            primaryColor: '#FFFFFF',
            secondaryColor: '#303F9F',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        }, {
            id: 2,
            name: 'Fun!',
            class: 'orange',
            description: 'A bit more fun and in your face',
            primaryColor: '#FFA000',
            secondaryColor: '#FFFFFF',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        }, {
            id: 3,
            name: 'Dark',
            class: 'blue',
            description: 'Chilled and dark',
            primaryColor: '#303F9F',
            secondaryColor: '#FFFFFF',
            createdAt: '2016-05-28 12:02:53.91+01',
            updatedAt: '2016-05-28 12:02:53.91+01'
        },{
          id: 4,
          name: 'Beige',
          class: 'beige',
          description: 'A bit boring, but professional',
          primaryColor: '#E1DFBA',
          secondaryColor: '#36292C',
          createdAt: '2016-05-28 12:02:53.91+01',
          updatedAt: '2016-05-28 12:02:53.91+01'
        },{
          id: 5,
          name: 'Angry',
          class: 'red',
          description: 'Attention grabbing and bold',
          primaryColor: '#E14242',
          secondaryColor: '#FFFFFF',
          createdAt: '2016-05-28 12:02:53.91+01',
          updatedAt: '2016-05-28 12:02:53.91+01'
        },{
          id: 6,
          name: 'Lively',
          class: 'yellow',
          description: 'Fun and in your face',
          primaryColor: '#F9ED69',
          secondaryColor: '#6A2C70',
          createdAt: '2016-05-28 12:02:53.91+01',
          updatedAt: '2016-05-28 12:02:53.91+01'
        }], {});

    },

    down: function(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('formThemes', null, {});
    }
};
