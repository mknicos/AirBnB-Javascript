'use strict';

var Listing = require('../models/listing');

exports.fresh = function(req, res){
  res.render('listings/fresh', {title: 'New Listing'});
};

exports.create = function(req, res){
  var listing = new Listing(req.body);
  listing.insert(function(){
    res.redirect('/');
  });
};


