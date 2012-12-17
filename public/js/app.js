'use strict';

/* App Module */

angular.module('phonecat',['chatterfeed','chatteruser']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/feeds', {templateUrl: 'partials/feeds.html',controller: FeedsCtrl}).
      when('/like', {templateUrl: 'partials/like.html', controller: CommonCtrllerForSecondaryPage}).  

      when('/comment', {templateUrl: 'partials/comment.html', controller: CommonCtrllerForSecondaryPage}).  
      when('/share', {templateUrl: 'partials/share.html', controller: CommonCtrllerForSecondaryPage}).  
      when('/updatephoto', {templateUrl: 'partials/updatephoto.html', controller: CommonCtrllerForSecondaryPage}).  
      when('/userprofile', {templateUrl: 'partials/userprofile.html', controller: CommonCtrllerForSecondaryPage}).  
/**/
      otherwise({redirectTo: '/feeds'});
}]);
