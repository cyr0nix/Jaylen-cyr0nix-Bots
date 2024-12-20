const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json")
const emoji = require("../../../../src/configs/emojis.json");
const allah = require("../../../../../../config.json");
const yetkili = require("../../../../src/schemas/yetkis");
module.exports = {
    conf: {
      aliases: ["yetkiçek","yetkinisikim"],
      name: "yetki-çek",
      help: "yetki-çek",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
        let kanallar = ayar.KomutKullanımKanalİsim;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
        if (!message.guild) return;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) {
        message.react(cyronixRed)
        message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        return }
        if (!args[0]) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        message.react(cyronixRed)
        return }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        message.react(cyronixRed)
        return }
        const yetkikontrol = await yetkili.findOne({ userID: member.id, guildID: message.guild.id });
        if (!yetkikontrol || yetkikontrol.yetkis.length === 0) {
            message.react(emoji.cyronixRed)
            return message.channel.send({ content: "Bu kullanıcının zaten yetkisi bulunmuyor!" }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }

        const embed2 = new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("2f3136")
        .setDescription(`${member} adlı kullanıcının yetkisini almak istiyor musunuz?\n\n Aşağıdaki Butonları Kullanarak İşleminizi Gerçekleştirin!`)
        .setFooter({ text: `${allah.AltBaşlık}` })

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("onay")
            .setLabel("Kabul Et")
            .setEmoji('1213638247918346350')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId("red")
            .setLabel("Reddet")
            .setEmoji('1213638200413782077')
            .setStyle(ButtonStyle.Danger),
        );

        const yetkicekmk = await message.channel.send({ embeds: [embed2], components: [row] });

        var filter = (button) => button.user.id === message.author.id;
   
        let collector = await yetkicekmk.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (button) => {
            if (button.customId === 'onay') {
                try {
                    await yetkili.deleteOne({ userID: member.id, guildID: message.guild.id });
                    await yetkili.updateOne(
                        { guildID: message.guild.id },
                        { $pull: { oldStaff: member.id } }
                    );
                    const baseRole = message.guild.roles.cache.get(conf.ekipRolu);
                    if (!baseRole) {
                        return message.channel.send({ content: "Belirtilen rol bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                    }
                    const rolesToRemove = member.roles.cache.filter(role => role.position > baseRole.position);
                    if (rolesToRemove.size > 0) {
                        await member.roles.remove(rolesToRemove);
                    } else {
                        return;
                    }
                    await yetkicekmk.edit({ embeds: [embed.setDescription(`${member} adlı kullanıcının yetkisi alınmıştır!`)], components: [] });         
                } catch (error) {
                    console.log(error);
                    await yetkicekmk.edit({ content: `Bir hata oluştu: ${error.message}` });
                }
            }
            if (button.customId === 'red') {
                await yetkicekmk.edit({ embeds: [embed.setDescription(`İşlem Başarıyla İptal Edildi!`)] ,components: [] });
            }
        });
    }
}