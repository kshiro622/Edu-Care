var express = require('express'),
    passport = require('passport'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
 
    db = require('./models/'),
    User = db.User,
app = express();
 
 
app.use(bodyParser());
app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));
 
app.use(passport.initialize());
app.use(passport.session());
 
var PORT = 8000;

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// define our routes
app.post('/register', function(req, res) {
    //User.create({ username: req.body.username, password: '' }).then(function (newUser) {
        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.json(err);//res.render('register', { account : account });
            }

            res.json('WORKING SON!!!');
            // passport.authenticate('local')(req, res, function () {
            //     res.redirect('/');
            // });
        });
    // }).catch(function (err) {
    //     console.log(err);
    // });
});

db.sequelize.sync({}).then(function () {
    app.listen(PORT, function () {
        console.log('listening on port ' + PORT);
    });
});