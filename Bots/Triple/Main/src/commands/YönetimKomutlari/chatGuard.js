const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const ChatGuard = require('../../../../src/schemas/chatGuard');
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const { cyronixTik, cyronixRed } = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
        aliases: ["chatguard", "cguard"],
        name: "chatguard",
        help: "chatguard [aç/kapat] [flood/küfür/reklam/spam]",
        category: "yönetim",
    },
    run: async (client, message, args, perm, prefix) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz!");
        }

        const guildID = message.guild.id;
        const setting = args[0]?.toLowerCase();
        const guardType = args[1]?.toLowerCase();

        // Fetch or initialize guard settings
        let data = await ChatGuard.findOne({ guildID }) || {
            floodEngel: false,
            kufurEngel: false,
            reklamEngel: false,
            spamEngel: false
        };

        // Handle specific guard toggle via command
        if (setting === 'aç' || setting === 'kapat') {
            const update = {};
            const isEnable = setting === 'aç';
            let replyMessage = '';

            if (guardType === 'flood') {
                update.floodEngel = isEnable;
                replyMessage = `Flood engelleme başarıyla ${isEnable ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guardType === 'küfür') {
                update.kufurEngel = isEnable;
                replyMessage = `Küfür engelleme başarıyla ${isEnable ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guardType === 'reklam') {
                update.reklamEngel = isEnable;
                replyMessage = `Reklam engelleme başarıyla ${isEnable ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guardType === 'spam') {
                update.spamEngel = isEnable;
                replyMessage = `Spam engelleme başarıyla ${isEnable ? 'açıldı' : 'kapatıldı'}.`;
            } else {
                return message.reply("Geçerli bir koruma tipi belirtmelisiniz: flood, küfür, reklam, spam");
            }

            await ChatGuard.findOneAndUpdate({ guildID }, update, { upsert: true });
            data = await ChatGuard.findOne({ guildID }) || data;
            message.reply(replyMessage);
        }

        // Create buttons for each guard
        const floodButton = new ButtonBuilder()
            .setCustomId(`flood_${guildID}`)
            .setLabel('Flood Koruması')
            .setStyle(data.floodEngel ? ButtonStyle.Success : ButtonStyle.Danger)
            .setEmoji(data.floodEngel ? cyronixTik : cyronixRed);

        const kufurButton = new ButtonBuilder()
            .setCustomId(`kufur_${guildID}`)
            .setLabel('Küfür Koruması')
            .setStyle(data.kufurEngel ? ButtonStyle.Success : ButtonStyle.Danger)
            .setEmoji(data.kufurEngel ? cyronixTik : cyronixRed);

        const reklamButton = new ButtonBuilder()
            .setCustomId(`reklam_${guildID}`)
            .setLabel('Reklam Koruması')
            .setStyle(data.reklamEngel ? ButtonStyle.Success : ButtonStyle.Danger)
            .setEmoji(data.reklamEngel ? cyronixTik : cyronixRed);

        const spamButton = new ButtonBuilder()
            .setCustomId(`spam_${guildID}`)
            .setLabel('Spam Koruması')
            .setStyle(data.spamEngel ? ButtonStyle.Success : ButtonStyle.Danger)
            .setEmoji(data.spamEngel ? cyronixTik : cyronixRed);

        const row = new ActionRowBuilder().addComponents(floodButton, kufurButton, reklamButton, spamButton);

        // Send initial status message with buttons
        const embedColor = data.floodEngel || data.kufurEngel || data.reklamEngel || data.spamEngel ? 0x00FF00 : 0xFF0000;
        const statusEmbed = new EmbedBuilder()
            .setTitle('📜 Chat Koruma Paneli')
            .setDescription('Aşağıda sunucunuzun mevcut chat koruma ayarlarını görebilirsiniz. Butonları kullanarak korumaları açıp kapatabilirsiniz.')
            .addFields(
                { name: 'Flood Koruması', value: `${data.floodEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                { name: 'Küfür Koruması', value: `${data.kufurEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                { name: 'Reklam Koruması', value: `${data.reklamEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                { name: 'Spam Koruması', value: `${data.spamEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true }
            )
            .setColor(embedColor)
            .setFooter({ text: `Komut ${message.author.tag} tarafından kullanıldı`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Send initial status embed with buttons
        const statusMsg = await message.reply({ embeds: [statusEmbed], components: [row] });

        // Button interaction collector
        const filter = i => i.user.id === message.author.id && i.customId.includes(guildID);
        const collector = statusMsg.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            const [guard, id] = i.customId.split('_');
            if (id !== guildID) return;

            const update = {};
            let replyMessage = '';
            let newState = false;

            if (guard === 'flood') {
                newState = !data.floodEngel;
                update.floodEngel = newState;
                replyMessage = `Flood engelleme ${newState ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guard === 'kufur') {
                newState = !data.kufurEngel;
                update.kufurEngel = newState;
                replyMessage = `Küfür engelleme ${newState ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guard === 'reklam') {
                newState = !data.reklamEngel;
                update.reklamEngel = newState;
                replyMessage = `Reklam engelleme ${newState ? 'açıldı' : 'kapatıldı'}.`;
            } else if (guard === 'spam') {
                newState = !data.spamEngel;
                update.spamEngel = newState;
                replyMessage = `Spam engelleme ${newState ? 'açıldı' : 'kapatıldı'}.`;
            }

            // Update database
            await ChatGuard.findOneAndUpdate({ guildID }, update, { upsert: true });
            data = await ChatGuard.findOne({ guildID });

            // Update button styles
            floodButton.setStyle(data.floodEngel ? ButtonStyle.Success : ButtonStyle.Danger)
                .setEmoji(data.floodEngel ? cyronixTik : cyronixRed);
            kufurButton.setStyle(data.kufurEngel ? ButtonStyle.Success : ButtonStyle.Danger)
                .setEmoji(data.kufurEngel ? cyronixTik : cyronixRed);
            reklamButton.setStyle(data.reklamEngel ? ButtonStyle.Success : ButtonStyle.Danger)
                .setEmoji(data.reklamEngel ? cyronixTik : cyronixRed);
            spamButton.setStyle(data.spamEngel ? ButtonStyle.Success : ButtonStyle.Danger)
                .setEmoji(data.spamEngel ? cyronixTik : cyronixRed);

            // Update message content
            const updatedEmbedColor = data.floodEngel || data.kufurEngel || data.reklamEngel || data.spamEngel ? 0x00FF00 : 0xFF0000;
            const updatedEmbed = new EmbedBuilder()
                .setTitle('📜 Chat Koruma Paneli')
                .setDescription('Aşağıda sunucunuzun mevcut chat koruma ayarlarını görebilirsiniz. Butonları kullanarak korumaları açıp kapatabilirsiniz.')
                .addFields(
                    { name: 'Flood Koruması', value: `${data.floodEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                    { name: 'Küfür Koruması', value: `${data.kufurEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                    { name: 'Reklam Koruması', value: `${data.reklamEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true },
                    { name: 'Spam Koruması', value: `${data.spamEngel ? `${cyronixTik} Açık` : `${cyronixRed} Kapalı`}`, inline: true }
                )
                .setColor(updatedEmbedColor)
                .setFooter({ text: `Komut ${message.author.tag} tarafından kullanıldı`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await i.update({ embeds: [updatedEmbed], components: [row] });
            await i.followUp({ content: replyMessage, ephemeral: true });
        });

        const disabledRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('disabled_button')
                .setEmoji('⏱')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        );

        collector.on('end', () => {
            statusMsg.edit({ components: [disabledRow] }).catch(() => {});
        });
    }
};