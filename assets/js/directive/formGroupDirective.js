/**
	ej: controlador
		$scope.listener = function () {
			$scope.models = this.models;
		}
		$scope.propsInputEmail = { modelName: 'email', label: 'Email', type: 'text', defaultValue:'', ariaRules: 'required|email', listener: $scope.listener};
		$scope.propsInpuPass = { modelName: 'pass', label: 'Password', type: 'password', defaultValue:'1234', ariaRules: 'required', listener: $scope.listener};
		$scope.propsInpuRadio = { modelName: 'radio', label: 'Radio', type: 'radio', defaultValue:'2', class:'', radios:[{label: 'Radio 1',value:'1'},{label: 'Radio 2',value:'2'},{label: 'Radio 3',value:'3'}], ariaRules: 'required',  listener: $scope.listener};
		$scope.propsInpuCheckbox = { modelName: 'checkbox', label: 'Checkbox', type: 'checkbox', defaultValue:'2', valueTrue:'true', valueFalse:'false', ariaRules: 'required',  listener: $scope.listener};
		$scope.propsInpuCheckboxMult = { modelName: 'checkbox', label: 'Checkbox', type: 'checkbox', defaultValue:[{name: 'checkbox2',value:'2'}], class:'', checkboxs:[{label: 'Checkbox 1',name: 'checkbox1', valueTrue:'true', valueFalse:'false'},{label: 'Checkbox 2',name: 'checkbox2', valueTrue:'true', valueFalse:'false'}], ariaRules: 'required',  listener: $scope.listener};
		$scope.propsInpuTextarea = { modelName: 'textarea', label: 'Textarea', type: 'textarea', defaultValue:'1234', ariaRules: 'required', listener: $scope.listener};
		$scope.propsInpuSelect = { modelName: 'select', label: 'Select', type: 'select', defaultValue:'', class:'', options:{label: 'nombre',value:'_id',data:[{nombre: 'Select 1',_id:'1'},{nombre: 'Select 2',_id:'2'}]}, ariaRules: 'required',  listener: $scope.listener};
		$scope.propsInpuSelectMult = { modelName: 'selectMult', label: 'Select Multiple', type: 'select', defaultValue:'1', multiple:true, class:'', options:{label: 'nombre',value:'_id',data:[{nombre: 'Select 1',_id:'1'},{nombre: 'Select 2',_id:'2'}]}, ariaRules: 'required',  listener: $scope.listener};
		$scope.propsInputFile = { modelName: 'file', label: 'File', type: 'file', defaultValue:'', ariaRules: 'required', listener: $scope.listener};
		$scope.propsInputDate = { modelName: 'date', label: 'Date', type: 'date', defaultValue:'2016-11-10', ariaRules: 'required', listener: $scope.listener};

	ej: plantilla
		<form-group props="propsInputEmail" />
		<form-group props="propsInpuPass" />
		<form-group props="propsInpuRadio" />
		<form-group props="propsInpuCheckbox" />
		<form-group props="propsInpuCheckboxMult" />
		<form-group props="propsInpuTextarea" />
		<form-group props="propsInpuSelect" />
		<form-group props="propsInpuSelectMult" />
		<form-group props="propsInputFile" />
		<form-group props="propsInputDate" />

 */
(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('formGroup', [ function( ) { return {
	restrict: 'E',
	scope: {
		props: '='
	},
	controller:['$scope','$timeout','$filter',
		function( $scope , $timeout , $filter ) {
			var $ = win.jQuery;

			win.$$formGroupModel = {models: {}};

			$scope.models = { };


			$scope._props = {
				listener: function() {},//requerido
				modelName: '',//requerido
				type: '',
				label: '',
				class: '',
				placeholder: '',
				ariaRules: '',// reglas de validaciones
				multiple: false,// para select
				label_xs: 12,
				label_sm: 4,
				label_md: 4,
				label_lg: 4,
				field_xs: 12,
				field_sm: 7,
				field_md: 7,
				field_lg: 7,
				radios: [/* ej: {label: 'Radio',value:'1'} */],
				options: {/* ej: {label: 'Select',value:'1'} */},
				checkboxs: [/* ej: {label: 'Checkbox 1',name: 'checkbox1',value:'1'} */],
				defaultValue: '',// en el caso de un checkbos. Ej: [{name: 'checkbox1',value:'1'}]
				valueTrue: '',// en el caso de un checkbos. Ej: valueTrue="1"
				valueFalse: '',// en el caso de un checkbos. Ej: valueFalse="0"
			}

			$scope.datepicker = function() {
				if ( $scope._props.class.match(/datepicker/g) ) {
					$('.datepicker').datepicker({
						prevText: 'Atras',
						nextText: 'Siguiente',
						currentText: 'Hoy',
						monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
						monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
						dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
						dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
						dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
						weekHeader: 'Sm',
						dateFormat: 'dd-mm-yy',
						inline:true,
						changeMonth: true,
						changeYear: true,
						//minDate: -20, 
						//maxDate: "+1M"
					});
				}
			};

			$scope.isRequired = function() {
				return !$scope._props.ariaRules.match(/required/g) ? '' : '*';
			}

			$scope.$watch('props', function(newValue, oldValue) {
				// Definimo el tipo del campo por default
				$scope.selection = newValue.type || 'text';

				if (typeof $scope.props !== 'object') {
					console.error( 'Error de tipo: "props" debería ser un Objecto' ); return;
				}
				if ( !newValue.modelName ) {
					console.error( 'Atributo requerido: "modelName" es obligatorio' ); return;
				}
				if (typeof newValue.listener !== 'function') {
					console.error( 'Atributo requerido: "listener" no es una función valida' ); return;
				}

				$scope._props = win.Object.assign({}, $scope._props, newValue);

				var parseDate = function( defaultValue ) {
					if (newValue.type === 'date') {
						defaultValue = defaultValue || '';
						var f = [];
						var date = defaultValue;

						if ( typeof defaultValue==='string') 
							f = defaultValue.split( '-' );
						
						if ( typeof defaultValue==='string' && defaultValue.match( /T/ ) ) 
							f = defaultValue.split( 'T' )[0].split('-');
						
						if ( typeof defaultValue==='string' && defaultValue.match( / / ) ) 
							f = defaultValue.split( ' ' )[0].split('-');
						
						if ( f.length ) 
							date = new Date( win.parseInt(f[0], 10), win.parseInt(f[1], 10)-1, win.parseInt(f[2], 10) );
						
						$scope.models[newValue.modelName] = null ;

						$timeout(function() {
							$scope.models[newValue.modelName] = date ;
						},150);
					}
				}

				var parseSelect = function( defaultValue ) {
					if (newValue.type === 'select') {
						if (newValue.multiple) {
							$timeout(function() {
								$scope.models[newValue.modelName] = win.angular.isArray( defaultValue ) ? defaultValue : [defaultValue];
							},150);
						}
						else {
							$timeout(function() {
								$scope.models[newValue.modelName] = defaultValue ? ''+defaultValue : '';
							},150);
						}
					}
				}

				var parseCheckbox = function( defaultValue ) {
					if (newValue.type === 'checkbox') {
						// asignamos el valor del checkbox simple por default
						$scope.models[newValue.modelName] = ''+newValue.valueFalse;

						// si el valor es simple
						if ( typeof defaultValue==='string' || defaultValue===true || defaultValue===false ) {
							$timeout(function() {
								$scope.models[newValue.modelName] = ''+defaultValue;
							},150);
						}

						// si es un valor multiple
						if ( win.angular.isArray( newValue.checkboxs ) && newValue.checkboxs.length ) {

							$scope.models[newValue.modelName] = {};
							//Definimos valores por default
							for( index in newValue.checkboxs ) {
								$scope.models[newValue.modelName][newValue.checkboxs[index].name] = ''+newValue.checkboxs[index].valueFalse;
							}

							// agregamos los valores consultados
							if( win.angular.isArray( defaultValue ) && defaultValue.length ) {
								for( index in defaultValue ) {
									$scope.models[newValue.modelName][defaultValue[index].name] = null;
									$timeout(function() {
										$scope.models[newValue.modelName][defaultValue[index].name] = ''+defaultValue[index].value;
									},150);
								}
							}
							else if( typeof defaultValue === 'object' ) {
								$scope.models[newValue.modelName][defaultValue.name] = null;
								$timeout(function() {
									$scope.models[newValue.modelName][defaultValue.name] = ''+defaultValue.value;
								},150);
							}
							else {
								console.error( 'Error de tipo: El valor "defaultValue" del modelo "'+newValue.modelName+'" debería ser un Objecto' );
							}

							$scope.$watchCollection('models.' + newValue.modelName, function(_newValue, _oldValue) {
								win.$$formGroupModel.models[newValue.modelName] = _newValue;
								newValue.listener.bind(win.$$formGroupModel)( );
							});
						}
					}
				}


				$scope.$watch('models.' + newValue.modelName, function(_newValue, _oldValue) {
					win.$$formGroupModel.models[newValue.modelName] = _newValue;
					newValue.listener.bind(win.$$formGroupModel)( );
				});


				// Si el valor es un objeto seleccionamos el valor que corresponde con el nombre del modelo
				if ( typeof newValue.defaultValue==='object' && newValue.defaultValue.hasOwnProperty(newValue.modelName) && !win.angular.isArray( newValue.checkboxs ) ) {
					//Definimos valores por default					
					$scope.models[newValue.modelName] = newValue.defaultValue[newValue.modelName];
					parseDate( newValue.defaultValue[newValue.modelName] );
					parseSelect( newValue.defaultValue[newValue.modelName] );
					parseCheckbox( newValue.defaultValue[newValue.modelName] );
				}
				else {
					$scope.models[newValue.modelName] = newValue.defaultValue;
					parseDate( newValue.defaultValue );
					parseSelect( newValue.defaultValue );
					parseCheckbox( newValue.defaultValue );
				}

			});
		}
	],
	template: ('{{ datepicker() }}'
		+ '<div class="form-group">'
			+ '<label ng-if="_props.label" class="col-lg-{{ _props.label_lg }} col-md-{{ _props.label_md }} col-sm-{{ _props.label_sm }} col-xs-{{ _props.label_xs }} control-label">'
				+ '{{ _props.label }} {{ isRequired() }}'
			+ '</label>'
			
			+ '<div class="col-lg-{{ _props.field_lg }} col-md-{{ _props.field_md }} col-sm-{{ _props.field_sm }} col-xs-{{ _props.field_xs }}" style="{{ (selection==\'radio\'||selection==\'checkbox\') ?\'padding-top: 5px;\':\'\' }}">'
					
				+ '<input ng-if="selection==\'password\'||selection==\'number\'||selection==\'email\'||selection==\'file\'||selection==\'text\'||selection==\'date\'||selection==\'datetime-local\'||selection==\'month\'||selection==\'range\'||selection==\'time\'||selection==\'url\'||selection==\'week\'" class="form-control {{ _props.class }}" ng-model="models[_props.modelName]"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />'
				
				+ '<textarea ng-if="selection==\'textarea\'" class="form-control {{ _props.class }}" ng-model="models[_props.modelName]"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}"></textarea>'
				
				+ '<label ng-if="selection==\'radio\'" ng-repeat="radio in _props.radios" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
					+ '<input ng-model="models[_props.modelName]" ng-value="radio.value"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
					+ '{{ radio.label }} &nbsp;&nbsp; '
				+ '</label>'

				+ '<label ng-if="selection==\'checkbox\'&&_props.checkboxs.length" ng-repeat="checkbox in _props.checkboxs" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
					+ '<input ng-model="models[_props.modelName][checkbox.name]" ng-true-value="\'{{ checkbox.valueTrue }}\'" ng-false-value="\'{{ checkbox.valueFalse }}\'" type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
					+ '{{ checkbox.label }} &nbsp;&nbsp; '
				+ '</label>'

				+ '<label ng-if="selection==\'checkbox\'&&!_props.checkboxs.length" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
					+ '<input ng-model="models[_props.modelName]" ng-true-value="\'{{ _props.valueTrue }}\'" ng-false-value="\'{{ _props.valueFalse }}\'" type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
					+ '{{ checkbox.label }} &nbsp;&nbsp; '
				+ '</label>'

				+ '<select ng-if="selection==\'select\' && !_props.multiple" class="form-control {{ _props.class }}" ng-model="models[_props.modelName]"  name="{{ _props.modelName }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}">'
					+ '<option value="">&lt;&lt; Seleccione &gt;&gt;</option>'
					+ '<option ng-repeat="option in _props.options.data" value="{{ option[_props.options.value] }}">'
						+ '{{ option[_props.options.label] }}'
					+ '</option>'
				+ '</select>'

				+ '<select ng-if="selection==\'select\' && _props.multiple" multiple class="form-control {{ _props.class }}" ng-model="models[_props.modelName]"  name="{{ _props.modelName }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}">'
					+ '<option value="">&lt;&lt; Seleccione &gt;&gt;</option>'
					+ '<option ng-repeat="option in _props.options.data" value="{{ option[_props.options.value] }}">'
						+ '{{ option[_props.options.label] }}'
					+ '</option>'
				+ '</select>'

			+ '</div>'

		+ '</div>'
	),
}}])}));

