const { PermissionsBitField } = require("discord.js");
const ReklamGuard = require('../../../../src/schemas/chatGuard');
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixTik,cyronixRed} = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
        aliases: ["rguard","rchat"],
        name: "reklamguard",
        help: "reklamguard <aç/kapat>",
        category: "yönetim",
      },
      run: async (client, message, args, perm, prefix) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!");
        }
    
        const guildID = message.guild.id;
        const setting = args[0];
    
        if (setting === 'aç') {
          await ReklamGuard.findOneAndUpdate({ guildID }, { reklamEngel: true }, { upsert: true });
          message.reply('Reklam engelleme başarıyla açıldı.');
        } else if (setting === 'kapat') {
          await ReklamGuard.findOneAndUpdate({ guildID }, { reklamEngel: false }, { upsert: true });
          message.reply('Reklam engelleme başarıyla kapatıldı.');
        } else {
          const data = await ReklamGuard.findOne({ guildID }) || { reklamEngel: false };
          const status = data.reklamEngel ? 'açık' : 'kapalı';
          message.reply(`Reklam engelleme şu anda ${status}.`);
        }
      }
    };
    
