const mongoose = require('mongoose');

const model = mongoose.Schema({
	title : String,
	body : String,
	category : String
});

const postModel = mongoose.model('post', model);

module.exports = postModel;