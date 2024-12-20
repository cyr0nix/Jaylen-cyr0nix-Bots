const { PermissionsBitField, EmbedBuilder, Client, Message, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, Events} = require("discord.js");
const { cyronixStar } = require("../../../../src/configs/emojis.json")
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const owospucocu = require("../../../../src/configs/ranks.json");
const client = global.bot;

module.exports = {
    conf: {
        aliases: ["ypanel"],
        name: "yetkilipanel",
        help: "rolmenü",
        category: "sahip",
        owner: true,
    },

    run: async (client, message, args) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('yetkilimenu')
                    .addOptions(
                        {
                            label: `Register ${conf.HammermiSpearmi}`,
                            description: `Register ${conf.HammermiSpearmi} Rolünü Almak İçin Tıkla!`,
                            value: "registerhammer",
                            emoji: "1240452211100876840"
                        },
                        {
                            label: `Warn ${conf.HammermiSpearmi}`,
                            description: `Warn ${conf.HammermiSpearmi} Rolünü Almak İçin Tıkla!`,
                            value: "warnhammer",
                            emoji: "1240452211100876840"
                        },
                        {
                            label: `Mute ${conf.HammermiSpearmi}`,
                            description: `Mute ${conf.HammermiSpearmi} Rolünü Almak İçin Tıkla!`,
                            value: "mutehammer",
                            emoji: "1240452211100876840"
                        },
                        {
                            label: `Jail ${conf.HammermiSpearmi}`,
                            description: `Jail ${conf.HammermiSpearmi} Rolünü Almak İçin Tıkla!`,
                            value: "jailhammer",
                            emoji: "1240452211100876840"
                        },
                        {
                            label: `Ban ${conf.HammermiSpearmi}`,
                            description: `Ban ${conf.HammermiSpearmi} Rolünü Almak İçin Tıkla!`,
                            value: "banhammer",
                            emoji: "1240452211100876840"
                        })
            );
        const embed = new EmbedBuilder()
            .setTitle(`${allah.GuildName} Yetkili Paneli`)
            .setColor(`#CCBEA5`)
            .setDescription(`Aşağıdaki Panelden Rolünüz Gereği Olan ${conf.HammermiSpearmi} Rollerini alabilirsiniz.`)
            .setFooter({ text: `${allah.AltBaşlık}`, iconURL: `${message.guild.iconURL({ dynamic: true })}` });

        await message.channel.send({ embeds: [embed], components: [row] });
    }
}

client.on(Events.InteractionCreate, async (interaction) => {

    const member = await client.guilds.cache.get(allah.GuildID).members.fetch(interaction.member.user.id)
    if (!member) return;

    if (!interaction.isStringSelectMenu()) return;

    if (interaction.values[0] === "registerhammer") {
        const hasRequiredRole = owospucocu.Roles.reg.some(role => member.roles.cache.has(role));

        if (member.roles.cache.has(conf.teyitciRolleri)) {
            interaction.reply({ content: "**Zaten Bu Role Sahipsin!**", ephemeral: true });
            return;
        }

        else if (!hasRequiredRole && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({ content: "**Host Yavaş Admin misin mübarek hepsini alcan :D**", ephemeral: true });
            return;
        }

        await member.roles.add(conf.teyitciRolleri);
        await interaction.reply({content: `<@&${conf.teyitciRolleri}> Başarıyla Verildi!`, ephemeral: true})
    } else if (interaction.values[0] === "warnhammer") {
        const hasRequiredRole = owospucocu.Roles.warn.some(role => member.roles.cache.has(role));

        if (member.roles.cache.has(conf.warnHammer)) {
            interaction.reply({ content: "**Zaten Bu Role Sahipsin!**", ephemeral: true });
            return;
        }

        else if (!hasRequiredRole && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({ content: "**Host Yavaş Admin misin mübarek hepsini alcan :D**", ephemeral: true });
            return;
        }

        await member.roles.add(conf.warnHammer);
        await interaction.reply({content: `<@&${conf.warnHammer}> Başarıyla Verildi!`, ephemeral: true})
    } else if (interaction.values[0] === "mutehammer") {
        const hasRequiredRole = owospucocu.Roles.mute.some(role => member.roles.cache.has(role));

        if (member.roles.cache.has(conf.vmuteHammer)) {
            interaction.reply({ content: "**Zaten Bu Role Sahipsin!**", ephemeral: true });
            return;
        }

        else if (!hasRequiredRole && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({ content: "**Host Yavaş Admin misin mübarek hepsini alcan :D**", ephemeral: true });
            return;
        }

        await member.roles.add(conf.vmuteHammer);
        await interaction.reply({content: `<@&${conf.vmuteHammer}> Başarıyla Verildi!`, ephemeral: true})
    } else if (interaction.values[0] === "jailhammer") {
        const hasRequiredRole = owospucocu.Roles.jail.some(role => member.roles.cache.has(role));

        if (member.roles.cache.has(conf.jailHammer)) {
            interaction.reply({ content: "**Zaten Bu Role Sahipsin!**", ephemeral: true });
            return;
        }

        else if (!hasRequiredRole && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({ content: "**Host Yavaş Admin misin mübarek hepsini alcan :D**", ephemeral: true });
            return;
        }

        await member.roles.add(conf.jailHammer);
        await interaction.reply({content: `<@&${conf.jailHammer}> Başarıyla Verildi!`, ephemeral: true})
    } else if (interaction.values[0] === "banhammer") {
        const hasRequiredRole = owospucocu.Roles.ban.some(role => member.roles.cache.has(role));

        if (member.roles.cache.has(conf.banHammer)) {
            interaction.reply({ content: "**Zaten Bu Role Sahipsin!**", ephemeral: true });
            return;
        }

        else if (!hasRequiredRole && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({ content: "**Host Yavaş Admin misin mübarek hepsini alcan :D**", ephemeral: true });
            return;
        }

        await member.roles.add(conf.banHammer);
        await interaction.reply({content: `<@&${conf.banHammer}> Başarıyla Verildi!`, ephemeral: true})
    }
})