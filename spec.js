'use strict';

var expect = require('chai').expect;

var Q = require('q');
var collectParams = require('./index.js');

describe('collectParams', function() {
  it('should can collect several arguments', function(done) {
    var arg1 = 1;
    var arg2 = 2;
    var arg3 = 3;
    var arg4 = 4;

    Q.fcall(function() {
        return arg1;
      }).
      then(collectParams(function(_, resolve) {
        resolve(arg2);
      })).
      then(collectParams(function(_, resolve) {
        resolve(arg3);
      })).
      then(collectParams(function(_, resolve) {
        resolve(arg4);
      })).
      then(function(args) {
        expect(args).to.deep.equal([arg1, arg2, arg3, arg4]);
        done();
      }).catch(function(err) {
        console.error(err.stack);
      });
  });
});
