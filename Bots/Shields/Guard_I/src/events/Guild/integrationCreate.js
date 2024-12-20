const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Triple/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (guild) => {
let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.IntegrationCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "bot")) return;

let member = guild.members.cache.get(entry.executor.id); 

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
  .setCustomId("cezaac")
  .setDisabled(conf.jailRole.some(x => member.roles.cache.has(x)) ? true : false)
  .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
)

const ozi = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
.setDescription(`
${entry.executor} üyesi izinsiz entegrasyon oluşturdu, entegrasyon sildim.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let oziGuardLog = await guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [ozi], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await oziGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin jailini kaldırdın!`, ephemeral: true })
  }
})

};

module.exports.conf = {
  name: "guildIntegrationsUpdate",
};