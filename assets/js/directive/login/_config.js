(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app')
.run([
function( ) {

}])

.config(['$stateProvider',
function( $stateProvider ) {
	$stateProvider
	.state( 'login', {
		url: '/',
		template: '<login />',
	})
	.state( 'logup', {
		url: '/logup',
		template: '<logup />',
	})
}])

}));
