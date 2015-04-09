//var destinationType; //used sets what should be returned (image date OR file path to image for example)
var imgdata;
var cameraimg;
//document.addEventListener("deviceready", onDeviceReady, false);
/*
function onDeviceReady() {
    destinationType = navigator.camera.DestinationType;
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

function onPhotoDataSuccess(imageData) {
    var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + imageData;
    cameraimg = image.src;
    cameraimg = JSON.stringify(cameraimg);

}

function onFail(message) {
    alert('Failed because: ' + message);
}
*/

$(function() {
    var file;

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        file = files[0];
    });
    // Set an event listener on the Choose File field.
    var input = document.querySelector('input[type=file]');
    input.onchange = function () {
      file = input.files[0];
   };

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
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
                console.log("File available at: " + data.url);
                imgdata = data.url;
                imgdata = JSON.stringify(imgdata);
                console.log(imgdata + "Is the Link");
                sendProfilePicture();
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    });

});

function sendProfilePicture() {
    var user = Parse.User.current();
    var ProfilePic = Parse.Object.extend("ProfilePicture");
    var profilepic = new ProfilePic();
    profilepic.set("User", user);

    profilepic.save(null, {
        success: function(profilepic) {
            profilepic.set("Link", imgdata);
            profilepic.save();
            displayProfilePicture();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function displayProfilePicture() {
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
}


