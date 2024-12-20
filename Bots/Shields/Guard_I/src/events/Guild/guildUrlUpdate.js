const {Events,AuditLogEvent} = require('discord.js');
const { VanityClient } = require('discord-url');
const {serverUrl,sahipRolu} = require('../../../../../Triple/src/configs/sunucuayar.json');
const {GuildID,UrlGuardToken,owners} = require('../../../../../../config.json')
const urlClient = new VanityClient(UrlGuardToken, GuildID, true);

module.exports = async (oldGuild, newGuild) => {
    let logs = await newGuild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.GuildUpdate });
    let entry = logs.entries.first();
    
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        if (!entry || entry.executor.bot) return;

        let member = newGuild.members.cache.get(entry.executor.id);

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("cezaac")
            .setDisabled(member.bannable ? false : true)
            .setLabel("Ceza Kaldır")
            .setStyle(ButtonStyle.Danger)
        );
      
        const ozi = new EmbedBuilder()
          .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
          .setDescription(`
            ${entry.executor} adlı yetkili URL'yi Elledi ve sunucudan banlayıp urlyi spamladım.
            ─────────────────────
            Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
            ─────────────────────
            Tarih: \`${moment(Date.now()).format("LLL")}\`
          `);
          urlClient.setVanityURL(serverUrl).catch(err=>{});
          let oziGuardLog = await newGuild.channels.cache.find(x => x.name == "guard_log").send({ content: "@here", embeds: [ozi], components: [row] });

          var filter = (button) => sahipRolu.some(x => x == button.member.roles.cache.has(x)) || owners.includes(button.user.id);
          const collector = await oziGuardLog.createMessageComponentCollector({ filter });
        
          collector.on('collect', async (button) => {
            if (button.customId == "cezaac") {
              button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`);
              button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true });
            }
          });
          return;
        };        
};

urlClient.on("VanitySuccess", async (response) => { log(`${response.vanityURL} URL'si Başarıyla Alındı`) })
urlClient.on('VanityError', async (error) => { log(`URL Alınırken Bir Hata Meydana Geldi!!\nHata; ${error.error}`); })

module.exports.conf = {
    name: "guildUpdate"
  };
  
