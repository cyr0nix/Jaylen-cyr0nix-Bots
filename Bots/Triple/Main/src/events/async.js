const { PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const conf = require("../../../src/configs/sunucuayar.json");
const { cyronixTik } = require("../../../src/configs/emojis.json");
const allah = require("../../../../../config.json");
const filtre = require("./kufurler");
const spamMap = new Map();
const spamMap1 = new Map();
const logChannelName = "spam_log";
const client = global.bot;
const chatGuardDB = require("../../../src/schemas/chatGuard")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const ms = require("ms");

module.exports = async (message) => {

    if (message.channel.type === ChannelType.DM) {
        if (message.author.bot) {
            return; // Eğer mesaj bir bottan geliyorsa işlem yapma
        }
        if (!message.content && !message.attachments.size) {
            return; // Metin içermeyen mesajlar için erken çıkış yapar
        }

        const description = message.content ? "Mesaj İçeriği:\n" + message.content.substring(0, 4096) : 'Boş Mesaj';

        const DMembed = new EmbedBuilder()
            .setTitle('DM BAK APTAL CYRONIX!')
            .setDescription(`\`\`\`${description}\`\`\``)
            .addFields({ name: 'Gönderen', value: `${message.author.tag} (${message.author.id})` })
            .setColor('#0099ff')
            .setTimestamp();

        client.users.fetch(allah.realOwner).then(user => {
            message.react(cyronixTik);
            user.send({ embeds: [DMembed] });
        }).catch(err => console.error("Bot sahibine mesaj gönderilirken bir hata oluştu:", err));
    }
    /*if (message.author.id === '1208428060978708590') {
        message.react('1223845072764665946');
    }*/

    if (message.author.bot) return;
    if (!message.guild || !message.member) return;

    if (message.content === "Gayronix") {
        message.react('1224863256393416795')
    }
    if (message.content === "gayronix") {
        message.react('1224863256393416795')
    }
    if (message.content === "sa") {
        message.reply({ content: "as" })
    }
    if (message.content === "SA") {
        message.reply({ content: "AS" })
    }
    if (message.content === "Sa") {
        message.reply({ content: "As" })
    }
    if (message.content === "selam") {
        message.reply({ content: "Selam" })
    }
    if (message.content === "Selam") {
        message.reply({ content: "Selam" })
    }
    if (message.content === "Selamun Aleyküm") {
        message.reply({ content: "Aleyküm Selam" })
    }
    if (message.content === "selamun aleyküm") {
        message.reply({ content: "Aleyküm Selam" })
    }
    if (message.content === "Selamun aleyküm") {
        message.reply({ content: "Aleyküm Selam" })
    }
    if (message.content === "<@1016751053368201256>") {
        message.reply({ content: "Siz bana yazın ben iletirim :D" })
    }
    if (message.content === ".anan") {
        message.channel.send({ content: "Anneme sövme piç" })
    }
    if (message.content === "<@1217973841150742639>") {
        message.reply({ content: "Buyrun benim ;)! " })
    }
    if (message.content === "Sea") {
        message.reply({ content: "Ase" })
    }
    if (message.content === "sea") {
        message.reply({ content: "ase" })
    }

    if (conf.onlyFans.includes(message.channel.id) && message.attachments.size === 0) {
        message.delete()
            .then(() => {
                message.channel.send(`<@${message.author.id}> Bu kanallarda sadece resim gönderebilirsiniz.`).then(sentMsg => {
                    setTimeout(() => sentMsg.delete().catch(), 10000);
                });;
            })
            .catch(console.error);
    }

    if (await client.checkPermission(client, message.author.id, "full") || await client.checkPermission(client, message.author.id, "chatguard")) return;

    const chatGuardSettings = await chatGuardDB.findOne({ guildID: message.guild.id });

    const isAdProtectionEnabled = chatGuardSettings ? chatGuardSettings.reklamEngel : false;
    const isCurseProtectionEnabled = chatGuardSettings ? chatGuardSettings.kufurEngel : false;
    const isFloodProtectionEnabled = chatGuardSettings ? chatGuardSettings.floodEngel : false;
    const isSpamProtectionEnabled = chatGuardSettings ? chatGuardSettings.spamEngel : false;

    const messageWords = message.content.toLowerCase().split(/\s+/);
    const containsCurses = filtre.Curses.some(curse => messageWords.includes(curse.toLowerCase()));

    const Caps = (message.content.match(/[A-ZĞÇÖIÜ]/gm) || []).length;
    if ((allah.Guard.capsEngel) && (Caps / message.content.length) >= 0.7) {
        await message.delete();
        return await message.channel.send(`<@${message.author.id} Ebesinin ki kanka böyük böyük nereye varcan aq.`).then(sentMsg => {
            setTimeout(() => sentMsg.delete().catch(console.error), 10000);
        });
    }

    if ((message.mentions.roles.size + message.mentions.users.size + message.mentions.channels.size) >= 7) {
        await message.delete();
        return message.channel.send(`<@${message.author.id}> Kanka bu yetmez bütün sunucuyu etiketle. Etiketleme lan herkesi.`).then(sentMsg => {
            setTimeout(() => sentMsg.delete().catch(console.error), 10000);
        });
    }

    if (message.content && message.content.length && message.content.length >= 350) {
        await message.delete();
        return message.channel.send(`<@${message.author.id}> Kanka kendine gel lütfeeen. Sen roman yazarı değilsin. Sen discorddasın.`).then(sentMsg => {
            setTimeout(() => sentMsg.delete().catch(console.error), 10000);
        });
    }
    if (isCurseProtectionEnabled) {
        if (containsCurses) {
            if (message.member.permissions.has(PermissionFlagsBits.Administrator) || message.member.permissions.has(PermissionFlagsBits.BanMembers)) return;
            await message.delete();
            message.channel.send(`${message.author}, Kanka yani sövme ya çok zor değil gözünü sevim. İlla bende mi söveyim onu mu istiyon.`).then(sentMsg => {
                setTimeout(() => sentMsg.delete().catch(console.error), 10000);
            });
            message.delete();
            return;
        }
    }
    if (isAdProtectionEnabled) {
        if (filtre.Ads.some(ad => message.content.includes(ad))) {
            if (message.member.permissions.has(PermissionFlagsBits.Administrator) || message.member.permissions.has(PermissionFlagsBits.BanMembers)) return;
            try {
                await client.penalize(message.guild.id, message.member.id, "CHAT-MUTE", true, message.author.id, "Reklam yapmak.", true, Date.now() + 3600000);
                await message.delete();
                message.channel.send(`${message.author}, Sen kim köpek reklam atmak lan it. Reklamdan dolayı 1 saat chat mute cezası aldın.`);
            } catch (error) {
                console.error('Chat mute uygulanırken bir hata oluştu:', error);
            }
            message.delete();
            return;
        }
    }

    const currentTime1 = Date.now();
    const timeLimit1 = 7000;
    const maxMessages1 = 6;
    const timeoutDuration1 = 2 * 60 * 1000;
    if (isFloodProtectionEnabled) {
        // Flood Protection kısmında timeout yerine chat mute uygulanması
        if (!spamMap1.has(message.author.id)) {
            spamMap1.set(message.author.id, { lastMessageTime: currentTime1, messageCount: 1, messages: [message] });
        } else {
            if (message.member.permissions.has(PermissionFlagsBits.Administrator) || message.member.permissions.has(PermissionFlagsBits.BanMembers)) return;
            const userData = spamMap1.get(message.author.id);

            if (currentTime1 - userData.lastMessageTime < timeLimit1) {
                userData.messages.push(message);
                userData.messageCount++;

                if (userData.messageCount >= maxMessages1) {
                    try {
                        await client.penalize(message.guild.id, message.member.id, "CHAT-MUTE", true, message.author.id, "Flood yapmak.", true, Date.now() + timeoutDuration1);
                        message.channel.send(`${message.author}, Sohbet kanallarını anasın ıhmm pardon flood sebebiyle \`2 dakika\` süresince chat mute cezası aldın.`);
                        userData.messages.forEach(msg => msg.delete().catch(console.error));
                        const logChannel = message.guild.channels.cache.find(channel => channel.name === logChannelName && channel.type === ChannelType.GuildText);
                        if (logChannel) {
                            logChannel.send(`${message.author}, flood yaptığı için 2 dakika chat mute cezası aldı.`);
                        } else {
                            console.log(`${logChannelName} isimli kanal bulunamadı.`);
                        }
                    } catch (error) {
                        console.error('Chat mute uygulanırken bir hata oluştu:', error);
                    }
                    spamMap1.set(message.author.id, { lastMessageTime: currentTime1, messageCount: 0, messages: [] });
                    return;
                }
            } else {
                userData.messageCount = 1;
                userData.lastMessageTime = currentTime1;
                userData.messages = [message];
            }

            spamMap1.set(message.author.id, userData);
        }
    }

    const exemptChannels = ['1234586939135361086', '1235999707176632372', '1234586941274722456'];
    const currentTime = Date.now();
    const timeLimit = 30000;
    const maxMessages = 5;
    const timeoutDuration = 10 * 60 * 1000;
    if (isSpamProtectionEnabled) {
        if (!spamMap.has(message.author.id)) {
            if (exemptChannels.includes(message.channel.id)) return;
            spamMap.set(message.author.id, { lastMessageTime: currentTime, messageCount: 1, messages: [message], lastMessageContent: message.content });
        } else {
            if (exemptChannels.includes(message.channel.id)) return;
            if (message.member.permissions.has(PermissionFlagsBits.Administrator) || message.member.permissions.has(PermissionFlagsBits.BanMembers)) return;
            const userData1 = spamMap.get(message.author.id);

            if (currentTime - userData1.lastMessageTime < timeLimit && userData1.lastMessageContent === message.content) {
                userData1.messages.push(message);
                userData1.messageCount++;
                if (userData1.messageCount >= maxMessages) {
                    try {
                        await client.penalize(message.guild.id, message.member.id, "CHAT-MUTE", true, message.author.id, "Spam yapmak.", true, Date.now() + timeoutDuration);
                        message.channel.send(`${message.author}, Sohbet kanallarını anasın ıhmm pardon spam sebebiyle \`10 dakika\` süresince chat mute cezası aldın.`);
                        userData1.messages.forEach(msg => msg.delete().catch(console.error));
                        const logChannel = message.guild.channels.cache.find(channel => channel.name === logChannelName && channel.type === ChannelType.GuildText);
                        if (logChannel) {
                            logChannel.send(`${message.author}, spam yaptığı için 10 dakika chat mute cezası aldı.`);
                        } else {
                            console.log(`${logChannelName} isimli kanal bulunamadı.`);
                        }
                    } catch (error) {
                        console.error('Chat mute uygulanırken bir hata oluştu:', error);
                    }
                    spamMap.set(message.author.id, { lastMessageTime: currentTime, messageCount: 0, messages: [], lastMessageContent: '' });
                    return;
                }
            } else {
                userData1.messageCount = 1;
                userData1.lastMessageTime = currentTime;
                userData1.messages = [message];
                userData1.lastMessageContent = message.content;
            }

            spamMap.set(message.author.id, userData1);
        }
    }
};

module.exports.conf = {
    name: "messageCreate"
};