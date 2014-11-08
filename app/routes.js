module.exports = function(app, passport) {

    var mongojs = require('mongojs');
    var ObjectID = mongojs.ObjectId;

    var db = mongojs('eventDB', ['events']);
// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    app.post('/addEvents',function(req,res){
        //db.events.insert(req.body, function(err, data) {
        //db.events.insert({_id:
        // ObjectID("5063114bd386d8fadbd6b004")    }, function(err, data) {
       db.events.remove( { _id : req.body.uid} );
        db.events.insert({_id:req.body.uid ,events:req.body.events}, function(err, data) {
        //db.events.insert({_id:req.body.uid}, function(err, data) {
            res.json(data);
        });
        //console.log(req.body);
    });

    app.get('/getEvents',function(req,res){
        db.events.find(function(err, data) {
            res.json(data);
        });
        //console.log(req.body);
    });


    // process the login form

    // LOGOUT ==============================
    app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


     app.get('/getEvents/facebook/',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));



// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future




	// facebook -------------------------------
	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
