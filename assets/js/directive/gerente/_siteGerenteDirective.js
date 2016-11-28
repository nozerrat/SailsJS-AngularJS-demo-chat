(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('siteGerente', [ function( ) { return {
	restrict: 'E',
	scope: {	props:'=' },
	controller:['$scope',
		function( $scope ) {
			$scope.menus = {
				viewName: 'gerente',
				menus:[
					{key:1,state:'home',nameLabel:'Home',default:false},
					{key:2,state:'datos',nameLabel:'Mis Datos'},
					{key:3,state:'contratante',nameLabel:'Contratante'},
					{key:4,state:'usuarioSuscriptor',nameLabel:'Usuario Suscriptor'},
					{key:5,nameLabel:'Configurador',parent:true},
					{key:6,state:'sistema',nameLabel:'Sistema',parent:5,default:false},
					{key:7,state:'plan',nameLabel:'Plan',parent:5},
					{key:8,state:'canal',nameLabel:'Canal',parent:5,default:true},
					{key:9,state:'chat',nameLabel:'Chat'},
				]
			};
		}
	],
	template: (''
		+ '<header />'
		+ '<nav-directive />'
		+ '<div>'
			+ '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2" style="background:rgba(204, 204, 204, 0.2);padding:0;">'

				+ '<menu-directive props="menus" />'

			+ '</div>'
			+ '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-7" style"padding:0">'

				+ '<ui-view name="gerente" />'

			+ '</div>'
			+ '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="background:rgba(204, 204, 204, 0.2);padding:0;">'
				+ '<div class="form-group text-center">'
					+ '<h4 class="form-signin-heading">'
						+ 'this.state.str'
					+ '</h4>'
				+ '</div>'
			+ '</div>'
			+ '<div style="clear:both"></div>'
		+ '</div>'
		+ '<footer />'
	),
}}])}));

