const mongoose = require("mongoose");

// const URL="mongodb+srv://quiz123:quiz123@cluster0.tszpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const URL = process.env.URL;

const connectDb = mongoose.connect(URL, { useNewUrlParser: true }, () => {
  console.log("Db connected");
});

module.exports = connectDb;
