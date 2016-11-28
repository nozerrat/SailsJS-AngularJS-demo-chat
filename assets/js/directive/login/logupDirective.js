(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('logup', [ function( ) { return {
	restrict: 'E',
	scope: {	props:'=' },
	controller:['$scope','resourceService',
		function( $scope , resourceService ) {
			$scope.rsc = resourceService;
			$scope.rsc.registerForm( 'logupForm' );

			$scope.submit = function( ) {
				$scope.rsc.save('/logup/subscribe', function( data ) {
					$scope.rsc.resetForm( );
				});
			};

			$scope.goLogin = function() {
				$scope.rsc.go( 'login' );
			};

			$scope.propsInputEmail = { modelName:'username', label:'Email', type:'text', ariaRules:'required|email', defaultValue:'garlos@gmail.com', listener: $scope.rsc.listener, placeholder:"pperez@gmail.com" };
			$scope.propsInpuPass   = { modelName:'password', label:'Password', type:'password', ariaRules:'required', defaultValue:'123', listener: $scope.rsc.listener, placeholder:"Clave" };
			$scope.propsInpuPassR  = { modelName:'repeat_password', label:'Repetir Password', type:'password', defaultValue:'123', ariaRules:'same:password', listener: $scope.rsc.listener, placeholder:"Repetir Clave" };
			$scope.propsInpuRadio  = { modelName:'discriminant', label: 'Tipo de Persona', type: 'radio', defaultValue:'paciente', class:'', radios:[{label: 'Paciente',value:'paciente'},{label: 'Doctor',value:'doctor'},{label: 'Admin',value:'admin'}], ariaRules: 'required',  listener: $scope.rsc.listener};
		}
	],
	template: (''
		+ '<nav-directive></nav-directive>'
		+ '<form class="form-horizontal" name="{{ rsc.formName }}" ng-submit="submit()">'
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
}}])}));

