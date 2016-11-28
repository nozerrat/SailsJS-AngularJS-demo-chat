/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var subscribeToFunRoom = function( req  ) {

	var roomName = 'chatServer';
	if ( req.session.auth.authorized ) {
		sails.sockets.join( req, roomName, function( err ) {
			if (err) return res.serverError( err );		
			
			console.log( '' )
			console.log( 'sockets.getId:',sails.sockets.getId( req ) )
			console.log( 'socketRooms:',JSON.stringify( sails.sockets.socketRooms( req.socket ) ) )
			console.log( '' )
		});
	}
};

module.exports = {

	index: function( req, res ) {
		return res.ok( responseService.get( req.session.auth ), 'layout' );
	},

	authorize: function( req, res ) {
		if ( !req.isSocket ) return res.badRequest( );

		// User.findOne( )
		// .where({ username: req.body.username })
		// .exec(function(err, user) {
		// 	if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
		// 	if ( !user ) return res.ok( responseService.get( null, {username: { rule:'user_exists' }}, 400 ) );

		// 	bcryptService.bcrypt.compare( req.body.password, user.password, function( err, equal ) {
		// 		if ( err ) return res.serverError( err );
		// 		if( equal ) {
		// 			user.authorized = true;
		// 			req.session.auth = user;

		// 			subscribeToFunRoom( req );

		// 			responseService.setData( equal );

		// 		}
		// 		else {
		// 			req.session.auth = { authorized: undefined };
		// 			responseService.pushError( [{field:'username',rule:'invalid_authorize'},{field:'password',rule:'invalid_authorize'}] );
		// 		}

		// 		return res.ok( responseService.get( ) );
		// 	});
		// });

		CRUDService.findOne( req, res, User, { username: req.body.username }, function( user ) {
			if ( !user ) return res.ok( responseService.get( null, {username: { rule:'user_exists' }}, 400 ) );
			bcryptService.bcrypt.compare( req.body.password, user.password, function( err, equal ) {
				if ( err ) return res.serverError( err );
				if( equal ) {
					user.authorized = true;
					req.session.auth = user;
					req.session.auth.authorized = true;

					subscribeToFunRoom( req );

					responseService.setData( equal );

				}
				else {
					req.session.auth = { authorized: undefined };
					responseService.pushError( [{field:'username',rule:'invalid_authorize'},{field:'password',rule:'invalid_authorize'}] );
				}

				return res.ok( responseService.get( ) );
			});
		} );

	},

	authorized: function( req,res ) {
		if ( !req.isSocket ) return res.badRequest( );
		try {
			req.session.auth.authorized;
		} catch(err) {
			req.session.auth = { };
		}

		subscribeToFunRoom( req );

		return res.ok( responseService.get( req.session.auth ) );
	},

	logout: function( req, res ) {
		if ( !req.isSocket ) return res.badRequest();
		req.session.auth = { authorized: undefined };
		var roomName = 'chat';
		sails.sockets.leave( req, roomName, function( err ) {
			console.log(  JSON.stringify( sails.sockets.socketRooms( req.socket ) ) ) 
			console.log( '' )
		} );
      return res.send( );
	},

};

