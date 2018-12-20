const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const authConfig = require("../../config/auth");

const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400
	});
}

var storageVideos = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "/var/www/html/my/youtube/api/src/uploads");
	},
	filename: function(req, file, cb) {
		cb(null, "avatar-" + Date.now() + path.extname(file.originalname));
	}
});

var uploadVideos = multer({storage: storageVideos});

router.post("/register", uploadVideos.single("avatar"), async (req, res) => {
	const {email} = req.body;

	try {
		if (await User.findOne({email}))
			return res.status(400).send({error: "User already exists"});

		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			bornDate: new Date(req.body.bornDate),
			videos: [],
			avatar: req.file.filename,
			following: [],
			followers: 0,
			likedVideos: []
		});

		user.password = undefined;

		return res.send({
			user,
			token: generateToken({id: user.id})
		});
	} catch (err) {
		return res.status(400).send({error: "Registration failed"});
	}
});

router.post("/authenticate", async (req, res) => {
	const {email, password} = req.body;

	const user = await User.findOne({email: email}).select("+password");

	if (!user) return res.status(400).send({error: "User not found"});

	if (!(await bcrypt.compare(password, user.password)))
		return res.status(400).send({error: "Invalid password"});

	user.password = undefined;

	res.send({
		user,
		token: generateToken({id: user.id})
	});
});

router.post("/follow/:userId", async (req, res) => {
	const userFollower = await User.findById(req.params.userId).select(
		"+password"
	);
	const userFollowing = await User.findById(req.body.id).select("+password");

	/* userFollowing.set({following: []});
	userFollower.set({followers: 0}); */

	// If the user already follow the channel, we're remove the following list;
	if (userFollowing.following.indexOf(req.params.userId) !== -1) {
		userFollowing.following.splice(
			userFollowing.following.indexOf(req.params.userId),
			1
		);

		userFollower.set({followers: userFollower.followers - 1});

		await userFollowing.save();
		await userFollower.save();

		return res.send(userFollower);
	}

	userFollower.set({followers: userFollower.followers + 1});

	userFollowing.following.push(req.params.userId);

	await userFollowing.save();
	await userFollower.save();

	return res.send(userFollower);
});

router.post("/forgot_password", async (req, res) => {
	const {email} = req.body;

	try {
		const user = await User.findOne({email});

		if (!user) return res.status(400).send({error: "User not found"});

		const token = crypto.randomBytes(20).toString("hex");

		const now = new Date();
		now.setHours(now.getHours() + 1);

		await User.findByIdAndUpdate(user.id, {
			$set: {
				passwordResetToken: token,
				passwordResetExpires: now
			}
		});

		mailer.sendMail(
			{
				to: email,
				from: "renanmmiyamoto@gmail.com",
				template: "auth/forgot_password",
				context: {token}
			},
			err => {
				if (err)
					return res
						.status(400)
						.send({error: "Cannot send forgot password email"});

				return res.send();
			}
		);
	} catch (err) {
		res.status(400).send({error: "Error on forgot password, try again"});
	}
});

router.post("/reset_password", async (req, res) => {
	const {email, token, password} = req.body;

	try {
		const user = await User.findOne({email}).select(
			"+passwordResetToken passwordResetExpires"
		);

		if (!user) return res.status(400).send({error: "User not found"});

		if (token !== user.passwordResetToken)
			return res.status(400).send({error: "Token invalid"});

		const now = new Date();

		if (now > user.passwordResetExpires)
			return res
				.status(400)
				.send({error: "Token expired, generate a new one"});

		user.password = password;

		await user.save();

		res.send();
	} catch (err) {
		res.status(400).send({error: "Cannot reset password, try again"});
	}
});

module.exports = app => app.use("/auth", router);
