const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming 'User' is the model for user data
  filename: { type: String, required: true },
  //   path: { type: String, required: true },
  //   size: { type: Number, required: true },
  //   uuid: { type: String, required: true },
  uniqueCode: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
