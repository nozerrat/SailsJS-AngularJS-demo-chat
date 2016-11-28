/**
 * SistemaController
 *
 * @description :: Server-side logic for managing logups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// module.exports = {
// 	save: function( req, res ) {
// 		if ( !req.isSocket ) return res.serverError();

// 		Sistema.findOrCreate( {_id:req.body._id}, req.body )
// 		.exec(function(err, createdOrFound) {
// 			if ( err ) return res.serverError( err );
// 			if ( !req.body._id ) {
// 				return res.ok( createdOrFound );
// 			}
// 			else {
// 				Sistema.update( {_id:req.body._id},req.body )
// 				.exec(function( err, updated ) {
// 					if ( err ) return res.serverError( err );
// 					return res.ok( updated[0] || {} );
// 				});
// 			}
// 		});
// 	},

// 	consult: function( req, res ) {
// 		if ( !req.isSocket ) return res.badRequest( );

// 		var filter = {};
// 		var sorting = {};
// 		for ( index in req.body ) {
// 			if ( index.match(/^filter\[(.*)\]$/) )
// 				filter[RegExp.$1] = { contains: req.body[index] };
// 			if ( index.match(/^sorting\[(.*)\]$/) )
// 				sorting[RegExp.$1] = req.body[index];
// 		}

// 		Sistema.count().where( filter )
// 		.exec(function( err, founds ) {
// 			if ( err ) return res.serverError( err );
// 			Sistema.find().where( filter ).sort( sorting )
// 			.paginate( { page: req.body.page, limit: req.body.count } )
// 			.exec(function(err, records) {
// 				if ( err ) return res.serverError( err );
// 					return res.ok( {total:founds,data:records} );
// 			});
// 		});
// 	},

// 	delete: function( req, res ) {
// 		if ( !req.isSocket ) return res.badRequest( );

// 		Sistema.destroy( {_id:req.body._id} )
// 		.exec(function( err ) {
// 			if ( err ) return res.serverError( err );
// 			return res.ok( req.body );
// 		});
// 	},
// };

module.exports = {
	save: function( req, res ) {
		CRUDService.save( req, res, Sistema, function( data ) {
			return res.ok( responseService.get( data ) );
		});
	},

	consult: function( req, res ) {
		CRUDService.consult( req, res, Sistema );
	},

	delete: function( req, res ) {
		CRUDService.delete( req, res, Sistema );
	},
};