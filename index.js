const express = require('express');
const helmet = require("helmet");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/Glee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Cannot connect to mongodb"));

  app.use(express.json());
  app.use(helmet());