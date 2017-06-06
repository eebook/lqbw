var validator = require('validator');


// sign up
exports.showSignup = function(req, res) {
  res.render('sign/signup')
};

exports.signup = function(req, res, next) {
  var login_name = validator.trim(req.body.login_name).toLowerCase();
  var email = validator.trim(req.body.email).toLowerCase();
  var password = validator.trim(req.body.pass);
  var re_pass = validator.trim(req.body.re_pas)

  // Verify the correctness of the registration information
  // TODO
}
