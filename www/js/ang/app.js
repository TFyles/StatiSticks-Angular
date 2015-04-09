angular.module('StatiSticksapp', ['StatiSticksappServices','ngRoute'])
.config(function ($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	  when('/home', {templateUrl: 'views/home.html',   controller: UserCtrl}).
  	  when('/login',{templateUrl: 'views/login.html', controller: UserCtrl}).
  	  when('/signup', {templateUrl: 'views/signup.html', controller: UserCtrl}).
  	  when('/profile', {templateUrl: 'views/profile.html', controller: MainCtrl}).
  	  when('/stats', {templateUrl: 'views/stats.html', controller: MainCtrl}).
  	  when('/graphs', {templateUrl: 'views/graph.html', controller: MainCtrl}).
  	  when('/about', {templateUrl: 'views/about.html', controller: MainCtrl}).

      otherwise({redirectTo: '/home'});
}]);