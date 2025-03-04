const express = require("express");
const app = express();
require("dotenv").config();
const dataDB = require("./db/dataDB");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlware/error");
// ***************************************************
app.use(cookieParser());
app.use(express.json());
dataDB();
// ****************************************************
app.use("/user", userRouter);
app.use(errorHandler);
// ***************************************************
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server ${port}-portda ishladi`);
});
