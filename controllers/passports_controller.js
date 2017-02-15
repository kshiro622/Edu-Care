var db = require('../models');
// Require dependencies
var passport = require('passport');
var flash = require('connect-flash');

var User = db.User;

// Passport Routes
module.exports = function(app) {

    // This is the function for registering a new user
    app.post('/register', function(req, res) {
        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.redirect("/signin");
        });
    });

    // This is the function for authenticating a user
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/volunteer',
            failureRedirect: '/signin?login=bad'
        }),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect("/volunteer/");
        }
    );

    // This is the function for logging a user out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
