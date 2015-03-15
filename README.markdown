[![Build Status](https://travis-ci.org/Kuniwak/promised-params-collector.svg?branch=master)](https://travis-ci.org/Kuniwak/promised-params-collector)


### Before
```javascript
Q.fcall(function(arg1) {
  hoge().then(function(arg2) {
    foo().then(function(arg3) {
      bar().then(function(arg4) {
      .....arg1.....arg2......arg3....arg4....
      });
    });
  });
})
```

### After
```javascript
Q.fcall(function() {
    return arg1;
  }).
  then(collectParams(function(arg2, resolve) {
    resolve(arg2);
  })).
  then(collectParams(function(arg3, resolve) {
    resolve(arg3);
  })).
  then(collectParams(function(arg4, resolve) {
    resolve(arg4);
  })).
  then(function(args) {
    // args is [arg1, arg2, arg3, arg4]
  });
```
