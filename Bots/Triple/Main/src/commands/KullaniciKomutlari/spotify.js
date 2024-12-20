const {PermissionFlagsBits, ActivityType} = require("discord.js");
const client = global.bot;
const canvafy = require('canvafy');
const conf = require("../../../../src/configs/sunucuayar.json")
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixKalp,cyronixSonsuz,cyronixCeza} = require("../../../../src/configs/emojis.json");

module.exports = {
        conf: {
          aliases: ["sp"],
          name: "spotify",
          help: "spotify",
          category: "kullanıcı",
        },
      
        run: async (client, message, args, embed) => {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            if (member && member.presence && member.presence.activities && member.presence.activities.some(five => five.name == "Spotify" && five.type == ActivityType.Listening)) {
                let durum = await member.presence.activities.find(five => five.type == ActivityType.Listening);
                const spotify = await new canvafy.Spotify()
                    .setAuthor(durum.state)
                    .setAlbum(durum.assets.largeText)
                    .setImage(`https://i.scdn.co/image/${durum.assets.largeImage.slice(8)}`)
                    .setTimestamp(new Date(Date.now()).getTime() - new Date(durum.timestamps.start).getTime(), new Date(durum.timestamps.end).getTime() - new Date(durum.timestamps.start).getTime())
                    .setTitle(durum.details)
                    .setOverlayOpacity(0.7)
                    .build();

                    return message.reply({
                        files: [{
                          attachment: spotify,
                          name: `spotify-${message.member.id}.png`
                        }]
                      });                  
        } else{ return message.reply({embeds: [embed.setDescription(`> **Kullanıcı Spotify Üzerinde Şarkı Dinlemiyor!**`)] });} 
    }
}
