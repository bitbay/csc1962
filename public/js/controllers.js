'use strict';

/* Controllers */

function FeedsCtrl($scope, $http,$location, currentUser) {
	$scope.currentUser = currentUser;
	
	//$http.get('chatterfeed.json').success(function(data) {
	$http.get('chatterfeed.v24.json').success(function(data) {
		$scope.feeds = data.items;
		/*
		//Parse the JSON and store it in our Model. 
		var feeds = [];
		for(var itemIndex =0; itemIndex < data.items.length;itemIndex++){

			var anItem =	data.items[itemIndex];
			var comments = [];
			for(var commentIndex = 0; commentIndex < anItem.comments.comments.length; commentIndex++){

				var aComment =	anItem.comments.comments[commentIndex];
				comments.push(aComment);
			}
			anItem.comments = comments;
			
			anItem.numberOfLikesMessage = (anItem.likes.total>1)?anItem.likes.total + ' persons':anItem.likes.total +' person'; //X persons where X>1.
			anItem.numberOfLikesMessage = (anItem.likes.total==0)?'':anItem.numberOfLikesMessage ; //'1 person'

			anItem.likeIconVisibility   = (anItem.likes.total>0)?'visible':'hidden';//Sets the Visibility of ThumbUpIcon.

			anItem.numberOfLikes        = anItem.likes.total;//Not in use.

			feeds.push(anItem);
		}
		//Parse the JSON and store it in our Model.
		*/
	}); 
	
	$scope.setRoute = function(route,title){
		$location.path(route);
	}
	
	// handle delete feed item...
	$scope.$on('deleteFeedItem', function(scope, delFeed){
		// look for, and remove delFeed...
		for(var feed in $scope.feeds){
			if($scope.feeds[feed] === delFeed){
				$scope.feeds.splice(feed,1);
				break;
			}
		}
	});
}



function CommonCtrllerForSecondaryPage($scope, $routedParams){
	$scope.setRoute = function(route){
		$location.path(route);
	}
}





