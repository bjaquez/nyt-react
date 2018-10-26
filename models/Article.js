const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  name: {type: String, unique: true, required: true},
  url: {type: String, unique: true, required: true},
  created_date:{type: Date, required: true, default: Date.now} 
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;