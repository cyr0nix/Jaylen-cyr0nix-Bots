const { Schema, model } = require("mongoose");

const schema = Schema({
    userId: String,
    finishDate: Date
});

module.exports = model("premium", schema);
