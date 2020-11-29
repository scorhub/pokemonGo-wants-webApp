exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("userclasses", t => {
      t.increments("ucid").primary();
      t.string("ucname", 15).notNullable().unique();
    })
    .createTable("users", t => {
      t.increments("uid").primary();
      t.integer("ucid").unsigned().references("ucid").inTable("userclasses").nullable().onDelete("cascade");
      t.string("username", 15).notNullable().unique();
      t.string("password", 255).notNullable();
      t.string("showname", 50).notNullable();
    })
    .createTable("pokemons", t => {
      t.increments("pid").primary();
      t.string("number", 5).notNullable().unique();
      t.string("name", 255).notNullable();
      t.string("type1", 255).nullable();
      t.string("type2", 255).nullable();
      t.string("rarity", 20).nullable();
      t.string("subrarity", 20).nullable();
      t.boolean("released").nullable();
      t.integer("generation", 10).nullable();
      t.string("img", 255).notNullable();
    })
    .createTable("pokemons_arean", t => {
      t.increments("aid").primary();
      t.integer("apid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("areanimg", 255).notNullable();
    })
    .createTable("wants", t => {
      t.increments("wid").primary();
      t.integer("wpid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("want").notNullable();
    })
    .createTable("wants_always", t => {
      t.increments("awid").primary();
      t.integer("awpid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("awant").notNullable();
    })
    .createTable("wants_arean", t => {
      t.increments("arwid").primary();
      t.integer("arwpid").unsigned().references("aid").inTable("pokemons_arean").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("arwant").notNullable();
    })
    .createTable("changes", t => {
      t.increments("chid").primary();
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.integer("wid").unsigned().references("wid").inTable("wants").nullable().onDelete("cascade");
      t.integer("awid").unsigned().references("awid").inTable("wants_always").nullable().onDelete("cascade");
      t.integer("arwid").unsigned().references("arwid").inTable("wants_arean").nullable().onDelete("cascade");
      t.datetime("changetime").notNullable();
    })
    .createTable("events", t => {
      t.increments("eid").primary();
      t.string("etitle", 300).notNullable();
      t.string("etext", 2500).nullable();
      t.datetime("estart").nullable();
      t.datetime("eend").nullable();
    })
    .createTable("eventmons", t => {
      t.increments("emid").primary();
      t.integer("eid").unsigned().references("eid").inTable("events").notNull().onDelete("cascade");
      t.integer("epid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
    })
    .createTable("workinprogress", t => {
      t.increments("wipid").primary();
      t.string("title", 255).notNullable();
      t.string("extrainfo", 1000).notNullable();
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
    })
    .createTable("askfeature", t => {
      t.increments("afid").primary();
      t.integer("afuid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.date("afdate").notNullable();
      t.string("aftitle", 255).notNullable();
      t.string("afinfo", 1000).nullable();
      t.boolean("addedtolist").nullable().default(false);
      t.boolean("inprogress").nullable().default(false);
      t.boolean("completed").nullable().default(false);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists("askfeature")
  .dropTableIfExists("workinprogress")
  .dropTableIfExists("eventmons")
  .dropTableIfExists("events")
  .dropTableIfExists("changes")
  .dropTableIfExists("wants_arean")
  .dropTableIfExists("wants_always")
  .dropTableIfExists("wants")
  .dropTableIfExists("pokemons_arean")
  .dropTableIfExists("pokemons")
  .dropTableIfExists("users")
  .dropTableIfExists("userclasses");
};