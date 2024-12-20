const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { cyronixStar, cyronixOk, cyronixTik } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["kes","sestenat"],
      name: "kes",
      help: "kes ses",
      category: "yönetim",
    },

    run: async (client, message, args, embed) => {
        let kanallar = ayar.KomutKullanımKanalİsim;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
        if(!ayar.staffs.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
        {
      message.react(cyronixRed)
      return
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply({ embeds: [embed.setDescription(`**Geçerli Bir User Belirt!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        if (!user.voice.channel) return message.reply({ embeds: [embed.setDescription(`**Geçerli Ses Kanalında Bulunan Bir User Belirt!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`**Kendinden Üst/Aynı Pozisyondaki Birine İşlem Uygulayamazsın!**`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        if(user.user.bot) return message.reply({ embeds: [embed.setDescription(`**Bir Bot'a İşlem Uygulayamazsın!**`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        await user.voice.disconnect()
        message.react(cyronixTik)
    }
}