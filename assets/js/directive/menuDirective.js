/*

	Ej: controller
		$scope.menus = {
			viewName: 'gerente',
			menus:[
				{key:1,state:'home',nameLabel:'Home',default:true},
				{key:2,state:'datos',nameLabel:'Mis Datos'},
				{key:3,state:'contratante',nameLabel:'Contratante'},
				{key:4,state:'usuarioSuscriptor',nameLabel:'Usuario Suscriptor'},
				{key:5,nameLabel:'Configurador',parent:true},
				{key:6,state:'plan',nameLabel:'Plan',parent:5},
				{key:7,state:'canal',nameLabel:'Canal',parent:5},
				{key:8,state:'chat',nameLabel:'Chat'},
			]
		};

	Ej: directive
		<menu-directive props="menus" />

*/

(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('menuDirective', [ function( ) { return {
	restrict: 'E',
	scope: {	props:'=' },
	controller:['$scope','$state','collapseNavbarService',
		function( $scope , $state , collapseNavbarService ) {
			$scope.collapseNavbar = collapseNavbarService;
			$scope.isNumber = win.angular.isNumber;
			$scope.menus = [];
			$scope.activeState = '';
			$scope.collapse = {};
			$scope.key = '';
			$scope.viewName = '';
			
			$scope.active = function( activeState ) {
				$scope.activeState = activeState;
			};
			
			$scope.goState = function( state ) {
				$state.go( 'site.'+$scope.viewName+'.'+state );
			};

			$scope.fcollapse = function( key ) {
				if ( typeof $scope.collapse[key]==='undefined' ) {
					$scope.collapse[key] = key;
					$scope.collapse['key'] = key;
					$scope.collapse['count'] = 0;
				};
				
				$scope.key = key;
				
				if ( $scope.collapse['key']==key) {
					if ( $scope.collapse['count']>=1 ) {
						$scope.key = '';
						$scope.collapse = {};
					}
				}

				$scope.collapse['key'] = key;
				$scope.collapse['count']++;
			};


			$scope.$watch('props', function(newValue, oldValue) {
				var menus = [];
				$scope.viewName = newValue.viewName;

				for ( item in newValue.menus ) {
					if ( !newValue.menus[item].parent || newValue.menus[item].parent===true ) {
						newValue.menus[item].childs = [];
						menus.push( newValue.menus[item] );
					}
				}

				for ( item in newValue.menus ) {
					if ( newValue.menus[item].default ) {
						// activamos el link por defecto
						$scope.goState( newValue.menus[item].state );
						$scope.activeState = newValue.menus[item].state;
					}

					if ( $scope.isNumber( newValue.menus[item].parent ) ) {
						// si el padre es espedificado entonces recorremo la lista para ubicar al padre y darle al hijo
						for ( parent in newValue.menus ) {
							if ( !newValue.menus[parent].key ) {
								console.error( 'Atributo requerido: "key" es requerido' ); return;
							}
							if ( newValue.menus[parent].key == newValue.menus[item].parent ) {
								// asignamos a los hijos
								for ( menu in menus ) {
									if ( menus[menu].key == newValue.menus[parent].key ) {
										menus[menu].childs.push( newValue.menus[item] );
									}
								}
							}
						}
					}
				}
				$scope.menus = menus;
			});
		}
	],
	template: (''
		+ '<div class="form-group collapse navbar-collapse {{ collapseNavbar.collapse }} ">'
			+ '<h4 class="text-center" style="margin-bottom:0">'
				+ '<b style="color:#337ab7">'
					+ 'Menú'
				+ '</b>'
			+ '</h4>'
			+ '<ul class="nav nav-pills nav-stacked">'
				+ '<li ng-repeat="menu in menus" ng-class="{active:menu.state==activeState}"'
					+'ng-click="'
						+'menu.parent===true&&fcollapse( menu.key );'
						+'menu.parent===true||active(menu.state);'
						+'menu.parent===true||goState(menu.state);'
						+'menu.parent===true||collapseNavbar.trigger();'
					+'"'
				+'>'
					+ '<a href="javascript:;" style="padding:3px">'
						+ '<span ng-if="menu.parent!==true">'
							+ '<i class="glyphicon glyphicon-triangle-right"/>&nbsp;'
							+ '{{ menu.nameLabel }}'
						+ '</span>'
						+ '<span ng-if="menu.parent===true">'
							+ '<i ng-class="{\'glyphicon glyphicon-menu-down\':menu.key==key&&menu.parent===true,\'glyphicon glyphicon-menu-right\':menu.key!=key&&menu.parent===true}" class="glyphicon"/>&nbsp;'
							+ '{{ menu.nameLabel }}'
						+ '</span>'
					+ '</a>'
					+ '<ul ng-if="menu.childs.length" ng-class="{}" class="nav nav-pills nav-stacked" style="margin-left:14px;">'
						+ '<li ng-repeat="child in menu.childs" ng-class="{collapse:menu.key!=key,active:child.state==activeState}"'
								+'ng-click="'
									+'$event.stopPropagation();'
									+'active(child.state);'
									+'goState(child.state);'
									+'collapseNavbar.trigger();'
								+'"'
							+'>'
							+ '<a href="javascript:;" style="padding:3px">'
								+ '<i class="glyphicon glyphicon-triangle-right" />&nbsp;{{ child.nameLabel }}'
							+ '</a>'
						+ '</li>'
					+ '</ul>'
				+ '</li>'
			+ '</ul>'
		+ '</div>'
	),
}}])}));

