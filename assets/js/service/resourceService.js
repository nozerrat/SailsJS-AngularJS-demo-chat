(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.service('resourceService', [
			'$rootScope','$state','validatorFactory','tableParamsFactory',
function( $rootScope , $state , validatorFactory , tableParamsFactory ) {
	var self = this;

	var socket = win.io.socket;
	// self.tableParams = tableParamsFactory( '/sistema/consult' ); // instancia de ngTable
	self.resetForm    = validatorFactory.resetForm; // función que resetea el formulario
	self.cleanAll     = validatorFactory.cleanAll; // function que limpia los mensajes de error de la validación
	self.handlerError = validatorFactory.handlerError; // function que limpia los mensajes de error de la validación
	self.runError     = validatorFactory.runError; // function que limpia los mensajes de error de la validación
	self.runSuccess   = validatorFactory.runSuccess; // function que limpia los mensajes de error de la validación

	self.switchView = true; // valor que cambia la vista de la lista a formulario
	self.models = {}; // data de los valores del los Input HTML
	self.tableParams = {reload: function() {}}; // instancia de ngTable
	self.formName = ''; // nombre del formulario
	self.urlDel = ''; // url de la ruta a enlazar
	self.urlSave = ''; // url de la ruta a enlazar
	self.urlQuery = ''; // url de la ruta a enlazar
	self.urlLists = ''; // url de la ruta a enlazar
	self.urlNgTable = ''; // url de la ruta a enlazar


	self.go = function( state ) {
		$state.go( state );
	};


	self.listener = function () {
		self.models = this.models;
	};


	self.formGroup = function( values ) {};


	self.registerForm = function( formName ) {
		self.formName = formName ? formName : self.formName;
		validatorFactory( self.formName );
	};


	self.ngTable = function( url, callbackDone ) {
		if ( typeof url==='function' ) {
			callbackDone = url;
			url = null;
		}

		self.tableParams = tableParamsFactory( url || self.urlNgTable );

		if ( typeof callbackDone==='function' ) 
			callbackDone( self.tableParams );
	};


	self.lists = function( url, callbackDone, callbackError ) {
		if ( typeof url==='function' ) {
			callbackError = callbackDone;
			callbackDone = url;
			url = null;
		}
		socket.post( url || self.urlLists, {}, function( records, jwres ) {
			if ( records ) {
				if ( typeof callbackDone==='function' ) 
					callbackDone( records );
			}
			else {
				console.error( jwres );
				if ( typeof callbackError==='function' ) 
					callbackError( records );
			}
		});
	};



	self.edit = function( record ) {
		self.switchView = false;
		self.formGroup( record );
	};


	self.del = function( url, data, callbackDone, callbackError ) {
		if ( typeof url==='object' ) {
			callbackError = callbackDone;
			callbackDone = data;
			data = url;
			url = null;
		}
		if ( typeof data==='function' ) {
			callbackError = callbackDone;
			callbackDone = data;
			data = null;
		}
		if ( confirm('Seguro que desea Eliminar') ) {
			data = data || self.models;
			$rootScope.$loading = true;
			socket.post( url || self.urlDel, data, function( record, jwres ) {
				self.cleanAll( );
				
				if ( record.hasOwnProperty('data') && (record.data.hasOwnProperty('_id') && record.data._id) ) {
					self.tableParams.reload();
					alert('Hecho');
					if ( typeof callbackDone==='function' ) 
						callbackDone( record );
				}
				else {
					self.handlerError( jwres );
					if ( typeof callbackError==='function' ) 
						callbackError( record );
				}
				$rootScope.$loading = false;
				$rootScope.$apply();
			});
		}
	}; 


	self.save = function( url, data, callbackDone, callbackError ) {
		if ( typeof url==='object' ) {
			callbackError = callbackDone;
			callbackDone = data;
			data = url;
			url = null;
		}
		if ( typeof data==='function' ) {
			callbackError = callbackDone;
			callbackDone = data;
			data = null;
		}
		if ( self.runError( ) ) return;
		data = data || self.models;
		$rootScope.$loading = true;
		socket.post( url || self.urlSave, data, function( response, jwres ) {
			self.cleanAll( );

			if ( !response.hasOwnProperty('error') && ( response.hasOwnProperty('data') && ( ( response.data.hasOwnProperty('_id') && response.data._id ) || response.data===true ) ) ) {
				if ( typeof callbackDone==='function' ) callbackDone( response );
				if ( data.hasOwnProperty('_id') && !data._id ) {
					self.resetForm();
					self.formGroup();
				}
				self.tableParams.reload();
				alert('Hecho');
			}
			else {
				if ( typeof callbackError==='function' ) callbackError( response );
				self.handlerError( response );
			}

			$rootScope.$loading = false;
			$rootScope.$apply();
		});
	};

	self.query = function( url, data, callbackDone, callbackError ) {
		self.save( url, data, callbackDone, callbackError );
	};
	
}])}));
