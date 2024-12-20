const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const schedule = require("node-schedule");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const emojis = require("../../../src/configs/emojis.json");
const coin = require("../../../src/schemas/coin");
const db = require("croxydb");
const tasks = require("../../../src/schemas/task");
const premium = require("../../../src/schemas/premium");
const { EmbedBuilder, ActivityType, ChannelType } = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
module.exports = async () => {

  let guild = client.guilds.cache.get(allah.GuildID);
  await guild.members.fetch();

  const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

  const connection = getVoiceConnection(allah.GuildID);
  if (connection) return;
  setInterval(async () => {
    const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
    if (VoiceChannel) {
      joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
      })
    }
  },
    5000);

  let activities = allah.BotDurum, i = 0;
  setInterval(() => client.user.setActivity({
    name: `${activities[i++ % activities.length]}`,
    type: ActivityType.Watching
  }), 10000);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const job = schedule.scheduleJob('0 0 21 * * *', function () {
    const questions = db.get('questions') || [];
    if (questions.length > 0) {
      const questionIndex = Math.floor(Math.random() * questions.length);
      const question = questions[questionIndex];
      const channelId = `1233573313360564285`;
      const channel = client.channels.cache.get(channelId);

      if (channel && channel.type === ChannelType.GuildText) {
        channel.send(`# ${allah.GuildName} Ailesi Günün Sorusu ${emojis.cyronixCekilis} \n> \n> **${question}** \n> --------------------------------------------------------------------------------------------------------------- \n > *(Not:) Hakaret, Küfür, Troll amacı ile yapılan yanıtlar silinecektir ve kanaldan uzaklaştırma almanıza sebep olacaktır.!* ${emojis.cyronixCeza} \n> \n> *Yanıtlarınızı Bekliyorum.* ${emojis.cyronixRevu} \n> \n> *Hepinize Keyifli Vakitler Dilerimm.* ${emojis.cyronixSaat} \n\n ||<@1216834493999087707>||`);
        questions.splice(questionIndex, 1);
        db.set('questions', questions);
      } else {

        const channelId = `1220139875836366849`;
        const channel = client.channels.cache.get(channelId);
        if (channel && channel.type === ChannelType.GuildText) {
          channel.send('Alooo Yetkililer soru yok soru naptınız lan soru ekleyin bugün gg :D ||@everyone||');
        }
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  schedule.scheduleJob("* * * * *", async () => {
    client.guilds.cache.forEach(async (guild) => {
      const data = await tasks.find({ guildId: guild.id, active: true, finishDate: { $lte: Date.now() } });
      if (!data) return;
      await tasks.updateMany({ guildId: guild.id, active: true, finishDate: { $lte: Date.now() } }, { active: false });
    });
  });

  setInterval(async () => {
    const guild = client.guilds.cache.get(allah.GuildID);
    if (!guild) return;
    const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
    finishedPenals.forEach(async (x) => {
      const member = guild.members.cache.get(x.userID);
      if (!member) return;
      if (x.type === "CHAT-MUTE") {
        x.active = false;
        await x.save();
        await member.roles.remove(conf.chatMute);
        client.channels.cache.get(conf.cmuteLogChannel).send({
          embeds: [
            new EmbedBuilder()
              .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Chat-Mute** cezası süresi bittiği için kaldırıldı.`)
              .addFields(
                { name: "Affedilen", value: `<@${member.user.id}>`, inline: true },
                { name: "Ceza Bitiş", value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
              )
              .setFooter({ text: `${moment(Date.now()).format("LLL")}` })]
        });
      }
      if (x.type === "TEMP-JAIL") {
        x.active = false;
        await x.save();
        await member.setRoles(conf.unregRoles);
        client.channels.cache.get(conf.jailLogChannel).send({
          embeds: [
            new EmbedBuilder()
              .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Jail** cezası süresi bittiği için kaldırıldı.`)
              .addFields(
                { name: "Affedilen", value: `<@${member.user.id}>`, inline: true },
                { name: "Ceza Bitiş", value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
              )
              .setFooter({ text: `${moment(Date.now()).format("LLL")}` })]
        });
      }
      if (x.type === "VOICE-MUTE") {
        if (member.voice.channelId) {
          x.removed = true;
          await x.save();
          if (member.voice.serverMute) member.voice.setMute(false);
        }
        x.active = false;
        await x.save();
        member.roles.remove(conf.voiceMute);
        client.channels.cache.get(conf.vmuteLogChannel).send({
          embeds: [
            new EmbedBuilder()
              .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Voice-Mute** cezası süresi bittiği için kaldırıldı.`)
              .addFields(
                { name: "Affedilen", value: `<@${member.user.id}>`, inline: true },
                { name: "Ceza Bitiş", value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
              )
              .setFooter({ text: `${moment(Date.now()).format("LLL")}` })]
        });
      }
    });

    const activePenals = await penals.find({ guildID: guild.id, active: true });
    activePenals.forEach(async (x) => {
      const member = guild.members.cache.get(x.userID);
      if (!member) return;
      if (x.type === "CHAT-MUTE" && !conf.chatMute.some((x) => member.roles.cache.has(x))) return member.roles.add(conf.chatMute);
      if ((x.type === "UNDERWORLD") && !conf.doomRole.some((x) => member.roles.cache.has(x))) return member.setRoles(conf.doomRole);
      if ((x.type === "JAIL" || x.type === "TEMP-JAIL") && !conf.jailRole.some((x) => member.roles.cache.has(x))) return member.setRoles(conf.jailRole);
      if (x.type === "VOICE-MUTE") {
        if (!conf.voiceMute.some((x) => member.roles.cache.has(x))) member.roles.add(conf.voiceMute);
        if (member.voice.channelId && !member.voice.serverMute) member.voice.setMute(true);
      }
    });
  }, 750);

  setInterval(checkPremiumStatus, 1500)
};

module.exports.conf = {
  name: "ready",
};

async function checkPremiumStatus() {
  const now = new Date();
  const expiredUsers = await premium.find({ finishDate: { $lt: now } });

  for (const user of expiredUsers) {
    const guild = client.guilds.cache.get(allah.GuildID);
    if (guild) {
      const member = guild.members.cache.get(user.userId);
      if (member) {
        const premiumRole = guild.roles.cache.get(conf.premium);
        if (premiumRole) {
          await member.roles.remove(premiumRole);
        }
        await client.channels.cache.get('1260232134153732306').send(`${member} Premium üyeliğiniz sona erdi.`);
      }
    }
  }

  await premium.deleteMany({ finishDate: { $lt: now } });
}
