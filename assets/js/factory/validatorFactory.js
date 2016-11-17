(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.factory('validatorFactory', [
				'$state', 
	function( $state ) {
		var self = this;

		/**
			Type: Class
			Scope: Public
			Registramos el nombre del formulario a ser validado
			e.g:
			var validator = validatorFactory( 'loginForm' );

			return validatorFactory;
		**/
		self.register = function( nameForm ) {
			win.Validator.cleanAll();//.removeAll();
			win.Validator.removeAll();
			win.Validator.register( nameForm );
			return self;
		};

		/**
			Type: Function
			Inicializamos las validaciones de los campos del Formulario registrado
			y chequea que las validaciones sean satisfactorio
			e.g:
			validator.runSuccess();
			or
			validatorFactory.runSuccess();

			return Boolean;
		**/
		self.runSuccess = function( ) {
			return win.Validator.run().success;
		};

		/**
			Type: Function
			Scope: Public
			Inicializamos las validaciones de los campos del Formulario registrado
			y chequea si las validaciones contiene error
			e.g:
			validator.runError();
			or
			validatorFactory.runError();

			return Boolean;
		**/
		self.runError = function( ) {
			return win.Validator.run().error;
		};

		/**
			Type: Function
			Scope: Public
			Limpia los errores lanzado
			e.g:
			validator.cleanAll();
			or
			validatorFactory.cleanAll();

			return Boolean;
		**/
		self.cleanAll = function( ) {
			win.Validator.cleanAll();
		};

		/**
			Type: Function
			Scope: Public
			Emite a la vista los errores registrado
			e.g:
			validator.handlerError();
			or
			validatorFactory.handlerError();

			return Boolean;
		**/
		self.handlerError = function( jwres ) {
			if ( jwres.statusCode >=400 && jwres.statusCode <=500) {
				self.__addError( jwres );
				return true;
			}
			if ( jwres.statusCode!==200 || jwres.statusCode!==201 ) 
				return false;
		};

		/**
			Type: Function
			Scope: Private
			Agrega los Errores recuperado desde el servidor

			return Void;
		**/
		self.__addError = function( jwres ) {
			var invalidAttributes = jwres.body.invalidAttributes;
			var originalError     = jwres.body.originalError;
			if ( invalidAttributes )
				win.Validator.add_error( invalidAttributes, null, true );
			else if ( originalError ) {
				var code = originalError.code;
				if ( code==='23505' ) // código lanzado por Postgres que indica que una Primary Key esta repetida
					win.Validator.add_error( { 'username': { rule: 'username'+code } }, null, true );
			}
		};

		/**
			Creamos reglas de validaciones
		**/
		win.Validator.create([{
			edad_limite: {
				message: 'Disculpe, su edad debe ser mayor o igual a 17 años',
				fn: function( value, field, rule, param, Validator ) {
					value = value.split('/');
					var dia = value[0]||0, mes = value[1]||0, anio = value[2]||0;
					var hoy = new Date();
					var edad = ( hoy.getFullYear() - parseInt( anio ) ) - 1;
					if( ( hoy.getMonth() + 1 ) >= parseInt( mes ) )
						if( hoy.getDate() >= parseInt( dia ) ) edad += 1;
					return edad >= 17;
				}
			},
			fecha_mayor_al_actual: {
				message: 'La fecha debe ser menor o igual que la fecha actual',
				fn: function( value, field, rule, param, Validator ) {
					value = value.split('/');
					var dia = value[0]||0, mes = value[1]||0, anio = value[2]||0;
					var hoy = new Date();
					var result = true;
					if ( hoy.getFullYear() < parseInt( anio ) ) result = false;
					if ( hoy.getFullYear() == parseInt( anio ) ) {
						if ( ( hoy.getMonth() + 1 ) < parseInt( mes ) ) result = false;
						if ( ( hoy.getMonth() + 1 ) == parseInt( mes ) ) 
							if ( hoy.getDate() < parseInt( dia ) ) result = false;
					}
					return result;
				}
			},
			telf_format: {
				message: 'El formato del teléfono es incorrecto: Ej: 0212-12345678',
				fn: function( value, field, rule, param, Validator ) {
					return value.match(/^0[1-9]{1,3}-[0-9]{1,12}$/);
				}
			},

			/**
				Solo registramos los mensajes para las reglas sin eventos
				esto son ejecutado por:
				e.g 1: 
				Validator.add_error( 'field', 'Mensaje de error' );
				
				e.g 2: 
				Validator.add_error( { field: 'Mensaje de error' } );

				e.g 3: 
				Validator.add_error( { field: ['Mensaje de error'] } );
			**/
			user_exists: {
				message: 'Lo sientimos, usted aun no esta registrado al sistema',
			},
			password_wrong: {
				message: 'El <b>Usuario</b> o <b>Password</b> son incorrectos',
			},
			maxLength: {
				message: 'Demasiado largo',
			},
			username23505: { // código lanzado por Postgres que indica que una Primary Key esta repetida
				message: 'El <b>Email</b> que ingresó ya existe',
			},
			invalid_authorize: { // Indica si el email o passworod es incorrecto
				message: 'El valor <b>Email</b> o <b>Password</b> son invalidos',
			},
		}]);

		self.register.runSuccess   = self.runSuccess;
		self.register.runError     = self.runError;
		self.register.cleanAll     = self.cleanAll;
		self.register.handlerError = self.handlerError;

		return self.register;
	}
])}));
