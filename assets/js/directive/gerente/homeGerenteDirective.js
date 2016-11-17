(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('homeGerente', [
	function(  ) {
		return {
			restrict: 'E',
			scope: {	props:'=' },
			controller:['$scope',
				function( $scope ) {
					$scope.formName = '';
					$scope.formGroupModel = {};

				}
			],
			template: (''
				+ '<h2> homeGerente </h2>'
			),
		};
	}
])}));

