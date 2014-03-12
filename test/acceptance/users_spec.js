'use strict';

process.env.DBNAME = 'airbab-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
//var fs = require('fs');
var User;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var u1 = new User({email: 'bob2@aol.com', password: '1234', role: 'guest'});
      u1.register(function(err, body){
        done();
      });
    });
  });

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });
  describe('GET /login', function(){
    it('should display the login page', function(done){
      request(app)
      .get('/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should post a user into database, and direct to home page', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob@aol.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.equal('Moved Temporarily. Redirecting to /');
        done();
      });
    });
    it('should not register a user due to dup email, and direct to register page', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob2@aol.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });
  describe('POST /login', function(){
    it('should login a user already registered in database, and direct to home page', function(done){
      request(app)
      .post('/login')
      .field('email', 'bob2@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.equal('Moved Temporarily. Redirecting to /');
        done();
      });
    });
    it('should not register a user due to wrong password, and direct to login page', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob2@aol.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Log');
        done();
      });
    });
  });
});
