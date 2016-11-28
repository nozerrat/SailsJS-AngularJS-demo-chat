/**
 * Canal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'sos_canal',
	meta: { schemaName: schemaService.schema },

	types: {
		/**
			Code
		**/
	},

	attributes: {
		_id: {
			columnName: 'can_id',
			type: 'integer',
			size: 4,
			primaryKey: true,
			autoIncrement: true,
		},
		sistema: {
			model: 'sistema',// nombre del modelo a referenciar
			columnName: 'sos_sistema_sis_id',
			required: true,
		},
		nombre: {
			columnName: 'can_nombre',
			type: 'string',
			required: true,
		},
		descripcion: {
			columnName: 'can_descripcion',
			type: 'text',
			// required: true,
		},
		estatus: {
			columnName: 'can_estatus',
			type: 'boolean',
			required: true,
		},
		fecha: {
			columnName: 'can_fecha',
			type: 'date',
			required: true,
		},
	}
};

