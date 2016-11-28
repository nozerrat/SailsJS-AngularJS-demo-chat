/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'admin',
	meta: { schemaName: schemaService.schema },

	// identity: 'Admin',
	// connection: 'myAwesomeConnection',
	// migrate: 'safe',
	// autoPK: false,
	// autoCreatedAt: false,
	// autoUpdatedAt: false,

	attributes: {
		_id: {
			columnName: '_id',
			type: 'integer',
			size: 4,
			primaryKey: true,
			autoIncrement: true,
			// required: true,
			// unique: true,
			// index: true,
			// enum: []
			// defaultTo: function function_name() {},
		},
		ci: {
			columnName: 'identity_card',
			type: 'integer',
			required: true,
			size: 8,
		},
		name: {
			columnName: 'name',
			type: 'string',
			size: 50,
		},
		lastname: {
			columnName: 'lastname',
			type: 'string',
			size: 50,
		},
		// user: {
		// 	collection: 'user',
		// 	via: 'admin',
		// }
	}
};

