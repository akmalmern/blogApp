const mongoose = require("mongoose");

const dataDB = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("db ga ulandi");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dataDB;
