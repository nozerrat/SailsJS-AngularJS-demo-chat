(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.filter('formatDate', [
function( ) {
	return function(input, country) {
		input = input || '';
		country = country || 'es';

		var f = [];
		var out = '';

		if ( input )
			f = input.split( '-' );
		
		if ( input.match( /T/ ) )
			f = input.split( 'T' )[0].split( '-' );
		
		if ( input.match( / / ) )
			f = input.split( ' ' )[0].split( '-' );
		
		if ( country=='es' )
			out = f[2]+'-'+f[1]+'-'+f[0];

		return out;
	};
}])}));
