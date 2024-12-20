const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Triple/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let BanLimit = {};
module.exports = async (member) => {

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (entry.executor.id === member.id) return;

let members = member.guild.members.cache.get(entry.executor.id); 

const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(members.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
  )

let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > allah.Guard.Limit.Ban) {
    if (victimMember) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now() 
        }
    }
    BanLimit[entry.executor.id].Now += 1;

const ozi = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi **${allah.Guard.Limit.Ban}** Ban limitini anasını çükt ıhm geçtiği için kendisi banlandı ve banlanan üyenin banı kaldırıldı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
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
} else if (!BanLimit[entry.executor.id]) {
    BanLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };

const ozi = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${1}/${allah.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return member.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [ozi] });
} else {
    BanLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);

const ozi = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${BanLimit[entry.executor.id].Now}/${allah.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return member.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [ozi] });
}
};

module.exports.conf = {
  name: "guildBanAdd",
};