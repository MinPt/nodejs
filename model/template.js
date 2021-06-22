const mongoose = require("mongoose");
const Joi = require("joi");

const Template = mongoose.model(
  "Template",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 40 },
    data: { frame: [{}], idx: Number },
    date: { type: Date, default: Date.now() },
    isDefault: { type: Boolean, default: false },
  })
);

function validateTemplate(template) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    data: Joi.object({
      frame: Joi.array().items(Joi.object()),
      idx: Joi.number().min(0).required(),
    }),
    date: Joi.date(),
    isDefault: Joi.boolean(),
  });

  return schema.validate(template);
}

exports.Template = Template;
exports.validateTemplate = validateTemplate;
