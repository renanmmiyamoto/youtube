const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/versions", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;