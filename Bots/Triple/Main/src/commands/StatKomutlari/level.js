const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder, ButtonStyle } = require('discord.js');
const mongoose = require('mongoose');
const { Rank } = require('canvafy');
const Stat = require("../../../../src/schemas/level");

const client = global.bot;
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })

module.exports = {
    conf: {
        aliases: ["level", "seviye"],
        name: "level",
        help: "level",
        category: "stat",
    },

    run: async (client, message, args, prefix) => {
        if (!message.guild) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('message_level')
                    .setLabel('Mesaj Seviyesi')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('voice_level')
                    .setLabel('Ses Seviyesi')
                    .setStyle(ButtonStyle.Primary)
            );

        const initialMessage = await message.reply({
            content: 'Görmek istediğiniz seviyeyi seçiniz:',
            components: [row]
        });

        const filter = i => i.user.id === message.author.id;
        const collector = initialMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'message_level') {
                let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
                let data = await Stat.findOne({ guildID: message.guild.id, userID: target.id });

                if (!data || !data.messageLevel) {
                    i.update({ content: "Herhangi bir seviye veriniz bulunmamaktadır.", components: [] });
                } else {
                    const rankCard = new Rank()
                        .setAvatar(target.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
                        .setCurrentXp(data.messageXP)
                        .setBackground("image", `https://i.ibb.co/znbfgBH/painting-mountain-lake-with-mountain-background-188544-9126.png`)
                        .setRequiredXp(data.messageLevel * 643)
                        .setLevel(data.messageLevel)
                        .setUsername(target.user.username)
                        .setRankColor('#FFFFFF', '#FFFFFF')
                        .setBorder("#fff")
                        .setBarColor("#0ceb91")
                        .setOverlayOpacity(0.5);

                    rankCard.build()
                        .then(buffer => {
                            const attachment = new AttachmentBuilder(buffer, { name: 'cyr0nix-level-card.png' });
                            i.update({ content: 'İşte Mesaj seviye kartınız:', files: [attachment], components: [] });
                        })
                        .catch(err => {
                            console.error(err);
                            i.update({ content: 'Bir hata oluştu.', components: [] });
                        });
                }
            } else if (i.customId === 'voice_level') {
                let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
                let data = await Stat.findOne({ guildID: message.guild.id, userID: target.id });

                if (!data || !data.voiceLevel) {
                    i.update({ content: "Herhangi bir seviye veriniz bulunmamaktadır.", components: [] });
                } else {
                    const rankCard = new Rank()
                        .setAvatar(target.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
                        .setCurrentXp(data.voiceXP)
                        .setBackground("image", `https://i.ibb.co/znbfgBH/painting-mountain-lake-with-mountain-background-188544-9126.png`)
                        .setRequiredXp(data.voiceLevel * 643)
                        .setLevel(data.voiceLevel)
                        .setUsername(target.user.username)
                        .setRankColor('#FFFFFF', '#FFFFFF')
                        .setBorder("#fff")
                        .setBarColor("#0ceb91")
                        .setOverlayOpacity(0.5);

                    rankCard.build()
                        .then(buffer => {
                            const attachment = new AttachmentBuilder(buffer, { name: 'cyr0nix-level-card.png' });
                            i.update({ content: 'İşte Ses seviye kartınız:', files: [attachment], components: [] });
                        })
                        .catch(err => {
                            console.error(err);
                            i.update({ content: 'Bir hata oluştu.', components: [] });
                        });
            }
        }
    });
    
        collector.on('end', collected => {
            if (collected.size === 0) {
                initialMessage.edit({ content: 'Zaman aşımına uğradı, lütfen tekrar deneyin.', components: [] });
            }
        });
    }
};
