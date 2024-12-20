const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser, hyperlink, PermissionsBitField, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixKalp,cyronixSonsuz,cyronixCeza, cyronixRed} = require("../../../../src/configs/emojis.json");

// Kullanıcıların son kullanım zamanlarını tutan bir nesne
const lastUsed = new Map();

module.exports = {
  conf: {
    aliases: ["sorun"],
    name: "sorun",
    help: "sorun",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
    if(!["sorun"].some(bes => message.channel.name.includes(bes))) {
        return message.channel.send({ content: `> **sorun Komutunu Sadece <#1233722207440474153> Kanalında Kullanabilirsin!**` })
            .then((e) => setTimeout(() => { e.delete(); }, 10000));
    }

    const cooldownAmount = 30 * 60 * 1000; // 30 dakika
    const lastTimestamp = lastUsed.get(message.author.id);
    const now = Date.now();

    if (lastTimestamp && (now - lastTimestamp) < cooldownAmount) {
        const endCooldown = Math.floor((lastTimestamp + cooldownAmount) / 1000);
        return message.channel.send(`> ${cyronixRed} **Bu komutu tekrar kullanabilmek için <t:${endCooldown}:R> beklemelisin!**`);
    }

    // Kullanıcının son kullanım zamanını güncelle
    lastUsed.set(message.author.id, now);

    // Komut işlemleri burada yapılır
    await message.channel.send(`> <@&${conf.sorunçözücüRole}> \n En yakın sürede sorun çözme yetklilerimiz sizinle ilgilenecektir.`);
  }
}
