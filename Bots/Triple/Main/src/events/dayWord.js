const conf = require("../../../src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

// Emoji listesi
const emojis = [
    "1232280889078054954", "1232282491176357939", "1232281035539087442", "1232282538895085618", 
    "1232281976569069590", "1232282906337218572", "1233336265299197972", "1232281848021909554", 
    "1232283094933966928", "1237516634151849984", "1232099248208871424"
];

// Rastgele bir emoji seçmek için fonksiyon
function getRandomEmoji(emojis) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

let userMessageCount = 0;

module.exports = async (message) => {
    const channelIds = ['1238188976456732692'];
    if (channelIds.includes(message.channel.id) && !message.author.bot) {
        const emoji = getRandomEmoji(emojis); 
        await message.react(emoji); 
    }
    if (message.author.id === "837022781098426378") {
        await message.react('1238494530739634196');
        userMessageCount++;

        if (userMessageCount % 100 === 0) {
            await message.channel.send('Kado İstedi onun chati sikti lafı etmeyin...');
        }
    }
};

module.exports.conf = {
  name: "messageCreate",
};
