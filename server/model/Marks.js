const mongoose = require("mongoose");
const { Schema } = mongoose;

const markSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  exam: {
    type: String,
    required: true,
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  department: {
    type: String,
  },
  year: {
    type: Number,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

const Mark = mongoose.model("Mark", markSchema);
module.exports = Mark;
