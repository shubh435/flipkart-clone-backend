const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
//env vriables
env.config();
const path = require("path");

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
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}`);
});
