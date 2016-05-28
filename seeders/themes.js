'use strict';

module.exports = function(db) {

    db.formTheme.bulkCreate([{
        id: 1,
        name: 'Basic',
        class: '',
        description: 'The starter theme',
        primaryColor: '#FFFFFF',
        secondaryColor: '#303F9F'
    }, {
        id: 2,
        name: 'Orange',
        class: 'orange',
        description: 'A bit more fun and in your face',
        primaryColor: '#FFA000',
        secondaryColor: '#FFFFFF'
    },{
        id: 3,
        name: 'Blue',
        class: 'blue',
        description: 'Chilled and dark',
        primaryColor: '#303F9F',
        secondaryColor: '#FFFFFF'
    }]);

};
