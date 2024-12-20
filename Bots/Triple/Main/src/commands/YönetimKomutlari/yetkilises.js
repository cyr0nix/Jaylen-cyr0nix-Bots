const conf = require("../../../../src/configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const { cyronixRed } = require("../../../../src/configs/emojis.json")
let table = require("string-table");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const { MessageEmbed, PermissionsBitField } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay",
    category: "yönetim",
  },

  run: async (client, message, args, embed, durum) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name))
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.guild) return;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(cyronixRed)

    const sec = args[0];

    if (sec) {
      if (!client.guilds.cache.get(allah.GuildID).roles.cache.get(sec)) {
        return message.reply({ content: ":x: Sunucuda belirttiğiniz rol bulunmamaktadır. Lütfen Kontrol Ediniz.", ephemeral: true });
      }

      let roleMembers = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec));
      var ToplamYetkili = roleMembers.size;
      var SesteOlanYetkili = roleMembers.filter(yetkilises => yetkilises.voice.channel).size;
      var AktifYetkili = roleMembers.filter(yetkili => yetkili.presence && yetkili.presence.status !== "offline").size;
      let SesteOlmayanYetkili = roleMembers.filter(yetkili => !yetkili.voice.channel && yetkili.presence && yetkili.presence.status != "offline").size;

      let ozi = roleMembers.filter(yetkili => !yetkili.voice.channel && yetkili.presence && yetkili.presence.status != "offline");

      let tablo = [{
        "TOPLAM": `${ToplamYetkili} kişi`,
        "AKTİF": `${AktifYetkili} kişi`,
        "SESTE": `${SesteOlanYetkili} kişi`,
        "SESTE OLMAYAN": `${SesteOlmayanYetkili} kişi`
      }];

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n${ozi.map(yetkili => `${yetkili}`).join(', ')}\n`});
      message.channel.send(`${ozi.map(yetkili => `<@${yetkili.id}>`).join(', ')} bu kullanıcılar aktif ancak seste değiller.`);
    } else {
      var role = conf.staffs[0];
      let roleMembers = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(role));
      var ToplamYetkili = roleMembers.size;
      var SesteOlanYetkili = roleMembers.filter(yetkilises => yetkilises.voice.channel).size;
      var AktifYetkili = roleMembers.filter(yetkili => yetkili.presence && yetkili.presence.status !== "offline").size;
      let SesteOlmayanYetkili = roleMembers.filter(yetkili => !yetkili.voice.channel && yetkili.presence && yetkili.presence.status != "offline").size;
      const nonVoiceActiveMembers = roleMembers.filter(member => !member.voice.channel);

      let ozi = roleMembers.filter(yetkili => !yetkili.voice.channel && yetkili.presence && yetkili.presence.status != "offline");

      let tablo = [{
        "TOPLAM": `${ToplamYetkili} kişi`,
        "AKTİF": `${AktifYetkili} kişi`,
        "SESTE": `${SesteOlanYetkili} kişi`,
        "SESTE OLMAYAN": `${SesteOlmayanYetkili} kişi`
      }];

      const mentions = nonVoiceActiveMembers.map(member => `<@${member.id}>`).join(', ');

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n${ozi.map(yetkili => `${yetkili}`).join(', ')}\n`});
      message.channel.send({ content: `Şu an aktif olmayan yetkililer: ${mentions}` });
    }
  }
}
