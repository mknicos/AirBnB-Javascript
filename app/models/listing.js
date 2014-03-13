'use strict';

module.exports = Listing;
var listings = global.nss.db.collection('listings');


function Listing(listing){
  this.name = listing.name;
  this.amount = listing.amount * 1;
  this.address = listing.address;
  this.coordinates = [listing.lat * 1, listing.lng * 1];
}


Listing.prototype.insert = function(fn){
  listings.insert(this, function(err, records){
    fn();
  });
};
