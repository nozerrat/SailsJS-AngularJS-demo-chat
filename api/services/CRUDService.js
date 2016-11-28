
module.exports = {
	save: function( req, res, Model, doneCallback ) {
		if ( !req.isSocket ) return res.serverError();

		Model.findOrCreate( {_id:req.body._id}, req.body )
		.exec(function(err, createdOrFound) {
			/**
			 * Definicion de error
			 */
			try {
				if ( JSON.parse( JSON.stringify( err ) ).raw ) { // PostgreSql
					err = JSON.parse( JSON.stringify( err ) );
					var error = {};
					if ( /username/i.test(err.raw.detail) && err.raw.code==23505 ) 
						error['username'] = { rule: "unique" };
					return res.ok( responseService.get( null, error, err.status ) );
				}
				if ( err.invalidAttributes ) { // localDiskDb
					return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
				}
			} catch(e) {}

			/**
			 * Response
			 */
			if ( !req.body.hasOwnProperty( '_id' ) ) {
				if ( typeof doneCallback==='function' ) {
					doneCallback( createdOrFound );
				}
				else
					return res.ok( responseService.get( createdOrFound ) );
			}
			else {
				Model.update( {_id:req.body._id}, req.body )
				.exec(function( err, updated ) {
					if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
					if ( typeof doneCallback==='function' ) {
						doneCallback( updated[0] || {} );
					}
					else
						return res.ok( responseService.get( updated[0] || {} ) );
				});
			}
		});
	},

	consult: function( req, res, Model, doneCallback ) {
		if ( !req.isSocket ) return res.badRequest( );

		var filter = {};
		var sorting = {};
		for ( index in req.body ) {
			if ( index.match(/^filter\[(.*)\]$/) )
				filter[RegExp.$1] = { contains: req.body[index] };
			if ( index.match(/^sorting\[(.*)\]$/) )
				sorting[RegExp.$1] = req.body[index];
		}

		Model.count().where( filter )
		.exec(function( err, founds ) {
			if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
			Model.find().where( filter ).sort( sorting )
			.paginate( { page: req.body.page, limit: req.body.count } )
			.exec(function(err, records) {
				if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
				if ( typeof doneCallback==='function' ) {
					doneCallback( {total:founds,records:records} );
				}
				else
					return res.ok( responseService.get( {total:founds,records:records} ) );
			});
		});
	},

	delete: function( req, res, Model, doneCallback ) {
		if ( !req.isSocket ) return res.badRequest( );

		Model.destroy( {_id:req.body._id} )
		.exec(function( err ) {
			if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
			if ( typeof doneCallback==='function' ) {
				doneCallback( req.body );
			}
			else
				return res.ok( responseService.get( req.body ) );
		});
	},

	findOne: function( req, res, Model, data, doneCallback ) {
		if ( !req.isSocket ) return res.badRequest( );

		Model.findOne( data )
		.exec(function( err, data ) {
			if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
			if ( typeof doneCallback==='function' ) {
				doneCallback( data );
			}
			else
				return res.ok( responseService.get( data ) );
		});
	},

	find: function( req, res, Model, data, doneCallback ) {
		if ( !req.isSocket ) return res.badRequest( );

		Model.find( data )
		.exec(function( err, data ) {
			if ( err ) return res.ok( responseService.get( null, err.invalidAttributes, 404 ) );
			if ( typeof doneCallback==='function' ) {
				doneCallback( data );
			}
			else
				return res.ok( responseService.get( data ) );
		});
	},

};