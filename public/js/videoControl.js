var socket = io();

var player;

socket.on('connect', function () {
});

socket.on('stopVideoFromServer',function() {
    player.pauseVideo();
})

socket.on('playVideoFromServer',function(params) {
  if(params){
    player.seekTo(params.currentTime, true);
  }
  player.playVideo();    
})

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if(isAdmin() && event.data == 2){
        socket.emit('stopVideo', {currentTime: player.getCurrentTime()});
    } else if (isAdmin() && event.data == 1) {
        socket.emit('playVideo',{currentTime: player.getCurrentTime()});
    }
    
}

function catchError(event){
  if(event.data == 100) console.log("De video bestaat niet meer");
}

function onPlayIsReady() {
  var params = deparam(window.location.search);
  socket.emit('join',params,function(err){});
  if(isAdmin()){
    setInterval(() => {
      socket.emit('updateCurrentTime',{currentTime: player.getCurrentTime()});
    },1000)
  }
}

function loadPlayer(room) { 
    if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
  
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      window.onYouTubePlayerAPIReady = function() {
        onYouTubePlayer(room);
      };
  
    } else {
      onYouTubePlayer(room);
  
    }
}

function onYouTubePlayer(room) {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: room,
        playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0 },
        events: {
          'onStateChange': onPlayerStateChange,
          'onError': catchError,
          'onReady': onPlayIsReady
        }
    });
}

function isAdmin(){
    var params = deparam(window.location.search);
    var {admin} = params;
    return admin == 1;
}



$(document).ready( function() {
    console.log( "ready!" );
    var params = deparam(window.location.search);
    var {room,admin} = params;
    loadPlayer(room);

    if(isAdmin()){
      document.getElementById('cover').style.display = 'none';
    }
});