exports.seed = function(knex, Promise) {
  return knex("eventmons").del()
    .then(function() {
      return knex("eventmons").insert([
        { emid: 1, eid: 1, epid: 1 }
      ]);
    });
};