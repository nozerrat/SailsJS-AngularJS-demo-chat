(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('footer', [
	function(  ) {
		return {
			restrict: 'E',
			scope: { props:'=' },
			controller:['$scope',
				function( $scope ) {
					$scope.redesSociales = [
						{href:'#',icon:'fa-facebook-square'},
						{href:'#',icon:'fa-twitter-square'},
						{href:'#',icon:'fa-google-plus-square'},
						{href:'#',icon:'fa-youtube'},
						{href:'#',icon:'fa-flickr'},
					];
				}
			],
			template: (''
				+ '<div style="background:#95b3d7;height:50px">'
					+ '<div style="color: #ccc; bottom: -16px; position: relative; margin-bottom: -20px; text-align: center;">'
						+ 'Copyright Sosmedichat v3.0'
					+ '</div>'
					+ '<div style="font-size: 36px; float: right; position: relative; z-index: 1;">'
						+ '<a ng-repeat="redes in redesSociales" ng-href="{{redes.href}}" class="fa {{redes.icon}}" style="margin-right:5px"></a>'
					+ '</div>'
					+ '<div style="clear:both"></div>'
				+ '</div>'
			),
		};
	}
])}));
