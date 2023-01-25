const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  postId: {
    type: String,
  },
  postPic: {
    type: String,
    default:
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png",
  },
  typeOfCategory: {
    type: String,
    required: true,
    enum: [
      "grinders",
      "strains",
      "cartridges",
      "edibles",
      "vapes",
      "e-cigs",
      "papers",
      "pre-rolls",
      "trays",
      "top",
    ],
  },
  quality: {
    type: String,
    required: false,
    enum: ["top-shelf", "mid-shelf", "low-shelf"],
  },
  recommended: {
    type: Boolean,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
