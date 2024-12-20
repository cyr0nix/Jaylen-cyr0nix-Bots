const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Triple/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (member) => {
if (!member.user.bot) return;

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.BotAdd }).then(audit => audit.entries.first());
if (!entry || await client.checkPermission(client, entry.executor.id, "bot")) return;

let members = member.guild.members.cache.get(entry.executor.id); 

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
  .setCustomId("cezaac")
  .setDisabled(members.bannable ? false : true)
  .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
)

const ozi = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
.setDescription(`
${entry.executor} üyesi cyr0nix'dan izinsiz sunucuya bot ekledi ve yetkiliyi banlayıp, eklenen botu banladım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Bot: ${member.user} - \`${member.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let oziGuardLog = await member.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [ozi], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await oziGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
    button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
})
return; 
};

module.exports.conf = {
  name: "guildMemberAdd",
};