const express = require("express");
const router = express.Router();
const multer = require("multer");
const Users = require("../models/users");

// upload image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// get all users
router.get("/", (req, res) => {
  Users.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// add user
router.post("/add", upload.single("userImage"), (req, res) => {
  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    userImage: req.file.originalname,
  });
  newUser
    .save()
    .then(() => res.json("New user added successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// find user by id
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// find user by id and update
router.put("/update/:id", upload.single("userImage"), (req, res) => {
  Users.findById(req.params.id).then((user) => {
    user.name = req.body.name;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.userImage = req.file.originalname;

    user
      .save()
      .then(() => res.json("User is updated successfully"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });
});

// find user by id and delete
router.delete("/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("User is deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
