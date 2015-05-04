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
        })
      });
      ParseService.updateStatsList(function(results){
        $scope.$apply(function(){
          $scope.userStats = results;
        })
      ParseService.getMatchReports(function(results){
      $scope.$apply(function(){
        $scope.matchReports = results;
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

  $scope.updateGraphList = function(){
    ParseService.updateGraphList( function(results){
      $scope.$apply(function(){
        $scope.userGraphs = results;
      })
    });

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

  $scope.createBarChart = function(){
    ParseService.createBarChart($scope.BarName, $scope.BarXLabel, $scope.BarYLabel, $scope.Bardp1, $scope.Bardp2, $scope.Bardp3, $scope.Bardp4, $scope.Bardp5, $scope.Bardp6);
  }

  $scope.FauxBuy = function(){
    ParseService.FauxBuy();
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
    $scope.userAdvancedStats;
    $scope.init();
    $scope.image;
    $scope.userGraphs;
    $scope.profileGraph;
}
MainCtrl.$inject = ['$scope', '$timeout', '$location', 'ParseService']
