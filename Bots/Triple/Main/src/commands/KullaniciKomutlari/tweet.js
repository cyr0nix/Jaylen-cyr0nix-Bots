const {PermissionFlagsBits, ActivityType} = require("discord.js");
const client = global.bot;
const canvafy = require('canvafy');
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const {cyronixKalp,cyronixSonsuz,cyronixCeza} = require("../../../../src/configs/emojis.json");

module.exports = {
    conf: {
      aliases: ["tw"],
      name: "tweet",
      help: "tweet",
      category: "kullanıcı",
    },
  
    run: async (client, message, args, embed) => {    
        const comment = args.join(' ');  // Assuming args contain the text to tweet.

        const avatarURL = message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });
        if (!avatarURL) {
            console.error("Failed to retrieve user avatar.");
            return; // Optionally send a message to the channel if avatar is critical
        }
        
        try {
            const tweet = await new canvafy.Tweet()
                .setTheme("dark")
                .setUser({
                    displayName: message.member.displayName,
                    username: message.member.user.username  // Changed from message.member.username
                })
                .setVerified(true)  // Assuming the user should be marked as verified
                .setComment(comment)
                .setAvatar(avatarURL)
                .build();

            message.channel.send({
                files: [{
                    attachment: tweet,
                    name: `tweet-${message.author.id}.png`
                }]
            });
            message.delete()
        } catch (error) {
            console.error("Error building the tweet image:", error);
            message.channel.send("Failed to create tweet image.");
        }
    }
}
