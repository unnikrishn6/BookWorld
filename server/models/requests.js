const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('requests', userSchema);