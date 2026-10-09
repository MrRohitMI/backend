const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
app.use(express.urlencoded({ extended: true }));
mongoose.connect(mongoURI).then(() => {
  console.log("db is connected");
});
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);
const User = mongoose.model("users", userSchema);
app.get("/api/users", async (req, res) => {
  let data = await User.find({});
  return res.json(data);
});
app.post("/api/users", async (req, res) => {
  let { name, email } = req.body;
  let data = await User.create({
    name: name,
    email: email,
  });
  console.log(data);
  return res.json("new user added!");
});
app.delete("/api/users/:id", async (req, res) => {
  let id = req.params.id;
  let user = await User.findByIdAndDelete(id);
  return res.json(user);
});
app.patch("/api/users/:id", async (req, res) => {
  let id = req.params.id;
  let user = await User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
  });
  return res.json(user);
});
app.listen("8000", () => {
  console.log("server is running on port 8000");
});
