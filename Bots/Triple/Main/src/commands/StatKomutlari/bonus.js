const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("../../../../src/schemas/inviter");
const conf = require("../../../../src/configs/sunucuayar.json");
const inviterSchema = require("../../../../src/schemas/inviter");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["bonus"],
    name: "bonus",
    help: "bonus <ekle-sil> <@cyr0nix/ID> <adet>",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.guild) return;

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    message.react(cyronixRed)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    let cmd = args[0];
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let value = Number(args[2]);

    if (cmd == 'ekle') {
      if (!member) return message.reply({embeds: [embed.setDescription(`**Bir Kullanıcı Belirtin!**`)] })
      if (!value) return message.reply({embeds: [embed.setDescription(`**Bir Değer Belirtin!**`)] })

      let data = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id })
      if (!data) {
        await new inviterSchema({ guildID: message.guild.id, userID: member.user.id, regular: 0, fake: 0, leave: 0, bonus: value}).save();
        await message.reply({embeds: [embed.setDescription(`**${member} Kullanıcısına ${value} Adet Bonus Davet Eklendi!**`)] })
      } else {
        data.bonus += value
        await data.save();
        await message.reply({embeds: [embed.setDescription(`**${member} Kullanıcısına ${value} Adet Bonus Davet Eklendi!**`)] })
      }
    } else if (cmd == 'sil') {
      if (!member) return message.reply({embeds: [embed.setDescription(`**Bir Kullanıcı Belirtin!**`)] })
      if (!value) return message.reply({embeds: [embed.setDescription(`**Bir Değer Belirtin!**`)] })

      let data = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id })
      if (!data) return message.reply({ embeds: [embed.setDescription(`**Kullanıcının Davet Verisi Bulunmamakta!**`)]})
      data.bonus -= value;
      await data.save();
      await message.reply({embeds: [embed.setDescription(`**${member} Kullanıcısının ${value} Adet Bonus Daveti Silindi!**`)] })
    } else {
      message.reply({embeds: [embed.setDescription(`**Örnek Kullanım; \`.bonus <ekle/sil> <@cyr0nix/ID> <5>**\``)] })
    }
  }
}