const express = require('express');
const http = require('http');
const promise = require('bluebird');
const async = require('async');
const bodyParser = require('body-parser');

const router = require('./app/routes/routes');
const db = require('./config/database');
class App{
	constructor(){
		this.port = process.env.port || 3000;
		this.host = 'localhost';

		this.app = express();
		this.router = express.Router();
		this.http = http.createServer(this.app);
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.db = new db();
	}

	appConfig(){
		this.db.connectMongo();
	}
	appRoutes(){
		// const app = this.app;
		// app.get('/',(req, res, next)=>{
		// 	res.send("hello fucking world !");
		// });

		new router(this.app).setRoute();
	}
	appExecute(){

		this.appConfig();
		this.appRoutes();

		this.http.listen(this.port, () =>{
			console.log('Listening on '+this.port);
		});
	}
}

let start = new App();
start.appExecute();