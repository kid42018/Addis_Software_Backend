const express = require("express");
const mongoose = require("mongoose");
const SongRoutes = require("./routes/song_routes");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api", SongRoutes);
app.use("*",(req,res)=>res.status(404).send("404 not found"))
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true }
  ).then(() => {
    console.log("DB connection successful");
    app.listen(port , () => {
        console.log(`server is listening on port ${port}`);
      });
  }).catch((e) => {
    console.log(e)
    console.log("DB connection failed");
  });