const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const conf = require("../../../../src/configs/sunucuayar.json")
const emoji = require("../../../../src/configs/emojis.json")
const allah = require("../../../../../../config.json")
module.exports = {
    conf: {
      aliases: ["swkontrol","svkontrol"],
      name: "svkontrol",
      help: "svkontrol",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
      
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("ytd").setLabel("Yetki Detay").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("grs").setLabel("Sunucu Giriş").setStyle(ButtonStyle.Primary),
      );

if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size

let yt = message.guild.roles.cache.filter(rol => [PermissionsBitField.Flags.Administrator].some(rol2 => rol.permissions.has(rol2)) && !rol.managed)
let syt = message.guild.roles.cache.filter(rol => [PermissionsBitField.Flags.ManageGuild].some(rol2 => rol.permissions.has(rol2)) && !rol.managed)
let ryt = message.guild.roles.cache.filter(rol => [PermissionsBitField.Flags.ManageRoles].some(rol2 => rol.permissions.has(rol2)) && !rol.managed)
let kyt = message.guild.roles.cache.filter(rol => [PermissionsBitField.Flags.ManageChannels].some(rol2 => rol.permissions.has(rol2)) && !rol.managed)

let totalRol = message.guild.roles.cache.filter(x=> x).size
let totalKanal = message.guild.channels.cache.filter(x=> x).size

var yönetici = message.guild.members.cache.filter(x => x.permissions.has(PermissionsBitField.Flags.Administrator) && !x.user.bot)
var syönetici = message.guild.members.cache.filter(x => x.permissions.has(PermissionsBitField.Flags.ManageGuild) && !x.user.bot)
var ryönetici = message.guild.members.cache.filter(x => x.permissions.has(PermissionsBitField.Flags.ManageRoles) && !x.user.bot)
var kyönetici = message.guild.members.cache.filter(x => x.permissions.has(PermissionsBitField.Flags.ManageChannels) && !x.user.bot)

let ozi = new EmbedBuilder()
.setDescription(`
\`\`\`\nSUNUCU-KONTROL\n\`\`\`
Taç Sahip: <@${message.guild.ownerId}>
Sunucu URL: ${message.guild.vanityURLCode ? `https://discord.gg/${message.guild.vanityURLCode} - Kullanım: **${message.guild.fetchVanityData().uses}**` : "Bulunmamaktadır."}
Kuruluş Tarih: <t:${Math.floor(message.guild.joinedTimestamp / 1000)}:R>
Rol Sayısı: **${totalRol}** / Kanal Sayısı: **${totalKanal}**
Yetkili Sayısı: **${ToplamYetkili}**
\`\`\`\nYETKİ-KONTROL\n\`\`\`
${yt.size} rolde [**YÖNETİCİ**] yetkisi açık! Roller şu şekildedir;
${yt.map(role => `${role}`).join(', ')}
─────────────────────
${syt.size} rolde [**URL/SUNUCU YÖNET**] yetkisi açık! Roller şu şekildedir;
${syt.map(role => `${role}`).join(', ')}
─────────────────────
${ryt.size} rolde [**ROL YÖNET**] yetkisi açık! Roller şu şekildedir;
${ryt.map(role => `${role}`).join(', ')}
─────────────────────
${kyt.size} rolde [**KANAL YÖNET**] yetkisi açık! Roller şu şekildedir;
${kyt.map(role => `${role}`).join(', ')}
─────────────────────
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

let msg = await message.channel.send({ embeds: [ozi], components : [row] })

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

collector.on("collect", async (button) => {

if(button.customId === "ytd") {
  let ozi = new EmbedBuilder()
  .setDescription(`
\`\`\`cs\n[YÖNETİCİ] yetkisine erişime sahip (${yönetici.size}) kullanıcı listesi;\n\`\`\`
${yönetici.map(x => `<@${x.id}>`).join(', ')}
─────────────────────
\`\`\`cs\n[URL YÖNET] yetkisine erişime sahip (${syönetici.size}) kullanıcı listesi;\n\`\`\`
${syönetici.map(x => `<@${x.id}>`).join(', ')}
─────────────────────
\`\`\`cs\n[ROL YÖNET] yetkisine erişime sahip (${ryönetici.size}) kullanıcı listesi;\n\`\`\`
${ryönetici.map(x => `<@${x.id}>`).join(', ')}
─────────────────────
\`\`\`cs\n[KANAL YÖNET] yetkisine erişime sahip (${kyönetici.size}) kullanıcı listesi;\n\`\`\`
${kyönetici.map(x => `<@${x.id}>`).join(', ')}
`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

await button.reply({ embeds: [ozi], components : [], ephemeral: true });
}
if(button.customId === "grs") {
  let ozi = new EmbedBuilder()
  .setDescription(`
\`\`\`\nSUNUCU-GİRİŞ\n\`\`\`
Toplam ${rakam(message.guild.memberCount)} kullanıcı sunucumuzda bulunmaktadır.
Sunucumuza **1 saat** içerisinde ${rakam(message.guild.members.cache.filter(ozi => (new Date().getTime() - ozi.joinedTimestamp) < 1000 * 60 * 60).size)} kullanıcı giriş yapmış.
Sunucumuza **1 gün** içerisinde ${rakam(message.guild.members.cache.filter(ozi => (new Date().getTime() - ozi.joinedTimestamp) < 1000 * 60 * 60 * 24).size)} kullanıcı giriş yapmış.
Sunucumuza **1 hafta** içerisinde ${rakam(message.guild.members.cache.filter(ozi => (new Date().getTime() - ozi.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)} kullanıcı giriş yapmış.
Sunucumuza **1 ay** içerisinde ${rakam(message.guild.members.cache.filter(ozi => (new Date().getTime() - ozi.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)} kullanıcı giriş yapmış.
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))

await button.reply({ embeds: [ozi], components : [], ephemeral: true });
}
      })
  },
};

function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0':  `${emoji.cyronix0}`,
        '1':  `${emoji.cyronix1}`,
        '2':  `${emoji.cyronix2}`,
        '3':  `${emoji.cyronix3}`,
        '4':  `${emoji.cyronix4}`,
        '5':  `${emoji.cyronix5}`,
        '6':  `${emoji.cyronix6}`,
        '7':  `${emoji.cyronix7}`,
        '8':  `${emoji.cyronix8}`,
        '9':  `${emoji.cyronix9}`
      }
      [d];
    })
  }
  return basamakbir;
}