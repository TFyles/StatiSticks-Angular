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
    $scope.addStatsChecker();
    $scope.displayProfilePicture();

    $timeout(function() {
      ParseService.getUserDetails(function(results){
        $scope.$apply(function(){
          $scope.userDetails = results;
          console.log("Current user" + $scope.userDetails);
          $('#profilePic').html("<img class='circle profilePic' src=" + $scope.userDetails.get('PP') + ">");
          if ($scope.userDetails.get('PP') == undefined){
            $('#profilePic').html("<img class='circle profilePic' src='img/ProfilePlaceholder.png'>");
          }
        })
      });
      ParseService.updateStatsList(function(results){
        $scope.$apply(function(){
          $scope.userStats = results;
        })
      });
      ParseService.getMatchReports(function(results){
      $scope.$apply(function(){
        $scope.matchReports = results;
        })
      });
      ParseService.getFollowing(function(results){
      $scope.$apply(function() {
        $scope.ImFollowing = results;
        var len = $scope.ImFollowing.length;
        console.log(len);
        $scope.FollowingAmount = len;
        })
      });
        $timeout(function(){
          ParseService.getAdvancedStats($scope.userStats, function(results){
            $scope.$apply(function(){
              $scope.userAdvancedStats = results;
              console.log(results);
            })
          });
        }, 500);
    }, 400);
    });
  }

  // Perform user signup using back-end service
  $scope.signUp = function() {
    ParseService.signUp($scope.signUpName, $scope.signUpPass, $scope.signUpEmail, $scope.signUpClub, $scope.signUpNumber, $scope.signUpPosition,function(user) {
    });
  }

  $scope.logOut = function(){
    ParseService.logOut();
    $('.page').css("display","none");
    $('#home').css("display","inline");
    $('header').css('display', 'none');
    $('body').css('background-color', '#4fc3f7');
    $('.button-collapse').sideNav('hide');
    Materialize.toast("Logging out", 4000);
    navigator.notification.vibrate(1000);
    console.log(Parse.User.current());
  }

  $scope.viewgraph = function(){
    ParseService.viewgraph($scope.profileGraph, function(graph){
      $scope.$apply(function(){
        $scope.profileGraph = graph;
        console.log($scope.profileGraph);
      })
      $timeout(function(){
        ParseService.showGraph($scope.profileGraph)
      }, 500);
    });
  }

  $scope.viewFriendgraph = function(){
    ParseService.viewFriendgraph($scope.FriendprofileGraph, function(graph){
      $scope.$apply(function(){
        $scope.FriendprofileGraph = graph;
        console.log($scope.FriendprofileGraph);
      })
      $timeout(function(){
        ParseService.showFriendGraph($scope.FriendprofileGraph)
      }, 500);
    });
  }

  $scope.updateGraphList = function(){
    ParseService.updateGraphList( function(results){
      $scope.$apply(function(){
        $scope.userGraphs = results;
      })
    });

  }

  $scope.userSearch = function(){
    ParseService.userSearch($scope.searchName ,function(results){
      $scope.$apply(function(){
        $scope.users = results;
      })
    });
  }

  $scope.viewUser = function(){
    var username = this.user.get('username');
    var user = this.user;
    ParseService.FriendGraphList( user ,function(results){
      $scope.$apply(function(){
        $scope.FrienduserGraphs = results;
        var len = $scope.FrienduserGraphs.length;
        console.log(len);
      })
    });
    ParseService.updateFriendStatsList(user, function(results){
        $scope.$apply(function(){
          $scope.FriendStats = results;
        })
    });
    $scope.FriendUsername = username;
    var PP = this.user.get("PP")
    $('#FriendprofilePic').html("<img class='circle profilePic' src=" + PP + ">");
      if (PP == undefined){
        $('#FriendprofilePic').html("<img class='circle profilePic' src='img/ProfilePlaceholder.png'>");
    }
    $scope.FriendPosition = this.user.get('Position');
    $scope.FriendClub = this.user.get('Club');
    $scope.FriendNumber = this.user.get('Number');
    $('.page').css('display', 'none');
    $('#friendProfile').css('display', 'inline');
    $('#page-title').text(username);

  }

  $scope.follow = function(){
    var current = $scope.userDetails.get('username');
    var username = $scope.FriendUsername;
    console.log(username);
    if ( current == username){
      console.log("Cant follow yourself");
    } else {
    ParseService.follow(username);
    $timeout(function(){
        ParseService.getFollowing(function(results){
      $scope.$apply(function() {
        $scope.ImFollowing = results;
        var len = $scope.ImFollowing.length;
        console.log(len);
        $scope.FollowingAmount = len;
        })
      });
      }, 1000);
    }
  }

  $scope.addStatsChecker = function(){
    ParseService.addStatsChecker();
  }

  $scope.updateStatsList = function(){
    ParseService.updateStatsList();
  }

  $scope.displayProfilePicture = function(){
    ParseService.displayProfilePicture();
  }

  $scope.FauxBuy = function(){
    ParseService.FauxBuy();
  }

  $scope.makeExample = function(){
    ParseService.makeExample($scope.EgraphName, $scope.EgraphXLabel, $scope.EgraphYLabel, $scope.Edp1, $scope.Edp2, $scope.Edp3, $scope.Edp4, $scope.Edp5, $scope.Edp6);
    $('#step1').css('display', 'none');
    $('#end').css('display', 'inline');
  }

  $scope.createLineGraph = function(){
    ParseService.createLineGraph($scope.graphName, $scope.graphXLabel, $scope.graphYLabel, $scope.dp1, $scope.dp2, $scope.dp3, $scope.dp4, $scope.dp5, $scope.dp6);
  }

  $scope.saveLineGraph = function(){
    ParseService.saveLineGraph($scope.graphName, $scope.graphXLabel, $scope.graphYLabel, $scope.dp1, $scope.dp2, $scope.dp3, $scope.dp4, $scope.dp5, $scope.dp6);
    $timeout(function(){
      ParseService.updateGraphList( function(results){
      $scope.$apply(function(){
        $scope.userGraphs = results;
      })
    });
  }, 500);
  } 

  $scope.createPieChart = function(){
    ParseService.createPieChart($scope.pieName, $scope.Piedp1, $scope.Piedp2, $scope.Piedp3, $scope.Piedp4, $scope.Piedp5, $scope.Piedp6);
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
          $('#phonegapcamera').css('display', 'none');
          $('#fileupload').css('display', 'none');
        })
      });
    }, 400);
    }, 1000);
  }

  $scope.addStats = function(){
    ParseService.addStats($scope.statGames, $scope.statGoals, $scope.statAssists, $scope.statMinutes, $scope.statPasses);
    $timeout(function() {
      ParseService.updateStatsList(function(results){
        $scope.$apply(function(){
          $scope.userStats = results;
        })
        $timeout(function(){
          ParseService.getAdvancedStats($scope.userStats, function(results){
            $scope.$apply(function(){
              $scope.userAdvancedStats = results;
              console.log(results);
            })
          });
        }, 500);
      })
    }, 400);
  }

  $scope.addaccStats = function(){
    ParseService.addaccStats($scope.stataccGames, $scope.stataccGoals, $scope.stataccAssists, $scope.stataccMinutes, $scope.stataccPasses);
    $timeout(function() {
      ParseService.updateStatsList(function(results){
        $scope.$apply(function(){
          $scope.userStats = results;
        })
        $timeout(function(){
          ParseService.getAdvancedStats($scope.userStats, function(results){
            $scope.$apply(function(){
              $scope.userAdvancedStats = results;
              console.log(results);
            })
          });
        }, 500);
      })
    }, 600);
  }

  $scope.saveReport = function(){
    ParseService.saveReport($scope.gameDate, $scope.gameHome, $scope.gameAway, $scope.gameHomeGoals, $scope.gameAwayGoals, $scope.gameReport);
    console.log($scope.gameDate);
    $timeout(function(){
      ParseService.getMatchReports(function(results){
      $scope.$apply(function(){
        $scope.matchReports = results;
      })
    });
    }, 500);
  }

  $scope.getMatchReports = function(){
    ParseService.getMatchReports(function(results){
      $scope.$apply(function(){
        $scope.matchReports = results;
        if ($scope.matchReports.length == 0) {
          $('#reportHeader').text("No match reports currently available")
        };
      })
    });
  }  

  $scope.getAdvancedStats = function(){
    ParseService.getAdvancedStats($scope.userStats, function(results){
        $scope.$apply(function(){
          $scope.userAdvancedStats = results;
          console.log(results);
        })
    });
  }


  $scope.getUserDetails = function(){
     ParseService.getUserDetails();
  }


    $scope.userDetails;
    $scope.matchReports;
    $scope.userStats;
    $scope.FriendStats;
    $scope.userAdvancedStats;
    $scope.users = [];
    $scope.init();
    $scope.image;
    $scope.userGraphs;
    $scope.FrienduserGraphs;
    $scope.FriendprofileGraph;
    $scope.profileGraph;
    $scope.FriendUsername;
    $scope.FriendPosition;
    $scope.FriendClub;
    $scope.FriendNumber;
    $scope.ImFollowing;
    $scope.FollowingAmount;
}
MainCtrl.$inject = ['$scope', '$timeout', '$location', 'ParseService']
