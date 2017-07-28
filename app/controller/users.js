'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../model/user');
const config = require('../../config/static');

class UserCtrl{

	register(req, res, next){
		let data = {
			name : req.body.name,
			username : req.body.username,
			password : bcrypt.hashSync(req.body.password)
		};

		let newUser = new User(data);
		newUser.save((err)=>{
			if(err)
				console.log(err);

			res.json({
				status_code : 201,
				message : 'Register successful .'
			});
		});
	}
	login(req, res, next){

		User.findOne({username : req.body.username}, (err, doc)=>{
			if(err)
				res.end({
					status_code : 400,
					message : err
				});

			if(!doc){
				res.json({
					status_code : 404,
					message : 'User not found'
				});
			}
			let compare = bcrypt.compareSync(req.body.password , doc.password);
			if(compare === false){
				res.json({
					status_code : 401,
					message : 'Wrong password.'
				});
			}else{
				let token = jwt.sign(doc, config.token_secret,{
					expiresIn : 6000
				});
				let data = {
					name : doc.name,
					username : doc.username,
					token : token
				}

				res.json({
					status_code : 200,
					message : 'Authentication successful .',
					data : data
				});
			}
		});
	}
}

module.exports = UserCtrl;