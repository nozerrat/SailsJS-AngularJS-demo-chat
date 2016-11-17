(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('logup', [
	function(  ) {
		var socket = win.io.socket;
		return {
			restrict: 'E',
			scope: {	props:'=' },
			controller:['$scope','$rootScope','$state','$timeout','validatorFactory',
				function( $scope , $rootScope , $state , $timeout , validatorFactory ) {
					$scope.formName = 'logupForm';
					$scope.formGroupModel = {};
					
					$timeout(function() {
						validatorFactory( $scope.formName );
					},500);

					$scope.submit = function( ) {
						if ( validatorFactory.runError( ) ) return;
						$rootScope.$loading = true;
						socket.post('/logup/subscribe', $scope.formGroupModel || {}, function( created, jwres ) {
							validatorFactory.cleanAll( );
							if ( created.created!==true )
								validatorFactory.handlerError( jwres );
							else
								alert('Hecho');
								
							$rootScope.$loading = false;
							$rootScope.$apply();
						});
					};

					$scope.goLogin = function() {
						$state.go( 'login' );
					};

					$scope.changeModel = function() {
						$scope.formGroupModel = this.model;
					};
					$scope.propsInputEmail = { modelName:'username', label:'Email', type:'text', ariaRules:'required|email', changeModel: $scope.changeModel, placeholder:"pperez@gmail.com" };
					$scope.propsInpuPass   = { modelName:'password', label:'Password', type:'password', ariaRules:'required', changeModel: $scope.changeModel, placeholder:"Clave" };
					$scope.propsInpuPassR  = { modelName:'repeat_password', label:'Repetir Password', type:'password', ariaRules:'same:password', changeModel: $scope.changeModel, placeholder:"Repetir Clave" };
					$scope.propsInpuRadio  = { modelName:'discriminant', label: 'Tipo de Persona', type: 'radio', defaultValue:'paciente', class:'', radios:[{label: 'Paciente',value:'paciente'},{label: 'Doctor',value:'doctor'},{label: 'Admin',value:'admin'}], ariaRules: 'required',  changeModel: $scope.changeModel};
				}
			],
			template: (''
				+ '<nav-directive></nav-directive>'
				+ '<form class="form-horizontal" name="{{ formName }}" ng-submit="submit()">'
					+ '<div class="form-group text-center">'
						+ '<h2 class="form-signin-heading">'
							+ 'Usuarios Afiliados'
						+ '</h2>'
					+ '</div>'

					+ '<form-group props="propsInputEmail" />'
					+ '<form-group props="propsInpuPass" />'
					+ '<form-group props="propsInpuPassR" />'
					+ '<form-group props="propsInpuRadio" />'

					+ '<div class="form-group">'
						+ '<div class="col-sm-offset-3 col-sm-6 text-right">'
							+ '<a href="#" ng-click="goLogin()">'
								+ 'Regresar'
							+ '</a>'
						+ '</div>'
					+ '</div>'

					+ '<div class="form-group">'
						+ '<div class="col-sm-offset-3 col-sm-6 text-right">'
							+ '<button class="btn btn-lg btn-primary btn-block">'
								+ 'Aceptar'
							+ '</button>'
						+ '</div>'
					+ '</div>'
				+ '</form>'
				+ '<footer></footer>'
			),
		};
	}
])}));

