const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: { type: String, required: "nom obligatoire" },
  surname: { type: String, required: "prenom obligatoire" },
  email: { type: String, required: "email obligatoire" },
  password: { type: String, required: "mot de passe obligatoire" },
  projectLiked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  projectParticipated: [{
    montant: Number,
    projectId: String
  }],
});

module.exports = mongoose.model("user", UserSchema);
