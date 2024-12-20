const { scheduleJob } = require("node-schedule");
const client = global.bot;
const messageUser = require("../../../src/schemas/messageUser");
const voiceUser = require("../../../src/schemas/voiceUser");
const messageGuild = require("../../../src/schemas/messageGuild");
const voiceGuild = require("../../../src/schemas/voiceGuild");
const streamerStat = require("../../../src/schemas/StreamerStat");
const cameraStat = require("../../../src/schemas/CameraStat");

const gorev = require("../../../src/schemas/invite");
const kayitg = require("../../../src/schemas/kayitgorev");
const mesaj = require("../../../src/schemas/mesajgorev");
const tagli = require("../../../src/schemas/taggorev");
const allah = require("../../../../../config.json");

module.exports = () => {

  const daily = new scheduleJob("0 0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { dailyStat: 0 } });
      await streamerStat.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { DailyStat: 0 } }, { upsert: true });
      await cameraStat.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { DailyStat: 0 } }, { upsert: true });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
          });
 });
  });

  const weekly = new scheduleJob("0 0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { weeklyStat: 0 } });
      await streamerStat.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { WeeklyStat: 0 } }, { upsert: true });
      await cameraStat.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { WeeklyStat: 0 } }, { upsert: true });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
        });
 });
  });

  const twoweekly = new scheduleJob("0 0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { twoWeeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: allah.GuildID }, { $set: { twoWeeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { twoWeeklyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $set: { twoWeeklyStat: 0 } }, { upsert: true });
        });
 });
  });

};

module.exports.conf = {
  name: "ready"
};
