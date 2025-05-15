const express = require("express");
const app = express();
require("dotenv").config();
const dataDB = require("./db/dataDB");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const adminRouter = require("./routes/adminRouter");
const errorHandler = require("./middlware/error");
const cors = require("cors");
const path = require("path");
// ***************************************************
app.use(cookieParser());
app.use(express.json());
dataDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend manzili
    credentials: true, // Cookie’lar uchun
  })
);
// ****************************************************
app.use("/category", categoryRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use(errorHandler);
// ***************************************************
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server ${port}-portda ishladi`);
});
