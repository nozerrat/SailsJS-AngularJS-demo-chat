/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	text: function( req,res ) {
		if ( !req.isSocket ) return res.badRequest( );
console.log( req.session.auth.username + ': ' + req.body.text )
		var roomName  = 'chatServer';
		var eventName = 'chatClient';
		sails.sockets.broadcast( roomName, eventName, {text: req.session.auth.username + ': ' + req.body.text}, req );
		return res.ok( true );
	}
};

