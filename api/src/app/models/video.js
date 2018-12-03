const mongoose = require("../../database");

const VideoSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	likes: {
		type: Number,
		default: 0
	},
	isPublic: {
		type: Boolean,
		require: true
	},
	video: {
		type: String,
		require: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	},
	thumbnail: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
