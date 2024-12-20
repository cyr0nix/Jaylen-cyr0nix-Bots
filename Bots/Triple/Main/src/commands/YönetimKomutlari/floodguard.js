const { PermissionsBitField } = require("discord.js");
const FloodGuard = require('../../../../src/schemas/chatGuard');
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixTik,cyronixRed} = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
        aliases: ["fguard","fchat"],
        name: "floodguard",
        help: "floodguard <aç/kapat>",
        category: "yönetim",
      },
      run: async (client, message, args, perm, prefix) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!");
          }
      
          const guildID = message.guild.id;
          const setting = args[0];
      
          if (setting === 'aç') {
            await FloodGuard.findOneAndUpdate({ guildID }, { floodEngel: true }, { upsert: true });
            message.reply('Flood engelleme başarıyla açıldı.');
          } else if (setting === 'kapat') {
            await FloodGuard.findOneAndUpdate({ guildID }, { floodEngel: false }, { upsert: true });
            message.reply('Flood engelleme başarıyla kapatıldı.');
          } else {
            const data = await FloodGuard.findOne({ guildID }) || { floodEngel: false };
            const status = data.floodEngel ? 'açık' : 'kapalı';
            message.reply(`Flood engelleme şu anda ${status}.`);
          }
        }
};
