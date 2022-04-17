const express = require("express");
const connectDb = require("./db");
const cors = require("cors");
const router = require("./router/router");

const app = express();
connectDb;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, "client", "build")));
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
