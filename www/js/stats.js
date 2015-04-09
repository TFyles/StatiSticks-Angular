function addStatsChecker(){
    var user = Parse.User.current();
    var Stats = Parse.Object.extend("Stats");
      var query = new Parse.Query(Stats);
      query.equalTo("User", user);
      query.find({success: querySuccess, error: error});
      function querySuccess(Stats) {
        if (Stats.length >= 1){
            $('#statsAdd').css('display','none');
        }   
      }
      function error(error) {
        alert("Error: " + error.code + " " + error.message);
      }
}

function addStats(){
        var user = Parse.User.current();
        var Games = $('#games').val();
        var Goals = $('#goals').val();
        var Assists = $('#assists').val();
        var Passes = $('#passes').val();
        var Minutes = $('#minutes').val();
        // Number input is recognised as String so Number() type conversition for input to database
        var SetGames = Number(Games);
        var SetGoals = Number(Goals);
        var SetAssists = Number(Assists);
        var SetPasses = Number(Passes);
        var SetMinutes = Number(Minutes);


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
        });
}
