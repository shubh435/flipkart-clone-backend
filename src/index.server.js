const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//routes
const authRoutes = require("./routes/auth");
//env vriables
env.config();

//mongodb connection

mongoose
  .connect(`mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  });

app.use(bodyParser());

app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`serve is running on the port ${process.env.PORT}`);
});
