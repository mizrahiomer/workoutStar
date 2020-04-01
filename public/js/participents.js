
var participents = ['1','2','3','4','5'];


var connection = new RTCMultiConnection();

// comment-out below line if you do not have your own socket.io server
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.socketMessageEvent = 'video-conference-demo';

connection.session = {
    audio: true,
    video: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};


function generateRandomImage(){
    var image = document.createElement('img')
    var value = Math.floor(Math.random() * 5) + 1; 
    image.src = '/images/'+value+'.svg';
    image.height = '50px';
    image.style.position = 'absolute';
    return image;
}

$(document).ready(function() {
    var params = deparam(window.location.search);
    var {sessionid} = params;
    connection.openOrJoin(sessionid, function() {})
        
    connection.onstream = function (event) {
        var width = '100%';
        var  videosContainer = document.getElementById('participents-list');
        var mediaElement = getMediaElement(event.mediaElement, {
            title: event.userid,
            buttons: ['mute-video', 'mute-audio'],
            width: width,
            showOnMouseEnter: false
        });
        mediaElement.className = 'participent-card';
        videosContainer.appendChild(mediaElement);
        mediaElement.appendChild(generateRandomImage());


        setTimeout(function () {
            mediaElement.media.play();
        }, 5000);

        mediaElement.id = event.streamid;
    };


    connection.onstreamended = function (event) {
        var mediaElement = document.getElementById(event.streamid);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
        }
    };

})