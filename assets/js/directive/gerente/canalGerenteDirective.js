(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('canalGerente', [ function( ) { return {
	restrict: 'E',
	scope: { props:'=' },
	controller:['$scope','resourceService',
		function( $scope , resourceService ) {
			var socket = win.io.socket;
			$scope.listSistema = [];
			$scope.title = 'Canal';

			$scope.rsc = resourceService;
			$scope.rsc.switchView = true;
			$scope.rsc.urlDel  = '/canal/delete'; // url de la ruta a enlazar
			$scope.rsc.urlSave = '/canal/save'; // url de la ruta a enlazar
			$scope.rsc.registerForm( 'canal' );
			$scope.rsc.ngTable( '/canal/consult' );
			$scope.rsc.lists( '/sistema/consult', function( data ) {
				$scope.listSistema = data.data.records;
			});

			$scope.rsc.formGroup = function( values ) {
				$scope.propsId      = { modelName:'_id', defaultValue:values, listener: $scope.rsc.listener};

				$scope.propsSistema = { modelName:'sistema', label: 'Sistema', type: 'select', defaultValue:values, options:{label: 'nombre',value:'_id',data:$scope.listSistema}, ariaRules: 'required',  listener: $scope.rsc.listener};

				$scope.propsNombre  = { modelName:'nombre', label:'Nombre', type:'text', ariaRules:'required', defaultValue:values, listener: $scope.rsc.listener};
				$scope.propsDesc    = { modelName:'descripcion', label:'Descripción', type:'textarea', ariaRules:'', defaultValue:values, listener: $scope.rsc.listener};
				$scope.propsFecha   = { modelName:'fecha', label: 'Fecha', type: 'date', ariaRules: 'required', defaultValue:(values||new Date()), listener: $scope.rsc.listener};
				$scope.propsEstatus = { modelName:'estatus', label: 'Estatus', type: 'checkbox', defaultValue:(values||true), valueTrue:'true', valueFalse:'false', ariaRules: 'required', listener: $scope.rsc.listener};
			};
		}
	],
	template: (''
		+ '<span ng-init=" rsc.formGroup(); "></span>'
		+ '<section class="text-center">'
			+ '<h3> {{ title }}</h3>' 
		+ '</section>'

		+ '<section ng-show="rsc.switchView">'
			+ '<button ng-click="rsc.resetForm();rsc.cleanAll();rsc.formGroup();rsc.switchView=false;" class="btn btn-success" style="position:absolute; top:0; right:0; margin: 15px;">'
				+ '<i class="glyphicon glyphicon-plus"></i> '
				+ 'Nuevo'
			+ '</button>'
			+ '<div class="table-responsive">'
				+ '<table ng-table="rsc.tableParams" class="table table-bordered table-striped table-hover table-condensed">'
					+ '<tr ng-repeat="row in $data track by $index">'
						
						+ '<td data-title="\'Nombre\'" filter="{nombre: \'text\'}" sortable="\'nombre\'">{{row.nombre|maxString}}</td>'
						+ '<td data-title="\'Descripción\'" filter="{descripcion: \'text\'}" sortable="\'descripcion\'">{{row.descripcion|maxString}}</td>'
						+ '<td data-title="\'Fecha\'" filter="{fecha: \'text\'}" sortable="\'fecha\'">{{row.fecha|formatDate}}</td>'
						+ '<td data-title="\'Estatus\'" filter="{estatus: \'text\'}" sortable="\'estatus\'">{{row.estatus|statusActDes}}</td>'
						
						+ '<td data-title="\'&nbsp;\'" style="padding:0;">'
							+ '<div class="btn-group" style="width:48px;">'
								+ '<div class="btn btn-primary btn-xs" ng-click="rsc.cleanAll();rsc.edit( row );"><i class="glyphicon glyphicon-pencil"></i></div>'
								+ '<div class="btn btn-danger btn-xs" ng-click="rsc.del( row );"><i class="glyphicon glyphicon-trash"></i></div>'
							+ '</div>'
						+ '</td>'
					+ '</tr>'
				+ '</table>'
			+ '</div>'
		+ '</section>'

		+ '<section ng-hide="rsc.switchView">'
			+ '<button ng-click="rsc.resetForm();rsc.cleanAll();rsc.formGroup();rsc.switchView=true;" class="btn btn-default" style="position:absolute; top:0; right:0; margin: 15px;">'
				+ '<i class="glyphicon glyphicon-share-alt"></i> '
				+ 'Regresar'
			+ '</button>'
			+ '<form class="form-horizontal" name="{{ rsc.formName }}" ng-submit="rsc.save( rsc.models )">'

				+ '<form-group props="propsId" hidden/>'
				+ '<form-group props="propsSistema" />'
				+ '<form-group props="propsNombre" />'
				+ '<form-group props="propsDesc" />'
				+ '<form-group props="propsFecha" />'
				+ '<form-group props="propsEstatus" />'

				+ '<div class="form-group text-center">'
					+ '<button type="button" ng-click="rsc.resetForm();rsc.cleanAll();rsc.formGroup();" class="btn btn-default" style="margin-right: 5px">'
						+ '<i class="glyphicon glyphicon-minus"></i> Cancelar'
					+ '</button>'
					+ '<button class="btn btn-primary" style="margin-right: 5px">'
						+ '<i class="glyphicon glyphicon-floppy-disk"></i> Aceptar'
					+ '</button>'
					+ '<button ng-show="rsc.models._id" type="button" ng-click="rsc.del( rsc.models )" class="btn btn-danger" style="margin-right: 5px">'
						+ '<i class="glyphicon glyphicon-trash"></i> Eliminar'
					+ '</button>'
				+ '</div>'
			+ '</form>'
		+ '</section>'

	),
}}])}));

