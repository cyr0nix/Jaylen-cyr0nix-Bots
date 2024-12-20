const { Client, Collection } = require("discord.js");
const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
}); 
const Discord = require('discord.js');
const { Database } = require("ark.db");
const ozidb = (global.ozisetupxd = new Database("../src/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("../src/configs/emojis.json"));
const rankdb = (global.rankdb = new Database("../src/configs/ranks.json"));
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
const allah = require("../../../config.json");
const conf = require("../src/configs/sunucuayar.json")

require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);


client
  .login(allah.Main.StatsToken)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


////
let stats = require("../src/schemas/level");

let ses3 = {
  Voice: "🔊Voice🥉",
  VoiceColor: "#fa795b",
  sesLevel: 3,
  sesRole: `${conf.VoiceLevel1}`
}
let ses2 = {
  Voice: "🔊Voice🥈",
  VoiceColor: "#cfcbcb",
  sesLevel: 8,
  sesRole: `${conf.VoiceLevel2}`
}
let ses1 = {
  Voice: "🔊Voice🥇",
  VoiceColor: "#fffb00",
  sesLevel: 20,
  sesRole: `${conf.VoiceLevel3}`
}
let ses = {
  Voice: "🔊Voice🏆",
  VoiceColor: "#23fafa",
  sesLevel: 50,
  sesRole: `${conf.VoiceLevel4}`
}
let mesaj3 = {
  Chat: "💬Chat🥉",
  ChatColor: "#fa795b",
  chatLevel: 2,
  chatRole: `${conf.ChatLevel1}`
}
let mesaj2 = {
  Chat: "💬Chat🥈",
  ChatColor: "#cfcbcb",
  chatLevel: 5,
  chatRole: `${conf.ChatLevel2}`
}
let mesaj1 = {
  Chat: "💬Chat🥇",
  ChatColor: "#fffb00",
  chatLevel: 35,
  chatRole: `${conf.ChatLevel3}`
}
let mesaj = {
  Chat: "💬Chat🏆",
  ChatColor: "#23fafa",
  chatLevel: 70,
  chatRole: `${conf.ChatLevel4}`
}

client.checkLevel = async function (userID, guildID, type) {
  if (allah.Main.LevelSystem == false) return;
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  let kontrol = await stats.findOne({ userID: userID, guildID: guildID });
  if (!kontrol) return;
  const channel = client.channels.cache.find(x => x.name == `${conf.LevelUpChannelName}`);
  let member = client.guilds.cache.get(allah.GuildID).members.cache.get(userID)

    if (type === "mesaj") {
      if (kontrol.messageLevel >= mesaj.chatLevel) {
        if (kontrol.autoRankup.includes(mesaj.Chat)) return;
        member.roles.remove(mesaj1.chatRole).catch(err => {})
        member.roles.add(mesaj.chatRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: mesaj.Chat }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${mesaj.Chat}"** rolüne terfi edildin!`})
      } else if (kontrol.messageLevel >= mesaj1.chatLevel) {
        if (kontrol.autoRankup.includes(mesaj1.Chat)) return;
        member.roles.remove(mesaj2.chatRole).catch(err => {})
        member.roles.add(mesaj1.chatRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: mesaj1.Chat }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${mesaj1.Chat}"** rolüne terfi edildin!`})
      } else if (kontrol.messageLevel >= mesaj2.chatLevel) {
        if (kontrol.autoRankup.includes(mesaj2.Chat)) return;
        member.roles.remove(mesaj3.chatRole).catch(err => {})
        member.roles.add(mesaj2.chatRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: mesaj2.Chat }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${mesaj2.Chat}"** rolüne terfi edildin!`})
      } else if (kontrol.messageLevel >= mesaj3.chatLevel) {
        if (kontrol.autoRankup.includes(mesaj3.Chat)) return;
        member.roles.add(mesaj3.chatRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: mesaj3.Chat }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${mesaj3.Chat}"** rolüne terfi edildin!`})
      }
    };
    if (type === "ses") {
      if (kontrol.voiceLevel >= ses.sesLevel) {
        if (kontrol.autoRankup.includes(ses.Voice)) return;
        member.roles.remove(ses1.sesRole).catch(err => {})
        member.roles.add(ses.sesRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: ses.Voice }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${ses.Voice}"** rolüne terfi edildin!`})
      } else if (kontrol.voiceLevel >= ses1.sesLevel) {
        if (kontrol.autoRankup.includes(ses1.Voice)) return;
        member.roles.remove(ses2.sesRole).catch(err => {})
        member.roles.add(ses1.sesRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: ses1.Voice }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${ses1.Voice}"** rolüne terfi edildin!`})
      } else if (kontrol.voiceLevel >= ses2.sesLevel) {
        if (kontrol.autoRankup.includes(ses2.Voice)) return;
        member.roles.remove(ses3.sesRole).catch(err => {})
        member.roles.add(ses2.sesRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: ses2.Voice }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${ses2.Voice}"** rolüne terfi edildin!`})
      } else if (kontrol.voiceLevel >= ses3.sesLevel) {
        if (kontrol.autoRankup.includes(ses3.Voice)) return;
        member.roles.add(ses3.sesRole)
        stats.updateOne({ userID: userID, guildID: guildID }, {$push: { autoRankup: ses3.Voice }}, {upsert: true}).exec()
        channel.send({ content: `:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${ses3.Voice}"** rolüne terfi edildin!`})
      }
    };
};