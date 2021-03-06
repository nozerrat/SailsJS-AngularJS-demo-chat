/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'sos_sistema',
	meta: { schemaName: schemaService.schema },

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
			type: 'text',
			// required: true,
		},
		fecha: {
			columnName: 'sis_fecha',
			type: 'date',
			required: true,
		},
		estatus: {
			columnName: 'sis_estatus',
			type: 'boolean',
			required: true,
		},

		// Populate
		canal: {
			collection: 'canal',// nombre del modelo
			via: 'sistema',// nombre del atributo
		},
		plan: {
			collection: 'plan',// nombre del modelo
			via: 'sistema',// nombre del atributo
		},
	}
};

