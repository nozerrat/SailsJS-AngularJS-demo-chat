/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'user',
	meta: { schemaName: 'sails' },

	// identity: 'User',
	// connection: 'myAwesomeConnection',
	// migrate: 'safe',
	// autoPK: false,
	// autoCreatedAt: false,
	// autoUpdatedAt: false,

	types: {
		/**
			Se verifica que los passwords ingresado en la vista coincidan
		**/
		same: function( repeat_password ) {
			return bcryptService.bcrypt.compareSync( repeat_password, this.password );
		},
	},

	attributes: {
		id: {
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
		username: {
			columnName: 'username',
			type: 'string',
			maxLength: 50,
			required: true,
			unique: true,
			email: true,
		},
		password: {
			columnName: 'password',
			type: 'string',
			required: true,
		},
		discriminant: {
			columnName: 'discriminant',
			type: 'string',
			size: 10,
			required: true,
			enum: ['admin','doc','paciente'],
			// defaultTo: 'paciente',
		},
		repeat_password: {
			type: 'string',
			same: true,
		},
		// admin: {
		// 	collection: 'admin',
		// 	via: 'user',
		// 	dominant: true,
		// }
	}
};

