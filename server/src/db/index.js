const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("db connection failed", error);
  });
