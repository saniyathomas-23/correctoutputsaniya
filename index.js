const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");
require("./connection");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Add new blog
app.post("/add", async (req, res) => {
  try {
    const { title, category, img_url } = req.body;
    const newBlog = new BlogModel({ title, category, img_url });
    await newBlog.save();
    res.status(201).send({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to add blog", error });
  }
});

// Get all blogs
app.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch blogs", error });
  }
});

// Delete a blog by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete blog", error });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
