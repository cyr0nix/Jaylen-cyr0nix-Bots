const penals = require("../../../src/schemas/penals");
const { GuildMember, TextChannel, EmbedBuilder } = require("discord.js");
const client = global.bot;
const tasks = require("../../../src/schemas/task");
const SafeMember = require("../../../../Shields/src/Models/Safe");
const allah = require("../../../../../config.json");

module.exports = function (client) {
  
  client.checkPermission = async (bots, id, type) => {
    let member = client.guilds.cache.get(allah.GuildID).members.cache.get(id);
    let res = await SafeMember.findOne({
        guildID: allah.GuildID
    });

    if (!res) {
        res = {
            "Full": [],
            "RoleAndChannel": [],
            "Role": [],
            "Channel": [],
            "Bot": [],
            "BanAndKick": [],
            "ChatG": [],
            "SekmeG": []
        }
        await SafeMember.updateOne({
            guildID: allah.GuildID
        }, {}, {
            upsert: true,
            setDefaultsOnInsert: true
        }).exec()
    } else {
        if (allah.owners.some(uye => uye == member?member.id:false) || res.Full.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) {
            return true;
        }
        if (type == "full") {
            if (res.Full.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "role") {
            if (res.Role.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "roleandchannel") {
            if (res.RoleAndChannel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "channel") {
            if (res.Channel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
        } else if (type == "banandkick") {
            if (res.BanAndKick.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "bot") {
            if (res.Bot.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "chatguard") {
            if (res.ChatG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "sekmeguard") {
            if (res.SekmeG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } return false;
    }
  };
  
  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.bans.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  TextChannel.prototype.sendEmbed = function (embed) {
    if (!embed || !embed.description) return;
    const text = embed.description;
    for (var i = 0; i < Math.floor(text.length / 2048) + 1; i++) {
      this.send(embed.setDescription(text.slice(i * 2048, (i + 1) * 2048)));
    }
  };

  TextChannel.prototype.error = async function (message, text) {
    const ozi = await client.users.fetch("971307007728549918");
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setFooter({ text: "Jaylen & " + message.guild.name, iconURL: ozi.avatarURL({ dynamic: true })});
    this.send(embed.setDescription(text)).then((x) => { if (x.deletable) x.delete({ timeout: 10000 }); });
  };

  client.penalize = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
    let id = await penals.find({ guildID });
    id = id ? id.length + 1 : 1;
    return await new penals({ id, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
  };

  GuildMember.prototype.hasRole = function (role, every = true) {
    return (Array.isArray(role) && (every && role.every((x) => this.roles.cache.has(x)) || !every && role.some((x) => this.roles.cache.has(x))) || !Array.isArray(role) && this.roles.cache.has(role))
  };

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};

GuildMember.prototype.updateTask = async function (guildID, type, data, channel = null) {
  const coins = require('../../../src/schemas/coin')
  const taskData = await tasks.find({ guildID, userID: this.user.id, type, active: true });
  taskData.forEach(async (x) => {
    if (channel && x.channels && x.channels.some((x) => x !== channel.id)) return; x.completedCount += data;
    if (x.completedCount >= x.count) {
      x.active = false; x.completed = true;
      await coins.updateOne({ guildID, userID: this.user.id }, { $inc: { coin: x.prizeCount } }, { upsert: true })
      const guilds = client.guilds.cache.get(guildID)
guilds.channels.cache.find(x => x.name == 'görev_tamamlama').send({content: `${this.toString()} Tebrikler! ${type.charAt(0).toLocaleUpperCase() + type.slice(1)} görevini başarılı bir şekilde tamamladın!\n\nGörev: ${x.message}\nKazanılan Puan : **${x.prizeCount}**`})
    }
    await x.save();
  });
};