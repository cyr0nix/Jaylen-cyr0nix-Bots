const client = global.bot;
const conf = require("../.././../src/configs/sunucuayar.json");
const { Events } = require("discord.js");

client.on(Events.GuildMemberUpdate, (oldMember,newMember) => {

    const oldBoost = oldMember.premiumSince;
    const newBoost = newMember.premiumSince;

    if (!oldBoost && newBoost) {
        
        const channelID = `${conf.boosterLog}`;
        const channel = client.channels.cache.get(channelID);
        if (!channel) return;

        const totalBoost = newMember.guild.premiumSubscriptionCount;
        channel.send(`> ${newMember} **sunucumuzu boost basarak desteklediğin için teşekkürler** 🚀 \n> Toplam boost sayımız: **${totalBoost}**`)
    }
});
