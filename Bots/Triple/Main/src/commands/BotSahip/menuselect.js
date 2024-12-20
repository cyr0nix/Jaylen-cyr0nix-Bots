const { PermissionsBitField, EmbedBuilder, Client, Message, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { cyronixStar } = require("../../../../src/configs/emojis.json")
const Discord = require('discord.js');
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["rolmenü","menuselect"],
    name: "menü",
    help: "rolmenü",
    category: "sahip",
    owner: true,
  },
 
  run: async (client, message, args, durum, kanal) => {

    let embed = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addFields(
        { name: "ROL MENÜ KURULUM",  value: `\` ❯ \` Kurmak istediğiniz rol menü kategorisini aşağıdaki butonlardan seçebilirsiniz.`, inline: false },
    )
        
    
    let ozi = await message.channel.send({
        "embeds": [embed],
          "components":[{
            "type":1,
            "components":[
                    {"type":2,"style":2,"custom_id":"hepsi","label":"Hepsi (Rol Seçimler)", "emoji": { "id": "901357196124774471" } },
                    {"type":2,"style":2,"custom_id":"etkinlikmenü","label":"Etkinlik/Çekiliş", "emoji": { "id": "941993742934614047" } },
                    {"type":2,"style":2,"custom_id":"ilişkimenü","label":"İlişki Durumu Seçim", "emoji": { "id": "956149326877438002" } },
                ]}, {  "type":1,"components":[
                    {"type":2,"style":2,"custom_id":"burçmenü","label":"Burç Seçim", "emoji": { "id": "931658529314603008" } },
                    {"type":2,"style":2,"custom_id":"oyunmenü","label":"Oyun Seçim", "emoji": { "id": "956149332313243668" } },
                    {"type":2,"style":2,"custom_id":"renkmenü","label":"Renk Seçim", "emoji": { "id": "746992558927904891" } },
                    {"type":2,"style":4,"custom_id":"iptal","label":"İşlem İptal", "emoji": { "id": "921703086823714858" } },
                   ]}
            ]})
    
    
        var filter = (xd) => xd.user.id === message.author.id;
        let collector = await ozi.createMessageComponentCollector({ filter,  time: 30000 })
        
        collector.on("collect", async (button) => {
        
            if (button.customId === "hepsi") {
            await ozi.delete({ timeout: 1500 });
    
            message.channel.send({ content: `
    :tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
    
    \` ⦁ \` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                            
    \` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 

    \` ⦁ \` Eğer \`@Turnuva Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça yapacağımız ve daha nice ödüllerin bulunduğu turnuvalardan haberdar olabilirsiniz. 

    \` ⦁ \` Eğer \`@Günün Sorusu\` Rolünü alırsanız Günün Sorusundan haberdar olursununz.

    \` ⦁ \` Eğer \`@Duyuru\` Rolünü alırsanız sunucumuzda genel duyurulardan haberdar olabilirsiniz. 

    \` ⦁ \` Eğer \`@Oy Destekçisi\` Rolünü alırsanız sunucumuzda günlük olarak oylar için hatırlatma etiketi atılmaktadır eğer destek olmak isterseniz rolü alabilirsiniz. 

    **NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "etkinliks", "options": [
                                { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "1232546571162353716" }, },
                                { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "1232546568817868971" }, },
                                { "label": "Turnuva Katılımcısı", "description": "Turnuvalardan haberdar olmak için", "value": "turnuvax", "emoji": { "id": "1233967379172823090" }, },
                                { "label": "Günün Sorusu", "description": "Günün Sorusundan haberdar olmak için", "value": "gununsorusu", "emoji": { "id": "1233967382146584658" }, },
                                { "label": "Duyurular", "description": "Sunucudaki duyurulardan haberdar olmak için", "value": "duyuru", "emoji": { "id": "1232546573888651314" }, },
                                { "label": "Destekçi", "description": "Oy verde hatırlatma için", "value": "oyver", "emoji": { "id": "1232546566196166676" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 6
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "burc", "options": [
                                { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                                { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                                { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                                { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                                { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                                { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                                { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                                { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                                { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                                { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                                { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                                { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "games", "options": [
                              { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                              { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                              { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                              { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                              { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                              { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "880606175488540693" }, },
                              { "label": "Mobile Legends", "value": "mlbb", "emoji": { "id": "1218376145473638473" }, },
                              { "label": "Euro Truck Simulator 2", "value": "ets", "emoji": { "id": "1237469248800948224" }, },
                              { "label": "Apex Legends", "value": "apex", "emoji": { "id": "1237469244862763129" }, },
                              { "label": "Rust", "value": "rust", "emoji": { "id": "1170309755856752731" }, },
                              { "label": "Team Fight Tactics", "value": "tft", "emoji": { "id": "1124759690375594004" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 11
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "renk", "options": [
                                { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                                { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                                { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                                { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                                { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                                { "label": "Mavi", "description": "Mavi rengine sahip olmak için tıkla!", "value:": "mavi", "emoji": { "name": "🧊"}, },
                                { "label": "Beyaz", "description": "Beyaz rengine sahip olmak için tıkla!", "value": "beyaz", "emoji": { "name": "🍥" }, },
                                { "label": "Sarı", "description": "Sarı rengine sahip olmak için tıkla!", "value": "sari", "emoji": { "name": "🍋" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "iliski", "options": [
                              { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                              { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                              { "label": "Sevgili Yapmıyorum", "value": "yapma", "emoji": { "id": "1238791601464279102" }, },
                              { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Takım** rollerinden dilediğinizi alabilirsiniz.`,
                    "components":[{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "takim", "options": [
                              { "label": "Galatasay", "value": "gs", "emoji": { id: "1217942949447602349"},},
                              { "label": "Fenerbahçe", "value": "fb", "emoji": { id: "1217943007815532729"},},
                              { "label": "Beşiktaş", "value": "bjk", "emoji": { id: "1217943068607643651"},},
                              { "label": "Trabzonspor", "value": "ts", "emoji": { id: "1217943201185267762"},},
                              { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Takım Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
    
            if (button.customId === "etkinlikmenü") {
            await ozi.delete({ timeout: 1500 });
            message.channel.send({ content: `
    :tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
    
    \` ⦁ \` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                            
    \` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
    
    **NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "etkinliks", "options": [
                                { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                                { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "ilişkimenü") {
            await ozi.delete({ timeout: 1500 });
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "iliski", "options": [
                                { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                                { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "burçmenü") {
            await ozi.delete({ timeout: 1500 });
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "burc", "options": [
                                { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                                { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                                { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                                { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                                { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                                { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                                { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                                { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                                { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                                { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                                { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                                { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "oyunmenü") {
            await ozi.delete({ timeout: 1500 });
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "games", "options": [
                              { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                              { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                              { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                              { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                              { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                              { "label": "Lethal Company", "value": "lethal", "emoji": { "id": "1217831379073761411" }, },
                              { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "1196223036232319067" }, },
                              { "label": "Naraka", "value": "naraka", "emoji": { "id": "1217832435652497449" }, },
                              { "label": "Mobile Legends", "value": "mlbb", "emoji": { "id": "1217830080911511602" }, },
                              { "label": "Euro Truck Simulator 2", "value": "ets", "emoji": { "id": "1170309579721162812" }, },
                              { "label": "Paladins", "value": "paladins", "emoji": { "id": "1217823410386632775" }, },
                              { "label": "Apex Legends", "value": "apex", "emoji": { "id": "1217823028658966549" }, },
                              { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "renkmenü") {
            await ozi.delete({ timeout: 1500 });
            message.channel.send({ content: `${cyronixStar} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "renk", "options": [
                                { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                                { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                                { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                                { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                                { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId == "iptal") {
            await ozi.delete({ timeout: 1500 });
            }
        
        }
        )}
        
    }
    
    
    
    client.on('interactionCreate', async interaction => {
    const member = await client.guilds.cache.get(allah.GuildID).members.fetch(interaction.member.user.id)
    if (!member) return;
    
    const etkinlik = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.etkinlik)
    const cekilis = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.cekilis)
    const duyuru = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.duyuru)
    const oyver = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.oyver)
    const gununsorusu = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.gununsorusu)
    const turnuvax = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.turnuva)

     
     if (interaction.customId === "etkinliks") {
            let eventsMap = new Map([
              ["etkinlik", etkinlik],
              ["cekilis", cekilis],
              ["turnuvax", turnuvax],
              ["gununsorusu", gununsorusu],
              ["duyuru", duyuru],
              ["oyver", oyver]
            ])
            let roles = [etkinlik, cekilis, duyuru, oyver, gununsorusu, turnuvax]
            var role = []
            for (let index = 0; index < interaction.values.length; index++) {
              let ids = interaction.values[index]
              let den = eventsMap.get(ids)
              var role = []
              role.push(den);
            }
            if (interaction.values[0] === "rolsil") {
                await member.roles.remove(roles)
              } else {
                if (!interaction.values.length) {
                    await member.roles.remove(roles).catch(err => {})
                  } else if (interaction.values.length > 1) {
                    await member.roles.add(roles).catch(err => {})
                  } else {
                    await member.roles.remove(roles).catch(err => {})
                    await member.roles.add(role).catch(err => {})
                  }
              }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
          } 
    
    const koç = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.koç))
    const boğa = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.boğa))
    const ikizler = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.ikizler))
    const yengeç = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.yengeç))
    const aslan = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.aslan))
    const başak = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.başak))
    const terazi = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.terazi))
    const akrep = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.akrep))
    const yay = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.yay))
    const oğlak = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.oğlak))
    const kova = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.kova))
    const balık = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.balık))
    
          if (interaction.customId === "burc") {
            let burçMap = new Map([
                ["koç", koç],
                ["boğa", boğa],
                ["ikizler", ikizler],
                ["yengeç", yengeç],
                ["aslan", aslan],
                ["başak", başak],
                ["terazi", terazi],
                ["akrep", akrep],
                ["yay", yay],
                ["oğlak", oğlak],
                ["kova", kova],
                ["balık", balık],
              ])
              let role = burçMap.get(interaction.values[0]);
              let roles = [koç, boğa, ikizler, yengeç, aslan, başak, terazi, akrep, yay, oğlak, kova, balık].map(role => role.id);
              const hasBurcRoles = member.roles.cache.some(r => roles.includes(r.id));
              
              if (interaction.values[0] === "rolsil") {
                await member.roles.remove(roles)
              } else if (role) {
                if (hasBurcRoles) {
                  await member.roles.remove(roles)
                }
                await member.roles.add(role)
              }
              interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })    
          }
    
          const csgo = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.csgo);
          const lol = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.lol);
          const valorant = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.valorant);
          const gta5 = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.gta5);
          const pubg = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.pubg);
          const fortnite = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.fortnite);
          const mlbb = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.mlbb);
          const apex = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.apex);
          const ets = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.ets);
          const rust = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.rust);
          const tft = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.Oyunlar.tft);
          
    
          if (interaction.customId === "games") {
            let GameMap = new Map([
                ["csgo", csgo],
                ["lol", lol],
                ["valorant", valorant],
                ["gta5", gta5],
                ["pubg", pubg],
                ["fortnite", fortnite],
                ["mlbb", mlbb],
                ["ets", ets],
                ["apex", apex],
                ["rust", rust],
                ["tft", tft]
              ]);
            let roles = [csgo, lol, valorant, gta5, pubg, fortnite, mlbb, ets, apex, rust, tft];
            let selectedRoles = []; // Döngü dışında boş bir dizi tanımlayın
            for (let index = 0; index < interaction.values.length; index++) {
                let ids = interaction.values[index];
                let selectedRole = GameMap.get(ids);
                selectedRoles.push(selectedRole); // Seçilen rolleri diziye ekleyin
            }
            if (interaction.values[0] === "rolsil") {
                await member.roles.remove(roles);
            } else {
                if (!interaction.values.length) {
                    await member.roles.remove(roles).catch(err => {});
                } else {
                    await member.roles.remove(roles).catch(err => {}); // Önce tüm rolleri kaldır
                    await member.roles.add(selectedRoles).catch(err => {}); // Sonra seçilen rolleri ekle
                }
            }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true });
        }
    
    const kirmizi = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.kirmizi))
    const turuncu = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.turuncu))
    const mor = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.mor))
    const pembe = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.pembe))
    const yesil = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.yesil))
    const mavi = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.mavi))
    const siyah = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.siyah))
    const beyaz = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.beyaz))
    const sari = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.sari))
    
    if (interaction.customId === "renk") {
            let color = new Map([
              ["kirmizi", kirmizi],
              ["turuncu", turuncu],
              ["mor", mor],
              ["pembe", pembe],
              ["yesil", yesil],
              ["mavi", mavi],
              ["beyaz", beyaz],
              ["sari", sari]
            ])
            let role = color.get(interaction.values[0]);
            let renkroller = [kirmizi, turuncu, mor, pembe, yesil, mavi, beyaz, sari].map(role => role.id);
            const hasRenkRole = member.roles.cache.some(r => renkroller.includes(r.id))
            if (!member.roles.cache.has(conf.boosterRolu) && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(Boost basmamışsın)**" , ephemeral: true })
            } else {
              if (interaction.values[0] === "rolsil") {
                await member.roles.remove(renkroller)
              } else if (role) {
                if (hasRenkRole) {
                  await member.roles.remove(renkroller)
                }
                await member.roles.add(role)
              }
              interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
            }
          }
    
    const sevgili = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.İlişkiler.couple)
    const yalnız = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.İlişkiler.alone)
    const yapma = await client.guilds.cache.get(allah.GuildID).roles.cache.get(ayar.İlişkiler.yapma)
    
          if (interaction.customId === "iliski") {
            let ilişki = new Map([
                ["couple", sevgili],
                ["alone", yalnız],
                ["yapma", yapma]
              ]);
              let role = ilişki.get(interaction.values[0]);
              let iliskiroller = [sevgili, yalnız, yapma].map(role => role.id);
              const hasLoveRole = member.roles.cache.some(r => iliskiroller.includes(r.id))
    
                if (interaction.values[0] === "rolsil") {
                  await member.roles.remove(iliskiroller)
                } else if (role) {
                  if (hasLoveRole) {
                    await member.roles.remove(iliskiroller)
                  }
                  await member.roles.add(role)
                }
                interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
        }

        const galatasaray = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Takımlar.galatasaray));
        const fenerbahce = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Takımlar.fenerbahce));
        const besiktas = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Takımlar.besiktas));
        const trabzonspor = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Takımlar.trabzonspor));
        
        if(interaction.customId === "takim") {
            let takimlar = new Map([
                ["gs", galatasaray],
                ["fb", fenerbahce],
                ["bjk", besiktas],
                ["ts", trabzonspor],
            ]);
            let role = takimlar.get(interaction.values[0]);
            let takimroller = [galatasaray, fenerbahce, besiktas, trabzonspor].map(role => role.id);
            const hasTeamRole = member.roles.cache.some(r => takimroller.includes(r.id));
        
            if (interaction.values[0] === "rolsil") {
                await member.roles.remove(takimroller);
            } else if (role) {
                if (hasTeamRole) {
                    await member.roles.remove(takimroller);
                }
                await member.roles.add(role);
            }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true });
        }
        
    })