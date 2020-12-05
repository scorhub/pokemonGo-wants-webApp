exports.seed = function(knex, Promise) {
  return knex("changes").del()
    .then(function() {
      return knex("changes").insert([
        { chid: 1, uid: 1, wid: 1, awid: null, arwid: null, cwid: null, changetime: new Date() }
      ]);
    });
};