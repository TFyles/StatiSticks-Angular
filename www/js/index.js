Parse.initialize("imbkzuNYr6DWtmvB9dRU1nHdlWz0D3ET0Rj6MSKo", "ILwfj37tvWIiIdHNaPDEv0eEGdgoKuRMwHfa2vZp");
$(document).ready(function() {

    $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 100});
    $('.modal-trigger').leanModal();
    
     $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

     $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

    $('#profileNav').click(function() {
        $('.page').css('display', 'none');
        $('#profile').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#profileButton').click(function() {
        $('#profile').css('display', 'inline');
        $('#home').css('display', 'none');
        $('.button-collapse').sideNav('hide');
    });
    $('#statNav').click(function() {
        $('.page').css('display', 'none');
        $('#stats').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#utilNav').click(function() {
        $('.page').css('display', 'none');
        $('#utilities').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#graphNav').click(function() {
        $('.page').css('display', 'none');
        $('#graph').css('display', 'inline');
        $('.button-collapse').sideNav('hide');

    });
    $('#aboutNav').click(function() {
        $('.page').css('display', 'none');
        $('#about').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#toLineChart').click(function(){
        $('.page').css('display', 'none');
        $('#lineChart').css('display', 'inline');
    });
    $('#toMatchReports').click(function(){
        $('.page').css('display', 'none');
        $('#matchReports').css('display', 'inline'); 
    });
    $('#toWriteReports').click(function(){
        $('.page').css('display', 'none');
        $('#writeReports').css('display', 'inline'); 
    });
    $('#closeLogIn').click(function() {
        $('#logInForm').css('display', 'none');
        $('#homeButtons').css('display', 'inline');
    });
    $('#signUpButton').click(function() {
        $('#signUpForm').css('display', 'inline');
        $('#homeButtons').css('display', 'none');
    });
    $('#offlineButton').click(function(){
        $('#home').css('display','none');
        $('#offline').css('display','inline');
    });
    $('#offlineBack').click(function(){
        $('#home').css('display','inline');
        $('#offline').css('display','none');
    });
    $('#closeSignUp').click(function() {
        $('#signUpForm').css('display', 'none');
        $('#homeButtons').css('display', 'inline');
    });
    $('#exampleButton').click(function() {
        $('#graph').css('display', 'none');
        $('#example').css('display', 'inline');
    });
    $('#closeExample').click(function() {
        $('#graph').css('display', 'inline');
        $('#example').css('display', 'none');
    });
    $('#editButton').click(function() {
        $('#editButton').css('display', 'none');
        $('#saveButton').css('display', 'inline');
        $('#phonegapcamera').css('display', 'inline');
        $('#fileupload').css('display', 'inline');
    });
    $('#saveButton').click(function() {
        $('#saveButton').css('display', 'none');
        $('#phonegapcamera').css('display', 'none');
        $('#fileupload').css('display', 'none');
        $('#editButton').css('display', 'none');
    });
    $('#selectChart').click(function(){
        console.log("clicked");
        graphTypeSelect();
    })
    $('#createGraph').click(function() {
        makeGraph();
    });
    $('#createPieChart').click(function(){
        makePieChart();
    })
    $('#createBarChart').click(function() {
        makeBarChart();
    });
    $('#createGraphOffline').click(function() {
        makeGraph();
    });
    $('#saveData').click(function() {
        addGraphData();
    });
    $("#viewGraphButton").click(function() {
        profileGraphView();
        $('.page').css('display', 'none');
        $('#profileGraphView').css('display', 'inline');
    })


    /*function updateGraphList() {
        var user = Parse.User.current();
        $('#graphList').empty();
        var GraphData = Parse.Object.extend("GraphData");
        var query = new Parse.Query(GraphData);
        query.equalTo("User", user);
        query.find({
            success: querySuccess,
            error: error
        });

        function querySuccess(GraphData) {
            for (var i = 0; i < GraphData.length; i++) {
                $('#graphList').append("<option value='GraphData[i].get('Name')''>" + GraphData[i].get('Name') + "</option>");
            }
        }

        function error(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    }

    function updateStatsList() {
        var user = Parse.User.current();
        $('#statsList').empty();
        var Stats = Parse.Object.extend("Stats");
        var query = new Parse.Query(Stats);
        query.equalTo("User", user);
        query.find({
            success: querySuccess,
            error: error
        });

        function querySuccess(Stats) {
            for (var i = 0; i < Stats.length; i++) {
                $('#statsList').append("<li>" + Stats[i].get('Games') + "</li>");
                $('#statsList').append("<li>" + Stats[i].get('Goals') + "</li>");
                $('#statsList').append("<li>" + Stats[i].get('Assists') + "</li>");
                $('#statsList').append("<li>" + Stats[i].get('Passes') + "</li>");
                $('#statsList').append("<li>" + Stats[i].get('Minutes') + "</li>");
            }
        }

        function error(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    }*/

/*    function signUp() {
        var username = $('#signUpName').val();
        var password = $('#signUpPass').val();
        var email = $('#email').val();
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);

        user.signUp(null, {
            success: function(user) {
                alert("Thank You for signing up")
                $('#signUpForm').css('display', 'none');
                $('#homeButtons').css('display', 'inline');
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    function logIn() {
        var username = $('#loginName').val();
        var password = $('#loginPass').val();
        Parse.User.logIn(username, password, {
            success: function(user) {
                var currentUser = Parse.User.current();
                $('#usernameDisplay').html("<p>" + username+ "</p>");
                updateGraphList();
                updateStatsList();
                addStatsChecker();
                displayProfilePicture();
                $('#logInForm').css('display', 'none');
                $('#profile').css('display', 'inline');
                $('#simple-menu').css('display', 'inline');
            },
            error: function(user, error) {
                alert("Incorrect username or password");
            }
        });
    }

    function logOut() {
        Parse.User.logOut();
        $('.page').css('display', 'none');
        $('#home').css('display', 'inline');
        $.sidr('close', 'sidr');
    }
*/

});

/*function getUsername() {
    var user = Parse.User.current();
    var Profile = Parse.Object.extend("User");
    var query = new Parse.Query(Profile);
    query.equalTo("User", user);
    query.find({
        success: querySuccess,
        error: error
    });

    function querySuccess(Profile) {
        for (var i = 0; i < Profile.length; i++) {
            $('#usernameDisplay').html("<p>" + Profile[i].get('username') + "</p>") ;
            console.log(Profile[i].get('username'));
        }
    }

    function error(error) {
        alert("Error: " + error.code + " " + error.message);
    }
}
*/