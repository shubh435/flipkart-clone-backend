const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
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

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}`);
});
