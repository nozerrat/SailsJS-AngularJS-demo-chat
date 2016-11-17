(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('datosGerente', [
	function(  ) {
		return {
			restrict: 'E',
			scope: {	props:'=' },
			controller:['$scope',
				function( $scope ) {
					$scope.formName = '';
					$scope.formGroupModel = {};

					// $scope.$watch('props', function(newValue, oldValue) {
					// 	$scope.formGroupModel[newValue.modelName] = newValue.defaultValue;
					// 	//code
					// 	$scope.$watch('formGroupModel.' + newValue.modelName, function(_newValue, _oldValue) {
					// 		//code
					// 	});
					// });
				}
			],
			template: (''
				+ '<h2> datosGerente </h2>'
			),
		};
	}
])}));

