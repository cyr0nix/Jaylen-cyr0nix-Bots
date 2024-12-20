const Discord = require("discord.js");
const messageUser = require("../../../../src/schemas/messageUser");
const yetkis = require("../../../../src/schemas/yetkis");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../../src/schemas/inviteMember");
const nameData = require("../../../../src/schemas/names")
const allah = require("../../../../../../config.json");
const db = require("croxydb");
const ayarlar = require("../../../../src/configs/sunucuayar.json");
const { cyronixSonsuz, cyronixStar, cyronix1, cyronix2, cyronix3, cyronix4, cyronix5, cyronix6, cyronix7, cyronix8, cyronix9, cyronixTik, cyronixRed } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["stp"],
    name: "streamerpanel",
    help: "streamerpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId(`stbasvur`)
            .setLabel(`Başvuru Yap!`)
            .setEmoji(`💼`)
            .setStyle(Discord.ButtonStyle.Primary))

    const embed = new Discord.EmbedBuilder()
        .setThumbnail(`${message.guild.iconURL({dyanmic:true})}`)
        .setImage(`${message.guild.bannerURL({dynamic:true,size: 2048})}`)
        .setColor(`#0bf207`)
        .setDescription(`**Merhaba \`${message.guild.name}\` Üyeleri** \n\n **Streamer başvuru sistemine hoşgeldiniz.**\n **Aşağıdaki butona basarak streamer başvurusu yapabilirsiniz!**`)
message.channel.send({ embeds: [embed], components: [row] })
  },
};

client.on('interactionCreate', async interaction => {

    if(interaction.customId === "stbasvur") {
        if (interaction.member.roles.cache.has(ayarlar.streamerRole)) {
            await interaction.reply({ content: "Zaten streamer rolüne sahipsiniz!", ephemeral: true });
            return;
        }
        const modal = new Discord.ModalBuilder()
            .setCustomId(`stbasvurmodal`)
            .setTitle(`Streamer Başvuru`);
            const gv1 = new Discord.TextInputBuilder()
                .setCustomId('ssoru1')
                .setLabel('Kötü Videolar Açmayacağım?')
                .setMaxLength(18)
                .setMinLength(10)
                .setPlaceholder('Kabul Ediyorum')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            const gv2 = new Discord.TextInputBuilder()
                .setCustomId('ssoru2')
                .setLabel('Ne Tür Yayın Açarsın?')
                .setMaxLength(20)
                .setPlaceholder('Oyun, Film vb.')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            const gv3 = new Discord.TextInputBuilder()
                .setCustomId('ssoru3')
                .setLabel('Sunucuda Ne Kadar Aktifsiniz?')
                .setMaxLength(15)
                .setPlaceholder('Örn: 8 saat')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Paragraph)

        let g1 = new Discord.ActionRowBuilder().addComponents(gv1);
        let g2 = new Discord.ActionRowBuilder().addComponents(gv2);
        let g3 = new Discord.ActionRowBuilder().addComponents(gv3);
        modal.addComponents(g1, g2, g3);
        await interaction.showModal(modal)

    } else if (interaction.customId === "stbasvurmodal") {
        let s1 = interaction.fields.getTextInputValue('ssoru1');
        let s2 = interaction.fields.getTextInputValue('ssoru2');
        let s3 = interaction.fields.getTextInputValue('ssoru3');
            interaction.reply({content: `${cyronixTik} Streamer başvurun başarıyla alındı`, ephemeral: true});

        if(client.channels.cache.find(x => x.name == "streamer-log")) {
            let basvurembed = new Discord.EmbedBuilder()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
                .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${interaction.user} başvuruda bulundu.`)
                .addFields([
                    {name: 'Kötü Videolar Açmayacağım?', value: `${s1}`},
                    {name: 'Ne Tür Yayın Açarsın?', value: `${s2}`},
                    {name: 'Sunucuda Ne Kadar Aktifsiniz?', value: `${s3}`}
                ]);
            let basvuruButton = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('sskabul-et')
                        .setLabel('Kabul Et')
                        .setEmoji('1213638247918346350')
                        .setStyle(Discord.ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('ssred-det')
                        .setLabel('Reddet')
                        .setEmoji('1213638200413782077')
                        .setStyle(Discord.ButtonStyle.Danger)
                )
            const messagexd = await client.channels.cache.find(x => x.name == "streamer-log").send({embeds:[basvurembed], components:[basvuruButton]});
            db.set(`ssbasvuru_${messagexd.id}`, `${interaction.user.id}`) }
        } else if (interaction.customId === 'sskabul-et') {
            
            const userId = db.get(`ssbasvuru_${interaction.message.id}`);
            if (!userId) {
            interaction.reply({content: "Kullanıcı ID'si bulunamadı.", ephemeral: true});
            return;
            }

            const member = await interaction.guild.members.fetch(userId).catch(console.error);
            if (!member) {
            interaction.reply({content: `Üye bulunamadı: ${userId}`, ephemeral:true});
            return;
            }

            const channelxdd= client.channels.cache.get(`${ayarlar.streamerDurum}`);

            await channelxdd.send(`> **${member} Sunucusunda Streamer Başvurun Kabul Edilmiştir.**\n> \n> **Kabul Eden Yetkili: ${interaction.user}**`);
            await interaction.update({content:`> ${cyronixTik} **Streamer Başvurusu Başarıyla Kabul Edildi!**\n> **Kabul Eden Yetkili:** ${interaction.user}`,components: []});

            await member.roles.add(`${ayarlar.streamerRole}`).catch(console.error);
        } else if (interaction.customId === 'ssred-det') {

            const userId = db.get(`ssbasvuru_${interaction.message.id}`);
            if (!userId) {
            interaction.reply({content: "Kullanıcı ID'si bulunamadı.", ephemeral: true});
            return;
            }

            const member = await interaction.guild.members.fetch(userId).catch(console.error);
            if (!member) {
            interaction.reply({content: `Üye bulunamadı: ${userId}`, ephemeral:true});
            return;
            }

            const channelxd = client.channels.cache.get(`${ayarlar.streamerDurum}`);

            await channelxd.send(`> **${member} Sunucusunda Streamer Başvurun Ret Edilmiştir.**\n> \n> **Ret Eden Yetkili: ${interaction.user}**`);
            await interaction.update({content:`> ${cyronixRed} **Streamer Başvurusu Başarıyla Ret Edildi!**\n> **Ret Eden Yetkili:** ${interaction.user}`,components: []});

        }
});