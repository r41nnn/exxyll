const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
  name: "github",
  description: "Returns GitHub User Information",
  aliases: ["gh"],
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    const user = args.join(" ");
    if (!user) return message.lineReply("Please specify GitHub Username!");
    fetch(`https://luminabot.xyz/api/json/github?username=${user}`)
      .then((res) => res.json())
      .then((body) => {
        const embed = new MessageEmbed()
          .setTitle(`${body.name}`)
          .setURL(body.url)
          .setThumbnail(body.avatar)
          .addField(`Bio`, `${body.bio || "No Bio"}`)
          .addField(`Location`, `${body.location || "No Location"}`)
          .addField(`Email`, `${body.email || "None"}`)
          .addField(`Website`, `${body.blog || "No Website"}`)
          .addField(
            `Created at`,
            `${moment(body.created_at).format("LLLL")} (${checkDays(
              body.created_at
            )})`
          )
          .addField(`Followers`, `${body.followers}`)
          .addField(`Following`, `${body.following}`)
          .setColor("BLUE")
          .setTimestamp();

        message.lineReplyNoMention(embed);
      });
  },
};