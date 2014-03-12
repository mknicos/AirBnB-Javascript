'use strict';
module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');

//var Mongo = require('mongodb');
//var fs = require('fs');
//var path = require('path');

function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}

User.prototype.register = function(fn){
  var self = this;

  hashPassword(self.password, function(hashedPwd){
    self.password = hashedPwd;
    insert(self, function(err){
      if(self._id){
        email.sendWelcome({to: self.email}, function(err, body){
          fn(err, body);
        });
      } else{
        fn();
      }
    });
  });

};

function hashPassword(password, fn){
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}

function insert(user, fn){
  users.findOne({email: user.email}, function(err, record){
    if(!record){
      users.insert(user, function(err, record){
        fn(err);
      });
    }else{
      fn();
    }
  });
}

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, record){
    if(!record){
      fn(null);
    }else{
      bcrypt.compare(password, record.password, function(err, res){
        if(res){
          fn(record);
        }else{
          fn(null);
        }
      });
    }
  });
};
