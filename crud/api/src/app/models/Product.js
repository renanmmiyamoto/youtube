const mongoose = require("../../database");

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
	qtdeDisponivel: {
		type: Number,
		required: true,
	}
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;