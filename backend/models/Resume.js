const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filePath: String, // Path where resume is saved
  extractedData: Object // Store extracted skills/experience
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);

