'use strict';
//holds first draft at authentication protocals

// For loading environment variables.
require('dotenv').config(); //Should be as high up as possible-- does the .env stuff
const e = require('express');
const express = require('express');                 // express routing
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

const db = require('../app.js').db;

const app = express();

// const dbconnection = require('../secrets.json');



//session configuration
const session = {
	secret: process.env.SECRET  ,
	resave:false,
	saveUninitialized : false
};


//app configuration :AKA: MAGIC CODE, DO NOT CHANGE
app.use(expressSession(session));
// passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
//End of magic

exports.findU =  async function findUser(username){
	// let exists;
	try {
		const user = JSON.stringify(await(db.any('SELECT * FROM public."users" WHERE username=$1;', [username])));
		console.log(username, user);
		if(user === '[]'){
			console.log('not exst');
			return false;
		}
		return true;
	} catch(e){
		console.log(e);
		return false;
	}
	// return exists;
};


exports.check = async function checkCreds(username, pwd){
//get the user
// if it fails, return false
//otherwise, check password
	// let user;
	const user = (await(db.any('SELECT * FROM public."users" WHERE username=$1;', [username])));
	if(user === '[]'){
		return false;
	}


	else if(user[0].password_val !== pwd){ //TODO not failing where it is supposed to
		return false;
	}
	else{
		return true;
	}
};


exports.checkLoggedIn = function checkLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		console.log('is logged in');
		//if you are logged/ authenticated, run next route
		next();
	} else {
		//otherwise, redirect to login
		res.redirect('../html/index.html');
	}
};

