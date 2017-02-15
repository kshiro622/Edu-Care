var db = require('../models');

// ROUTES
module.exports = function(app) {

    // ====== Listing Routes ====== //

    // GET route to show all listings of volunteers
    // Query searches are optional for this route
    app.get("/listings", function(req, res) {
        var findListings;
        // queryCategory is the query search for the category of volunteers
        var queryCategory = req.query.cat;
        // querySpecialty is the query search for the category of volunteers
        var querySpecialty = req.query.spec;
        // these if-else statements assign the variable findListings to
        // the appropriate sequelize promise
        if (queryCategory) {
            findListings = db.Listing.findAll({
                include: [{
                    model: db.Volunteer,
                }, {
                    model: db.User
                }],
                where: {
                    category: queryCategory
                }
            });
        } else if (querySpecialty) {
            findListings = db.Listing.findAll({
                include: [{
                    model: db.Volunteer
                }, {
                    model: db.User
                }],
                where: {
                    specialty: querySpecialty
                }
            });
        } else {
            findListings = db.Listing.findAll({
                include: [{
                    model: db.Volunteer
                }, {
                    model: db.User
                }]
            });
        }
        // after the promise findListings is resolved, listings.handlebars is 
        // rendered
        findListings.then(function(dbRes) {
            res.render("listings", { listings: dbRes });
        });
    });

    // GET route to show listings of volunteers' specialties
    // used in ajax url to retreive the specialties
    // see public/js/filter.js for its use
    app.get("/api/specialties", function(req, res) {
        var findCategories = db.Listing.findAll({
            where: {
                isActive: true
            },
            attributes: ['specialty']
        });
        findCategories.then(function(dbRes) {
            res.send(dbRes);
        });

    });

    // =========================================================================

    // ====== Volunteer Routes ====== //

    // GET route to show volunteer info and listings
    app.get("/volunteer", ensureAuthenticated, function(req, res) {
        // sequelize promise to view volunteer's listings
        var listingPromise = db.Listing.findAll({
            where: {
                UserId: req.user.id
            },
            include: [{
                model: db.Volunteer
            }, {
                model: db.User
            }]
        });
        // sequelize promise to view volunteer's info
        var volunteerPromise = db.Volunteer.findOne({
            where: {
                UserId: req.user.id
            },
            include: [{
                model: db.User
            }]
        });

        Promise.all([listingPromise, volunteerPromise])
            .then(function(results) {
                var listingResult = results[0];
                var volunteerResult = results[1];
                // after promises are resolves, volunteer handlebars is rendered
                res.render("volunteer", {
                    listings: listingResult,
                    volunteer: volunteerResult
                });
            });
    });

    // POST route to create new volunteer
    // used in public/js/newVolunteerForm.js
    app.post("/api/volunteer", ensureAuthenticated, function(req, res) {
        db.Volunteer.create({
            volunteer_first_name: req.body.volunteer_first_name,
            volunteer_last_name: req.body.volunteer_last_name,
            preferred_city: req.body.preferred_city,
            bio: req.body.bio,
            UserId: req.user.id
        }).then(function(dbPost) {
            res.redirect("/volunteer/");
        });
    });

    //POST route to create new listing
    app.post("/api/volunteer/listing", ensureAuthenticated, function(req, res) {
        db.Volunteer.findOne({
                where: {
                    UserId: req.user.id
                },
                attributes: ['id']
            })
            .then(function(userData) {
                db.Listing.create({
                    category: req.body.category,
                    specialty: req.body.specialty,
                    UserId: req.user.id,
                    VolunteerId: userData.id
                }).then(function(dbPost) {
                    res.redirect("/volunteer");
                });
            });
    });

    // PUT routes for updating a listing
    // Archive listing
    app.put("/api/volunteer/listing/archive/:id", function(req, res) {
        db.Listing.update({ isActive: 0 }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbRes) {
            res.redirect("/volunteer");
        });
    });


    // Activate listing
    app.put("/api/volunteer/listing/activate/:id", function(req, res) {
        db.Listing.update({ isActive: 1 }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbPost) {
            res.redirect("/volunteer");
        });
    });

    // Custom function to establish whether or not a user is logged in 
    // in order to see a page, else get routed to the login page
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/signin');
    }
};
