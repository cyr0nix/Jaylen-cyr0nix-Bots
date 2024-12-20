const { PermissionsBitField } = require("discord.js");
const spamGuard = require('../../../../src/schemas/chatGuard');
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixTik,cyronixRed} = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
        aliases: ["sguard","schat"],
        name: "spamguard",
        help: "spamguard <aç/kapat>",
        category: "yönetim",
      },
      run: async (client, message, args, perm, prefix) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!");
          }
      
          const guildID = message.guild.id;
          const setting = args[0];
      
          if (setting === 'aç') {
            await spamGuard.findOneAndUpdate({ guildID }, { spamEngel: true }, { upsert: true });
            message.reply('Spam engelleme başarıyla açıldı.');
          } else if (setting === 'kapat') {
            await spamGuard.findOneAndUpdate({ guildID }, { spamEngel: false }, { upsert: true });
            message.reply('Spam engelleme başarıyla kapatıldı.');
          } else {
            const data = await spamGuard.findOne({ guildID }) || { spamEngel: false };
            const status = data.spamEngel ? 'açık' : 'kapalı';
            message.reply(`Spam engelleme şu anda ${status}.`);
          }
        }
};
