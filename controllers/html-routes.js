// Require dependencies
var path = require('path');

// Export HTML routes
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/landing.html"));
    });

    app.get("/schools", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/schools.html"));
    });

    app.get("/become-a-volunteer", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/become-a-volunteer.html"));
    });

    app.get("/register-new-user", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/register-new-user.html"));
    });

    app.get("/new-volunteer-form", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/new-volunteer-form.html"));
    });

    app.get("/signin", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/signin.html"));
    });
};
