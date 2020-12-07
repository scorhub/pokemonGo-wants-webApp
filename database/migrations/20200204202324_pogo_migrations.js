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
      t.string("email", 50).nullable();
    })
    .createTable("events", t => {
      t.increments("eid").primary();
      t.string("ename", 300).notNullable();
      t.string("etext", 2500).nullable();
      t.datetime("estart").nullable();
      t.datetime("eend").nullable();
      t.string("elink", 250).nullable();
      t.date("ewritedate").notNullable();
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
      t.boolean("mega").nullable();
      t.string("img", 255).notNullable();
    })
    .createTable("pokemons_arean", t => {
      t.increments("aid").primary();
      t.integer("apid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("areanimg", 255).notNullable();
    })
    .createTable("pokemons_costume", t => {
      t.increments("cid").primary();
      t.integer("cpid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("version", 20).notNullable();
      t.string("costumeimg", 255).notNullable().unique();
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
    .createTable("wants_costume", t => {
      t.increments("cwid").primary();
      t.integer("cwpid").unsigned().references("cid").inTable("pokemons_costume").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("cwant").notNullable();
    })
    .createTable("changes", t => {
      t.increments("chid").primary();
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.integer("wid").unsigned().references("wid").inTable("wants").nullable().onDelete("cascade");
      t.integer("awid").unsigned().references("awid").inTable("wants_always").nullable().onDelete("cascade");
      t.integer("arwid").unsigned().references("arwid").inTable("wants_arean").nullable().onDelete("cascade");
      t.integer("cwid").unsigned().references("cwid").inTable("wants_costume").nullable().onDelete("cascade");
      t.datetime("changetime").notNullable();
    })
    .createTable("eventmons", t => {
      t.increments("emid").primary();
      t.integer("eid").unsigned().references("eid").inTable("events").notNull().onDelete("cascade");
      t.integer("epid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
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
      t.string("dnote", 255).nullable();
      t.boolean("farchived").notNullable().default(false);
    })
    .createTable("news", t => {
      t.increments("nid").primary();
      t.integer("nuid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.string("ntitle", 255).notNullable();
      t.string("ntext", 2500).nullable();
      t.date("ndate").notNullable();
      t.boolean("narchived").notNullable().default(false);
      t.date("nedited").nullable().default(null);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists("news")
  .dropTableIfExists("askfeature")
  .dropTableIfExists("eventmons")
  .dropTableIfExists("changes")
  .dropTableIfExists("wants_costume")
  .dropTableIfExists("wants_arean")
  .dropTableIfExists("wants_always")
  .dropTableIfExists("wants")
  .dropTableIfExists("pokemons_costume")
  .dropTableIfExists("pokemons_arean")
  .dropTableIfExists("pokemons")
  .dropTableIfExists("events")
  .dropTableIfExists("users")
  .dropTableIfExists("userclasses");
};