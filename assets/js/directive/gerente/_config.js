(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app')
.run([
function( ) {

}])

.config(['$stateProvider',
function( $stateProvider ) {
	$stateProvider
	.state( 'site.gerente', {
		abstract: true,
		url: '/gerente',
		views: {	site: {// <ui-view name="site" />
				template: '<site-gerente />',
			},
		}
	})
	.state( 'site.gerente.chat', {
		url: '/chat',
		views: { gerente: {// <ui-view name="gerente" />
				template: '<chat-gerente />',
			},
		}
	})
	.state( 'site.gerente.home', {
		url: '/home',
		views: { gerente: {//<ui-view name="gerente" />
				template: '<home-gerente />',
			},
		}
	})
	.state( 'site.gerente.datos', {
		url: '/datos',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<datos-gerente />',
			},
		}
	})
	.state( 'site.gerente.contratante', {
		url: '/contratante',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<contratante-gerente />',
			},
		}
	})
	.state( 'site.gerente.usuarioSuscriptor', {
		url: '/usuario-suscriptor',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<usuario-suscriptor-gerente />',
			},
		}
	})
	.state( 'site.gerente.plan', {
		url: '/plan',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<plan-gerente />',
			},
		}
	})
	.state( 'site.gerente.canal', {
		url: '/canal',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<canal-gerente />',
			},
		}
	})
	.state( 'site.gerente.sistema', {
		url: '/sistema',
		views: {	gerente: {//<ui-view name="gerente" />
				template: '<sistema-gerente />',
			},
		}
	})
}])

}));
