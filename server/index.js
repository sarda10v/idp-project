require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Соединение прошло успешно"))
  .catch(() => console.log("Ошибка при соединении с MongoDB"));

app.use(require("./routes/todos.route"));

app.listen(process.env.PORT, () => console.log("Connected..."));
