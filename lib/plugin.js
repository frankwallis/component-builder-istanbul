var Istanbul = require('istanbul');

module.exports = function(options) {

  var instrumenter = new Istanbul.Instrumenter(options);

  return function(file, done) {
    if ((file.branch.type == "local") && (file.extension == 'js') && (file.string)) {
      instrumenter.instrument(file.string, file.filename, function(err, string) {
        file.string = string;
        done(err);
      });
    }
    else {
      return done();
    }
  }
}