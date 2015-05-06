var imgdata;
var cameraimg;
var file;
// Set an event listener on the Choose File field.
$('#fileselect').bind("change", function(e) {
    var files = e.target.files || e.dataTransfer.files;
    // Our file var now holds the selected file
    file = files[0];
});
// Set an event listener on the Choose File field.
var input = document.querySelector('input[type=file]');
input.onchange = function() {
    file = input.files[0];
};

angular.module('StatiSticksappServices', ['ngResource'])
    .factory('ParseService', function($resource) {
            Parse.initialize("imbkzuNYr6DWtmvB9dRU1nHdlWz0D3ET0Rj6MSKo", "ILwfj37tvWIiIdHNaPDEv0eEGdgoKuRMwHfa2vZp");

            var loggedInUser;

            var ParseService = {
                name: "Parse",

                // Login a user
                login: function login(username, password, callback) {
                    Parse.User.logIn(username, password, {
                        success: function(user) {
                            loggedInUser = user;
                            callback(user);
                            $('.page').css('display', 'none');
                            $('#home').css('display', 'none');
                            $('#profile').css('display', 'inline');
                            $('header').css('display', 'inline');
                            $('body').css('background-color', '#eceff1');
                            $('#page-title').text("Profile");
                            $('#modal1').closeModal();
                            navigator.notification.beep(1);

                            
                        },
                        error: function(user, error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                // Register a user
                signUp: function signUp(username, password, email, callback) {

                    var user = new Parse.User();
                    user.set("username", username);
                    user.set("password", password);
                    user.set("email", email);

                    user.signUp(null, {
                        success: function(user) {
                            alert("Thank You for signing up")
                            $('#signUpForm').css('display', 'none');
                            $('#homeButtons').css('display', 'inline');
                            Materialize.toast("Thank you for signing up", 4000);
                        },
                        error: function(user, error) {
                            // Show the error message somewhere and let the user try again.
                            Materialize.toast("Error: " + error.code + " " + error.message, 1000);
                        }
                    });
                },

                // Logout current user
                logOut: function logOut(callback) {
                    Parse.User.logOut();
                    console.log("Logging out");
                },

                // Get current logged in user
                getUser: function getUser() {
                    if (loggedInUser) {
                        return loggedInUser;
                    }
                },

                viewgraph: function viewgraph(name, callback){

                    console.log(name);
                    var GraphData = Parse.Object.extend("GraphData");
                    var query = new Parse.Query(GraphData);
                    query.equalTo("Name", name);
                    query.first({
                        success: querySuccess,
                        error: error
                    });

                    function querySuccess(graphData) {
                        callback(graphData)
                    }

                    function error(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                },

                showGraph: function showGraph(graph){

                    $('#profileGraph').empty();
                    var type = graph.get('Type')

                    if ( type == "Line"){
                    var xlabel = graph.get('XAxisTitle');
                    var ylabel = graph.get('YAxisTitle');
                    num1 = graph.get('Point1');
                    num2 = graph.get('Point2');
                    num3 = graph.get('Point3');
                    num4 = graph.get('Point4');
                    num5 = graph.get('Point5');
                    num6 = graph.get('Point6');

                    var data = [num1, num2, num3, num4, num5, num6];

                    for (i = 0; i < data.length; i++){
                        if ((data[i] == NaN) || (data[i] == null)){
                            data.splice([i],1);
                        }
                    }

                    var XAxisLabels = [];
                    var count = 1;
                    for (var i = 1; i < data.length; i++){
                        XAxisLabels.push(count);
                        count++;
                    }
                        chart = new Contour({
                        el: '#profileGraph',
                        xAxis: { orient: 'bottom' },
                        xAxis: { categories: XAxisLabels },
                        xAxis: { title: xlabel },
                        yAxis: { title: ylabel, titlePadding: 40, max: 100},

                        chart: { animations : { enable: true } } 
                    })
                .cartesian()
                .line(data)
                .render(); } else {
                    console.log("Not Supported");
                }
                },


                //Update the graph list to be specific to user
                updateGraphList: function updateGraphList(callback) {
                    var user = Parse.User.current();
                    var GraphData = Parse.Object.extend("GraphData");
                    var query = new Parse.Query(GraphData);
                    query.equalTo("User", user);
                    query.find({
                        success: querySuccess,
                        error: error
                    });

                    function querySuccess(GraphData) {
                        callback(GraphData);
                    }

                    function error(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                },
                //Updates Stat list to only be specific to logged in user
                updateStatsList: function updateStatsList(callback) {
                    var user = Parse.User.current();
                    var Stats = Parse.Object.extend("Stats");
                    var query = new Parse.Query(Stats);
                    query.equalTo("User", user);
                    query.first({
                        success: function(results) {
                            callback(results);
                            console.log("Found user stats");
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });

                
                },

                getAdvancedStats: function getAdvancedStats(stats, callback){
                    var games = stats.get('Games');
                    var goals = stats.get('Goals');
                    var minutes = stats.get('Minutes');
                    var assists = stats.get('Assists');
                    var passes = stats.get('Passes');

                    var advancedStats = {
                        goalsPerGame: (goals / games).toFixed(2),
                        assistsPerGame: (assists / games).toFixed(2),
                        minutesPerGame: (minutes / games).toFixed(2),
                        passesPerGame: (passes / games).toFixed(2),
                        passesPerAssist: (passes / assists).toFixed(2)
                    }
                    callback(advancedStats);

                },

                addStatsChecker: function addStatsChecker() {
                    var user = Parse.User.current();
                    var Stats = Parse.Object.extend("Stats");
                    var query = new Parse.Query(Stats);
                    query.equalTo("User", user);
                    query.find({
                        success: querySuccess,
                        error: error
                    });

                    function querySuccess(Stats) {
                        if (Stats.length >= 1) {
                            $('#initStats').css('display', 'none');
                            $('#accStats').css('display', 'inline');
                            $('#statsRow').css('display','inline');
                            $('#advancedStatsRow').css('display','inline');
                        }
                    }

                    function error(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                },

                //Find User details
                getUserDetails: function getUserDetails(callback) {
                    var user = Parse.User.current().id;
                    var Profile = Parse.Object.extend("User");
                    var query = new Parse.Query(Profile);
                    query.equalTo("objectId", user);
                    query.first({
                        success: function(results) {
                            callback(results);
                            console.log("Found user details");
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                //Loads User profile picture
                displayProfilePicture: function displayProfilePicture() {
                    var user = Parse.User.current();
                    var profilepic = Parse.Object.extend("ProfilePicture");
                    var query = new Parse.Query(profilepic);
                    query.equalTo("User", user);
                    query.find({
                        success: querySuccess,
                        error: error
                    });

                    function querySuccess(profilepic) {
                        for (var i = 0; i < profilepic.length; i++) {
                            $('#profilePic').html("<img id='image' src=" + profilepic[i].get('Link') + ">");
                        }
                    }

                    function error(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                },

                FauxBuy: function FauxBuy(){
                    alert("Transaction Failed");
                },

                makeExample: function makeExample(name, xlabel, ylabel, point1, point2, point3, point4, point5, point6){

                    $('#exampleGraph').empty();
                    num1 = Number(point1);
                    num2 = Number(point2);
                    num3 = Number(point3);
                    num4 = Number(point4);
                    num5 = Number(point5);
                    num6 = Number(point6);

                    var data = [num1, num2, num3, num4, num5, num6];

                      for (i = 0; i < data.length; i++){
                        if ((data[i] == NaN) || (data[i] == null)){
                            data.splice([i],1);
                        }
                    }

                    var XAxisLabels = [];
                    var count = 1;
                    for (var i = 1; i < data.length; i++){
                        XAxisLabels.push(count);
                        count++;
                    }
                        chart = new Contour({
                        el: '#exampleGraph',
                        xAxis: { orient: 'bottom' },
                        xAxis: { categories: XAxisLabels },
                        xAxis: { title: xlabel },
                        yAxis: { title: ylabel, titlePadding: 40, max: 100},

                        chart: { animations : { enable: true } } 
                    })
                .cartesian()
                .line(data)
                .render();
                },

                createLineGraph: function createLineGraph(name, xlabel, ylabel, point1, point2, point3, point4, point5, point6){

                    $('#lineGraph').empty();
                    num1 = Number(point1);
                    num2 = Number(point2);
                    num3 = Number(point3);
                    num4 = Number(point4);
                    num5 = Number(point5);
                    num6 = Number(point6);

                    var data = [num1, num2, num3, num4, num5, num6];

                      for (i = 0; i < data.length; i++){
                        if ((data[i] == NaN) || (data[i] == null)){
                            data.splice([i],1);
                        }
                    }

                    var XAxisLabels = [];
                    var count = 1;
                    for (var i = 1; i < data.length; i++){
                        XAxisLabels.push(count);
                        count++;
                    }
                        chart = new Contour({
                        el: '#lineGraph',
                        xAxis: { orient: 'bottom' },
                        xAxis: { categories: XAxisLabels },
                        xAxis: { title: xlabel },
                        yAxis: { title: ylabel, titlePadding: 40, max: 100},

                        chart: { animations : { enable: true } } 
                    })
                .cartesian()
                .line(data)
                .render();
                },

                saveLineGraph: function saveLineGraph(name, xlabel, ylabel, point1, point2, point3, point4, point5, point6){
                    
                    num1 = Number(point1);
                    num2 = Number(point2);
                    num3 = Number(point3);
                    num4 = Number(point4);
                    num5 = Number(point5);
                    num6 = Number(point6);

                    var user = Parse.User.current();

                    var Graph = Parse.Object.extend("GraphData");
                    var graph = new Graph();

                    graph.set("Name", name);
                    graph.set("Type", "Line");
                    graph.set("XAxisTitle", xlabel);
                    graph.set("YAisTitle", ylabel);
                    graph.set("Point1", num1);
                    graph.set("Point2", num2);
                    graph.set("Point3", num3);
                    graph.set("Point4", num4);
                    graph.set("Point5", num5);
                    graph.set("Point6", num6);
                    graph.set("User", user);

                    graph.save(null, {
                            success: function(graph) {
                                // Execute any logic that should take place after the object is saved.
                                Materialize.toast("Graph Saved", 4000);
                            },
                            error: function(graph, error) {
                                // Execute any logic that should take place if the save fails.
                                Materialize.toast('Failed to save ' + error.message, 1000);
                            }
                        }) 
                },

                createPieChart: function createPieChart(name, point1, point2, point3, point4, point5, point6){
                    num1 = Number(point1);
                    num2 = Number(point2);
                    num3 = Number(point3);
                    num4 = Number(point4);
                    num5 = Number(point5);
                    num6 = Number(point6);
                    var data = [num1, num2, num3, num4, num5, num6];

                    new Contour({
                        el: '#pieChart',
                        pie: { outerRadius: 100 }
                    })
                    .pie(data)
                    .render()

                },

                //Add Stats for logged in user

                addStats: function addStats(games, goals, assists, minutes, passes) {
                    var user = Parse.User.current();
                    // Number input is recognised as String so Number() type conversition for input to database
                    var SetGames = Number(games);
                    var SetGoals = Number(goals);
                    var SetAssists = Number(assists);
                    var SetPasses = Number(passes);
                    var SetMinutes = Number(minutes);


                    var Stats = Parse.Object.extend("Stats");
                    var stats = new Stats();

                    stats.set("Games", SetGames);
                    stats.set("Goals", SetGoals);
                    stats.set("Assists", SetAssists);
                    stats.set("Passes", SetPasses);
                    stats.set("Minutes", SetMinutes);
                    stats.set("User", user);

                    stats.save(null, {
                            success: function(stats) {
                                // Execute any logic that should take place after the object is saved.
                                Materialize.toast("Stats added", 4000);
                            },
                            error: function(stats, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                alert('Failed to create new object, with error code: ' + error.message);
                            }
                        })
            
            },

            addaccStats: function addaccStats(games, goals, assists, minutes, passes){
                var SetGames = Number(games);
                var SetGoals = Number(goals);
                var SetAssists = Number(assists);
                var SetPasses = Number(passes);
                var SetMinutes = Number(minutes);
                var Stat = Parse.Object.extend("Stats");
                var query = new Parse.Query(Stat);
                var user = Parse.User.current()

                console.log(SetGames);

                if ( SetGames == NaN){
                    SetGames = 0;
                }
                if ( SetGoals == NaN){
                    SetGoals = 0;
                }
                if ( SetAssists == NaN){
                    SetAssists = 0;
                }
                if ( SetPasses == NaN){
                    SetPasses = 0;
                }
                if ( SetMinutes == NaN){
                    SetMinutes = 0;
                }
                query.equalTo("User", user);
                query.first({
                    success: function(Stat) {
                        var oldGames = Stat.get('Games');
                        var Games = (SetGames + oldGames);
                        var oldGoals = Stat.get('Goals');
                        var Goals = (SetGoals + oldGoals);
                        var oldAssists = Stat.get('Assists');
                        var Assists = (SetAssists + oldAssists);
                        var oldPasses = Stat.get('Passes');
                        var Passes = (SetPasses + oldPasses);
                        var oldMinutes = Stat.get('Minutes');
                        var Minutes = (SetMinutes + oldMinutes);
                        Stat.save(null, {
                            success: function(stat) {
                                stat.set("Games",Games);
                                stat.set("Goals",Goals);
                                stat.set("Assists",Assists);
                                stat.set("Passes",Passes);
                                stat.set("Minutes",Minutes);
                                stat.save();
                                Materialize.toast("Stats added", 4000);
                            }
                        });
                    }
                });

            },

            saveReport: function saveReport(date, home, away, homegoals, awaygoals, report){
                var homegoals = Number(homegoals);
                var awaygoals = Number(awaygoals);
                console.log(date);
                console.log(typeof(date));
                console.log(home);
                console.log(away);

                var Reports = Parse.Object.extend("Reports");
                var reportsend = new Reports();

                reportsend.set("Date", date);
                reportsend.set("homeTeam", home);
                reportsend.set("awayTeam", away);
                reportsend.set("homeGoals", homegoals);
                reportsend.set("awayGoals", awaygoals);
                reportsend.set("report", report);

        

                reportsend.save(null, {
                    success: function(report) {
                        Materialize.toast("Match Report saved", 4000);
                    },
                    error: function(report, error) {
                        Materialize.toast('Failed to save ' + error.message, 1000);
                    }
                }) 

            },

            getMatchReports : function getMatchReports(callback){
                var report = Parse.Object.extend("Reports");
                var query = new Parse.Query(report);
                query.find({
                        success: function(results){
                            callback(results);
                        },
                        error: function(results, error){
                            console.log("Failed to load");
                        }
                    });
            },

            uploadProfilePic : function uploadProfilePic(callback) {

                    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
                    var serverUrl = 'https://api.parse.com/1/files/' + file.name;

                    $.ajax({
                        type: "POST",
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Parse-Application-Id", 'imbkzuNYr6DWtmvB9dRU1nHdlWz0D3ET0Rj6MSKo');
                            request.setRequestHeader("X-Parse-REST-API-Key", 'zzDouYL47sibqxV4tLlTTyMJKbCR5MnKIfb5KQIR');
                            request.setRequestHeader("Content-Type", file.type);
                        },
                        url: serverUrl,
                        data: file,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            img = data.url;
                            img = JSON.stringify(img);
                            console.log(img + "Is the Link");
                            console.log("Added");
                            callback(img);
                        },
                        error: function(data) {
                            var obj = jQuery.parseJSON(data);
                            alert(obj.error);
                        }
                    });
            },

            updateProfilePic : function updateProfilePic(img, callback) {
                var User = Parse.Object.extend("User");
                var query = new Parse.Query(User);
                var userID = Parse.User.current().id;
                query.equalTo("objectId", userID);
                query.first({
                    success: function(User) {
                        User.save(null, {
                            success: function(user) {
                                user.set("PP", img); 
                                console.log("PP send Success");
                                user.save();
                            }
                        });
                    }
                });
            }


            };
                // The factory function returns ParseService, which is injected into controllers.
                return ParseService;
            })
