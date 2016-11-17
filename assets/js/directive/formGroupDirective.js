/**
	ej: controlador
		$scope.changeModel = function () {
			$scope.model = this.model;
		}
		$scope.propsInputEmail = { modelName: 'email', label: 'Email', type: 'text', defaultValue:'', ariaRules: 'required|email', changeModel: $scope.changeModel};
		$scope.propsInpuPass = { modelName: 'pass', label: 'Password', type: 'password', defaultValue:'1234', ariaRules: 'required', changeModel: $scope.changeModel};
		$scope.propsInpuRadio = { modelName: 'radio', label: 'Radio', type: 'radio', defaultValue:'2', class:'', radios:[{label: 'Radio 1',value:'1'},{label: 'Radio 2',value:'2'},{label: 'Radio 3',value:'3'}], ariaRules: 'required',  changeModel: $scope.changeModel};
		$scope.propsInpuCheckbox = { modelName: 'checkbox', label: 'Checkbox', type: 'checkbox', defaultValue:'2', valueTrue:'true', valueFalse:'false', ariaRules: 'required',  changeModel: $scope.changeModel};
		$scope.propsInpuCheckboxMult = { modelName: 'checkbox', label: 'Checkbox', type: 'checkbox', defaultValue:[{name: 'checkbox2',value:'2'}], class:'', checkboxs:[{label: 'Checkbox 1',name: 'checkbox1', valueTrue:'true', valueFalse:'false'},{label: 'Checkbox 2',name: 'checkbox2', valueTrue:'true', valueFalse:'false'}], ariaRules: 'required',  changeModel: $scope.changeModel};
		$scope.propsInpuTextarea = { modelName: 'textarea', label: 'Textarea', type: 'textarea', defaultValue:'1234', ariaRules: 'required', changeModel: $scope.changeModel};
		$scope.propsInpuSelect = { modelName: 'select', label: 'Select', type: 'select', defaultValue:'', class:'', options:[{label: 'Select 1',value:'1'},{label: 'Select 2',value:'2'},{label: 'Select 3',value:'3'}], ariaRules: 'required',  changeModel: $scope.changeModel};
		$scope.propsInpuSelectMult = { modelName: 'selectMult', label: 'Select Multiple', type: 'select', defaultValue:'1', multiple:true, class:'', options:[{label: 'Select 1',value:'1'},{label: 'Select 2',value:'2'},{label: 'Select 3',value:'3'}], ariaRules: 'required',  changeModel: $scope.changeModel};
		$scope.propsInputFile = { modelName: 'file', label: 'File', type: 'file', defaultValue:'', ariaRules: 'required', changeModel: $scope.changeModel};
		$scope.propsInputDate = { modelName: 'date', label: 'Date', type: 'date', defaultValue:'2016-11-10', ariaRules: 'required', changeModel: $scope.changeModel};

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
.directive('formGroup', [
	function(  ) {
		var $ = win.jQuery;
		return {
			restrict: 'E',
			scope: {
				props: '='
			},
			controller:['$scope','$timeout','$filter',
				function( $scope , $timeout , $filter ) {

					win.$$formGroupModel = {model: {}};

					$scope.model = { };


					$scope._props = {
						changeModel: function() {},//requerido
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
						options: [/* ej: {label: 'Select',value:'1'} */],
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

					// $timeout(function() {
					// 	$scope._props = Object.assign({}, $scope._props, $scope.props);
					// 	$scope.props = $scope._props;
					// 	win.alert( $filter('json')($scope.props) );
					// },500);
					

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
						if (typeof newValue.changeModel !== 'function') {
							console.error( 'Atributo requerido: "changeModel" no es una función valida' ); return;
						}						

						$scope._props = win.Object.assign({}, $scope._props, newValue);
						// console.log(newValue); 

						var parseDate = function( defaultValue ) {
							if (newValue.type === 'date') {
								var date = new Date();
								if ( defaultValue ) 
									date = new Date( defaultValue + ' 00:00:00' );
								if ( (defaultValue||'').match( /T/ ) ) 
									date = new Date( defaultValue );
								if ( (defaultValue||'').match( / / ) ) 
									date = new Date( defaultValue );
							
								$scope.model[newValue.modelName] =  date ;
							}
						}

						var parseSelectMult = function( defaultValue ) {
							if (newValue.type === 'select' && newValue.multiple) {
								$scope.model[newValue.modelName] = win.angular.isArray( defaultValue ) ? defaultValue : [defaultValue];
							}
						}

						var parseCheckbox = function( defaultValue ) {
							if (newValue.type === 'checkbox') {
								// asignamos el valor del checkbox simple por default
								$scope.model[newValue.modelName] = ''+newValue.valueFalse;

								// si el valor es simple
								if ( typeof defaultValue==='string' || defaultValue===true || defaultValue===false ) {
									$scope.model[newValue.modelName] = ''+defaultValue;
								}

								// si es un valor multiple
								if (win.angular.isArray( newValue.checkboxs )) {

									$scope.model[newValue.modelName] = {};
									//Definimos valores por default
									for( index in newValue.checkboxs ) {
										$scope.model[newValue.modelName][newValue.checkboxs[index].name] = ''+newValue.checkboxs[index].valueFalse;
									}

									// agregamos los valores consultados
									if( win.angular.isArray( defaultValue ) ) {
										for( index in defaultValue ) {
											$scope.model[newValue.modelName][defaultValue[index].name] = ''+defaultValue[index].value;
										}
									}
									else if( typeof defaultValue === 'object' ) {
										$scope.model[newValue.modelName][defaultValue.name] = ''+defaultValue.value;
									}
									else {
										console.error( 'Error de tipo: El valor "defaultValue" del modelo "'+newValue.modelName+'" debería ser un Objecto' );
									}

									$scope.$watchCollection('model.' + newValue.modelName, function(_newValue, _oldValue) {
										win.$$formGroupModel.model[newValue.modelName] = _newValue;
										newValue.changeModel.bind(win.$$formGroupModel)( );
									});
								}
							}
						}

						$scope.$watch('model.' + newValue.modelName, function(_newValue, _oldValue) {
							win.$$formGroupModel.model[newValue.modelName] = _newValue;
							newValue.changeModel.bind(win.$$formGroupModel)( );
						});

						// Si el valor es un objeto seleccionamos el valor que corresponde con el nombre del modelo
						if ( typeof newValue.defaultValue === 'object' && !win.angular.isArray( newValue.checkboxs ) ) {
							//Definimos valores por default
							for( index in newValue.defaultValue ) {
								if ( newValue.modelName == index ) {
									$scope.model[newValue.modelName] = newValue.defaultValue[index];
									parseDate( newValue.defaultValue[index] );
									parseSelectMult( newValue.defaultValue[index] );
									parseCheckbox( newValue.defaultValue[index] );
								}
							}
						}
						else {
							$scope.model[newValue.modelName] = newValue.defaultValue;
							parseDate( newValue.defaultValue )
							parseSelectMult( newValue.defaultValue );
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
							
						+ '<input ng-if="selection==\'password\'||selection==\'number\'||selection==\'email\'||selection==\'file\'||selection==\'text\'||selection==\'date\'||selection==\'datetime-local\'||selection==\'month\'||selection==\'range\'||selection==\'time\'||selection==\'url\'||selection==\'week\'" class="form-control {{ _props.class }}" ng-model="model[_props.modelName]"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />'
						
						+ '<textarea ng-if="selection==\'textarea\'" class="form-control {{ _props.class }}" ng-model="model[_props.modelName]"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}"></textarea>'
						
						+ '<label ng-if="selection==\'radio\'" ng-repeat="radio in _props.radios" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
							+ '<input ng-model="model[_props.modelName]" ng-value="radio.value"  type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
							+ '{{ radio.label }} &nbsp;&nbsp; '
						+ '</label>'

						+ '<label ng-if="selection==\'checkbox\'&&_props.checkboxs.length" ng-repeat="checkbox in _props.checkboxs" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
							+ '<input ng-model="model[_props.modelName][checkbox.name]"  ng-true-value="\'{{ checkbox.valueTrue }}\'" ng-false-value="\'{{ checkbox.valueFalse }}\'" type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
							+ '{{ checkbox.label }} &nbsp;&nbsp; '
						+ '</label>'

						+ '<label ng-if="selection==\'checkbox\'&&!_props.checkboxs.length" class="{{ _props.class }}" style="font-weight: normal; margin-bottom: 0;">'
							+ '<input ng-model="model[_props.modelName]"  ng-true-value="\'{{ _props.valueTrue }}\'" ng-false-value="\'{{ _props.valueFalse }}\'" type="{{ _props.type }}" name="{{ _props.modelName }}" placeholder="{{ _props.placeholder }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}" />&nbsp;'
							+ '{{ checkbox.label }} &nbsp;&nbsp; '
						+ '</label>'

						+ '<select ng-if="selection==\'select\' && !_props.multiple" class="form-control {{ _props.class }}" ng-model="model[_props.modelName]"  name="{{ _props.modelName }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}">'
							+ '<option value="">&lt;&lt; Seleccione &gt;&gt;</option>'
							+ '<option ng-repeat="option in _props.options" value="{{ option.value }}">'
								+ '{{ option.label }}'
							+ '</option>'
						+ '</select>'

						+ '<select ng-if="selection==\'select\' && _props.multiple" multiple class="form-control {{ _props.class }}" ng-model="model[_props.modelName]"  name="{{ _props.modelName }}" aria-rules="{{ _props.ariaRules }}" aria-title="{{ _props.label }}">'
							+ '<option value="">&lt;&lt; Seleccione &gt;&gt;</option>'
							+ '<option ng-repeat="option in _props.options" value="{{ option.value }}">'
								+ '{{ option.label }}'
							+ '</option>'
						+ '</select>'

					+ '</div>'

				+ '</div>'
			),
		};
	}
])}));

