/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
//var exec = require('child_process').exec;
//var fs = require('fs');
var User;
//var sue;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new User object', function(){
      var u1 = new User({role:'host', email:'bob@nomail.com', password:'1234'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('bob@nomail.com');
      expect(u1.password).to.equal('1234');
      expect(u1.role).to.equal('host');
    });
  });

  describe('#register', function(){
    it('should register a new User', function(done){
      var u1 = new User({role: 'host', userName: 'bob jones', email:'mknicos@gmail.com', password:'1234'});
      u1.register(function(err, body){
        expect(u1.err).to.be.not.ok;
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        body = JSON.parse(body);
        expect(body.id).to.be.ok;
        console.log(body);
        done();
      });
    });
    it('should not register a user with a duplicate email', function(done){
      var u1 = new User({role: 'host', userName: 'bob jones', email:'bob@nomail.com', password:'1234'});
      var u2 = new User({role: 'host', userName: 'bob smith', email:'bob@nomail.com', password:'abcd'});
      u1.register(function(err){
        u2.register(function(err){
          expect(u2.err).to.be.err;
          done();
        });
      });
    });
  });

});
