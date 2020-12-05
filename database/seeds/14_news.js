exports.seed = function(knex, Promise) {
  return knex("news").del()
    .then(function() {
      return knex("news").insert([
        { nid: 1, nuid: 1, ndate: new Date(), ntitle: "Test News Title", ntext: null, narchived: null }
      ]);
    });
};