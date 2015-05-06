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
        $('#page-title').text("Profile");
    });
    $('#profileButton').click(function() {
        $('#profile').css('display', 'inline');
        $('#home').css('display', 'none');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Profile");
    });
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