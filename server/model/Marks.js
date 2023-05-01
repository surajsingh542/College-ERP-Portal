const mongoose = require("mongoose");
const { Schema } = mongoose;

const markSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
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
  semester: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

const Mark = mongoose.model("Mark", markSchema);
module.exports = Mark;
