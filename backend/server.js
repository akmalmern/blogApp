const express = require("express");
const app = express();
require("dotenv").config();
const dataDB = require("./db/dataDB");
const userRouter = require("./routes/userRouter");
app.use(express.json());
dataDB();
app.use("/user", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server ${port}-portda ishladi`);
});
