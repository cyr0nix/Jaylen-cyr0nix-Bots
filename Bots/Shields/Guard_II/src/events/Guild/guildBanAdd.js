const { AuditLogEvent } = require("discord.js");
const config = require("../../../../../../config.json"); // Config dosyası yolu
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const client = global.bot; // Bot client nesnesi
let BanLimit = {}; // Yasaklama sayacını tutacak obje

module.exports = async (member) => {
    const guild = member.guild;
    let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
    
    // Güvenlik kontrolleri
    if (!entry || entry.executor.bot || entry.executor.id === member.id) return;

    // Yapılandırma dosyasında belirtilen ban limiti kontrolü
    if (!BanLimit[entry.executor.id]) {
        BanLimit[entry.executor.id] = { count: 1, last: Date.now() };
    } else {
        BanLimit[entry.executor.id].count += 1;
        // Ban limiti aşılırsa
        if (BanLimit[entry.executor.id].count > config.Guard.Limit.Ban) {
            try {
                // Executor'u banla
                const executorMember = await guild.members.fetch(entry.executor.id);
                await executorMember.ban({ reason: "Ban limiti aşımı" });
                console.log(`${executorMember.user.tag} ban limiti aşımı nedeniyle banlandı.`);
            } catch (error) {
                console.error(`Executor banlanırken bir hata oluştu: ${error}`);
            }

            // Sayacı sıfırla
            BanLimit[entry.executor.id] = { count: 1, last: Date.now() };
        }
    }

    // Belirlenen süre sonunda sayacı sıfırla
    setTimeout(() => {
        if (BanLimit[entry.executor.id] && Date.now() - BanLimit[entry.executor.id].last >= 1000 * 60 * 3) {
            BanLimit[entry.executor.id] = { count: 1, last: Date.now() };
        }
    }, 1000 * 60 * 3); // 3 dakika
};

module.exports.conf = { name: "guildBanAdd" };
