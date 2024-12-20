const premium = require("../../../../src/schemas/premium");
const { PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js");
const moment = require("moment");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");

module.exports = {
    conf: {
        aliases: ["pre", "premium"],
        name: "premium",
        help: "premium [ver] [status]",
        category: "yönetim",
    },

    run: async (client, message, args, perm, prefix) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

        if (!args[0]) {
            message.channel.send({ embeds: [] });
            return
        }

        const data1 = await premium.findOne({ userId: message.author.id });

        if (args[0] == "status") {
            const userPremium = await premium.findOne({ userId: message.author.id });
            if (!userPremium) {
                return message.reply('Premium üyeliğiniz yok.');
            }

            const now = new Date();
            const finishDate = new Date(userPremium.finishDate);
            const timeLeft = finishDate - now;

            if (timeLeft <= 0) {
                await premium.deleteOne({ userId: message.author.id });
                return message.reply('Premium üyeliğiniz sona erdi.');
            }

            const formattedTimeLeft = formatDuration(timeLeft);
            message.reply(`Premium üyeliğinizin bitmesine kalan süre: ${formattedTimeLeft}`);
        } else if (args[0] == "ver") {

            if (!args[1]) return message.reply({ content: "Premium vermek istediğin kişiyi belirtmelisin!" })

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('premium-menu')
                        .setPlaceholder('Süre seçiniz.')
                        .addOptions(
                            {
                                label: '15 Gün',
                                value: '15d'
                            },
                            {
                                label: '1 Ay',
                                value: '1m'
                            },
                            {
                                label: '3 Ay',
                                value: '3m'
                            },
                            {
                                label: '1 Yıl',
                                value: '1y'
                            }
                        )
                );

            const sentMessage = await message.reply({ content: `Aşağıdan ${member} üyesine vereceğiniz premium süresini seçin!`, components: [row] });

            const filter = (interaction) => interaction.user.id === message.author.id && interaction.customId === 'premium-menu';
            const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (interaction) => {
                const duration = interaction.values[0];
                const now = new Date();
                let finishDate;

                switch (duration) {
                    case '15d':
                        finishDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
                        break;
                    case '1m':
                        finishDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                        break;
                    case '3m':
                        finishDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
                        break;
                    case '1y':
                        finishDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
                        break;
                }

                await premium.findOneAndUpdate(
                    { userId: member.id },
                    { userId: member.id, finishDate: finishDate },
                    { upsert: true }
                );

                await member.roles.add(conf.premium);
                await sentMessage.edit({content: `Premium süresi ${member} üyesi için ${finishDate.toLocaleString()} tarihine kadar ayarlandı.`, components: []});
            });

            collector.on('end', collected => {
                if (!collected.size) {
                    sentMessage.edit({content: 'Süre seçimi zaman aşımına uğradı.', components:[]});
                }
            });
        }
    }
}

function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}