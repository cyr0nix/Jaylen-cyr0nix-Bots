const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatGuardSchema = new Schema({
  guildID: String,
  reklamEngel: {
    type: Boolean,
    default: false
  },
  spamEngel: {
    type: Boolean,
    default: false
  },
  floodEngel: {
    type: Boolean,
    default: false
  },
  kufurEngel: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('chatGuard', chatGuardSchema);