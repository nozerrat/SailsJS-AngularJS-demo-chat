/**
 * responseService
 *
 * @description :: define los valores a emitor al cliente.
 */

module.exports = {
	/**
		Contiene los datos consultados desde la base de datos
	**/
	data: null, // mixed

	/**
		Contiene los errores asignados
		e.g:
		{
			error: [
				{
					field: value,
					rules: [
						{rule: value}
					]
				}
			]
		};
	**/
	error: null,

	/**
		Contiene el estatus de proceso del servidor
	**/
	statusCode: 200,

	/**
		Se registra los campos y su relas que haya causado el error.

  		Ej: 
  		responseService.pushError( { fieldName: 'Mensaje de error' } );
  		Ej: 
  		responseService.pushError( { fieldName: ['Mensaje de error'] } );
  		Ej: 
		responseService.pushError( { fieldName: [ { rule: "required" } ] } );
  		Ej: 
  		responseService.pushError( { fieldName: [ { rule: "required", message: 'Mensaje de error' } ] } );
  		Ej: 
  		responseService.pushError( { fieldName: [ { rule: "required", message: ['Mensaje de error'] } ] } );
  		Ej: 
  		responseService.pushError( { fieldName: { rule: 'required' } } );
  		Ej: 
  		responseService.pushError( { fieldName: { rule: 'required', message: 'Mensaje de error' } } );
  		Ej: 
  		responseService.pushError( { fieldName: { rule: 'required', message: ['Mensaje de error'] } } );
  		Ej: 
  		responseService.pushError( [{ fieldName1: { rule: 'required' } },{ fieldName2: { rule: 'required' } }] );

	**/

	pushError: function( error ) {
		if ( _.isArray( error ) ) {
			_.each(error, function( elError ) {
				this.$$setError( elError );
			}.bind(this));
		}
		else {
			this.$$setError( error );
		}
	},

	$$setError: function( error ) {

		if ( _.isObject( error ) && _.isNull( this.error ) ) this.error = [];

		var exist = false;
		if ( _.isObject( error ) ) {			
			for ( var indexName in error ) {
				if ( _.isArray( error[indexName] ) ) {
					for ( var indexArr in error[indexName] ) {
						for (var indexArr2 in this.error) {
							if ( _.isArray( this.error[indexArr2][indexName] ) ) {
								if ( this.error[indexArr2][indexName] ) {
									this.error[indexArr2][indexName] = this.error[indexArr2][indexName].concat( error[indexName][indexArr] );
									exist = true;
								}
							}
							else {
								if ( this.error[indexArr2][indexName] ) {
									var e = [ this.error[indexArr2][indexName] ];
									this.error[indexArr2][indexName] = e.concat( error[indexName][indexArr] );
									exist = true;
								}
							}
						}
						if ( exist===false ) {
							this.error.push( error );
							break;
						}
						exist = false;
					}
				}
				else {
					for (var indexArr in this.error) {
						if ( _.isArray( this.error[indexArr][indexName] ) ) {
							if ( this.error[indexArr][indexName] ) {
								this.error[indexArr][indexName] = this.error[indexArr][indexName].concat( error[indexName] );
								exist = true;
							}
						}
						else {
							if ( this.error[indexArr][indexName] ) {
								var e = [ this.error[indexArr][indexName] ];
								this.error[indexArr][indexName] = e.concat( error[indexName] );
								exist = true;
							}
						}
					}
					if ( exist===false ) {
						this.error.push( error );
						break;
					}
					exist = false;
				}
			}// <------------
		}
	},

	/**
		Registra los datos a emitir al cliente.

		e.g:
		responseService.setData( 'Hola Mundo' );
		var response = responseService.get( );
		return response;
		//-> { data: 'Hola Mundo' }
	**/
	setData: function( data ) {
		this.data = data;
	},

	/**
		Registra el estatus del proceso.

		e.g:
		responseService.setStatus( 200 );
		var response = responseService.get( );
		return response;
		//-> { statusCode: 200 }

		Nota: por defecto el estatus es 200;
	**/
	setStatus: function( status ) {
		this.statusCode = status;
	},

	/**
		Se optiene el servicio asignado.

		e.g:
		responseService.setData( 'Hola Mundo' );
		responseService.pushError( { field:'username', rule:'required' } );
		responseService.setStatus( 200 );
		return responseService.get( );
		// {
		//		data: 'Hola Mundo',
		//		error: [{ field:'username', rules:[{ rule:'required' }] }],
		//		statusCode: 200,
		// };

		e.g:
		return responseService.get( 'Hola Mundo', { field:'username', rule:'required' }, 200 );
		// {
		//		data: 'Hola Mundo',
		//		error: [{ field:'username', rules:[{ rule:'required' }] }],
		//		statusCode: 200,
		// };
	**/
	get: function( data, error, status ) {
		var request = {};

		if ( data ) this.setData( data );

		if ( error ) this.pushError( error );

		if ( status ) this.setStatus( status );

		if ( !_.isNull( this.data ) ) request['data'] = this.data;

		if ( !_.isNull( this.error ) ) request['error'] = this.error;

		request['statusCode'] = this.statusCode;

		this.data = null;
		this.error = null;
		this.statusCode = 200;

		return request;
	},

};
