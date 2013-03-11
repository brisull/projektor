(function( window ) {
 
'use strict';
 
var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' ');
// get unprefixed rAF and cAF, if present
var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;
// loop through vendor prefixes and get prefixed rAF and cAF
var prefix;
for( var i = 0; i < prefixes.length; i++ ) {
	if ( requestAnimationFrame && cancelAnimationFrame ) {
		break;
	}
	prefix = prefixes[i];
	requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
	cancelAnimationFrame = cancelAnimationFrame || window[ prefix + 'CancelAnimationFrame' ] ||
	window[ prefix + 'CancelRequestAnimationFrame' ];
}
 
// fallback to setTimeout and clearTimeout if either request/cancel is not supported
if ( !requestAnimationFrame || !cancelAnimationFrame ) {
	requestAnimationFrame = function( callback, element ) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
		var id = window.setTimeout( function() {
		callback( currTime + timeToCall );
		}, timeToCall );
		lastTime = currTime + timeToCall;
		return id;
	};
	 
	cancelAnimationFrame = function( id ) {
	window.clearTimeout( id );
	};
}
 
// put in global namespace
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;
 
})( window );