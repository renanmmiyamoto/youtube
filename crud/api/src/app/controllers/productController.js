const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const Product = require("../models/Product");
const User = require("../models/User");

router.use(authMiddleware);

router.get("/", async (req, res) => {
	try {
		const products = await Product.find();

		return res.send({ products });
	} catch (err) {
		return res.status(400).send({ error: "Error getting products" });
	}
});

router.post("/", async (req, res) => {
	const { title } = req.body;
	console.log(req.userId);

	try {
		if (await Product.findOne({ title }))
			return res.status(400).send({ error: "Product already exists" });

		const product = await Product.create(req.body);

		const user = await User.findById(req.userId).populate("postedProducts");

		console.log(user);
		
		user.postedProducts.push(product._id);

		await user.save();

		return res.send({ product });
	} catch (err) {
		return res.status(400).send({ error: "Error on create product" });
	}
});

module.exports = app => app.use("/products", router);