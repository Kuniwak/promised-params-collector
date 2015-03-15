'use strict';

var Q = require('q');
var IS_PARAMS_ARRAY = 'IS_PARAMS_ARRAY';


function collectParams(func) {
  return function(arg) {
    var args = isPrevArgs(arg) ? arg : paramArray([arg]);

    var promise = new Q.Promise(function(resolve, reject) {
      var wrappedResolve = function(nextArg) {
        args.push(nextArg);
        resolve(args);
      };

      func(args, wrappedResolve, reject);
    });

    return promise;
  };
}


function isPrevArgs(obj) {
  return Boolean(obj[IS_PARAMS_ARRAY]);
}


// ただの配列なのか、前の collectParams の結果なのか区別できるように、
// IS_PARAMS_ARRAY でタグ付けされた配列を返す。
// 普通に代入すると enumerable = true になってしまうので、expect().to.deep.equal
// が効かなくなってしまうので、とりあえす Object.defineProperty を使って
// enumerable を false にしている。区別できるのであれば、別のどんな方法でもよい。
function paramArray(args) {
  Object.defineProperty(args, IS_PARAMS_ARRAY, {
    get: function() { return true; }
  });
  return args;
}


module.exports = collectParams;
