/**
 * LogupController
 *
 * @description :: Server-side logic for managing logups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe: function( req, res ) {
		if ( !req.isSocket ) return res.badRequest();

		bcryptService.bcrypt.hash( req.body.password, bcryptService.salt, function( err, hash ) {
			if ( err ) return res.serverError( err );
			if ( req.body.password!==req.body.repeat_password ) return res.ok( responseService.get( null, {repeat_password:{rule:'same'}}, 400 ) );
			if ( req.body.password ) req.body.password = hash;

			CRUDService.save( req, res, User );
		});
	},
};

