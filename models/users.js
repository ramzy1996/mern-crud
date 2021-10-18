const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
  },
  { collection: "userDetails" }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
