// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '370372193131863', // your App ID
		'clientSecret' 	: 'c13ec0b1de6703d1a097d1127b50b665', // your App Secret
		//'callbackURL' 	: 'https://itrendz.herokuapp.com/auth/facebook/callback'
        'callbackURL' 	: 'http://localhost:8090/auth/facebook/callback'
	}

};
