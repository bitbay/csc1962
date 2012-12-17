'use strict';

/* Services */
angular.module('chatteruser', [])
.service('currentUser', function(){
	/**
	 * This service is a simple holder for a "current user" data.
	 * Could be used over the page in various places - used in this entry to fill
	 * comment.likes data (comodity).
	 */
	this.name = "John Smith";
	this.title = null;
	this.firstName = "John";
	this.lastName = "Smith";
	this.companyName = "No company locations found";
	this.mySubscription = null;
	this.photo = {
		"largePhotoUrl": "https://c.na12.content.force.com/profilephoto/729U0000000U9Of/F",
		"photoVersionId": "729U0000000U9OfIAK",
		"smallPhotoUrl": "https://c.na12.content.force.com/profilephoto/729U0000000U9Of/T"
	};
	this.isChatterGuest = false;
	this.id = "005U0000000EUjcIAG";
	this.url = "/services/data/v24.0/chatter/users/005U0000000EUjcIAG";
	this.type = "User";
})
.service('idGenerator', function() {
	/**
	 * This is a simple helper service that generates FAKE ids...
	 */
	this.getRandomId = function (length) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
		
		if (! length) {
		    length = Math.floor(Math.random() * chars.length);
		}
		
		var str = '';
		for (var i = 0; i < length; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
		}
		
		return str;
	}
});
