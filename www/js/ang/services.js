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
                    console.log("Logging out");
                },

                // Get current logged in user
                getUser: function getUser() {
                    if (loggedInUser) {
                        return loggedInUser;
                    }
                },

                //Update the graph list to be specific to user
                updateGraphList: function updateGraphList() {
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
                            $('#statsAdd').css('display', 'none');
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
                                alert('Data added');
                            },
                            error: function(stats, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                alert('Failed to create new object, with error code: ' + error.message);
                            }
                        })
            
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
