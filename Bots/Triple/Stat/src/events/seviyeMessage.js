const { EmbedBuilder, Collection,AttachmentBuilder} = require("discord.js");
const canvafy = require("canvafy")
const Stat = require("../../../src/schemas/level");
const allah = require("../../../../../config.json");
const ayar = require("../../../src/configs/sunucuayar.json")
const client = global.bot;

module.exports = async (message) => {
  if (!message.guild) return
  if (message.author.bot) return;

    await client.checkLevel(message.author.id, allah.GuildID, "mesaj")
	let data = await Stat.findOne({ userID: message.author.id, guildID: allah.GuildID }) || { messageLevel: 0 };
	let siradakilevel = data.messageLevel * 643;

	if (siradakilevel < data.messageXP) {
	
	const levelUp = await new canvafy.LevelUp()
		.setAvatar(message.author.avatarURL({ forceStatic: true, extension: "png" }) || 'https://cdn.discordapp.com/embed/avatars/0.png')		
		.setBackground("image", "https://i.ibb.co/rtJGWWh/9147-dark-n-purple-sky-banner-pfpsgg.png")
		.setUsername(message.author.username)
		.setBorder(`#9a31e4`)
		.setAvatarBorder(`#f20eb9`)
		.setOverlayOpacity(0.7)
		.setLevels(data.messageLevel, data.messageLevel + 1)
		.build()

	await Stat.findOneAndUpdate({ guildID: allah.GuildID, userID: message.author.id }, { $set: {["messageXP"]: 0}, $inc: {["messageLevel"]: 1 }}, { upsert: true });
	message.channel.send({ content: `> **[** ${message.author} **]** kullanıcısı level atladı TEBRİKLER!`, files:  [{attachment: levelUp, name: `levelup-${message.member.id}.png`}] });
return }
	await levelMessageXP(message.author.id, message.channel.id, 1, message.channel.parentId || "nocategory");
};

async function levelMessageXP(id, channel, value, category) {
let randomMessageXP = [2, 4, 6, 8, 10, 12, 14, 16, 18].random();
await Stat.findOneAndUpdate({ guildID: allah.GuildID, userID: id }, { $inc: { messageXP: randomMessageXP } }, { upsert: true });
};

module.exports.conf = {
 name: "messageCreate",
};