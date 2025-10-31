const mongoose = require('mongoose');

const proctorEventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    examId: { type: String },
    type: { type: String, required: true },
    details: { type: Object },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

module.exports = mongoose.model('ProctorEvent', proctorEventSchema);


