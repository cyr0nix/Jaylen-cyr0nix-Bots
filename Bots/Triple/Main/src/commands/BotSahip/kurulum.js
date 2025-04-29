const { Database } = require("ark.db");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("rol")
            .setLabel("Menü Rol Kurulum")
            .setStyle(ButtonStyle.Primary),

          new ButtonBuilder()
            .setCustomId("kanal")
            .setLabel("Kanal Kurulum")
            .setStyle(ButtonStyle.Success),

          new ButtonBuilder()
            .setCustomId("emoji")
            .setLabel("Emoji Kurulum")
            .setStyle(ButtonStyle.Danger),
        );

      let msg = await message.channel.send({ content: `Lütfen **60 saniye** içerisinde hangi kurulum yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız.`, components: [row] })

      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 3, time: 60000 })


      collector.on("collect", async interaction => {

        if (interaction.customId === "rol") {
          await interaction.deferUpdate();

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍓",
            color: "#ff0000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍊",
            color: "#ff8b00",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍇",
            color: "#4f00ff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍑",
            color: "#ff00d1",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🧊",
            color: "#12d9eb",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🥑",
            color: "#56ff00",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎱",
            color: "#100f0f",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍥",
            color: "#f5efef",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🍋",
            color: "#e5ed12",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Alone 💔",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Couple 💍",
            color: "#e73084",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "No Couple 🥱",
            color: "#088a78",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Çekiliş Katılımcısı 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Genel Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Oy Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Etkinlik Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♏ Akrep",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♉ Boğa",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♍ Başak",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♊ İkizler",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♒ Kova",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♈ Koç",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♋ Yengeç",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♑ Oğlak",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♎ Terazi",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♌ Aslan",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♓ Balık",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "♐ Yay",
            color: "#ffffff",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 CS:GO",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 League of Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Valorant",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Gta V",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 PUBG",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Fortnite",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Mobile Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Euro Truck Simulator 2",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "🎮 Apex",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Voice Max 🏅",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Chat Max 🏅",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Voice 🥇",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Chat 🥇",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Voice 🥈",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Chat 🥈",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Voice 🥉",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Chat 🥉",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Galatasaray",
            color: "#de0b16",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Fenerbahçe",
            color: "#0c0ce8",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Beşiktaş",
            color: "#f0f0f5",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          await interaction.guild.roles.create({
            name: "Trabzonspor",
            color: "#800917",
            permissions: "0",
            reason: "Added By Cyronix"
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();

          const parent = await interaction.guild.channels.create({
            name: 'SUNUCU LOGLAR',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            }]
          });
          await interaction.guild.channels.create({
            name: 'guard_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'message_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'voice_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'stream_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'camera_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'mute_deaf_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'register_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'name_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'rank_log',
            type: ChannelType.GuildText,
            parent: parent.id

          });
          await interaction.guild.channels.create({
            name: 'rol_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'yetki_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'komut_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'boost_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'taglı_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'bot_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'istek-log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'şikayet-log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({
            name: 'başvuru-log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
            { name: "cyronixStar", url: "https://cdn.discordapp.com/emojis/1365672319833342094.gif?size=40&animated=true" },
            { name: "cyronixSaat", url: "https://cdn.discordapp.com/emojis/1365672460686463007.gif?size=40&animated=true" },
            { name: "cyronixSonsuz", url: "https://cdn.discordapp.com/emojis/1365672262165856256.gif?size=40&animated=true" },
            { name: "cyronixRed", url: "https://cdn.discordapp.com/emojis/1365672065616580659.gif?size=40&animated=true" },
            { name: "cyronixTik", url: "https://cdn.discordapp.com/emojis/1365672084931481671.gif?size=40&animated=true" },
            { name: "cyronixStaff", url: "https://cdn.discordapp.com/emojis/1365672340565917736.webp?size=40" },
            { name: "cyronixKalp", url: "https://cdn.discordapp.com/emojis/1365672497563046060.gif?size=40&animated=true" },
            { name: "cyronixOk", url: "https://cdn.discordapp.com/emojis/1365672546728677526.webp?size=40" },
            { name: "cyronixRevu", url: "https://cdn.discordapp.com/emojis/1365672573463167047.gif?size=40&animated=true" },
            { name: "cyronixCeza", url: "https://cdn.discordapp.com/emojis/1365672163289337867.webp?size=40" },
            { name: "cyronixJail", url: "https://cdn.discordapp.com/emojis/1365672599673110650.webp?size=40" },
            { name: "cyronixLock", url: "https://cdn.discordapp.com/emojis/1365672644824924212.webp?size=40" },
            { name: "cyronixd2", url: "https://cdn.discordapp.com/emojis/1365672709316677724.gif?size=40&animated=true" },
            { name: "cyronixb2", url: "https://cdn.discordapp.com/emojis/1365672786496065577.webp?size=40" },
            { name: "cyronixd1", url: "https://cdn.discordapp.com/emojis/1365672692551909456.gif?size=40&animated=true" },
            { name: "cyronixb3", url: "https://cdn.discordapp.com/emojis/1365672815327707247.webp?size=40" },
            { name: "cyronixd3", url: "https://cdn.discordapp.com/emojis/1365672735241670696.gif?size=40&animated=true" },
            { name: "cyronixCekilis", url: "https://cdn.discordapp.com/emojis/1365672118364147723.gif?size=40&animated=true" },
            { name: "cyronix1", url: "https://cdn.discordapp.com/emojis/1365672853210660937.gif?size=40&animated=true" },
            { name: "cyronix2", url: "https://cdn.discordapp.com/emojis/1365672872416378972.gif?size=40&animated=true" },
            { name: "cyronix3", url: "https://cdn.discordapp.com/emojis/1365672890216873984.gif?size=40&animated=true" },
            { name: "cyronix4", url: "https://cdn.discordapp.com/emojis/1365672912744484924.gif?size=40&animated=true" },
            { name: "cyronix5", url: "https://cdn.discordapp.com/emojis/1365672960974655553.gif?size=40&animated=true" },
            { name: "cyronix6", url: "https://cdn.discordapp.com/emojis/1365672982990819330.gif?size=40&animated=true" },
            { name: "cyronix7", url: "https://cdn.discordapp.com/emojis/1365673009029058623.gif?size=40&animated=true" },
            { name: "cyronix8", url: "https://cdn.discordapp.com/emojis/1365673021523886130.gif?size=96&animated=true" },
            { name: "cyronix9", url: "https://cdn.discordapp.com/emojis/1365673076351569971.gif?size=40&animated=true" },
            { name: "cyronix0", url: "https://cdn.discordapp.com/emojis/1365673092621271101.gif?size=40&animated=true" },
            { name: "cyronixTac", url: "https://cdn.discordapp.com/emojis/1365673178147328081.webp?size=40" },
            { name: "cyronixGiris", url: "https://cdn.discordapp.com/emojis/1365672226254487623.webp?size=40" },
            { name: "cyronixCikis", url: "https://cdn.discordapp.com/emojis/1365672209242128476.webp?size=40" }
          ]
          const SecretEmojis = [
            { name: "secret1", url: "https://cdn.discordapp.com/emojis/1365673331579162664.webp?size=40" },
            { name: "secret2", url: "https://cdn.discordapp.com/emojis/1365673348822204487.webp?size=40" },
            { name: "secret3", url: "https://cdn.discordapp.com/emojis/1365673380455518218.webp?size=40" },
            { name: "secret4", url: "https://cdn.discordapp.com/emojis/1365673397794897931.webp?size=40" },
            { name: "secret5", url: "https://cdn.discordapp.com/emojis/1365673415654113330.webp?size=40" },
            { name: "secret6", url: "https://cdn.discordapp.com/emojis/1365673434390073366.webp?size=40" },
            { name: "secret7", url: "https://cdn.discordapp.com/emojis/1365673456158376108.webp?size=40" },
            { name: "secret8", url: "https://cdn.discordapp.com/emojis/1365673479743082517.webp?size=40" },
            { name: "secret9", url: "https://cdn.discordapp.com/emojis/1365673501884809276.webp?size=40" },
            { name: "secret10", url: "https://cdn.discordapp.com/emojis/1365673528161992754.webp?size=40" }
          ]
          emojis.forEach(async (x) => {
            if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
            if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
            const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
            await global.emojidb.set(x.name, emoji.toString());
            message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

          })

          SecretEmojis.forEach(async (x) => {
            if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
            if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
            const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
            await global.emojidb.set(x.name, emoji.toString());
            message.channel.send({ content: `\`${x.name}\` isimli özel oda emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

          })
        }

      })

    }
  },
};