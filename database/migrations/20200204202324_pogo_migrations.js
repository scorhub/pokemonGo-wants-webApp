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
      t.date("pupdated").nullable();
      t.string("img", 255).notNullable();
      t.string("maleimg", 255).nullable();
      t.string("femimg", 255).nullable();
    })
    .createTable("pokemons_arean", t => {
      t.increments("aid").primary();
      t.integer("apid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("areanimg", 255).notNullable();
      t.date("paupdated").nullable();
    })
    .createTable("pokemons_variant", t => {
      t.increments("vid").primary();
      t.integer("vpid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("vversion", 20).notNullable();
      t.string("variantimg", 255).notNullable();
      t.date("pvupdated").nullable();
    })
    .createTable("pokemons_costume", t => {
      t.increments("cid").primary();
      t.integer("cpid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("version", 20).notNullable();
      t.date("cfirstappearance").nullable();
      t.string("costumeimg", 255).notNullable().unique();
      t.date("pcupdated").nullable();
    })
    .createTable("pokemons_shiny", t => {
      t.increments("sid").primary();
      t.integer("spid").unsigned().references("pid").inTable("pokemons").notNull().onDelete("cascade");
      t.string("shinyimg", 255).notNullable().unique();
      t.date("psupdated").nullable();
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
    .createTable("wants_variant", t => {
      t.increments("vwid").primary();
      t.integer("vwpid").unsigned().references("vid").inTable("pokemons_variant").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("vwant").notNullable();
    })
    .createTable("wants_costume", t => {
      t.increments("cwid").primary();
      t.integer("cwpid").unsigned().references("cid").inTable("pokemons_costume").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("cwant").notNullable();
    })
    .createTable("wants_shiny", t => {
      t.increments("swid").primary();
      t.integer("swpid").unsigned().references("sid").inTable("pokemons_shiny").notNull().onDelete("cascade");
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.boolean("swant").notNullable();
    })
    .createTable("changes", t => {
      t.increments("chid").primary();
      t.integer("uid").unsigned().references("uid").inTable("users").notNull().onDelete("cascade");
      t.integer("wid").unsigned().references("wid").inTable("wants").nullable().onDelete("cascade");
      t.integer("awid").unsigned().references("awid").inTable("wants_always").nullable().onDelete("cascade");
      t.integer("arwid").unsigned().references("arwid").inTable("wants_arean").nullable().onDelete("cascade");
      t.integer("vwid").unsigned().references("vwid").inTable("wants_variant").nullable().onDelete("cascade");
      t.integer("cwid").unsigned().references("cwid").inTable("wants_costume").nullable().onDelete("cascade");
      t.integer("swid").unsigned().references("swid").inTable("wants_shiny").nullable().onDelete("cascade");
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
    .createTable("accessrights", t => {
      t.increments("arid").primary();
      t.string("arlocation", 255).notNullable();
      t.boolean("armoderator").notNullable().default(false);
      t.boolean("aruser").notNullable().default(false);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists("accessrights")
  .dropTableIfExists("news")
  .dropTableIfExists("askfeature")
  .dropTableIfExists("eventmons")
  .dropTableIfExists("changes")
  .dropTableIfExists("wants_shiny")
  .dropTableIfExists("wants_costume")
  .dropTableIfExists("wants_variant")
  .dropTableIfExists("wants_arean")
  .dropTableIfExists("wants_always")
  .dropTableIfExists("wants")
  .dropTableIfExists("pokemons_shiny")
  .dropTableIfExists("pokemons_costume")
  .dropTableIfExists("pokemons_arean")
  .dropTableIfExists("pokemons_variant")
  .dropTableIfExists("pokemons")
  .dropTableIfExists("events")
  .dropTableIfExists("users")
  .dropTableIfExists("userclasses");
};