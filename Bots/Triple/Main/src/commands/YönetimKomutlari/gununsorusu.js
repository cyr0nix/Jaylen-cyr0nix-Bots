const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require('croxydb');
const conf = require("../../../../src/configs/sunucuayar.json");
module.exports = {
    conf: {
      aliases: ["gs"],
      name: "gününsorusu",
      help: "gs ekle/çıkar/liste <Soru>",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed, prefix) => {

        if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
        {message.react(cyronixRed)
        return
        }

        const action = args[0]?.toLowerCase();

        switch (action) {
            case 'ekle':
                const questionToAdd = args.slice(1).join(' ');
                if (!questionToAdd) return message.channel.send('Lütfen eklemek için bir soru girin.').then((e) => setTimeout(() => { e.delete(); }, 5000));
                db.push('questions', questionToAdd);
                message.channel.send('Soru başarıyla eklendi.');
                break;
            
            case 'liste':
                const questions = db.get('questions') || [];
                if (questions.length === 0) return message.channel.send('Listede hiç soru yok.').then((e) => setTimeout(() => { e.delete(); }, 5000));
                
                const questionsList = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
                message.channel.send(`**Sorular:**\n${questionsList}`);
                break;

            case 'çıkar':
                const indexToRemove = parseInt(args[1], 10) - 1;
                if (isNaN(indexToRemove)) return message.channel.send('Lütfen geçerli bir sayı girin.').then((e) => setTimeout(() => { e.delete(); }, 5000));

                let currentQuestions = db.get('questions') || [];
                if (indexToRemove < 0 || indexToRemove >= currentQuestions.length) {
                    return message.channel.send('Bu numarada bir soru yok.');
                }

                currentQuestions.splice(indexToRemove, 1);
                db.set('questions', currentQuestions);
                message.channel.send('Soru başarıyla çıkarıldı.');
                break;

            default:
                message.channel.send({ content: `\`${prefix}gs <ekle/çıkar/liste>\`` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
    }
};
