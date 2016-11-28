(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.service('siteAuthorizedService', [
			'$rootScope','$state','$timeout','$location','validatorFactory','resourceService', 
function( $rootScope , $state , $timeout , $location , validatorFactory , resourceService ) {
	var socket = win.io.socket;
	var self   = this;

	var rsc = resourceService;

	self.$authorized = false;
	$rootScope.$authorized = false;
	self.$loading = true;
	$rootScope.$loading = true;

	// self.logout = function() {
	// 	$scope.rsc.query('/login/logout', function( data ) {
	// 		// body...
	// 	})
	// };

	self.logout = function() {
		self.$loading = true;
		$rootScope.$loading = true;
		socket.post('/login/logout', function ( resdata, jwres ) {
			switch( jwres.statusCode ) {
				case 400: case 403: case 404: case 500: 
				validatorFactory.handlerError( resdata );
			}
			if ( jwres.statusCode!==200 ) return;

			$state.go( 'login' );

			self.$loading = false;
			$rootScope.$loading = false;

			self.$authorized = false;
			$rootScope.$authorized = false;

			$rootScope.$apply();
		});
	};

	self.authorized = function() {
		self.$loading = true;
		$rootScope.$loading = true;
		
		if ( $location.path()==='/logup' ) {
			self.$loading = false;
			$rootScope.$loading = false;
			return;
		}

		socket.post('/login/authorized', function( authorized, jwres ) {
			switch( authorized.statusCode ) {
				case 400: case 403: case 404: case 500: 
				validatorFactory.handlerError( authorized );
			}
			if ( authorized.statusCode!==200 ) return;

			if ( authorized.data.authorized===true ) {
				self.$authorized = true;
				$rootScope.$authorized = true;
				if ( $location.path().match( /\/site\/(.*)/ ) ) {
					$state.go( $location.path().substr(1).replace(/\//g,'.') );
				}
				else {
					$state.go( 'site.gerente.home' );//redireccionar a home
				}
			}
			else {
				self.$authorized = false;
				$rootScope.$authorized = false;
				$state.go( 'login' );
			}
			
			self.$loading = false;
			$rootScope.$loading = false;

			$rootScope.$apply();
		});
	}
}])}));
