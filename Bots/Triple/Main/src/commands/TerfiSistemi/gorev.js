const conf = require("../../../../src/configs/sunucuayar.json");
const ayars = require("../../../../src/configs/sunucuayar.json");
const tasks = require("../../../../src/schemas/task");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");
const client = global.bots;
const { cyronixd2, cyronixb2, cyronixd1, cyronixb3, cyronixd3, cyronixRed, cyronixStaff } = require("../../../../src/configs/emojis.json")
const Discord = require("discord.js");

module.exports = {
  conf: {
    aliases: ["görev-al", "gorev-al", "gorev", "görev"],
    name: "görev",
    help: "görev",
    category: "yetkili"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return;

    let buttons = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setLabel("Mesaj Görevi")
        .setCustomId("chat")
        .setEmoji("💬")
        .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
        .setLabel("Ses Görevi")
        .setCustomId("voice")
        .setEmoji("🔊")
        .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
        .setLabel("Taglı Görevi")
        .setCustomId("tags")
        .setEmoji("💎")
        .setStyle(Discord.ButtonStyle.Secondary)
    );
    let buttonn = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setLabel("Kayıt Görevi")
        .setCustomId("reg")
        .setEmoji("💾")
        .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
        .setLabel("Yayın Görevi")
        .setCustomId("yayins")
        .setEmoji("💻")
        .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
        .setLabel("Kamera Görevi")
        .setEmoji("📸")
        .setCustomId("cameras")
        .setStyle(Discord.ButtonStyle.Secondary)
    );
    const taskk = await tasks.find({ guildID: message.guild.id, userID: message.author.id });
    if (taskk.filter((x) => x.daily).length >= 1) {
      message.reply({ embeds: [embed.setDescription(`En Fazla Günde 1 Görevin Bulunabilir!`)] }).sil(15)
      return
    }
    if (taskk.filter((x) => x.active).length >= 1) return message.reply({ embeds: [embed.setDescription(`En Fazla 1 Aktif Görevin Bulunabilir, Yeni Görev Almak İçin Eski Görevlerini Bitirmelisin! Anlık Görev ilerlermeni görmek için \`.görevlerim\` yazabilirsin,!`)] }).then((e) => setTimeout(() => { e.delete(); }, 15000));
    let member = message.member;
    let mesaj = await message.reply({
      components: [buttons, buttonn], embeds: [embed.setDescription(`
  **${cyronixStaff} Selamlar ${member} Aşağıda Bulunan Menüden İstediğin 1 Görevi Alabilirsin!
      
  ${cyronixStaff} Ses Görevini Alırsan 60 İla 300 Dakika Arası 10 Saatli Süreli Ses Görevi Verir
      
  ${cyronixStaff} Mesaj Görevini Alırsan 300 İla 400 Mesaj Arası 10 Saatli Süreli Mesaj Görevi Verir
      
  ${cyronixStaff} Taglı Görevini Alırsan 1 İla 5 Arası 10 Saatli Süreli Taglı Görevi Verir
          
  ${cyronixStaff} Kayıt Görevini Alırsan 5 İla 20 Arası 10 Saatli Süreli Kayıt Görevi Verir

  ${cyronixStaff} Yayın Görevini Alırsan 60 İla 300 Dakika Arası 10 Saatli Süreli Yayın Görevi Verir

  ${cyronixStaff} Kamera Görevini Alırsan 60 İla 300 Dakika Arası 10 Saatli Süreli Kamera Görevi Verir
      
  ${cyronixStaff} Görev Ödüllerini 20 Coin Olarak Verilir
      
  [Max 1 Adet Görev Alabilirsin,Bitirdikten Sonra Tekrardan Alabilirsin Görevlerini]**
      `).setThumbnail(message.author.displayAvatarURL({ dynamic: true }))]
    })

    const filter = i => i.user.id === message.member.id;
    const collector = mesaj.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: filter, time: 30000 });
    collector.on('collect', async b => {
      if (!b.isButton()) return;
      buttonPressed = true;
      const value = b.customId;
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let mesajRandom = getRandomInt(300, 400)
      let sesRandom = getRandomInt(120, 180)
      let yayinRandom = getRandomInt(120, 180)
      let cameraRandom = getRandomInt(90, 150)
      let teyitRandom = getRandomInt(5, 20)
      let taglıRandom = getRandomInt(2, 5)
      let count = value == "chat" ? mesajRandom : value == "yayins" ? yayinRandom : value == "cameras" ? cameraRandom : value == "inv" ? davetRandom : value == "voice" ? sesRandom : value == "tags" ? taglıRandom : value == "yt" ? yetkiliRandom : value == "reg" ? teyitRandom : 0
      let taskMessage;
      switch (value) {
        case "chat":
          taskMessage = ayars.chatChannel
            ? `**${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} ${count} mesaj at!**`
            : `**Metin kanallarında ${count} mesaj at!**`;
          break;
        case "voice":
          taskMessage = ayars.publicParents
            ? `**Public Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!`
            : `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!**`;
          break;
        case "tags":
          taskMessage = `**${count} kişiye tag aldır!**`;
          break;
        case "yayins":
          taskMessage = ayars.publicParents
            ? `**Yayın Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!`
            : `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!**`;
          break;
        case "cameras":
          taskMessage = ayars.publicParents
            ? `**Kamera Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!`
            : `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!**`;
          break;
        case "reg":
          taskMessage = `**Sunucumuzda ${count} kişi kayıt et!**`;
          break;
      }
      if (value == "chat") {
        await b.deferUpdate();

        mesaj.edit({ embeds: [embed.setDescription(`**${b.member} bugün ${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} kanalında \`${count}\` mesaj atma görevi aldın!**`)], components: [] })
        const id = await tasks.find({ guildID: allah.GuildID });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "mesaj", count: count, prizeCount: 20, active: true, finishDate: moment().add(24, 'hours'), channels: ayars.chatChannel, message: `${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} kanalında ${count} mesaj at!` }).save();
      }
      if (value == "voice") {
        await b.deferUpdate();

        count = 1000 * 60 * count;
        mesaj.edit({ embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` ses aktifliği görevi aldın!**`)], components: [] })
        const id = await tasks.find({ guildID: allah.GuildID, userID: b.member.id });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "ses", count: count, prizeCount: 10, active: true, finishDate: moment().add(24, 'hours'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!` }).save();
      }
      if (value == "tags") {
        await b.deferUpdate();

        mesaj.edit({ components: [], embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet taglı üye çekme görevi aldın!**`)], ephemeral: true })
        const id = await tasks.find({ guildID: allah.GuildID });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "tagli", count: count, prizeCount: 20, active: true, finishDate: moment().add(24, 'hours'), channels: null, message: `${count} adet taglı üye çek!` }).save();
      }
      if (value == "reg") {
        await b.deferUpdate();

        mesaj.edit({ embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet kayıt yapma görevi aldın!**`)], components: [] })
        const id = await tasks.find({ guildID: allah.GuildID });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "kayıt", count: count, prizeCount: 20, active: true, finishDate: moment().add(24, 'hours'), channels: null, message: `${count} adet kayıt yap!` }).save();
      }
      if (value == "yayins") {
        await b.deferUpdate();

        count = 1000 * 60 * count;
        mesaj.edit({ embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` yayın açma görevi aldın!**`)], components: [] })
        const id = await tasks.find({ guildID: allah.GuildID, userID: b.member.id });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "yayin", count: count, prizeCount: 10, active: true, finishDate: moment().add(24, 'hours'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!` }).save();
      }
      if (value == "cameras") {
        await b.deferUpdate();

        count = 1000 * 60 * count;
        mesaj.edit({ embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` kamera açma görevi aldın!**`)], components: [] })
        const id = await tasks.find({ guildID: allah.GuildID, userID: b.member.id });
        await new tasks({ guildID: allah.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "camera", count: count, prizeCount: 10, active: true, finishDate: moment().add(24, 'hours'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!` }).save();
      }
    })
    collector.on('end', async b => {
      if (!buttonPressed) {
        mesaj.edit({ embeds: [embed.setDescription(`**Menü Kullanım Süresi Doldu.**`)], components: [] })
      }
    })
  }
}