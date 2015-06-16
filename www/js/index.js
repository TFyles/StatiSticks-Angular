Parse.initialize("imbkzuNYr6DWtmvB9dRU1nHdlWz0D3ET0Rj6MSKo", "ILwfj37tvWIiIdHNaPDEv0eEGdgoKuRMwHfa2vZp");
$(document).ready(function() {


    $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 100});
    $('.modal-trigger').leanModal();
    $('select').material_select();
    
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
        $('#page-title').text("Profile");
    });
    $('#toSignUp').click(function() {
    	$('.page').css('display', 'none');
    	$('#signUpPage').css('display', 'inline');
    })
    $('#profileButton').click(function() {
        $('#profile').css('display', 'inline');
        $('#home').css('display', 'none');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Profile");
    });
    $('#viewFollowing').click(function() {
        $('.page').css('display', 'none');
        $('#following').css('display', 'inline');
        $('#page-title').text("Following");
    });

    $('#SearchfriendsNav').click(function(){
        $('.page').css('display', 'none');
        $('#friendsSearch').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Find Friends");
    })
    $('#statNav').click(function() {
        $('.page').css('display', 'none');
        $('#stats').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Stats");
    });
    $('#utilNav').click(function() {
        $('.page').css('display', 'none');
        $('#utilities').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Utils");
    });
    $('#graphNav').click(function() {
        $('.page').css('display', 'none');
        $('#graph').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Graphs");

    });
    $('#aboutNav').click(function() {
        $('.page').css('display', 'none');
        $('#about').css('display', 'inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("About");
    });
    $('#toLineChart').click(function(){
        $('.page').css('display', 'none');
        $('#lineChart').css('display', 'inline');
        $('#page-title').text("Line Chart");
    });
    
    $('#lineBack').click(function(){
        $('.page').css('display', 'none');
        $('#graph').css('display', 'inline');
        $('#page-title').text("Graphs");
    });
    $('#toMatchReports').click(function(){
        $('.page').css('display', 'none');
        $('#matchReports').css('display', 'inline'); 
        $('#page-title').text("Match Reports");
    });
    $('#toWriteReports').click(function(){
        $('.page').css('display', 'none');
        $('#writeReports').css('display', 'inline'); 
        $('#page-title').text("Report");
    });
    $('#toStopwatch').click(function(){
        $('.page').css('display', 'none');
        $('#StopwatchPage').css('display', 'inline'); 
        $('#page-title').text("Stopwatch");
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
        $('body').css('background-color', '#eceff1');
    });
    $('#offlineBack').click(function(){
        $('#home').css('display','inline');
        $('#offline').css('display','none');
    });
    $('#closeSignUp').click(function() {
        $('#signUpForm').css('display', 'none');
        $('#homeButtons').css('display', 'inline');
    });
    $('#profilePic').click(function() {
        $('#phonegapcamera').css('display', 'inline');
        $('#fileupload').css('display', 'inline');
    });
    $('#cameraBack').click(function() {
        $('#phonegapcamera').css('display', 'none');
        $('#fileupload').css('display', 'none');
    });
    $('#endIntro').click(function() {
        $('#intro').css('display', 'none');
        $('#step1').css('display', 'inline');
    });
});

    var sec = 1;
var min = 35;
function stopwatch(text) {
   sec--;
  if (sec == -1) {
   sec = 59;
   min = min - 1; }
  else {
   min = min; }

if (sec<=9) { 
	sec = "0" + sec; 
}
   document.clock.stwa.value = ((min<=9) ? "0" + min : min) + " : " + sec;

  if (text == "Start") { document.clock.theButton.value = "Stop "; }
  if (text == "Stop ") { document.clock.theButton.value = "Start"; }

  if (document.clock.theButton.value == "Start") {
   window.clearTimeout(SD);
   sec=sec;
   return true; }
SD=window.setTimeout("stopwatch();", 1000);




if ( ((min == 2) && (sec == 0)) ||(min == 0) && ((sec == 10) || (sec == 5) || (sec == 4) || (sec == 3) || (sec == 2) || (sec == 1))) {
	navigator.notification.vibrate(1000);
};



if ((sec == 0) && (min == 0)) {
	resetIt();
	Materialize.toast("Timer Complete", 4000);
	navigator.notification.beep(3);
};

}

function resetIt() {
  sec = 1;
  min =35;
  if (document.clock.theButton.value == "Stop ") {
  document.clock.theButton.value = "Start"; }
  document.clock.stwa.value = ((min<=9) ? "0" + min : min) + " : " + sec;
}

function setTime(){

	console.log("Performed");
	var Setminutes = $('#Setminutes').val();
	var setSec = $('#seconds').val();
	console.log(Setminutes);
	setSec = Number(setSec);
	Setminutes = Number(Setminutes);

	if ((Setminutes <= 35) && (Setminutes >= 0) && (setSec < 60) && (setSec >= 0) && (setSec !=NaN) && (Setminutes != NaN)){
	sec = setSec++;
	min = Setminutes;
	if (document.clock.theButton.value == "Stop ") {
  	document.clock.theButton.value = "Start"; }
  	document.clock.stwa.value = ((min<=9) ? "0" + min : min) + " : " + sec;
  	$('#modal11').closeModal();
  	$('#SetClockForm')[0].reset();
  	} else {
  		Materialize.toast("Invalid Time", 4000);
  	}

}

