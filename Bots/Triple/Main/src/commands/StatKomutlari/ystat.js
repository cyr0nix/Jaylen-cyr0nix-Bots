const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const cezapuan = require("../../../../src/schemas/cezapuan");
const coin = require("../../../../src/schemas/coin");
const taggeds = require("../../../../src/schemas/taggeds");
const yetkis = require("../../../../src/schemas/yetkis");
const ceza = require("../../../../src/schemas/ceza");
const toplams = require("../../../../src/schemas/toplams");
const inviterSchema = require("../../../../src/schemas/inviter");
const { cyronixKalp, cyronixStaff, cyronixTik ,cyronixStar , cyronixd2, cyronixb2, cyronixd1, cyronixb3, cyronixd3, cyronixRed, cyronixSonsuz } = require("../../../../src/configs/emojis.json");
const { ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");
const tasks = require("../../../../src/schemas/task")
const CameraStat = require("../../../../src/schemas/CameraStat")
const StreamerStat = require("../../../../src/schemas/StreamerStat")

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(cyronixRed);

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(cyronixRed);

    const msj = await message.reply({ embeds: [embed.setDescription(`${message.guild.name} sunucusunda ${member} kullanıcısına ait veriler yükleniyor. Lütfen bekleyin!`)] })

    
    const mtask = await tasks.find({ guildID: message.guild.id, userID: member.user.id });
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });

    let kullArray = message.content.split(" ");
    let kullaniciId = kullArray.slice(1);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;

const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""


      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [Saat], m [Dakika]");
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [Saat], m [Dakika]");

    const messageUsersData2 = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
    messageUsersData2.sort((a, b) => b.TotalStat - a.TotalStat);
    const index = messageUsersData2.findIndex((x) => x.userID === member.user.id);
    const sıralama = index === -1 ? "Verisi Yok." : `${index + 1}. sırada`; 

    const voiceUsersData2 = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
    voiceUsersData2.sort((a, b) => b.TotalStat - a.TotalStat);
    const index2 = voiceUsersData2.findIndex((x) => x.userID === member.user.id);
    const sıralama2 = index2 === -1 ? "Verisi Yok." : `${index2 + 1}. sırada`;

    const streamData = await StreamerStat.find({ guildID: message.guild.id });
    streamData.sort((a, b) => b.TotalStat - a.TotalStat);
    const index3 = streamData.findIndex((x) => x.userID === member.user.id);
    const sıralama3 = index3 === -1 ? "Verisi Yok." : `${index3 + 1}. sırada`; 

const cameraData = await CameraStat.find({ guildID: message.guild.id });
cameraData.sort((a, b) => b.TotalStat - a.TotalStat);
const index4 = cameraData.findIndex((x) => x.userID === member.user.id);
const sıralama4 = index4 === -1 ? "Verisi Yok." : `${index4 + 1}. sırada`; 

const yetkiFark = maxValue.coin - (coinData ? coinData.coin : 0);

// Atlayacak yetki yüzdesi
const atlayacakYetkiYuzdesi = (coinData ? coinData.coin : 0) / maxValue.coin * 100;

// Yetki atlaması bilgisini oluştur
const atlamaBilgisi = `${atlayacakYetkiYuzdesi.toFixed(2)}%`;

message.react(cyronixTik)
var PuanDetaylari = new ButtonBuilder()
.setLabel("Yetki Puan Detayları")
.setCustomId("puan_detaylari")
.setStyle(ButtonStyle.Success)

var GenelPuanDetaylari = new ButtonBuilder()
.setLabel("Ceza Puan Detayları")
.setCustomId("ceza_puan_detaylari")
.setStyle(ButtonStyle.Primary)

var Iptal = new ButtonBuilder()
.setLabel("İptal")
.setCustomId("iptal_button")
.setStyle(ButtonStyle.Danger)

const row = new ActionRowBuilder()
.addComponents([PuanDetaylari, GenelPuanDetaylari, Iptal])

const Ramal = new EmbedBuilder()
.setDescription(`${member.toString()} üyesinin __${moment(Date.now()).format("LLL")}__ tarihinden  itibaren **${message.guild.name}** sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.

${cyronixStaff} ${member.toString()}, **Günlük / Haftalık / Toplam Ses İstatistikleri;**

${cyronixSonsuz} \` Toplam Ses İstatistiği :  \` **${voiceDaily}**
${cyronixSonsuz} \` Haftalık Ses İstatistiği :  \` **${voiceWeekly}**
${cyronixSonsuz} \` Günlük Ses İstatistiği :  \` **${voiceDaily}**

${cyronixStaff} ${member.toString()}, **Günlük / Haftalık / Toplam Mesaj İstatistikleri;**

${cyronixSonsuz} \` Toplam Mesaj İstatistiği : \` **${messageData ? messageData.topStat : 0}**
${cyronixSonsuz} \` Haftalık Mesaj İstatistiği : \` **${Number(messageWeekly).toLocaleString()}**
${cyronixSonsuz} \` Günlük Mesaj İstatistiği : \` **${Number(messageDaily).toLocaleString()}**

${cyronixStaff} ${member.toString()}, **Genel Yetili/Yetki Yükseltim İstatistiklerin Aşağıda Listeleniyor;**

${cyronixSonsuz} \` Yetki İlerleme Durumu :  \` ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)}
${cyronixSonsuz} \` Yetki Yükselim Puanı :  \` [**${maxValue.coin}**] 
${cyronixSonsuz} \` Bulunan Yetkin :  \` ${message.member.roles.highest}
${cyronixSonsuz} \` Yükselinecek Yetkin :  \` ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`}
${cyronixSonsuz} \` İlerleme Yüzdesi :  \` ilerleme durumun **${atlamaBilgisi}** yapıyorsun.

${cyronixStaff} ${member.toString()}, **Görev İstatistiklerin Aşağıda Listeleniyor;**

${cyronixSonsuz} \` Görev Alma Tarihi :  \` Bulunamadı. 
${cyronixSonsuz} \` Görev Bitiş Tarih :  \` ${mtask.length ? mtask.filter((x) => x.active).map((x) => `**${moment.duration(x.finishDate - Date.now()).format("H [saat], m [dakika] s [saniye]")}**`).join("\n\n") : "Veri bulunamadı."}      
${cyronixSonsuz} \` Görev Puanı :  \` **20**
${cyronixSonsuz} \` Görev Türü :  \` ${mtask.length ? mtask.filter((x) => x.active).map((x) => `${x.message}`).join("\n\n") : "Veri bulunamadı."}
${cyronixSonsuz} \` Görev İlerleme :  \` ${mtask.length === 0 ? "Görev Seçmelisin !" : mtask.filter((x) => x.active).map((x) => `\n${x.completedCount >= x.count ? `${cyronixTik}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\``}`).join("\n\n")}

${cyronixStaff} ${member.toString()}, **Top Ses/Mesaj/Kamera/Yayın Sıralaması İstatistiklerin Aşağıda Listeleniyor;**

${cyronixSonsuz} \` Top Ses Sıralaması :  \` **${sıralama2}**
${cyronixSonsuz} \` Top Mesaj Sıralaması :  \` **${sıralama}**
${cyronixSonsuz} \` Top Yayın Sıralaması :  \` **${sıralama3}**
${cyronixSonsuz} \` Top Kamera Sıralaması :  \` **${sıralama4}**
`)

   

    let msg = await msj.edit({ embeds: [Ramal], components: [row] });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

    collector.on("collect", async (button) => {
      if(button.customId === "puan_detaylari") {
        await button.deferUpdate();

const puan = new EmbedBuilder()
.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.`) 

.addFields({ name:`${cyronixStar} **Puan Durumu:**`, value:`
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${cyronixStar} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds : [puan],
  components : [row]
})
      
      }

  if(button.customId === "ceza_puan_detaylari") {
    await button.deferUpdate();
    const ceza = new EmbedBuilder()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.addFields({ name:`${cyronixStar} **Ceza Kullanımı**`, value: `\`\`\`fix
( Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0} )\`\`\`
`, inline: false },
{ name:`${cyronixStar} **Ceza Puan Detayları:**`, value: `
${cyronixKalp} (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
${cyronixKalp} (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
${cyronixKalp} (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
${cyronixKalp} (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
`, inline: false },
{ name:`${cyronixStar} **Puan Durumu:**`, value: `
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${cyronixStar} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds: [ceza],
  components : [row]
})  
    }

      if(button.customId === "iptal_button") {
        await button.deferUpdate();
        const iptal = new EmbedBuilder()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.
`)

.addFields(
  { name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
  { name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
  { name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  )
  .addFields(
  { name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
  )
  
.addFields({ name:`${cyronixStar} **Sesli Sohbet İstatistiği**`, value:`
${cyronixKalp} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${cyronixKalp} Public Odalar: \`${await category(conf.publicParents)}\`
${cyronixKalp} Secret Odalar: \`${await category(conf.privateParents)}\`
${cyronixKalp} Alone Odalar: \`${await category(conf.aloneParents)}\`
${cyronixKalp} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${cyronixKalp} Kayıt Odaları: \`${await category(conf.registerParents)}\`
`, inline: false },
{ name:`${cyronixStar} **Mesaj İstatistiği**`, value:`
${cyronixKalp} Toplam: \`${messageData ? messageData.topStat : 0}\`
${cyronixKalp} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${cyronixKalp} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, inline: false });

   row.components[0].setDisabled(true) 
   row.components[1].setDisabled(true) 
   row.components[2].setDisabled(true)
   
    msg.edit({
      embeds: [iptal],
      components : [row]
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  
  const progressText = cyronixd2.repeat(progress);
  const emptyProgressText = cyronixb2.repeat(emptyProgress);
  
  return emptyProgress > 0 ? cyronixd1+progressText+emptyProgressText+cyronixb3 : cyronixd1+progressText+emptyProgressText+cyronixd3;
};
