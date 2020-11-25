const usersData = require('./datafiles/userdata')

exports.seed = function (knex, Promise) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert(usersData);
        });
};