const client = require("../index.js");
const prefixSchema = require("../models/prefix.js");

client.on("guildDelete", async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      prefixSchema
        .findOneAndDelete({ Guild: guild.id })
        .then(console.log(`Deleted data.`));
    }
  });
});
