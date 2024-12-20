const { PermissionsBitField, ButtonStyle, Discord, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const giveaway = require('../../../../src/schemas/giveaway.js')
const { cyronixTik, cyronixRed, cyronixCekilis } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
const ms = require("ms");
const { Interaction } = require("chart.js");
const client = global.bot;


module.exports = {
  conf: {
    aliases: ["ipanel", "istekler", "istekkkk"],
    name: "istekpanel",
    help: "istekpanel",
    category: "sahip"
  },

  run: async (client, message, args) => {

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("istek")
                .setLabel("İstek/Öneri")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("sikayet")
                .setLabel("Şikayet")
                .setStyle(ButtonStyle.Danger)
        )

    const embed = new EmbedBuilder()
        .setThumbnail(`${message.guild.iconURL({dyanmic:true})}`)
        .setImage(`${message.guild.bannerURL({dynamic:true,size: 2048})}`)
        .setColor(`#0bf207`)
        .setDescription(`**Merhaba \`${message.guild.name}\` Üyeleri** \n\n Sunucumuzun İstek/Öneri - Şikayet Sistemine Hoş Geldiniz! \n\n Aşağıdaki butonlardan İsteklerini belirtebilir ya da bir yetkiliyi yada farklı birisini şikayet edebilirsiniz.`)

        message.channel.send({embeds: [embed],components: [row]})
  },
};

client.on('interactionCreate', async interaction => {
    
    if (interaction.customId === 'istek') {
        const modal = new ModalBuilder()
            .setCustomId('istekmodal')
            .setTitle('İstek/Öneri Sistemi');
        const i1 = new TextInputBuilder()
            .setCustomId('isteksoru1')
            .setPlaceholder('Örn: Oyun (Feign) etkinliği yapılsın.')
            .setLabel('İstek/Öneri Sistemi')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(20)
            .setMaxLength(500)

        let is1 = new ActionRowBuilder().addComponents(i1);
        modal.addComponents(is1);

        await interaction.showModal(modal)
    } else if (interaction.customId === 'istekmodal') {
        let s1 =  interaction.fields.getTextInputValue('isteksoru1');
            interaction.reply({content: `${cyronixTik} İstek/Önerin Başarıyla iletildi.`, ephemeral: true});

        if(client.channels.cache.find(x => x.name == "istek-log")) {
            let istemEmbed = new EmbedBuilder()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
                .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${interaction.user} Öneride/İstekte bulundu.`)
                .addFields([
                    {
                        name: 'Öneri',
                        value: `\`\`\`${s1}\`\`\``
                    }
                ]);
            await client.channels.cache.find(x => x.name == "istek-log").send({embeds:[istemEmbed]});
        }
    } else if (interaction.customId === 'sikayet') {
        const modal2 = new ModalBuilder()
            .setCustomId('sikayetmodal')
            .setTitle('Şikayet Sistemi');
        const sk1 = new TextInputBuilder()
            .setCustomId('sikayetsoru1')
            .setPlaceholder('Örn: cyr0nix bu işi biliyo :D.')
            .setLabel('Şikayet Sistemi')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(20)
            .setMaxLength(500)
        
        let sik1 = new ActionRowBuilder().addComponents(sk1);
            modal2.addComponents(sik1);

        await interaction.showModal(modal2)
    } else if (interaction.customId === 'sikayetmodal') {
        let c1 = interaction.fields.getTextInputValue('sikayetsoru1');

        interaction.reply({content: `${cyronixTik} Şikayetin Başarıyla iletildi.`, ephemeral: true});
    
            if(client.channels.cache.find(x => x.name == "şikayet-log")) {
                let sikayetembed1 = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
                    .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`${interaction.user} Şikayet başvurusunda bulundu.`)
                    .addFields([
                        {
                            name: 'Şikayet',
                            value: `\`\`\`${c1}\`\`\``
                        }
                    ]);
                await client.channels.cache.find(x => x.name == "şikayet-log").send({embeds:[sikayetembed1]});
        }
        
    }
    
});