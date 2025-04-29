const { Schema, model } = require("mongoose");
const { Events } = require("discord.js");
const client = global.client;

client.on(Events.MessageCreate, async (message) => {

    if (message.author.id === '972955971171274822') {
        message.react('🤭')
    }
});

const schema = Schema({
    userId: String,
    finishDate: Date
});

module.exports = model("premium", schema);
