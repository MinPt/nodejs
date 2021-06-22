const express = require("express");
const { Template, validateTemplate} = require('../model/template');

const router = express.Router();





router.get("/", async (req, res) => {
  const templates = await Template.find().sort("isDefault");
  res.send(templates);
});

router.get("/:id", async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) return res.status(404).send("Template with such id not found");

  res.send(template);
});

router.post("/", async (req, res) => {
  const { error } = validateTemplate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let template = new Template({
    name: req.body.name,
    date: Date.now(),
    data: req.body.data,
    isDefault: req.body.isDefault,
  });

  template = await template.save();
  res.send(template);
});

router.put("/:id", async (req, res) => {
  const { error } = validateTemplate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const template = await Template.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      data: req.body.data,
      isDefault: req.body.isDefault,
    },
    { new: true }
  );

  if (!template) return res.status(404).send("Template with such id not found");

  res.send(template);
});

router.delete("/:id", async (req, res) => {
  const template = await Template.findByIdAndDelete(req.params.id);

  if (!template) return res.status(404).send("Template with such id not found");

  res.send(template);
});

module.exports = router;
