var expect = require('chai').expect;
var mongoose = require('mongoose');
var sinon = require('sinon');
// var User = require('../lib/User');
var UserModel = mongoose.model('User');

describe('Math', function () {
  describe('#max', function () {
    it('returns the biggest number from the arguments', function () {
      var max = Math.max(1, 2, 10, 3);
      expect(max).to.equal(10);
    });
  });
});

describe('User', function() {
  it('#values the truth', function() {
    // body...
    expect(true).to.equal(true);
  });
  it('#findUnicorns', function(done) {
    // test setup
    var unicorns = [ 'unicorn1', 'unicorn2' ];
    var query = { world: '1' };
    // mocking MongoDB
    sinon.stub(UserModel, 'findUnicorns').yields(null, unicorns);
    done();
  });
});