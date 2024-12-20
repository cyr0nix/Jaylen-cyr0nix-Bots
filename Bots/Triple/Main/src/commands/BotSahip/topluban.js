const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const { cyronixRed , cyronixTik } = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "topluban",
    help: "topluban <cyr0nix/ID> <mac/ID>",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

        if (args.length < 1)
        return message.reply({ content: `Banlanacak kişilerin ID'lerini belirt.`, ephemeral: true })
       const members = args
       .filter((id) => message.guild.members.cache.has(id))
       .map((id) => message.guild.members.cache.get(id));
       if (members.length < 1)
        return message.reply({ content: `Banlanacak kişiler 1 veya 1'den az olamaz.`, ephemeral: true })
        
    const ozicik = await message.reply({ content: 
        `${members
            .map((member, idx) => `**${idx + 1}. ${member.toString()}**`)
            .join("\n")}\nBu üyeleri banlamak istiyor musun?` })

    await ozicik.react(cyronixTik);

    const filter = (reaction, user) => {
        return reaction.emoji.name === 'cyronixTik' && user.id === message.author.id;
    };
    const collector = ozicik.createReactionCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
        await ozicik.edit({ content: `${cyronixTik} ${members.length} adet kullanıcı başarıyla yasaklandı.`})
        for (const member of members) {
            if (member.bannable)
                await member.ban({ days: 7, reason: "Toplu ban" });
        }
    });

    collector.on("end", (_, reason) => {
        if (reason === "time")
            ozicik.edit({ content: `10 saniye geçtiği için işlem iptal edildi.`})
    });
    
}
}
