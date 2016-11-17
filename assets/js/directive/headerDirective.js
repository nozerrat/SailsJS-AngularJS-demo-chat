(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('header', [
	function(  ) {
		return {
			restrict: 'E',
			scope: {	props:'=' },
			controller:['$scope','siteAuthorizedService',
				function( $scope , siteAuthorizedService ) {
					$scope.logout = siteAuthorizedService.logout;
					$scope.imgName = 'logo.png';
					$scope.profile = 'profile'+'—';
					$scope.userName = 'userName';


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
				+ '<div style="background:#f9f9f9;padding:5px" className="form-horizontal">'
					+ '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">'
						+ '<img ng-src="images/{{ imgName }}" style="height:50px" class="img-responsive">'
					+ '</div>'
					+ '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">'
						+ '<br clear="all"/>'
						+ '<div style="float:right;font-size:16px;color:#FF6600;">'
							+ '<b>'
								+ '{{ profile }}'
							+ '</b>'
							+ '{{ userName }}'
							+ '<a href="#" ng-click="logout()" style="margin-left:30px">'
								+ 'Cerrar'
							+ '</a>'
						+ '</div>'
					+ '</div>'
					+ '<div style="clear:both"></div>'
				+ '</div>'
			),
		};
	}
])}));
