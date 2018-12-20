const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth");

const User = require("../models/user");
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

		return res.send({videos});
	} catch (error) {
		return res.status(400).send({error: "Error getting videos"});
	}
});

router.get("/user/:userId", async (req, res) => {
	try {
		const videos = await User.findById(req.params.userId)
			.populate("videos")
			.sort("-createdAt");

		return res.send(videos);
	} catch (error) {
		return res.status(400).send({error: "Error getting videos"});
	}
});

router.get("/liked/:userId", async (req, res) => {
	try {
		const videos = await User.findById(req.params.userId)
			.populate("likedVideos")
			.sort("-createdAt");

		return res.send(videos);
	} catch (error) {
		return res.status(400).send({error: "Error getting videos"});
	}
});

router.get("/watched/:userId", async (req, res) => {
	try {
		const videos = await User.findById(req.params.userId)
			.populate("watchedVideos")
			.sort("-createdAt");

		return res.send(videos);
	} catch (error) {
		return res.status(400).send({error: "Error getting videos"});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const video = await Video.findById(req.params.id).populate("user");

		const user = await User.findById(video.user._id).select("+password");

		// If the user already liked the video, we're remove the like;
		if (user.watchedVideos.indexOf(video.user._id) === -1) {
			user.watchedVideos.push(video.user._id);
			video.set({views: video.views + 1});

			await user.save();
			await video.save();
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
			const {userId} = req.params;
			const {title, description, likes} = req.body;

			const user = await User.findById(userId).select("+password");

			const video = await Video.create({
				title,
				description,
				likes,
				user: userId,
				video: req.files.video[0].filename,
				thumbnail: req.files.thumbnail[0].filename
			});

			user.videos.push(video._id);

			await user.save();
			await video.save();

			return res.send({video});
		} catch (err) {
			return res.status(400).send({error: "Error updating user video"});
		}
	}
);

router.post("/like/:videoId/:userId", async (req, res) => {
	try {
		const video = await Video.findById(req.params.videoId).populate("user");

		const user = await User.findById(req.params.userId).select("+password");

		// If the user already liked the video, we're remove the like;
		if (user.likedVideos.indexOf(req.params.videoId) !== -1) {
			user.likedVideos.splice(
				user.likedVideos.indexOf(req.params.videoId),
				1
			);

			video.set({likes: video.likes - 1});

			await video.save();
			await user.save();

			return res.send(video);
		}

		video.set({likes: video.likes + 1});
		user.likedVideos.push(req.params.videoId);

		await video.save();
		await user.save();

		return res.send(video);
	} catch (error) {
		return res.status(400).send({error: "Error on like video"});
	}
});

module.exports = app => app.use("/videos", router);
