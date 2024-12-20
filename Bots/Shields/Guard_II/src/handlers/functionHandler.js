const { GuildMember, TextChannel, EmbedBuilder, WebhookClient, ChannelType, PermissionsBitField } = require("discord.js");
const RoleModel = require("../../../src/Models/Role");
const SafeMember = require("../../../src/Models/Safe");
const CategoryChannels = require("../../../src/Models/CategoryChannels");
const TextChannels = require("../../../src/Models/TextChannels");
const VoiceChannels = require("../../../src/Models/VoiceChannels");
const client = global.bot;
const allah = require("../../../../../config.json");
const setup = require('./../../../../Triple/src/configs/sunucuayar.json');
const request = require("request");

module.exports = function (client) {

    const { Client } = require('discord.js-selfbot-v13');
    const tacuserX = new Client({ checkUpdate: false });
    
    if (allah.Guard.Token.TaçHesapToken.length > 0) {
        tacuserX.on('ready', async () => {
          console.log(`${tacuserX.user.username} isimli Taç Guard Aktif!`);
        });
        tacuserX.login(allah.Guard.Token.TaçHesapToken)  
    }

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

  client.cezaVer = async (test, kisiID, tur) => {
    let MEMBER = test.guilds.cache.get(allah.GuildID).members.cache.get(kisiID)
    if (!MEMBER) return;
    if (tur == "jail") return MEMBER.roles.cache.has(setup.boosterRolu) ? MEMBER.roles.set([setup.boosterRolu, setup.jailRole[0]]) : MEMBER.roles.set(setup.jailRole).catch(() => {if (allah.Guard.Token.TaçHesapToken.length > 0) {client.taccezaVer(MEMBER.user.id, "tjail")}})
    if (tur == "ban") return MEMBER.ban({ reason: "Guard Sistem Koruma" }).catch(() => {if (allah.Guard.Token.TaçHesapToken.length > 0) {client.taccezaVer(MEMBER.user.id, "tban")}})
    if (tur == "kick") return MEMBER.kick().catch(() => {if (allah.Guard.Token.TaçHesapToken.length > 0) {client.taccezaVer(MEMBER.user.id, "tkick")}})
    };
    
  client.taccezaVer = async (kisiID, tur) => {
    tacuserX.guilds.cache.get(allah.GuildID).members.fetch().then(async (x) => {
    let MEMBER = tacuserX.guilds.cache.get(allah.GuildID).members.cache.get(kisiID)
    if (!MEMBER) return;
    if (tur == "tjail") return MEMBER.roles.cache.has(setup.boosterRolu) ? MEMBER.roles.set([setup.boosterRolu, setup.jailRole[0]]) : MEMBER.roles.set(setup.jailRole);
    if (tur == "tban") return MEMBER.ban({ reason: "Taç Guard Sistem Koruma" });
    if (tur == "tkick") return MEMBER.kick();
    })
    };
};
