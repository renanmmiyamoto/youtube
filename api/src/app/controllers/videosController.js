const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth");

const Video = require("../models/video");

const router = express.Router();

router.use(authMiddleware);

var storageVideos = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "/var/www/html/my/youtube/api/src/uploads");
	},
	filename: function(req, file, cb) {
		cb(
			null,
			file.originalname.split(".")[0] +
				"-" +
				Date.now() +
				path.extname(file.originalname)
		);
	}
});

var uploadVideos = multer({storage: storageVideos});

router.get("/", async (req, res) => {
	try {
		const videos = await Video.find()
			.populate("user")
			.sort("-createdAt");

		videos.filter(video => {
			if (video.isPublic) {
				return video;
			}
		});

		return res.send({videos});
	} catch (error) {
		return res.status(400).send({error: "Error getting videos"});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const video = await Video.findById(req.params.id).populate("user");

		if (!video.isPublic) {
			throw error;
		}

		return res.send({video});
	} catch (error) {
		return res.status(400).send({error: "Error getting video"});
	}
});

router.post(
	"/:userId",
	uploadVideos.fields([
		{name: "video", maxCount: 1},
		{name: "thumbnail", maxCount: 1}
	]),
	async (req, res) => {
		try {
			const {userId} = req;
			const {title, description, likes, isPublic} = req.body;

			const video = await Video.create({
				title,
				description,
				likes,
				isPublic: isPublic === "true",
				user: userId,
				video: req.files.video[0].filename,
				thumbnail: req.files.thumbnail[0].filename
			});

			await video.save();

			return res.send({video});
		} catch (err) {
			return res.status(400).send({error: "Error updating user video"});
		}
	}
);

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
