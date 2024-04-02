require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_SERVER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })


app.use(require("./routes/users.route"));
app.use(require("./routes/todos.route"));


app.listen(process.env.PORT, () => console.log("Connected..."));
