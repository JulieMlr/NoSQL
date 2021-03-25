const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProjectSchema = new schema({
  name: { type: String, required: "nom obligatoire" },
  goal: { type: Number, required: "goal obligatoire "},
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

/*

nous avons décidé de ne pas sauvegarder le nombre de contributeurs ainsi que le nombre de personnes qui ont aimés le 
projet et la somme d'argent récoltée car tout ça est récupérable depuis les données de user, il suffit juste de faire 
des requetes pour avoir les resultats demandés !

*/