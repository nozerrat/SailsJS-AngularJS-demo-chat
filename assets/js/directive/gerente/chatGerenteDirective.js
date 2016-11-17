(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.directive('chatGerente', [
	function(  ) {
		var socket = win.io.socket;
		var $ = win.jQuery;
		return {
			restrict: 'E',
			scope: {	props:'=' },
			controller:['$scope','$timeout',
				function( $scope , $timeout ) {
					$scope.textChat = '';
					$scope.HTML = '';
					$scope.scrollHeight = 0;
					
					socket.on('chatClient', function( received ) {
						$scope.HTML += ''
						+ '<div class="msg msg-received">'
							+ '<div class="text-chat">'
								+ received.text
							+ '</div>'
						+ '</div>';
						$scope.scroll();
						$scope.$apply();
					});

					$scope.sendChat = function( ) {
						socket.post('/chat/text', { text: $scope.textChat }, function( sent, jwres ) {	});
						$scope.HTML += ''
						+ '<div class="msg msg-sent">'
							+ '<div class="text-chat">'
								+ $scope.textChat
							+ '</div>'
						+ '</div>';
						$scope.textChat = '';
						$scope.scroll();
					};

					$scope.scroll = function( ) {
						$timeout(function() {
							$scope.scrollHeight += $( '.panel-body' ).innerHeight();
							$( '.panel-body' ).scrollTop( $scope.scrollHeight )
						},50);
					};
				}
			],
			template: (''
				+ '<div class="medi-chat-msg col-md-12" style="margin:auto;float:none">'
					+ '<div class="panel panel-primary">'
						+ '<div class="panel-heading">'
							+ '<h3 class="panel-title">'
								+ 'Chat'
							+ '</h3>'
						+ '</div>'
						+ '<div class="panel-body">'
							+ '<div class="container-msg">'
								+ '<span ng-bind-html="HTML"></span>'
							+ '</div>'
						+ '</div>'
						+ '<div class="panel-footer" style="padding:0">'
							+ '<form class="input-group" ng-submit="sendChat()">'
								+ '<input ng-model="textChat" class="form-control" placeholder="Text...">'
								+ '<span class="input-group-btn">'
									+ '<button class="btn btn-default" title="Enviar">'
										+ '<i class="glyphicon glyphicon-arrow-right">'
									+ '</button>'
								+ '</span>'
							+ '</form>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
			),
		};
	}
])}));

