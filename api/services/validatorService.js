/**
 * validatorService
 *
 * @description :: registra los errores emitido por WaterlineJS
 */

module.exports = {

	/**
		Se registra los campos y su relas que haya causado el error.
		Nota: solo se registran las reglas que WaterlineJS no soporta, es decir, aquellas reglas personalizadas.
		Retorna el estado actual de los valores registrado.
		e.g:
		validatorService.set({field:'username',rule:'required'});
		e.g:
		validatorService.set([ {field:'username',rule:'required'},{field:'password',rule:'required'} ]);
	**/
	set: function( arg ) {
		if ( _.isArray( arg ) ) {
			_.each( arg, function( el ) {
				this.invalidAttributes[ el.field ] = [{ rule: el.rule }];
			}.bind( this ));
			this.error = this.invalidAttributes.lenght;
		}
		else {
			this.invalidAttributes[ arg.field ] = [{ rule: arg.rule }];
			this.error = Object.keys( this.invalidAttributes ).lenght;
		}
	},

	/**
		Se optiene el servicio asignado en la función Set o Get 
		Nota: al obtener los errores registrados se con la
		función Get se eliminará los errores registrado
		e.g:
		validatorService.get( ) 
		or
		validatorService.get( {field:'username',rule:'required'} )

		Nota: se trata de emular los errores emitido por WatelineJS
		return {"invalidAttributes":{"username":[{"rule":"required"}]}}
	**/
	get: function( arg ) {
		var invalidAttributes;
		if ( arg!==undefined ) this.set( arg );
		invalidAttributes = this.invalidAttributes;
		this.error = 0;
		this.invalidAttributes = {};
		return { invalidAttributes: invalidAttributes };
	},

	/**
		Verificamo la cantidad de errores registrado
	**/
	error: 0,

	/**
		Registro donde almacena los errores agregado por la función Set
	**/
	invalidAttributes: {},
};
