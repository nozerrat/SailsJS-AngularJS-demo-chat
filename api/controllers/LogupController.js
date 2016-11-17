/**
 * LogupController
 *
 * @description :: Server-side logic for managing logups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe: function( req, res ) {
		var vs = validatorService;
		if ( !req.isSocket ) return res.serverError();

		bcryptService.bcrypt.hash( req.body.password, bcryptService.salt, function( err, hash ) {
			if ( err ) return res.serverError( err );
			if ( req.body.password!==req.body.repeat_password ) return res.badRequest( vs.get( {field:'repeat_password',rule:'same'} ) );
			if ( req.body.password ) req.body.password = hash;

			User.create( req.body ).exec( function( err, created ) {
				if ( err ) return res.badRequest( err );
				created.created = true;
				return res.ok( created );
			});
		});
	},
};

