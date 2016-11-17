(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('login', [
	function(  ) {
		var socket = win.io.socket;
		return {
			restrict: 'E',
			scope: { props:'=' },
			controller:['$scope','$rootScope','$state','$timeout','validatorFactory',
				function( $scope , $rootScope , $state , $timeout , validatorFactory ) {
					$scope.formName = 'loginForm';
					$scope.formGroupModel = {};

					$timeout(function() {
						validatorFactory( $scope.formName );
					},500);

					$scope.submit = function( ) {
						if ( validatorFactory.runError( ) ) return;
						$rootScope.$loading = true;
						socket.post('/login/authorize', $scope.formGroupModel || {}, function (authorized, jwres) {
							validatorFactory.cleanAll( );
							if ( authorized===true ) 
								$state.go( 'site.gerente.home' );
							else 
								validatorFactory.handlerError( jwres );
							$rootScope.$loading = false;
							$rootScope.$apply();
						});
					};

					$scope.goLogup = function() {
						$state.go( 'logup' ); 
					};

					$scope.changeModel = function () {
						$scope.formGroupModel = this.model;
					};
					$scope.propsInputEmail = { modelName:'username', label:'Email', type:'text', ariaRules:'required|email', placeholder:"pperez@gmail.com", changeModel: $scope.changeModel, label_xs: null, label_sm: null, label_md: null, label_lg: null, field_xs: null, field_sm: null, field_md: null, field_lg: null, };
					$scope.propsInpuPass = { modelName:'password', label:'Clave', type:'password', ariaRules:'required', placeholder:"Clave", changeModel: $scope.changeModel, label_xs: null, label_sm: null, label_md: null, label_lg: null, field_xs: null, field_sm: null, field_md: null, field_lg: null, };

				}
			],
			template: (''
				+ '<nav-directive></nav-directive>'
				+ '<form class="form-horizontal" name="{{ formName }}" ng-submit="submit()">'
					+ '<div>'
						+ '<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9" style="padding:0">'
							+ '<img class="img-responsive img-thumbnail" style="width:100%" src="images/banner1.png"})>'
							+ '<img class="img-responsive img-thumbnail" style="width:100%" src="images/banner2.png"})>'
						+ '</div>'
						+ '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="background:#f7f7f7">'
						
							+ '<div class="form-group text-center">'
								+ '<h4 class="form-signin-heading">'
									+ 'Ingrese al Sistema'
								+ '</h4>'
							+ '</div>'

							+ '<form-group props="propsInputEmail" />'
							+ '<form-group props="propsInpuPass" />'

							+ '<div class="form-group text-center">'
								+ '<a href="javascript://" ng-click="goLogup()">'
									+ 'Afiliarse'
								+ '</a>'
							+ '</div>'
							+ '<div class="form-group">'
								+ '<button class="btn btn-lg btn-primary btn-block">'
									+ 'Aceptar'
								+ '</button>'
							+ '</div>'
						+ '</div>'
						+ '<div style="clear:both"></div>'
					+ '</div>'
				+ '</form>'			
				+ '<footer></footer>'
			),
		};
	}
])}));

