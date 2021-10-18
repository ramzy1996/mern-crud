const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;

// databse connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("Database connected successfully"));

// port listen
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

// route
app.use("/users", router);
