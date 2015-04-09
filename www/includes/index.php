<?php
include_once 'includes/register.inc.php';
include_once 'includes/functions.php';

sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <link rel="stylesheet" type="text/css" href="css/styles.css" />
        <link rel="stylesheet" type="text/css" href="css/jquery.sidr.light.css">
        <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/jquery.sidr.min.js"></script>

        <title>StatSticks</title>
    </head>
    <body>
    <header>
        <a id="simple-menu" href="#sidr"> &#9776; </a>
    <div id="sidr">
        <ul>
            <li>
                <a href="#profile" title="" id="profileNav"> Profile </a>
            </li>
            <li>
                <a href="#stats" title="" id="statNav">Stats</a>
            </li>
            <li>  
                <a href="#graph" title="" id="graphNav">Graph</a>
            </li>
            <li>  
                <a href="#about" title="" id="aboutNav">About</a>
            </li>   
        </ul>
    </div>
    <script>
      $(document).ready(function(){
        $('#simple-menu').sidr();
      });
    </script>
    </header>
        <div id="home" data-role="page">
            <div id="homeButtons">
                 <button id="logInButton" class="snazzyButton"> Log In  </button>
                 <button id="signUpButton" class="snazzyButton"> Sign Up </button>
             </div>
             <form id="logInForm" action="includes/process_login.php" method="post" name="login_form">
                 <label for="email">Email:</label>
                 <input type="text" name="email" id="email" value=""  />
                 <label for="loginPass">Password:</label>
                 <input type="password" name="loginPass" id="loginPass" value=""  />
                 <input type="submit" onclick="formhash(this.form, this.form.password);">
                 <input type="reset">
                 <button id="closeLogIn">Close</button>
             </form>
             <?php
                    if (login_check($mysqli) == true) {
                        echo '<p>Currently logged ' . $logged . ' as ' . htmlentities($_SESSION['username']) . '.</p>';
                        echo '<p>Do you want to change user? <a href="includes/logout.php">Log out</a>.</p>';
                    } else {
                        echo '<p>Currently logged ' . $logged . '.</p>';
                        echo "<p>If you don't have a login, please <a href='register.php'>register</a></p>";
                    }
             ?>
            <form id="signUpForm" action="<?php echo esc_url($_SERVER['PHP_SELF']); ?>" method="post">
                 <label for="signUpName">Username:</label>
                 <input type="text" name="signUpName" id="signUpName" value=""  />
                 <label for="Email"> Email:</label>
                 <input type="text" name="email" id="email" />
                 <label for="pass">Password:</label>
                 <input type="password" name="pass" id="pass" value=""  />
                 <label for="signUpPassRepeat"> Repeat Password:</label>
                 <input type="password" name="passRepeat" id="passRepeat" value=""  />
                 <input type="submit" onclick="return regformhash (this.form, this.form.signUpName, this.form.email, this.form.pass, this.form.passRepeat); ">
                 <input type="reset">
                 <button id="closeSignUp">Close</button>
             </form>
        </div>
        <div id="profile" data-role="page">
            <p>Pow</p>
        </div>
        <div id="stats" data-role="page">
            <p>sttt</p>
        </div>
        <div id="graph" data-role="page">
            <p>Grrr</p>
        </div>
        <div id="about" data-role="page">
            <p>abo</p>
        </div>

    </body>
</html>
