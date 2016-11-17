/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'sos_sistema',
	meta: { schemaName: 'sails' },

	// identity: 'Sistema',
	// connection: 'myAwesomeConnection',
	// migrate: 'safe',
	// autoPK: false,
	// autoCreatedAt: false,
	// autoUpdatedAt: false,

	types: {
		/**
			Code
		**/
	},

	attributes: {
		_id: {
			columnName: 'sis_id',
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
		nombre: {
			columnName: 'sis_nombre',
			type: 'string',
			required: true,
		},
		version: {
			columnName: 'sis_version',
			type: 'string',
			required: true,
		},
		descripcion: {
			columnName: 'sis_descripcion',
			type: 'string',
			size: 10,
			// required: true,
		},
		fecha: {
			columnName: 'sis_fecha',
			type: 'string',
			required: true,
		},
		estatus: {
			columnName: 'sis_estatus',
			type: 'boolean',
			required: true,
		}
	}
};

