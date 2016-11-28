(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('navDirective', [ function( ) { return {
	restrict: 'E',
	scope: {	props:'=' },
	controller:['$scope','$rootScope','$interval','collapseNavbarService','siteAuthorizedService',
		function( $scope , $rootScope , $interval , collapseNavbarService , siteAuthorizedService ) {
			var cont = 1;
			var stop = null;
			$scope.collapseNavbar = collapseNavbarService;
			$scope.notificaciones = 0;
			
			stop = $interval(function() {
				if ( cont === 20 ) $interval.cancel( stop );
				$scope.$authorized = $rootScope.$authorized;
				$scope.notificaciones = cont;
				cont++;
			}, 500);
		}
	],
	template: (''
		+ '<div style=" padding: 0">'
			+ '<nav class="navbar navbar-default" style="background: #95b3d7;margin-bottom: 0;">'
				+ '<div class="container-fluid">&nbsp;'
					+ '<div ng-show="$authorized" class="navbar-header" style="float:right;">'
						+ '<button type="button" class="navbar-toggle collapsed btn-default" ng-click="collapseNavbar.trigger()">'
							+ '<span class="sr-only">Toggle navigation</span>'
							+ '<span class="icon-bar"></span>'
							+ '<span class="icon-bar"></span>'
							+ '<span class="icon-bar"></span>'
						+ '</button>'
						+ '<a class="navbar-brand" href="#">Notificaciones <span class="badge">{{ notificaciones }}</span></a>'
					+ '</div>'
				+ '</div>'
			+ '</nav>'
			+ '<div style="clear: both"></div>'
		+ '</div>'
	),
}}])}));

