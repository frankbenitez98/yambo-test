const express = require("express");
const { check } = require("express-validator");
const { fieldValidate } = require("../middlewares/field-validators");
const { seed, findAll } = require("../controllers/games");

const router = express.Router();

router.get("/", findAll);

router.get("/seed", seed);

module.exports = router;
