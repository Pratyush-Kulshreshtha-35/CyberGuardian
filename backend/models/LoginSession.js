const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date }
});

module.exports = mongoose.model('LoginSession', loginSessionSchema);
