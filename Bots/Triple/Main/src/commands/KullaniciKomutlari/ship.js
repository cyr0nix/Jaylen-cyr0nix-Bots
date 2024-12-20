const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser, hyperlink, PermissionsBitField, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const canvafy = require('canvafy');
const conf = require("../../../../src/configs/sunucuayar.json")
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixKalp,cyronixSonsuz,cyronixCeza} = require("../../../../src/configs/emojis.json");

module.exports = {
  conf: {
    aliases: ["ship"],
    name: "ship",
    help: "ship",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
    if(!["ship"].some(bes => message.channel.name.includes(bes))) return message.channel.send({ content: `> **Ship Komudunu Sadece <#1233572498688442498> Kanalında Kullanabilirsin!**` }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    
    const mentionedMembers = Array.from(message.mentions.members.values());
    let user = mentionedMembers[0] || message.guild.members.cache.get(args[0]);
    let user2 = mentionedMembers[1] || message.guild.members.cache.get(args[1]);

    const maleRoleIds = conf.erkekRolleri;
    const femaleRoleIds = conf.kizRolleri;

    if (!user && !user2) {
      user = message.member;
      let userGenderRole = null;

      if (maleRoleIds.some(roleId => user.roles.cache.has(roleId))) {
        userGenderRole = 'male';
        user2 = message.guild.members.cache.filter(member => femaleRoleIds.some(roleId => member.roles.cache.has(roleId)) && !member.user.bot).random();
      } else if (femaleRoleIds.some(roleId => user.roles.cache.has(roleId))) {
        userGenderRole = 'female';
        user2 = message.guild.members.cache.filter(member => maleRoleIds.some(roleId => member.roles.cache.has(roleId)) && !member.user.bot).random();
      } else {
        user2 = message.guild.members.cache.filter(member => !member.user.bot && member.id !== message.author.id).random();
      }
    } else if (!user2) {
      user2 = user;
      user = message.member;
    }

    if (user2.user.bot || user.user.bot) return message.channel.send({ content: `> **Botlarla Ship Yapamazsın!**` }).sil(5);

    const specialUserIds = ['1016751053368201256', '1208428060978708590'];
    let customNumber = Math.floor(Math.random() * 101);

    if ((user.id === specialUserIds[0] && user2.id === specialUserIds[1]) || (user.id === specialUserIds[1] && user2.id === specialUserIds[0])) {
      customNumber = 100; // Set to 100% if the special users are matched
    }

    const ship = await new canvafy.Ship()
      .setAvatars(user.user.displayAvatarURL({ dynamic: true, extension: "png" }), user2.user.displayAvatarURL({ dynamic: true, extension: "png" }))
      .setBackground("image", `${message.guild.bannerURL({extension:"png",size:2048}) !== null ? message.guild.bannerURL({extension:"png",size:2048}) : ayar.shipArkaplan}`)
      .setBorder("#ff1d8e")
      .setCustomNumber(customNumber)
      .setOverlayOpacity(0.5)
      .build();

    let button = new ButtonBuilder();
    if (customNumber >= 80) {
      button.setCustomId('tanis')
        .setLabel('Tanış')
        .setEmoji('1213647502834925578')
        .setStyle(ButtonStyle.Success)
        .setDisabled(false);
    } else {
      button.setCustomId('tanis_disabled')
        .setLabel('Tanış')
        .setEmoji('1213638200413782077')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true);
    }

    const row = new ActionRowBuilder().addComponents(button);

    const sentMessage = await message.reply({
      content: `>             **${user.user.tag} ❓ ${user2.user.tag}**`,
      files: [{
        attachment: ship,
        name: `ship-${message.member.id}.png`
      }],
      components: [row]
    });

    // Collect and handle button interactions
    const filter = (interaction) => interaction.customId === 'tanis' && interaction.user.id === message.author.id;
    const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'tanis') {
        await user2.send({
          content: `**Merhaba! ${user} seninle tanışmak istiyor.** ${cyronixKalp} \n\n> **Sende tanışmak istiyorsan \`${allah.GuildName}\` sunucunda onunla tanışabilirsin.** ${cyronixSonsuz} \n> **Eğer Bu durumdan şikayetçi olmaya başlarsan cyr0nix ile iletişime geç.**${cyronixCeza}`,
          files: [{ attachment: ship, name: `ship-${message.member.id}.png` }]
        }).catch(err => console.log(err));

        const updatedButton = new ButtonBuilder()
          .setCustomId('tanisildi')
          .setLabel('Tanışıldı')
          .setEmoji('1213638745857990767')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true);

        const updatedRow = new ActionRowBuilder().addComponents(updatedButton);

        await interaction.update({ components: [updatedRow] });
      }
    });

    collector.on('end', async (collected, reason) => {
      if (reason === 'time' && customNumber >= 80) {
        const disabledButton = new ButtonBuilder(button)
          .setLabel('Tanışma süresi doldu')
          .setCustomId('suredoldu')
          .setEmoji('1213646043577581608')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true);

        const disabledRow = new ActionRowBuilder().addComponents(disabledButton);
        await sentMessage.edit({ components: [disabledRow] }).catch();
      }
    });
  }
}
