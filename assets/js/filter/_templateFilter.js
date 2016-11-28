(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.filter('templateFilter', [
function( ) {
	return function(input, uppercase) {
		input = input || '';
		var out = '';
		for (var i = 0; i < input.length; i++) {
			out = input.charAt(i) + out;
		}
		// conditional based on optional argument
		if (uppercase) {
			out = out.toUpperCase();
		}
		return out;
	};
}])}));
