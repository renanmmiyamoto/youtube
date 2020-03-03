const mongoose = require("../../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	avatar: {
		type: String
	},
	bornDate: {
		type: Date,
		required: true
	},
	videos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	followers: {
		type: Number,
		default: 0
	},
	likedVideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	watchedVideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	passwordResetToken: {
		type: String,
		select: false
	},
	passwordResetExpires: {
		type: Date,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre("save", async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
