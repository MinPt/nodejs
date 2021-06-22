const express = require("express");
const mongoose = require('mongoose');
const Joi = require("joi");

const router = express.Router();

const Template = mongoose.model("Template", new mongoose.Schema({
  name: String,
  userId: mongoose.ObjectId,
  data: { frame: [{}], idx: Number},
  date: { type: Date, default: Date.now },
  isDefault: { type: Boolean, default: false },
}));

function validateTemplate(template) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    data: Joi.object({
      frame: Joi.array().items(Joi.object()),
      idx: Joi.number().min(0).required(),
    }),
    date: Joi.date().required(),
    isDefault: Joi.boolean(),
  });

  return schema.validate(genre);
}

router.get('/', async (req, res) => {
  const templates = await Template.find().sort('isDefault');
  res.send(templates);
})

router.post('/', async (req, res) => {
  const { error } = validateTemplate(req.body)

  const templates = await Template.find().sort('isDefault');
  res.send(templates);
})