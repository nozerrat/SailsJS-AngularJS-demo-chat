(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.factory('tableParamsFactory', [
			'$q','$rootScope','NgTableParams',
function( $q , $rootScope , NgTableParams ) {
	var socket = win.io.socket;

	return function( url, sorting ) {
		return new NgTableParams({
			// page: 1,            // show first page
			// count: 10,          // count per page
			sorting: sorting || {},
		},{
			total: 0,           // length of data
			getData: function( params ) {
				return $q( function( resolve, reject ) {
					$rootScope.$loading = true;
					socket.post(url, params.url(), function( foundRecord, jwres ) {
						params.total( foundRecord.data.total );
						resolve( foundRecord.data.records );
						$rootScope.$loading = false;
						$rootScope.$apply();
					});
				});
			},
		});
	}
}])}));

