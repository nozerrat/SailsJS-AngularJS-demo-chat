(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.filter('maxString', [
function( ) {
	return function(input, max) {
		input = input || '';
		max = win.parseInt(max || 16, 10);

		var out = '';
		for ( var i = 0; i < max; i++ ) {
			out += input.charAt(i);
		}

		if ( input.length >= max ) {
			out += '...';
		}

		return out;
	};
}])}));
