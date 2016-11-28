/**
 * CanalController
 *
 * @description :: Server-side logic for managing Canals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function( req, res ) {
		CRUDService.save( req, res, Canal );
	},

	consult: function( req, res ) {
		CRUDService.consult( req, res, Canal );
	},

	delete: function( req, res ) {
		CRUDService.delete( req, res, Canal );
	},
};

