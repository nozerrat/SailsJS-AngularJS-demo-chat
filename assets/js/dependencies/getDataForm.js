(function( win,factory ) { factory( win ); }( this,function( win ) {

	win.getDataForm =  function( target, paramTypeGet ) {
		var value = {};
		var forms = win.document.forms;
		var length;
		
		try{
			length = forms[ target ].length;
		}catch(err) {
			length = 0;
		}

		for ( var i=0; i < length; i++ ) {
			var input = forms[ target ][ i ];

			try { name = input.getAttribute( 'name' ) }
			catch( err ) { name = null }

			if ( name ) {
				if ( typeof value[ name ]==='undefined' )
					value[ name ] = '';
			
				var type     = input.getAttribute( 'type' );
				var multiple = input.getAttribute( 'multiple' );

				if ( input.length ) {

					if ( input.multiple===false ) 
						value[ name ] = input.value;

					if ( input.multiple===true ) {
						if ( typeof value[ name ].push==='undefined' ) 
							value[ name ] = [];
						
						for ( index in input.childNodes ) {
							if ( input.childNodes[ index ].selected ) {
								value[ name ].push( input.childNodes[ index ].value );
							}
						}
					}

				} else {

					if ( type==='radio' && input.checked ) 
						value[ name ] = input.value;

					if ( type==='checkbox' ) {
						if ( typeof value[ name ].push==='undefined' ) 
							value[ name ] = [];
						if ( input.checked )
							value[ name ].push( input.value );
					}

					if ( type!=='checkbox' && type!=='radio' ) {
						if ( value[ name ]==='' ) 
							value[ name ] = input.value;
						
						else {
							if ( typeof value[ name ].push==='undefined' ) {
								var temp = value[ name ];
								value[ name ] = [];
								value[ name ].push( temp );
							}
							value[ name ].push( input.value );
						}
					}

				}

		  	}
		}

		if ( paramTypeGet ) {
			var params = '';
			for ( var name in value ) {
				if ( typeof value[ name ]==='object' ) {
					// Si el nombre del Objecto contiene los caractes "[]"
					// entonces se agregará los Items con el mismo nombre del Objecto
					if ( name.match(/^.*\[.*]$/ ) ) {
						var array = value[ name ]
						if ( array.length ) {
							for ( var index in array ) {
								params += '&'+name+'='+( array[ index ] );
							}
						} 
						else {
							// En caso que el Objeto no contenga Items
							params += '&'+name+'=';
						}
					// Si el nombre del Objecto no contiene los caractes "[]"
					} 
					else {
						// Se une con los siguientes caracteres "[#]" puesto que
						// también se agrupan input de tipo texto
						params += '&'+name+'='+( value[ name ].join( '[#]' ) );
					}
				// Si el Objecto es de tipo String
				} 
				else if ( typeof value[ name ]==='string' ) {
					params += '&'+name+'='+( value[ name ] );
				}
			}
			value = params;
		}

		return value;

	};	
}));
