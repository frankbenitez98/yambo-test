const { response } = require("express");
const axios = require("axios");
const Game = require("../models/game");
const api_key = process.env.API_KEY;

const findAll = async (req, res = response) => {
  let list;
  try {
    list = await Game.find({}).select("-__v");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
  res.status(200).json({
    ok: true,
    data: list,
  });
};

const seed = async (req, res = response) => {
  try {
    await Game.deleteMany({});
    const { data } = await axios.get(`https://api.rawg.io/api/games?key=${api_key}&platforms=187&page_size=30&page=1`);
    const list = await Promise.all(
      data.results.map(async (game) => {
        const gameDetails = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${api_key}`);
        return {
          title: game.name || game.id,
          genres: game.genres.map((genre) => genre.name).join(", "),
          image: game.background_image,
          description: gameDetails.data.description,
        };
      })
    );
    await Game.insertMany(list);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "plase talk with the admin",
    });
  }
  res.status(200).json({
    ok: true,
    msg: "seed executed",
  });
};

module.exports = { findAll, seed };
