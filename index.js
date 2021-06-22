const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const templates = require("./routes/templates");
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
app.use("/api/templates", templates);

app.get("/", (req, res) => {
  res.send("You've got one");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));