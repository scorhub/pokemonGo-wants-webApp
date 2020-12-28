exports.seed = function(knex, Promise) {
    return knex("userclasses").del()
      .then(function() {
        return knex("userclasses").insert([
            { ucid: 1, ucname: "Admin" },
            { ucid: 2, ucname: "Moderator" },
            { ucid: 3, ucname: "User" }
        ]);
      });
  };