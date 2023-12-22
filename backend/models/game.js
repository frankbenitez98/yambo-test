const { Schema, model } = require("mongoose");

const GameSchema = Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  genres: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = model("Game", GameSchema);
