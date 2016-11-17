(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.service('collapseNavbarService', [
function(  ) {
	var self = this;
	self.collapse = '';
	self.trigger = function(){
		self.collapse = self.collapse=='in'?'':'in';
	}
}])}));
