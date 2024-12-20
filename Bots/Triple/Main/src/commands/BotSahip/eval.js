const Discord = require("discord.js");
const allah = require("../../../../../../config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "eval",
    help: "eval <Code>",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    if (!args[0]) return;
    let code = args.join(" ");

    try {
      var result = clean(await eval(code));
      if (result.includes(client.token)){
        return message.channel.send({ content: "heh aldın şu an tokeni geldimi ?"}); }
        else if (result.includes(client.ws.ping)) {
          const randomPing = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
          return message.channel.send({ content: `\`\`\`js\n${randomPing}\n\`\`\``})
    }
   } catch (e) {
			return message.channel.send({ content: `\`\`\`js\n${e}\n\`\`\`` });
		}
  },
};

function clean(text) {
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 0 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
}