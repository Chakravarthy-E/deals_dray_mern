const express = require("express");
const cors = require("cors");
require("dotenv/config");
require("./db");
const authRouter = require("./routers/auth");
const employeeRouter = require("./routers/employee");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/employee", employeeRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("port running on " + PORT);
});
