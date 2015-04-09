angular.module('StatiSticksappServices', ['ngResource'])
.factory('ParseService', function($resource){
	Parse.initialize("imbkzuNYr6DWtmvB9dRU1nHdlWz0D3ET0Rj6MSKo" , "ILwfj37tvWIiIdHNaPDEv0eEGdgoKuRMwHfa2vZp");

	var currentUser;
      
	var ParseService = {
		name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
      	Parse.User.logIn(username, password, {
      		success: function(user) {
      			loggedInUser = user;
      			callback(user);
      		},
      		error: function(user, error) {
      			alert("Error: " + error.message);
      		}
      	});
      },

      // Register a user
      signUp : function signUp(username, password,callback) {
      	Parse.User.signUp(username, password,{ ACL: new Parse.ACL()}, {
      		success: function(user) {
      			loggedInUser = user;
      			callback(user);
      		},

      		error: function(user, error) {
      			alert("Error: " + error.message);
      		}
      	});
      },

      // Logout current user
      logout : function logout(callback) {
      	Parse.User.logOut();
      },

      // Get current logged in user
      getUser : function getUser() {
      	if(loggedInUser) {
      		return loggedInUser;
      	}
      }
      
  };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
    
})