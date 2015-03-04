var Istanbul = require('istanbul');

module.exports = function(options) {

  var options = options || {};
  options.includeRemote = options.includeRemote || false;
  options.remoteFilterRx = options.remoteFilterRx || false;
  options.localFilterRx = options.localFilterRx || false;

  var instrumenter = new Istanbul.Instrumenter(options);

  return function(file, done) {

    if ((file.extension != 'js') || !file.string)
      return done();
    else if (file.branch.type == "local") {
      if (options.localFilterRx && !options.localFilterRx.test(file.filename))
        return done();
    }
    else {
      if(!options.includeRemote)
        return done();
      else if (options.remoteFilterRx && !options.remoteFilterRx.test(file.filename))
        return done();
    }

    instrumenter.instrument(file.string, file.filename, function(err, string) {
      file.string = string;
      done(err);
    });
  }
}