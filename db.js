const mongoose = require("mongoose");

// const URL="mongodb+srv://quiz123:quiz123@cluster0.tszpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const URL = process.env.URL;

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connectDb;
