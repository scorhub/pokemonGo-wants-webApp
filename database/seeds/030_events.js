const eventData = require('./datafiles/eventdata')

exports.seed = function (knex, Promise) {
    return knex('events').del()
        .then(function () {
            return knex('events').insert(eventData);
        });
};