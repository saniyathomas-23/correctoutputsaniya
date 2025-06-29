const mongoose = require("mongoose");

// Blog schema
const schema = mongoose.Schema({
  title: String,
  category: String,
  img_url: String,
});

// Model creation
const BlogModel = mongoose.model("blog", schema);
module.exports = BlogModel;
