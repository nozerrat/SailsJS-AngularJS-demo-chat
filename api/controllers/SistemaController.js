/**
 * SistemaController
 *
 * @description :: Server-side logic for managing logups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	insert: function( req, res ) {
		if ( !req.isSocket ) return res.serverError();
		Sistema.findOrCreate({_id:req.body._id}, req.body)
		.exec(function(err, createdOrFound) {
			if ( err ) return res.serverError( err );
			if ( !req.body._id ) {
				return res.ok( createdOrFound );
			}
			else {
				Sistema.update({_id:req.body._id},req.body)
				.exec(function(err, updated) {
					if ( err ) return res.serverError( err );
					return res.ok( updated[0] || {} );
				});
			}
		});
	},
	consult: function( req, res ) {
		if ( !req.isSocket ) return res.badRequest( );
		Sistema.find( )
		.exec(function(err, record) {
			if ( err ) return res.serverError( err );
				return res.ok( record[0] || {} );
		});
	},
};

