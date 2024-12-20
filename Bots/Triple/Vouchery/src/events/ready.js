const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const meetings = require("../../../src/schemas/meeting");
const schedule = require("node-schedule");
const emojis = require("../../../src/configs/emojis.json");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

let guild = client.guilds.cache.get(allah.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(allah.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

      let activities = allah.BotDurum, i = 0;
      setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
        type: ActivityType.Watching}), 10000);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: allah.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: allah.GuildID })
  newData2.save().catch(e => console.log(e))

  let MeetingData = await meetings.findOne({ guildID: allah.GuildID })
  if(!MeetingData) {await meetings.updateOne({guildID: allah.GuildID}, {$set: {Toplantı: false}}, {upsert: true})}

setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);

async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(allah.GuildID);
let ozi = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
   ozi.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};
};

module.exports.conf = {
  name: "ready",
};
