/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'sos_plan',
	meta: { schemaName: schemaService.schema },

	types: {
		/**
			Code
		**/
	},

	attributes: {
		_id: {
			columnName: 'pla_id',
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
			columnName: 'pla_nombre',
			type: 'string',
			required: true,
		},
		descripcion: {
			columnName: 'pla_descripcion',
			type: 'text',
			// required: true,
		},
		promocion: {
			columnName: 'pla_promocion',
			type: 'string',
			required: true,
		},
		oferta: {
			columnName: 'pla_oferta',
			type: 'string',
			required: true,
		},
		costo: {
			columnName: 'pla_costo',
			type: 'string',
			required: true,
		},
		tiempo: {
			columnName: 'pla_tiempo',
			type: 'string',
			required: true,
		},
		estatus: {
			columnName: 'pla_estatus',
			type: 'boolean',
			required: true,
		},
		fecha: {
			columnName: 'pla_fecha',
			type: 'date',
			required: true,
		},
	}
};

