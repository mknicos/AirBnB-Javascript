'use strict';

var User = require('../models/user');
//var request = require('request');

exports.fresh = function(req, res){
  res.render('users/fresh', {title: 'Register Page'});
};



exports.create = function(req, res){
  var user = new User(req.body);
  user.register(function(){
    if(user._id){
      res.redirect('/');
    }else{
      res.render('users/fresh', {title: 'Register Page'});
    }
  });
};
