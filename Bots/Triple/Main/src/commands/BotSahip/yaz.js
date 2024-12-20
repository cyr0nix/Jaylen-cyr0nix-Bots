const { cyronixRed } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: [],
    name: "yaz",
    help: "yaz <Mesaj/Text>",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    if(!args[0]) return message.react(cyronixRed)
    message.delete();
    message.channel.send({ content: args.join(' ')});
  },
};

  