exports.seed = function(knex, Promise) {
  return knex("accessrights").del()
    .then(function() {
      return knex("accessrights").insert([
          { arid: 1, arlocation: "LuckyWants", armoderator: true, aruser: true },
          { arid: 2, arlocation: "AlwaysWants", armoderator: true, aruser: true },
          { arid: 3, arlocation: "AreanWants", armoderator: true, aruser: true },
          { arid: 4, arlocation: "CostumeWants", armoderator: true, aruser: true },
          { arid: 5, arlocation: "ShinyWants", armoderator: true, aruser: true },
          { arid: 6, arlocation: "GenderWants", armoderator: false, aruser: false },
      ]);
    });
};