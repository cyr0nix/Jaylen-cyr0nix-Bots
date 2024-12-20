const moment = require("moment");
moment.locale("tr");
const conf = require("../../../src/configs/sunucuayar.json");
const { EmbedBuilder,ChannelType } = require("discord.js");
const client = global.bot;

module.exports = async (oldMessage, newMessage) => {
  if (!newMessage.member) return;
  if (newMessage.channel.type != ChannelType.DM) return;
  if (newMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;
  if (oldMessage.content == null) return;
  const channel = client.channels.cache.find(x => x.name == "message_log");
  if (!channel) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: newMessage.member.displayName, iconURL: newMessage.author.avatarURL({ dynamic: true })})
    .setTitle(`${newMessage.channel} adlı kanalda bir mesaj düzenlendi!`)
    .setDescription(`**İlk Hali:**\n\`\`\`\n${oldMessage.content}\n\`\`\`\n**Düzenlenen Hali:**\n\`\`\`\n${newMessage.content}\n\`\`\``)
    .setFooter({ text: `ID: ${newMessage.author.id} • ${moment().add(3, "hours").calendar()}`});

  if (newMessage.attachments.first()) embed.setImage(newMessage.attachments.first().proxyURL);
  channel.send({ embeds: [embed] }); // .send() yerine .send() kullanıldı, eğer .send özel bir metod ise buna göre değiştirin.
};


module.exports.conf = {
  name: "messageUpdate",
};
