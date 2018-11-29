const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth");

const Video = require("../models/video");

const router = express.Router();

router.use(authMiddleware);

var storageVideos = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "/var/www/html/my/api/uploads");
	},
	filename: function(req, file, cb) {
		cb(null, "video-" + Date.now() + path.extname(file.originalname));
	}
});

var uploadVideos = multer({storage: storageVideos});

router.post("/:userId", uploadVideos.single("video"), async (req, res) => {
	try {
		const {userId} = req;
		const {title, description, likes, isPublic} = req.body;
		const {path} = req.file;

		const video = await Video.create({
			title,
			description,
			likes,
			isPublic: isPublic === "true",
			user: userId,
			video: path
		});

		await video.save();

		return res.send({video});
	} catch (err) {
		return res.status(400).send({error: "Error updating user video"});
	}
});

router.post("/like/:videoId", async (req, res) => {
	try {
		const video = await Video.findById(req.params.videoId);

		video.set({likes: video.likes + 1});

		await video.save();

		return res.send(video);
	} catch (error) {
		return res.status(400).send({error: "Error on like video"});
	}
});

module.exports = app => app.use("/videos", router);
