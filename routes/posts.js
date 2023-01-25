var express = require("express");
var router = express.Router();
const Post = require("../models/Post");
const fileUploader = require("../middleware/cloudinary");
const { isAuthenticated } = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Posts Page" });
});

//C
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      creatorId: req.user.id,
      postId: req.body.postId,
      postPic: req.body.postPic,
      typeOfCategory: req.body.typeOfCategory,
      quality: req.body.quality,
      recommended: req.body.recommended,
    });
    res.json(newPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.post(
  "/add-picture",
  fileUploader.single("imageUrl"),
  async (req, res) => {
    res.json(req.file);
  }
);

//R
router.get("/all", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("creatorId");
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-grinders", async (req, res) => {
  try {
    const allGrinders = await Post.find({ typeOfCategory: "grinders" });
    res.json(allGrinders);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-trays", async (req, res) => {
  try {
    const alltrays = await Post.find({ typeOfCategory: "trays" });
    res.json(alltrays);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-papers", async (req, res) => {
  try {
    const allPapers = await Post.find({ typeOfCategory: "papers" });
    res.json(allPapers);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-strains", async (req, res) => {
  try {
    const allStrains = await Post.find({ typeOfCategory: "strains" });
    res.json(allStrains);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-edibles", async (req, res) => {
  try {
    const allEdibles = await Post.find({ typeOfCategory: "edibles" });
    res.json(allEdibles);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-prerolls", async (req, res) => {
  try {
    const allPreRolls = await Post.find({ typeOfCategory: "pre-rolls" });
    res.json(allPreRolls);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-vapes", async (req, res) => {
  try {
    const allVapes = await Post.find({ typeOfCategory: "vapes" });
    res.json(allVapes);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-ecigs", async (req, res) => {
  try {
    const allEcigs = await Post.find({ typeOfCategory: "e-cigs" });
    res.json(allEcigs);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-cartridges", async (req, res) => {
  try {
    const allCartridges = await Post.find({ typeOfCategory: "cartridges" });
    res.json(allCartridges);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/all-top", async (req, res) => {
  try {
    const allTop = await Post.find({ typeOfCategory: "top" });
    res.json(allTop);
  } catch (err) {
    res.json(err.message);
  }
});

// R
router.get("/find-post/:postId", async (req, res) => {
  try {
    const foundPost = await Post.find({
      _id: req.params.postId,
    }).populate("creatorId");
    res.json(foundPost);
  } catch (err) {
    res.json(err.message);
  }
});

// U
router.post("/update/:postId", isAuthenticated, async (req, res) => {
  try {
    let updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { ...req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err.message);
  }
});

//D
router.delete("/delete/:postId", isAuthenticated, async (req, res) => {
  try {
    const removedComment = await Post.findOneAndDelete(
      {
        _id: req.params.postId,
        creatorId: req.user.id,
      },
      { new: true }
    );
    res.json(removedComment);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
