angular.module('StatiSticksapp', ['StatiSticksappServices','ngRoute'])
.controller('MainCtrl',MainCtrl)


function MainCtrl($scope, $timeout, $location, ParseService){
  $scope.init = function() {
      $scope.user = ParseService.getUser();
    }

     // Perform user login using back-end service
  $scope.login = function() {
    ParseService.login($scope.loginName, $scope.loginPass, function(user) { 
    $scope.updateGraphList();
    $scope.updateStatsList();
    $scope.addStatsChecker();
    $scope.displayProfilePicture();
    $timeout(function() {
      ParseService.getUserDetails(function(results){
        $scope.$apply(function(){
          $scope.userDetails = results;
          console.log("Current user" + $scope.userDetails);
          $('#profilePic').html("<img class='circle profilePic' src=" + $scope.userDetails.get('PP') + ">");
        })
      });
      ParseService.updateStatsList(function(results){
        $scope.$apply(function(){
          $scope.userStats = results;
        })
      })
    }, 400);
    
    });
  }

  // Perform user signup using back-end service
  $scope.signUp = function() {
    ParseService.signUp($scope.signUpName, $scope.signUpPass, $scope.signUpEmail, function(user) {
    });
  }

  $scope.logOut = function(){
    ParseService.logOut();
    $('.page').css("display","none");
    $('#home').css("display","inline");
    $('.button-collapse').sideNav('hide');
    Materialize.toast("Logging out", 4000);
  }

  $scope.updateGraphList = function(){
    ParseService.updateGraphList();
  }

  $scope.updateStatsList = function(){
    ParseService.updateStatsList();
  }

  $scope.addStatsChecker = function(){
    ParseService.addStatsChecker();
  }

  $scope.displayProfilePicture = function(){
    ParseService.displayProfilePicture();
  }

  $scope.uploadProfilePic = function(){
    ParseService.uploadProfilePic(function(results){
      $scope.$apply(function(){
        $scope.image = results;
        console.log("The scope image is" + $scope.image);
      })
    })
    $timeout(function() {
      ParseService.updateProfilePic($scope.image, function(){});
      $timeout(function() {
      ParseService.getUserDetails(function(results){
        $scope.$apply(function(){
          $scope.userDetails = results;
          $('#profilePic').html("<img class='circle profilePic' src=" + $scope.userDetails.get('PP') + ">");
        })
      });
    }, 400);
    }, 1000);
  }

  $scope.addStats = function(){
    ParseService.addStats($scope.statGames, $scope.statGoals, $scope.statAssists, $scope.statMinutes, $scope.statPasses);
  }

  $scope.getUserDetails = function(){
     ParseService.getUserDetails();
  }


    $scope.userDetails;
    $scope.userStats;
    $scope.init();
    $scope.image;
}
MainCtrl.$inject = ['$scope', '$timeout', '$location', 'ParseService']
