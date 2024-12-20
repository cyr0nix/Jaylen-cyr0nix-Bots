const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const forceBans = require("../../../../src/schemas/forceBans");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { cyronixRed, cyronixTik, cyronixCeza, cyronixRevu, cyronixOk } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["forceban"],
    name: "forceban",
    help: "forceban <cyr0nix/ID>",
    category: "sahip",
    owner: true
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!args[0]) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(cyronixRed)
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(cyronixRed)
    return }
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: user.id });
    if (ban) {
    message.react(cyronixRed)
    message.channel.send({ content :"Bu üye zaten banlı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);
    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (member && !member.bannable) {
    message.react(cyronixRed)
    message.channel.send({ content :"Bu üyeyi banlayamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }

    if (allah.Main.dmMessages) user.send({ content :`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle **kalıcı olarak** banlandınız!`}).catch(() => {});

    message.guild.members.ban(user.id, { reason }).catch(() => {});
    await new forceBans({ guildID: message.guild.id, userID: user.id, staff: message.author.id }).save();
    const penal = await client.penalize(message.guild.id, user.id, "FORCE-BAN", true, message.author.id, reason);

    message.reply({ content :`${cyronixTik} ${member ? member.toString() : user.username} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **kalıcı olarak** banlandı! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    message.react(cyronixTik)

      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : user.username}** adlı kullanıcı **${message.author.tag}** tarafından banlandı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `<@${user.id}>`, inline: true },
        { name: "Cezalandıran",  value: `<@${message.author.id}>`, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

      message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [log]});
  },
};

