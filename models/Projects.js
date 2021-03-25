const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProjectSchema = new schema({
  name: { type: String, required: "nom obligatoire" },
  goal: { type: Number },
  dateStart: { type: Date, default: Date.now() },
  dateEnd: { type: Date },
  categories: [String],
  autors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  description: { type: String, required: "description obligatoire" },
  pictures: [String],
  videos: [String],
});

module.exports = mongoose.model("project", ProjectSchema);
