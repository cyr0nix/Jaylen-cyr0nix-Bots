const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Marriage = require("../../../../src/schemas/evlilik");

module.exports = {
    conf: {
        aliases: ["evlen", "evlilikteklifi"],
        name: "evlen",
        help: "evlen <@kullanıcı>",
        category: "kullanıcı",
    },

    run: async (client, message, args) => {
        const targetMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!targetMember) return message.channel.send("Lütfen evlenmek istediğiniz kişiyi etiketleyin.");

        if (message.author.id === targetMember.id) {
            return message.channel.send("Kendinizle evlenemezsiniz!");
        }

        if (targetMember.user.bot) {
            return message.channel.send("Botlarla evlenemezsiniz!");
        }

        const existingMarriage = await Marriage.findOne({
            $or: [
                { husbandID: message.author.id },
                { wifeID: message.author.id },
                { husbandID: targetMember.id },
                { wifeID: targetMember.id }
            ]
        });

        if (existingMarriage) {
            return message.channel.send("Bu kişi veya siz zaten evlisiniz.");
        }

        const embed = new EmbedBuilder()
            .setColor("#ff69b4")
            .setTitle(`${targetMember.user.username}, ${message.author.username} sana evlenme teklif ediyor! 💍`)
            .setDescription(`Evlilik teklifini kabul etmek veya reddetmek için aşağıdaki butonlara tıklayın.`);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("accept_marriage")
                    .setLabel("Evet")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("decline_marriage")
                    .setLabel("Hayır")
                    .setStyle(ButtonStyle.Danger)
            );

        const proposalMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => {
            return (interaction.customId === 'accept_marriage' || interaction.customId === 'decline_marriage') && interaction.user.id === targetMember.id;
        };

        const collector = proposalMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on("collect", async i => {
            if (i.customId === "accept_marriage") {
                const marriage = new Marriage({
                    husbandID: message.author.id,
                    wifeID: targetMember.id,
                    marriedAt: new Date()
                });
                await marriage.save();
                i.update({ content: `Tebrikler! ${targetMember} ve ${message.author} artık evlisiniz! 🎉`, embeds: [], components: [] });
            } else {
                i.update({ content: `${targetMember} evlilik teklifini reddetti.`, embeds: [], components: [] });
            }
        });

        collector.on("end", () => {
            proposalMessage.edit({ components: [] }).catch(console.error);
        });
    },
};
