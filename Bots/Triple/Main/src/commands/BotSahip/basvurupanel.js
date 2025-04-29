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
const conf = require('../../../../src/configs/sunucuayar.json');
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { cyronixSonsuz, cyronixStar, cyronix1, cyronix2, cyronix3, cyronix4, cyronix5, cyronix6, cyronix7, cyronix8, cyronix9, cyronixTik, cyronixRed } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "basvurupanel",
    help: "basvurupanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId(`basvuru`)
            .setLabel(`Başvuru Yap!`)
            .setEmoji(`👮‍♂️`)
            .setStyle(Discord.ButtonStyle.Success),
            new Discord.ButtonBuilder()
            .setCustomId('istifacy')
            .setLabel(`İstifa Et!`)
            .setEmoji('⚖️')
            .setStyle(Discord.ButtonStyle.Danger),
            )

    const embed = new Discord.EmbedBuilder()
        .setThumbnail(message.guild.icon ? message.guild.iconURL({ dynamic: true, size: 2048 }) : null)
        .setImage(message.guild.banner ? message.guild.bannerURL({ dynamic: true, size: 2048 }) : null)
        .setColor(`#0bf207`)
        .setDescription(`**Merhaba \`${message.guild.name}\` Üyeleri** \n\n **Yetkili başvuru sistemine hoşgeldiniz.**\n **Aşağıdaki butona basarak yetkili başvurusu yapabilir yada istifa edebilirsiniz!**`)
message.channel.send({ embeds: [embed], components: [row] })
  },
};

client.on('interactionCreate', async interaction => {
    
    if(interaction.customId === "basvuru") {
        if (!interaction.user.displayName.includes(conf.tag)) {
            interaction.reply({content: `${cyronixRed} öncelikle sunucumuzun tagını alman gerekiyor. Tagımız: \`${conf.tag}\``, ephemeral:true});
            return
    };
        const yetkiData = await yetkis.findOne({ guildID: interaction.guild.id });
        if (yetkiData && yetkiData.oldStaff.some(x => x === interaction.user.id )) {
        interaction.reply({ content: `${interaction.user.toString()} Zaten Yetkilisin bidahamı alcan.`,ephemeral: true})
        return };
        const modal = new Discord.ModalBuilder()
            .setCustomId(`basvurmodal`)
            .setTitle(`Yetkili Başvuru`);
            const gv1 = new Discord.TextInputBuilder()
                .setCustomId('soru1')
                .setLabel('İsminiz Nedir?')
                .setMaxLength(20)
                .setMinLength(3)
                .setPlaceholder('Örn: Ece')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            const gv2 = new Discord.TextInputBuilder()
                .setCustomId('soru2')
                .setLabel('Yaşınız Kaç?')
                .setMaxLength(5)
                .setPlaceholder('Örn: 20')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            const gv3 = new Discord.TextInputBuilder()
                .setCustomId('soru3')
                .setLabel('Daha Önce Yetkili Oldunuzmu?')
                .setMaxLength(100)
                .setPlaceholder('Örn: Evet oldum. Shannara\'da Moderatördüm')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Paragraph)
            const gv4 = new Discord.TextInputBuilder()
                .setCustomId('soru4')
                .setLabel('İnsanlarla İletişiminiz Nasıl?')
                .setMinLength(2)
                .setMaxLength(15)
                .setPlaceholder('Örn: İyi-Kötü vs.')
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            const gv5 = new Discord.TextInputBuilder()
                .setCustomId('soru5')
                .setLabel('Eklemek istediğiniz bir şey varsa yazınız.')
                .setMaxLength(200)
                .setPlaceholder('Bonus')
                .setRequired(false)
                .setStyle(Discord.TextInputStyle.Paragraph)

        let g1 = new Discord.ActionRowBuilder().addComponents(gv1);
        let g2 = new Discord.ActionRowBuilder().addComponents(gv2);
        let g3 = new Discord.ActionRowBuilder().addComponents(gv3);
        let g4 = new Discord.ActionRowBuilder().addComponents(gv4);
        let g5 = new Discord.ActionRowBuilder().addComponents(gv5);
        modal.addComponents(g1, g2, g3, g4, g5);
        await interaction.showModal(modal)

        } else if (interaction.customId === "basvurmodal") {
        let s1 = interaction.fields.getTextInputValue('soru1');
        let s2 = interaction.fields.getTextInputValue('soru2');
        let s3 = interaction.fields.getTextInputValue('soru3');
        let s4 = interaction.fields.getTextInputValue('soru4');
        let s5 = interaction.fields.getTextInputValue('soru5') || "\`Boş Bırakılmış\`";
            await interaction.reply({content: `${cyronixTik} Yetkili başvurun başarıyla alındı`, ephemeral: true});

        if(client.channels.cache.find(x => x.name == "başvuru-log")) {
            let basvurembed = new Discord.EmbedBuilder()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
                .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${interaction.user} başvuruda bulundu.`)
                .addFields([
                    {name: 'İsminiz Nedir?', value: `${s1}`},
                    {name: 'Yaşınız Kaç?', value: `${s2}`},
                    {name: 'Daha Önce Yetkili Oldunuzmu, olduysanız hangi sunucular?', value: `${s3}`},
                    {name: 'İnsanlarla İletişiminiz Nasıl?', value: `${s4}`},
                    {name: 'Eklemek istediğiniz bir şey varsa yazınız.', value: `${s5}`}
                ]);
            let basvuruButton = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('kabul-et')
                        .setLabel('Kabul Et')
                        .setEmoji('1213638247918346350')
                        .setStyle(Discord.ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('red-det')
                        .setLabel('Reddet')
                        .setEmoji('1213638200413782077')
                        .setStyle(Discord.ButtonStyle.Danger)
                )
            const messagexd = await client.channels.cache.find(x => x.name == "başvuru-log").send({embeds:[basvurembed], components:[basvuruButton]});
            db.set(`yetkili_${messagexd.id}`, `${interaction.user.id}`) }
        } else if (interaction.customId === 'kabul-et') {
            
            const userId = db.get(`yetkili_${interaction.message.id}`);
            if (!userId) {
            interaction.reply({content: "Kullanıcı ID'si bulunamadı.", ephemeral: true});
            return;
            }

            const member = await interaction.guild.members.fetch(userId).catch(console.error);
            if (!member) {
            interaction.reply({content: `Üye bulunamadı: ${userId}`, ephemeral:true});
            return;
            }

            const channelxd2 = client.channels.cache.get(`${conf.basvuruDurum}`);

            await channelxd2.send(`> ${cyronixTik} **${member} Yetkililik Başvurun Kabul Edilmiştir Edilmiştir.**\n> \n> **Kabul Eden Yetkili: ${interaction.user}**`);
            await interaction.update({content:`> ${cyronixTik} **Yetkili Başvurusu Başarıyla Kabul Edildi!**\n> **Kabul Eden Yetkili:** ${interaction.user}`,components: []});

            await member.roles.add([
                "1234586519193522237",
                "1234586532288139306",
                "1234586535018496195"
              ]).catch(console.error);
            await yetkis.findOneAndUpdate({ guildID: interaction.guild.id, userID: member.user.id }, { $push: { yetkis: interaction.user.id } }, { upsert: true });
            await yetkis.findOneAndUpdate({ guildID: interaction.guild.id }, { $push: { oldStaff: member.user.id }}, {upsert: true});
        } else if (interaction.customId === 'red-det') {

            const userId = db.get(`yetkili_${interaction.message.id}`);
            if (!userId) {
            interaction.reply({content: "Kullanıcı ID'si bulunamadı.", ephemeral: true});
            return;
            }

            const member = await interaction.guild.members.fetch(userId).catch(console.error);
            if (!member) {
            interaction.reply({content: `Üye bulunamadı: ${userId}`, ephemeral:true});
            return;
            }

            const channelxd = client.channels.cache.get(`${conf.basvuruDurum}`);

            await channelxd.send(`> ${cyronixRed} **${member} Yetkililik Başvurun Red Edilmiştir.**\n> \n> **Red Eden Yetkili: ${interaction.user}**`);
            await interaction.update({content:`> ${cyronixRed} **Yetkili Başvurusu Red Edildi!**\n> **Red Eden Yetkili:** ${interaction.user}`,components: []});

        } else if (interaction.customId === 'istifacy') {

            const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
            if (!member) {
                console.error('Üye bulunamadı');
                return interaction.reply({ content: 'Üye bilgilerine erişilemedi!', ephemeral: true });
            } 
            try {
                await yetkis.deleteOne({ userID: member.id, guildID: interaction.guild.id });
                await yetkis.updateOne(
                    { guildID: interaction.guild.id },
                    { $pull: { oldStaff: member.id } }
                );        
                const baseRole = interaction.guild.roles.cache.get(conf.ekipRolu);
                if (!baseRole) {
                    return interaction.channel.send({ content: "Belirtilen rol bulunamadı!", ephemeral: true}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                }
                const rolesToRemove = member.roles.cache.filter(role => role.position > baseRole.position);
                if (rolesToRemove.size > 0) {
                    await member.roles.remove(rolesToRemove);
                } else {
                    return;
                }
                await interaction.reply({ content: `${member} başarıyla istifa ettin!`, ephemeral: true });
                const channelxd3 = client.channels.cache.get(`${conf.basvuruDurum}`);
                await channelxd3.send({ content: `${member} istifa edip aramızdan ayrıldı :'(`});       
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: `Bir hata oluştu: ${error.message}`, ephemeral: true});
            } 

        }
});