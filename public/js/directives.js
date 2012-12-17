'use strict';

/* Directives */

/**
 * module 'chatterfeed' includes the following directives:
 *	+ chatterfeed
 *	+ chatterfeedcomment
 *	+ chatterfeedbody
 *	+ chatterfeednewcomment
 *	+ chatterfeedattachment
 */
angular.module('chatterfeed', [])
.directive('chatterfeed', function(){
	/**
	 * This directive represents an item in the chatterfeed with a simple on/off
	 * like controller.
	 */
	return {
		restrict: 'A',
		replace: true,
		scope:{
			feed: '=chatterfeed'
		},
		templateUrl: '/partials/templates/chatterfeed/chatterfeed.tpl.html',
		link: function link(scope, element, attrs) {
			// share hidden?
			// TODO: implement switch conditions
			switch(scope.feed.type){
				default:
					// show for all type of feed for now...
					scope.hiddenShare = false;
					break;
			}
			
			// controlling visibility of new comment textarea input...
			scope.$watch( 'feed.comments.total', function(newValue,oldValue) {
				scope.commentOn = newValue>0 ? true : false;
			}, true);
			
			// hover handler
			scope.hoverItem = function(hovered){
				if (hovered) 
					element.addClass('cxhover');
				else
					element.removeClass('cxhover');
			};
			
			// like handler
			scope.currentUserLikes = function(event) {
				// since it's an anchor, stop url change...
				event.preventDefault();
				
				// since DOM gets modified, trigger an hoverItem...
				// TODO: could be done with better logic...
				scope.hoverItem();
				
				scope.feed.isLikedByCurrentUser = !scope.feed.isLikedByCurrentUser;
				return false;
			};
			
			// bookmark handler
			scope.currentUserBookmark = function(event) {
				// since it's an anchor, stop url change...
				event.preventDefault();
				
				// since DOM gets modified, trigger an hoverItem...
				// TODO: could be done with better logic...
				scope.hoverItem();
				
				scope.feed.isBookmarkedByCurrentUser = !scope.feed.isBookmarkedByCurrentUser;
				return false;
			};
			
			// comment handler
			scope.startComment = function() {
				// enable new comment container, if not already visible...
				scope.commentOn = true;
				
				// broadcast the intent, will be catched by comments directive...
				scope.$parent.$broadcast('showcomment');
			};
			
			// delete handler
			scope.deleteItem = function(event) {
				event.preventDefault();
				// TODO: implement deleting feed item...
				scope.$emit('deleteFeedItem', scope.feed);
			};
			
			// 'deleteComment' handler...
			scope.$on( 'deleteComment', function(tScope, delComment) {
				// look for, and remove delComment...
				for(var comment in scope.feed.comments.comments){
					if(scope.feed.comments.comments[comment] === delComment){
						scope.feed.comments.comments.splice(comment,1);
						break;
					}
				}
				
				// update feed.comments.total...
				scope.feed.comments.total = scope.feed.comments.comments.length;
			});
		}
	};
})
.directive('chatterfeedbody', function(){
	/**
	 * This directive represents the body of a feed item/comment. Parses message
	 * segments into actual dom elements.
	 */
	return {
		restrict: 'A',
		replace: true,
		scope:{
			feed: '=feed'
		},
		templateUrl: '/partials/templates/chatterfeed/chatterfeedbody.tpl.html',
		link: function link(scope, element, attrs) {
			var parsedBody = '';
			
			// a simple feed message parser implementation...
			// TODO: possibly could be moved to a service/factory...
			if (scope.feed.body.messageSegments.length > 0) {
				angular.forEach( scope.feed.body.messageSegments, function(segment){
					var segEl = '';
					switch( segment.type ){
						case "Link":
							segEl = '<a href="'+segment.url+'"><span>'+
								segment.text + '</span></a>';
							break;
						case "Mention":
							segEl = '<a href="'+segment.user.url+'"><span>'+
								segment.text + '</span></a>';
							break;
						case "Hashtag":
							segEl = '<a href="'+segment.url+'"><span>'+
								segment.text + '</span></a>';
							break;
						default:
							// text
							segEl = '<span>'+segment.text+'</span>';
							break;
					}
					parsedBody += segEl;
				})
			} else {
				parsedBody = scope.feed.body.text;
			}
			
			// append the parsed body to the element
			element.append(parsedBody);
		}
	};
})
.directive('chatterfeedcomment', ['currentUser', 'idGenerator', function(currentUser,idGenerator){
	/**
	 * This directive represents a comment in a chatterfeed item with a more
	 * sophisticated (although fake) like controller - comment likes are more
	 * complex.
	 */
	return {
		restrict: 'A',
		replace: true,
		scope:{
			comment: '=chatterfeedcomment'
		},
		templateUrl: '/partials/templates/chatterfeed/chatterfeedcomment.tpl.html',
		link: function link(scope, element, attrs) {
			// hover handler
			scope.hoverItem = function(hovered){
				if (hovered)
					element.addClass('cxhover');
				else
					element.removeClass('cxhover');
			};
			
			// delete handler
			scope.deleteItem = function(event) {
				// since it's an anchor, stop url change...
				event.preventDefault();
				
				// emit delete intent, will be handled by the actual feeditem
				// directive...
				scope.$emit('deleteComment', scope.comment);
			};
			
			// comment like handler
			scope.currentUserLikes = function(likes) {
				// since it's an anchor, stop url change...
				event.preventDefault();
				
				// since DOM gets modified, trigger an hoverItem...
				// TODO: could be done with better logic...
				scope.hoverItem(false);
				
				if (likes) {
					// create some bogus values...
					var newLikeId = idGenerator.getRandomId(18);
					var newLikeUrl = "/services/data/v24.0/chatter/likes/"+newLikeId;
					var _like = {
						"id":	newLikeId,
						"user":	currentUser,
						"url":	newLikeUrl
					};
					
					// update likes...
					scope.comment.likes.total = scope.comment.likes.likes.push(_like);
					
					var _myLike = {
						"id":	newLikeId,
						"url":	newLikeUrl
					};
					// update myLike...
					scope.comment.myLike = _myLike;
				} else {
					// assert: user already likes the comment...
					var _likeId = scope.comment.myLike.id;
					var index = 0;
					angular.forEach( scope.comment.likes.likes, function(like){
						if( like.id == _likeId ) {
							this.splice(index,1);
						}
						index += 1;
					},scope.comment.likes.likes);
					
					// reset myLike...
					scope.comment.myLike = null;
					
					// update likes.count...
					scope.comment.likes.total = scope.comment.likes.likes.length;
				}
			};
		}
	};
}])
.directive('chatterfeednewcomment', ['currentUser', 'idGenerator', function(currentUser,idGenerator){
	/**
	 * This directive could/should handle the new comments. NOT part of this
	 * entry...For now, it simply hides the placeholder on user action.
	 */
	return {
		restrict: 'A',
		replace: false,
		scope:{
			feed: '=feed',
			comments: '=comments'
		},
		templateUrl: '/partials/templates/chatterfeed/chatterfeednewcomment.tpl.html',
		link: function link(scope, element, attrs) {
			scope.placeholder = true;
			
			// hiding placeholder...
			scope.hidePlaceholder = function() {
				scope.placeholder = false;
				// TODO: set focus to textarea
			};
			
			// hiding placeholder, broadcast from outside...
			scope.$on('showcomment', function(){
				if (scope.placeholder) scope.hidePlaceholder();
			});
			
			// new comment handler...
			scope.pushComment = function(comment){
				// create a chatter-feed compatible comment..
				var newId = idGenerator.getRandomId(18);
				var newComment = {
					"parent": {
						"id":	currentUser.id,
						"url":	currentUser.url
					},
					"id":	newId,
					"type":	"TextComment",
					"user":	currentUser,
					"clientInfo": null,
		            "url": "/services/data/v24.0/chatter/comments/" + newId,
		            "body": {
		                "text": comment,
		                "messageSegments": [{
		                    "type": "Text",
		                    "text": comment
		                }]
		            },
		            "createdDate": '' + new Date().toISOString(),
		            "likes": {
		                "total": 0,
		                "likes": [],
		                "currentPageUrl": "/services/data/v24.0/chatter/comments/" + newId + "/likes",
		                "nextPageUrl": null,
		                "previousPageUrl": null
		            },
		            "myLike": null,
		            "attachment": null,
		            "deletable": true,
		            "feedItem": {
		                "id": scope.feed.id,
		                "url": scope.feed.url
		            }
				};
				
				// update feed comments...
				scope.comments.total = scope.feed.comments.comments.push(newComment);
			};
		}
	};
}])
.directive('chatterfeedattachment', function(){
	/**
	 * This directive could/should handle the new comments. NOT part of this
	 * entry...For now, it simply hides the placeholder on user action.
	 */
	return {
		restrict: 'A',
		replace: true,
		scope:{
			attachment: '=chatterfeedattachment'
		},
		templateUrl: '/partials/templates/chatterfeed/chatterfeedattachment.tpl.html',
		link: function link(scope, element, attrs) {
			if( scope.attachment == null ) return;
			
			scope.filetype = '';
			
			// TODO: extend this with known file types and short description of
			// them...
			switch( scope.attachment.mimeType ){
				case 'image/png':
					scope.filetype = 'png';
					break;
				default:
					scope.filetype = 'file';
					break;
			}
		}
	};
});
