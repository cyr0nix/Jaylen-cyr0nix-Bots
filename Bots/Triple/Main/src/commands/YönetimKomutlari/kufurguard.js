const {  PermissionsBitField } = require("discord.js");
const kufurGuard = require('../../../../src/schemas/chatGuard');
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixTik,cyronixRed} = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
        aliases: ["kguard","kchat"],
        name: "küfürguard",
        help: "küfürguard <aç/kapat>",
        category: "yönetim",
      },
      run: async (client, message, args, perm, prefix) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!");
          }
      
          const guildID = message.guild.id;
          const setting = args[0];
      
          if (setting === 'aç') {
            await kufurGuard.findOneAndUpdate({ guildID }, { kufurEngel: true }, { upsert: true });
            message.reply('Küfür engelleme başarıyla açıldı.');
          } else if (setting === 'kapat') {
            await kufurGuard.findOneAndUpdate({ guildID }, { kufurEngel: false }, { upsert: true });
            message.reply('Küfür engelleme başarıyla kapatıldı.');
          } else {
            const data = await kufurGuard.findOne({ guildID }) || { kufurEngel: false };
            const status = data.kufurEngel ? 'açık' : 'kapalı';
            message.reply(`Küfür engelleme şu anda ${status}.`);
          }
        }
};
