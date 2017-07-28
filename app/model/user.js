const mongoose = require('mongoose');

const model = mongoose.Schema({
	name : String,
	username : String,
	password : String
});

const userModel = mongoose.model('user', model);

module.exports = userModel;