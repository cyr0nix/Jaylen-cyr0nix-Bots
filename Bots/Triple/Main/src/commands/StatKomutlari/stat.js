const { ButtonStyle, ComponentType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { cyronixStar, cyronixSonsuz, cyronixOk } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../src/schemas/messageUserChannel");
const voiceUserChannel = require("../../../../src/schemas/voiceUserChannel");
const streamerUserChannel = require("../../../../src/schemas/streamerUserChannel");
const cameraUserChannel = require("../../../../src/schemas/cameraUserChannel");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const isimler = require("../../../../src/schemas/names");
const register = require("../../../../src/schemas/registerStats");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviterMember = require("../../../../src/schemas/inviteMember");
const streamerUser = require("../../../../src/schemas/streamerUser");
const cameraUser = require("../../../../src/schemas/cameraUser");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["me", "stat"],
    name: "stat",
    help: "stat",
    category: "stat",
  },

  run: async (client, message, args, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.` }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    await client.guilds.cache.get(allah.GuildID).members.fetch(member.user.id)

    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviterMember.find({ guildID: message.guild.id, inviter: member.user.id });
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;

    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };

    const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
    const Active3 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
    const Active4 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
    const Active5 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });

    let messageTop2;
    Active3.length > 0 ? messageTop2 = Active3.splice(0, 3).map(x => client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID) ? `#${client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID).name}` : `Kanal Bulunamadı`).join("\n\n\n") : messageTop2 = ""

    let messageTop3;
    Active4.length > 0 ? messageTop3 = Active4.splice(0, 3).map(x => `${Number(x.channelData).toLocaleString()} mesaj`).join("\n\n\n") : messageTop3 = ""

    let voiceTop;
    Active2.length > 0 ? voiceTop = Active2.splice(0, 3).map(x => client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`).join("\n\n\n") : voiceTop = ""

    let voiceTop2;
    Active5.length > 0 ? voiceTop2 = Active5.splice(0, 3).map(x => `${moment.duration(x.channelData).format("H [sa], m [dk]")}`).join("\n\n\n") : voiceTop2 = ""
    /////////////

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H[sa.]m[dk.]");
    const messageDaily = messageData ? messageData.dailyStat : 0;
    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H[sa.]m[dk.]");

    const yayındata = await streamerUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const kameradata = await cameraUser.findOne({ guildID: message.guild.id, userID: member.user.id });

    const streamData = moment.duration(voiceData ? voiceData.streamStat : 0).format("H[sa.]m[dk.]");
    const yazı = []
    if (member.user.username.length > 15) {
      let yarrak = member.user.username.slice(0, 15)
      yazı.push(`${yarrak}...`)
    } else {
      yazı.push(`${member.user.tag}`)
    }

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('top')
          .setPlaceholder(`${yazı}'n detaylarını görüntüle`)
          .addOptions([
            { label: 'Ses İstatistik Detay', description: 'Ses istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat1', emoji: `🎤` },
            { label: 'Mesaj İstatistik Detay', description: 'Mesaj istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat2', emoji: `✉️` },
            { label: 'Yayın Detay', description: 'Yayın istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat3', emoji: `🎬` },
            { label: 'Kamera Detay', description: 'Kamera istatistiklerinin detaylı bilgilerini görüntülemektedir', value: 'stat4', emoji: `📸` },
            { label: 'İnvite Detay', description: `${message.guild.name} sunucusundaki detaylı davet bilgileriniz.`, value: 'stat5', emoji: `📩` },
            { label: `İşlem İptal`, value: 'stat6', emoji: { id: "909485171240218634" } },
          ]),
      );
 
    // There should be no further addField() call here. If you need to add more fields, use addFields() method again.
    
      const embed = new EmbedBuilder()
      .setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
      .addFields(
        {
          name: "__**Toplam Ses**__", value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true
        },
        {
          name: "__**Toplam Mesaj**__", value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true
        },


        {

          name: `${cyronixStar} **Sesli Sohbet İstatistiği**`,
          value: `
          ${cyronixSonsuz} **Genel Toplam Ses :** \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
          ${cyronixSonsuz} **Genel Toplam Mesaj :** \`${messageData ? messageData.topStat : 0} mesaj\`
      
          ${cyronixSonsuz} **Haftalık Ses :** \`${voiceWeekly}\`
          ${cyronixSonsuz} **Haftalık Chat :** \`${Number(messageWeekly).toLocaleString()} mesaj\`
      
          ${cyronixSonsuz} **Günlük Ses :** \`${voiceDaily}\`
          ${cyronixSonsuz} **Günlük Chat :** \`${Number(messageDaily).toLocaleString()} mesaj\`
      
          ${cyronixSonsuz} **Davetleri :** **${total}** (**${regular}** gerçek, **${bonus}** bonus, **${leave}** ayrılmış, **${fake}** fake)
          ${cyronixSonsuz} **Daha geniş çaplı bilgilere erişmek için lütfen aşağıdaki münüyü kullanınız!**`,
          inline: false
        })


      ////////////////
      let msg = await message.channel.send({embeds: [embed], components: [row] })

      var filter = (xd) => xd.user.id === message.author.id;
      let collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 99999999 })

      collector.on("collect", async (interaction) => {

        if (interaction.values[0] === "stat1") {
          await interaction.deferUpdate();
          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder().setCustomId("önce").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
              new ButtonBuilder().setCustomId("kapat").setLabel("İşlem Son").setStyle(ButtonStyle.Danger).setEmoji("❌"),
              new ButtonBuilder().setCustomId("sonra").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
            );

          const Active8 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });

          if (Active8.length < 0) return;
          let page = 1;
          let liste = Active8.map((x, index) => `\` ${index + 1} \` ${client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`}: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)

          const embeds = new EmbedBuilder()
            .setDescription(`Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.`)
            .addFields(
              { name: "__**Toplam Ses**__", value: `\`\`\`cs\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
              { name: "__**Haftalık Ses**__", value: `\`\`\`cs\n${voiceWeekly}\n\`\`\``, inline: true },
              { name: "__**Günlük Ses**__", value: `\`\`\`cs\n${voiceDaily}\n\`\`\``, inline: true },
            )
          if (liste.length > 0) {
            embeds.addFields({
              name: `${cyronixStar} **Sesli Kanal İstatistiği**`, value: `
${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}
`, inline: false
            })
          }
          embeds.addFields({
            name: `${cyronixStar} **Sesli Kategori İstatistiği**`, value: `
${cyronixSonsuz} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${cyronixSonsuz} Public Odalar: \` ${await category(conf.publicParents)} \`
${cyronixSonsuz} Secret Odalar: \` ${await category(conf.privateParents)} \`
${cyronixSonsuz} Alone Odalar: \` ${await category(conf.aloneParents)} \`
${cyronixSonsuz} Yönetim Yetkili Odaları: \` ${await category(conf.funParents)} \`
${cyronixSonsuz} Kayıt Odaları: \` ${await category(conf.registerParents)} \`

Genel sohbet( \`ses\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`, inline: false
          })
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
          msg.edit({ embeds: [embeds], components: [row, row2], files: [] })

          if (msg) {
            var filter = (button) => button.user.id === message.author.id;
            let collector2 = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 99999999 })

            collector2.on("collect", async (button) => {

              if (button.customId === "önce") {
                await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.\n\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "sonra") {
                await button.deferUpdate();

                if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                page += 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.\n\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "kapat") {
                await button.deferUpdate();
                if (msg) msg.delete();
              }
            })
          }
        }

        if (interaction.values[0] === "stat2") {
          await interaction.deferUpdate();
          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder().setCustomId("önce2").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
              new ButtonBuilder().setCustomId("kapat2").setLabel("İşlem Son").setStyle(ButtonStyle.Danger).setEmoji("❌"),
              new ButtonBuilder().setCustomId("sonra2").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
            );

          const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });

          if (Active1.length < 0) return;
          let page = 1;
          let liste = Active1.map((x, index) => `\` ${index + 1} \` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``)

          const embeds = new EmbedBuilder()
            .setDescription(`🎉 Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`mesaj\` ) sıralaması listelenmektedir.`)
            .addFields(
              { name: "__**Toplam Mesaj**__", value: `\`\`\`cs\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
              { name: "__**Haftalık Mesaj**__", value: `\`\`\`cs\n${Number(messageWeekly).toLocaleString()} mesaj\n\`\`\``, inline: true },
              { name: "__**Günlük Mesaj**__", value: `\`\`\`cs\n${Number(messageDaily).toLocaleString()} mesaj\n\`\`\``, inline: true },
            )
            .addFields({
              name: `${cyronixStar} **Mesaj İstatistiği**`, value: `
${Active1.length ? `${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}` : 'Mesaj bilgisi bulunmamaktadır.'}

Genel sohbet( \`mesaj\` ) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.
`, inline: false
            })
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
          msg.edit({ embeds: [embeds], components: [row, row2], files: [] })

          if (msg) {
            var filter = (button) => button.user.id === message.author.id;
            let collector2 = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 99999999 })

            collector2.on("collect", async (button) => {

              if (button.customId === "önce2") {
                await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.\n\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "sonra2") {
                await button.deferUpdate();

                if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                page += 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda **${message.guild.name}** sunucusunun genel sohbet( \`ses\` ) sıralaması listelenmektedir.\n\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "kapat2") {
                await button.deferUpdate();
                if (msg) msg.delete();
              }
            })
          }
        }

        if (interaction.values[0] === "stat3") {
          await interaction.deferUpdate();
          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder().setCustomId("önce3").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
              new ButtonBuilder().setCustomId("kapat3").setLabel("İşlem Son").setStyle(ButtonStyle.Danger).setEmoji("❌"),
              new ButtonBuilder().setCustomId("sonra3").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
            );

          const Active6 = await streamerUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });

          if (Active6.length < 0) return;
          let page = 1;
          let liste = Active6.map((x, index) => `\` ${index + 1} \` ${client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`}: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)

          const embeds = new EmbedBuilder()
            .setDescription(`Aşağıda ${member} kullanıcısının detaylı **Yayın** bilgileri görüntülenmektedir. 

**❯ Detaylı Yayın Bilgisi**
${Active6.length ? `${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}` : 'Yayın bilgisi bulunmamaktadır.'}
`)
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

          msg.edit({ embeds: [embeds], components: [row, row2], files: [] })

          if (msg) {
            var filter = (button) => button.user.id === message.author.id;
            let collector2 = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 99999999 })

            collector2.on("collect", async (button) => {

              if (button.customId === "önce3") {
                await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **Yayın** bilgileri görüntülenmektedir.\n\n**❯ Detaylı Yayın Bilgisi**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "sonra3") {
                await button.deferUpdate();

                if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                page += 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **Yayın** bilgileri görüntülenmektedir.\n\n**❯ Detaylı Yayın Bilgisi**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "kapat3") {
                await button.deferUpdate();
                if (msg) msg.delete();
              }
            })
          }
        }
        if (interaction.values[0] === "stat4") {
          await interaction.deferUpdate();
          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder().setCustomId("önce4").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
              new ButtonBuilder().setCustomId("kapat4").setLabel("İşlem Son").setStyle(ButtonStyle.Danger).setEmoji("❌"),
              new ButtonBuilder().setCustomId("sonra4").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
            );

          const Active7 = await cameraUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });

          if (Active7.length < 0) return;
          let page = 1;
          let liste = Active7.map((x, index) => `\` ${index + 1} \` ${client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(allah.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`}: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)

          const embeds = new EmbedBuilder()
            .setDescription(`Aşağıda ${member} kullanıcısının detaylı **Kamera** bilgileri görüntülenmektedir.

**❯ Detaylı Kamera Bilgisi**
${Active7.length ? `${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}` : 'Kamera bilgisi bulunmamaktadır.'}
`)
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

          msg.edit({ embeds: [embeds], components: [row, row2], files: [] })

          if (msg) {
            var filter = (button) => button.user.id === message.author.id;
            let collector2 = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 99999999 })

            collector2.on("collect", async (button) => {

              if (button.customId === "önce4") {
                await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **Kamera** bilgileri görüntülenmektedir.\n\n**❯ Detaylı Kamera Bilgisi**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "sonra4") {
                await button.deferUpdate();

                if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                page += 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **Kamera** bilgileri görüntülenmektedir.\n\n**❯ Detaylı Kamera Bilgisi**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "kapat4") {
                await button.deferUpdate();
                if (msg) msg.delete();
              }
            })
          }
        }

        if (interaction.values[0] === "stat5") {
          await interaction.deferUpdate();
          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder().setCustomId("önce5").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
              new ButtonBuilder().setCustomId("kapat5").setLabel("İşlem Son").setStyle(ButtonStyle.Danger).setEmoji("❌"),
              new ButtonBuilder().setCustomId("sonra5").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
            );

          const invMember2 = await inviterMember.find({ inviter: member.user.id });
          const davet = invMember2 ? invMember2.filter(value => message.guild.members.cache.get(value.userID)).map((value, index) => `${message.guild.members.cache.get(value.userID)} - \` ${value.userID} \``).join("\n") : undefined

          if (invMember2.length < 0) return;
          let page = 1;
          let liste = invMember2.map((value, index) => `\` ${index + 1} \` ${message.guild.members.cache.get(value.userID)} - \` ${value.userID} \``)

          const embeds = new EmbedBuilder()
            .setDescription(`Aşağıda ${member} kullanıcısının detaylı **İnvite** bilgileri görüntülenmektedir.

**❯ Detaylı Davet Bilgisi:** (Toplam **${total}** davet.)
${cyronixStar} \`[ ${regular} gerçek, ${bonus} ekstra, ${leave} ayrılmış, ${fake} sahte ]\`
      
${cyronixOk} Günlük: \` ${daily} \`, Haftalık: \` ${weekly} \`, Taglı: \` ${tagged} \`

${davet ? `**❯ Davet ettiği tüm kişiler;**\n${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}` : 'Davet ettiği üye bulunmamaktadır.'}`)
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

          msg.edit({ embeds: [embeds], components: [row, row2], files: [] })

          if (msg) {
            var filter = (button) => button.user.id === message.author.id;
            let collector2 = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 99999999 })

            collector2.on("collect", async (button) => {

              if (button.customId === "önce5") {
                await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **İnvite** bilgileri görüntülenmektedir.\n\n**❯ Davet ettiği tüm kişiler;**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "sonra5") {
                await button.deferUpdate();

                if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                page += 1;
                let Veri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Aşağıda ${member} kullanıcısının detaylı **İnvite** bilgileri görüntülenmektedir.\n\n**❯ Davet ettiği tüm kişiler;**\n${Veri}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) }).setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))] });
              }

              if (button.customId === "kapat5") {
                await button.deferUpdate();
                if (msg) msg.delete();
              }
            })
          }
        }
        if (interaction.values[0] === "stat6") {
          await interaction.deferUpdate();
          if (msg) msg.delete();
        }

      })
    }
  };