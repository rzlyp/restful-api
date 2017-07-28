const jwt = require('jsonwebtoken');

const UserCtrl = require('../controller/users');
const PostCtrl = require('../controller/posts');
const config = require('../../config/static');

class Routes{
	constructor(app){
		this.app = app;
		this.UserCtrl = new UserCtrl();
		this.PostCtrl = new PostCtrl();
	}
	appRouter(){
		this.app.get('/hello', (req, res, next)=>{
			res.json({message : 'Hello dude !'});
		});
		this.app.post('/register', this.UserCtrl.register);
		this.app.post('/login', this.UserCtrl.login);
		this.app.get('/post', this.PostCtrl.getPost);
		this.app.get('/post/:id', this.PostCtrl.getById);
		this.app.use(this.jwtAuth);
		this.app.post('/post', this.PostCtrl.postPost);
		this.app.put('/post/:id', this.PostCtrl.updateId);
		this.app.delete('/post/:id', this.PostCtrl.remove);
	}
	jwtAuth(req,res,next){
			var token = req.body.token || req.query.token || req.headers['x-access-token'];
			if(token){
				jwt.verify(token,config.token_secret,function(err,decoded){
					if(err){
						return res.json({
							status_code : 401,
							message : 'Failed Authenticate Token'
						});
					}else{
						req.decoded = decoded;
						next();
					}
				});
			}else{
				return res.status(403).send({ 
			        status_code: 403, 
			        message: 'No token provided.' 
		    	});
			}
		}
	setRoute(){
		this.appRouter();
	}
}
module.exports = Routes;