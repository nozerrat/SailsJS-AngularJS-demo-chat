(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app', ['ui.router','ngSanitize','ngTable'])
.run([      '$rootScope','$state','$stateParams','siteAuthorizedService',
	function( $rootScope , $state , $stateParams , siteAuthorizedService ) {
		// Es muy práctico para añadir referencias al $state y $stateParams a los $rootScope es
		// para que pueda acceder a ellos desde cualquier ámbito.
		// Por ejemplo, <li ng-class="{ active: $state.includes('contacts.list') }"> se defina <li> 
		// para siempre activa 'contacts.list 'o uno de sus decendientes se encuentra activo.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		siteAuthorizedService.authorized( );
	}
])
.config(['$stateProvider','$urlRouterProvider','$locationProvider',
function( $stateProvider , $urlRouterProvider , $locationProvider ) {
	// $locationProvider.hashPrefix( '!' );
	$locationProvider.html5Mode( true );
	$urlRouterProvider.otherwise( '/' );

	$stateProvider
	.state( 'site', {
		// Con conjunto abstracto de verdad, eso significa que este estado no se puede activar de forma explícita.
		// Sólo puede ser implícitamente activa mediante la activación de uno de sus hijos.
		abstract: true,
		url: '/site',
		template: '<div ng-show="$authorized"> <ui-view name="site" /> </div>',
		onEnter: ['siteAuthorizedService',
			function ( siteAuthorizedService ) {
				siteAuthorizedService.authorized( );
			}
		],
	})

}])

}));
