(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('sistemaGerente', [
	function(  ) {
		var socket = win.io.socket;
		return {
			restrict: 'E',
			scope: { props:'=' },
			controller:['$scope','$rootScope','$state','$timeout','validatorFactory',
				function( $scope , $rootScope , $state , $timeout , validatorFactory ) {
					$scope.formName = 'sistema';
					$scope.formGroupModel = {};

					$timeout(function() {
						validatorFactory( $scope.formName );
					},500);

					socket.post('/sistema/consult',{}, function( foundRecord, jwres ) {
						// console.log( found )
						$scope.formGroup( foundRecord );
						$scope.$apply();
						$rootScope.$loading = false;
						$rootScope.$apply();
					});

					$scope.submit = function( ) {
						if ( validatorFactory.runError( ) ) return;
						$rootScope.$loading = true;
						socket.post('/sistema/insert', $scope.formGroupModel || {}, function( created, jwres ) {
							validatorFactory.cleanAll( );
							if ( created._id )
								alert('Hecho');
							else
								validatorFactory.handlerError( jwres );
							$rootScope.$loading = false;
							$rootScope.$apply();
						});
					};

					$scope.changeModel = function () {
						$scope.formGroupModel = this.model;
					};
					$scope.formGroup = function( values ) {
						$scope.props_id     = { modelName:'_id', defaultValue:values, changeModel: $scope.changeModel};
						$scope.propsNombre  = { modelName:'nombre', label:'Nombre', type:'text', ariaRules:'required', defaultValue:values, changeModel: $scope.changeModel};
						$scope.propsVersion = { modelName:'version', label:'Versión', type:'text', ariaRules:'required', defaultValue:values, changeModel: $scope.changeModel};
						$scope.propsDesc    = { modelName:'descripcion', label:'Descripción', type:'textarea', ariaRules:'', defaultValue:values, changeModel: $scope.changeModel};
	 					$scope.propsFecha   = { modelName:'fecha', label: 'Fecha', type: 'date', ariaRules: 'required', defaultValue:values, changeModel: $scope.changeModel};
	 					$scope.propsEstatus = { modelName:'estatus', label: 'Estatus', type: 'checkbox', defaultValue:values, valueTrue:'true', valueFalse:'false', ariaRules: 'required', defaultValue:values, changeModel: $scope.changeModel};
					};
				}
			],
			template: (''
				+ '<div class="text-center"><h3> Sistema </h3></div>'
				+ '<form ng-init=" formGroup() " class="form-horizontal" name="{{ formName }}" ng-submit="submit()">'
						+ '<form-group props="props_id || {}" hidden/>'
						+ '<form-group props="propsNombre" />'
						+ '<form-group props="propsVersion" />'
						+ '<form-group props="propsDesc" />'
						+ '<form-group props="propsFecha" />'
						+ '<form-group props="propsEstatus" />'

						+ '<div class="form-group text-center">'
							+ '<button class="btn btn-primary">'
								+ 'Aceptar'
							+ '</button>'
						+ '</div>'
				+ '</form>'
			),
		};
	}
])}));



