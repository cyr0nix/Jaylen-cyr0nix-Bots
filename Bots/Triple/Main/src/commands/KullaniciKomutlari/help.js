const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const emoji = require("../../../../src/configs/emojis.json")
const { cyronixTik, cyronixRed } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım"],
    name: "yardım",
  },
 
  run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    
    let command = args[0]
    if (client.commands.has(command)) {
    command = client.commands.get(command)
    message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})) .setDescription(`
    ${cyronixTik} Belirttiğin komuta ait bilgiler aşağıda verilmiştir!
    
    \`Komut Adı\`**:** ${command.conf.name}
    \`Komut Kullanımı:\`**:** ${command.conf.help}
    \`Komut Alternatifleri:\`**:** ${command.conf.aliases[0] ? command.conf.aliases.join(', ') : `Alternatif bulunmuyor!`}`)]})
      return;
    }

    const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('yardım')
        .setPlaceholder('Yardım kategorisini listeden seçin!')
        .addOptions([
          {
            label: 'Kullanıcı Komutları',
            description: 'Kullanıcı Komutlar',
            value: 'kullanıcı',
          },			
          {
            label: 'Kayıt Komutları',
            description: 'Kayıt Komutlar',
            value: 'reg',
          },
          {
            label: 'Cezalandırma Komutları',
            description: 'Cezalandırma Komutlar',
            value: 'ceza',
          },
          {
            label: 'Stat Komutları',
            description: 'Stat Komutlar',
            value: 'stats',
          },
          {
            label: 'Yetkili Komutları',
            description: 'Yetkili Komutlar',
            value: 'yt',
          },
          {
            label: 'Kurucu Komutları',
            description: 'Kurucu Komutlar',
            value: 'owner',
          },
          {
            label: 'cyr0nix Komutları',
            description: 'cyr0nix Komutlar',
            value: 'botsahip',
          },
        ]),
    );

let msg = await message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`Aşağıda sunucudaki komutlar sıralandırılmıştır. Toplam \`${client.commands.size}\` tane komut kullanılabilir. Komut bilgisini detaylı öğrenmek için \`.yardım <Komut Ismi>\` komutu ile komutun detaylı bilgilerini görebilirsin.`)], components: [row] })

var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
    if(menu.values[0] === "kullanıcı") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kullanıcı").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "reg") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kayıt").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "market") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "market").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "ceza") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "cezalandırma").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "stats") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "stat").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "yt") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yetkili").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "owner") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yönetim").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "botsahip") {
      await menu.deferUpdate();
      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "sahip").map(x => `\` ${prefix}${x.conf.help} \``).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
})
} 
}