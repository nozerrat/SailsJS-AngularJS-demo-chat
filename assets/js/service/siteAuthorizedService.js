(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.service('siteAuthorizedService', [
			'$rootScope','$state','$timeout','$location','validatorFactory', 
function( $rootScope , $state , $timeout , $location , validatorFactory ) {
	var socket = win.io.socket;
	var self   = this;

	self.$authorized = false;
	$rootScope.$authorized = false;
	self.$loading = true;
	$rootScope.$loading = true;

	self.logout = function() {
		self.$loading = true;
		$rootScope.$loading = true;
		socket.post('/login/logout', function ( resdata, jwres ) {
			switch( jwres.statusCode ) {
				case 400: case 403: case 404: case 500: 
				validatorFactory.addError( resdata );
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
		if ( $location.path()==='/logup' ) return;
		self.$loading = true;
		$rootScope.$loading = true;

		socket.post('/login/authorized', function ( authorized, jwres ) {
			switch( jwres.statusCode ) {
				case 400: case 403: case 404: case 500: 
				validatorFactory.addError( authorized );
			}
			if ( jwres.statusCode!==200 ) return;

			if ( authorized.authorized===true ) {
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
