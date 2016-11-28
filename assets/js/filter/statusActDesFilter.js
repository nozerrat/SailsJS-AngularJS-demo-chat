(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.filter('statusActDes', [
function( ) {
	return function(input) {
		input = input || '';
		var out = 'Inactivo';
		if ( input==='true' || input===true || input.match(/^t/i) ) {
			out = 'Activo';
		}
		return out;
	};
}])}));
