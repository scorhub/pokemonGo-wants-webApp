exports.seed = function(knex, Promise) {
  return knex("events").del()
    .then(function() {
      return knex("events").insert([
        { eid: 1, etitle: "Test Event", etext: null, estart: null, eend: null }
      ]);
    });
};