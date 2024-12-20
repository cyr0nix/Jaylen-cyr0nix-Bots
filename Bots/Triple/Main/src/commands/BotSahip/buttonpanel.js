const Discord = require("discord.js");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../../src/schemas/inviteMember");
const nameData = require("../../../../src/schemas/names")
const allah = require("../../../../../../config.json");
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { cyronixSonsuz, cyronixStar, cyronix1, cyronix2, cyronix3, cyronix4, cyronix5, cyronix6, cyronix7, cyronix8, cyronix9 } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    help: "buttonpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    const buttons1 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('I')
          .setEmoji('1️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('II')
          .setEmoji('2️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('III')
          .setEmoji('3️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('IV')
          .setEmoji('4️⃣')
          .setStyle(Discord.ButtonStyle.Secondary)
      );
    const buttons2 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
          .setCustomId('VI')
          .setEmoji('5️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('VII')
          .setEmoji('6️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('VIII')
          .setEmoji('7️⃣')
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('IX')
          .setEmoji('8️⃣')
          .setStyle(Discord.ButtonStyle.Secondary)
        )

message.channel.send({ content:`Merhaba \`${message.guild.name}\` sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olucaktır!\n\n**1:** \`Sunucuya giriş tarihinizi öğrenin.\`\n**2:** \`Üstünüzde bulunan rollerin listesini alın.\`\n**3:** \`Hesabınızın açılış tarihini öğrenin.\`\n**4:** \`Davet bilgilerinizi öğrenin.\`\n\n**5:** \`Sunucunun anlık aktif listesini görüntüleyin.\`\n**6:** \`Sunucudaki eski isim bilgilerinizi görüntüleyin.\`\n**7:** \`Sunucudaki toplam mesaj sayınızı öğrenin.\`\n**8:** \`Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\`\n`,components: [buttons1,buttons2]})
  },
};
client.on('interactionCreate', async interaction => {
const tagges = ayarlar.tag || [];

const member = interaction.user;
const inviterData = await inviterSchema.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
const total = inviterData ? inviterData.total : 0;
const regular = inviterData ? inviterData.regular : 0;
const bonus = inviterData ? inviterData.bonus : 0;
const leave = inviterData ? inviterData.leave : 0;
const fake = inviterData ? inviterData.fake : 0;
const invMember = await inviteMemberSchema.find({ guildID: allah.GuildID, inviter: interaction.user.id });
const daily = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
const weekly = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
const tagged = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && tagges.includes(tag => m.user.tag.includes(tag))).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

const data = await nameData.findOne({ guildID: allah.GuildID, userID: member.id });

////////////////////////////////////////////////////////////////////////////////////////////

const messageData = await messageUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
const voiceData = await voiceUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });

  const messageWeekly = messageData ? messageData.weeklyStat : 0;
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
  const messageDaily = messageData ? messageData.dailyStat : 0;
  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

////////////////////////////////////////////////////////////////////////////////////////////

const category = async (parentsArray) => {
  const data = await voiceUserParent.find({ guildID: allah.GuildID, userID: member.id });
  const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
  let voiceStat = 0;
  for (var i = 0; i <= voiceUserParentData.length; i++) {
    voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
  }
  return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
};

////////////////////////////////////////////////////////////////////////////////////////////

if(interaction.customId === "I")
{
await interaction.reply({ content: `Sunucuya Katılma Tarihiniz : <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>`, ephemeral: true });
}

if(interaction.customId === "II")
{
await interaction.reply({ content: `Üzerinde Bulunan Rollerin Listesi ;
        
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true });
}

if(interaction.customId === "III")
{
await interaction.reply({ content: `Hesabınızın Açılış Tarihi :  <t:${Math.floor(member.createdTimestamp / 1000)}:R>`, ephemeral: true });
}

if(interaction.customId === "IV")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam invite bilgileri aşağıda belirtilmiştir.
Toplam **${regular}** davet.

${cyronixSonsuz} \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
${cyronixSonsuz} \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`, ephemeral: true });
}

if(interaction.customId === "VI")
{
await interaction.reply({ content: `
${cyronixSonsuz} Sesli kanallardaki üye sayısı : \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
${cyronixSonsuz} Sunucudaki toplam üye sayısı : \`${(interaction.guild.memberCount)}\`
${cyronixSonsuz} Sunucunun oluşturulma tarihi: \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
${cyronixSonsuz} Sunucu destek numarası : \`${(interaction.guild.id)}\`
`, ephemeral: true });
}

if(interaction.customId === "VII")
{
const ambed = new Discord.EmbedBuilder()
.setAuthor({ name: `${member.username} üyesinin isim bilgileri;`})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")         
await interaction.reply({ embeds: [ambed], ephemeral: true });
}

if(interaction.customId === "VIII")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.

${cyronixStar} **Mesaj İstatistiği**
${cyronixSonsuz} Toplam: \`${messageData ? messageData.topStat : 0}\`

${cyronixSonsuz} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${cyronixSonsuz} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, ephemeral: true });
}

if(interaction.customId === "IX")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.

${cyronixStar} **Sesli Sohbet İstatistiği**
${cyronixSonsuz} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

${cyronixSonsuz} Haftalık Ses: \`${voiceWeekly}\`
${cyronixSonsuz} Günlük Ses: \`${voiceDaily}\`
`, ephemeral: true });
}

})