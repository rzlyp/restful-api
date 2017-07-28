const mongoose = require('mongoose');

class Mongoose{
	constructor(){
		this.mongoose = mongoose;
		this.mongoURL = 'mongodb://localhost/restful-api'
	}
	connectMongo(){
		this.mongoose.connect(this.mongoURL);
		let db = this.mongoose.connection
		db.on('open',(err)=>{
			if(err)
				console.log(err);

			console.log('mongodb connected to '+this.mongoURL);
		});
		db.on('error', (err)=>{
			console.log('Error connect to mongodb');
		});
	}
}

module.exports = Mongoose;