'use strict';

const crypto = require('crypto-js');

const Post = require('../model/post');
const config = require('../../config/static');
const algorithm = 'aes-256-ctr';

class PostCtrl{
	/*  ENCRYPT AND DECRYPT FUNCTION */
	encrypt(text){
		  var cipher = crypto.createCipher(algorithm,config.aes_key)
		  var crypted = cipher.update(text,'utf8','hex')
		  crypted += cipher.final('hex');
		  return crypted;
	}
 
	decrypt(text){
	  var decipher = crypto.createDecipher(algorithm,config.aes_key)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
	}

	/* Start CRUD Operation */
	getPost(req, res, next){
		Post.find({}, (err, doc)=>{
			if(err)
				res.end(err);

			res.json({
				status_code : 200,
				message : 'Get post successful .',
				data : doc
			});
		});
	}
	postPost(req, res, next){
		// let encryptTitile = req.body.title;
		// let encryptBody = req.body.body;
		let data = {
			title : req.body.title,
			body : req.body.body,
			category : req.body.category
		}
		let savePost = new Post(data);
		savePost.save((err)=>{
			res.json({
				status_code : 201,
				message : 'Post successfuly saved !'
			});
		});
	}
	getById(req, res, next){
		Post.find({_id : req.params.id}, (err, doc)=>{
			if(err)
				console.log(err);
			
			console.log(doc);

			let stringTitle = crypto.AES.decrypt((doc.title),config.token_secret)
			let stringBody = crypto.AES.decrypt((doc.body), config.token_secret)
			let decryptTitle = stringTitle.toString(crypto.enc.Utf8);
			console.log(stringTitle);

			let data = {
				title :decryptTitle ,
				body :"ksk" ,
				category : doc.category
			}
			res.json({
				status_code : 200,
				message : 'successfuly get post by id '+req.params.id,
				data : data
			})
		});
	}
	updateId(req, res, next){
		let data = {
			title : req.body.title,
			body : req.body.body,
			category : req.body.category
		}
		Post.findOneAndUpdate({_id : req.params.id}, data, (err)=>{
			if(err)
				res.end(err);

			res.json({
				status_code : 201,
				message : 'Data successfuly updated .'
			});
		});
	}
	remove(req, res, next){
		Post.findOneAndRemove({_id : req.params.id}, (err)=>{
			if(err)
				res.end(err);

			res.json({
				status_code : 201,
				message : 'Data successfuly daleted .'
			});
		});
	}

	 
}

module.exports = PostCtrl;