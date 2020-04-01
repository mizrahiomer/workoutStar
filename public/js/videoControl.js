var socket = io();

var player;

socket.on('connect', function () {});

function onPlayerStateChange(event) {
  console.log(isAdmin())
    if(isAdmin() && event.data == 2){
        socket.emit('stopVideo', {currentTime: player.getCurrentTime()});
    } else if (isAdmin() && event.data == 1) {
        socket.emit('playVideo',{currentTime: player.getCurrentTime()});
    }

}

function catchError(event){
  if(event.data == 100) console.log("De video bestaat niet meer");
}

function onPlayIsReady(event) {
  var params = deparam(window.location.search);
  socket.emit('join',params,function(err){});
  updateLoadBar();
  setInterval(() => {
      if(isAdmin()){
        socket.emit('updateCurrentTime',{currentTime: player.getCurrentTime()});
      }
      var precetage = (player.getDuration() - player.getCurrentTime())/player.getDuration()*100;
      precetage += 5;
      updateLoadBar(precetage);
    },1000)

  socket.on('stopVideoFromServer',function() {
    event.target.pauseVideo();
  })

  socket.on('playVideoFromServer',function(params) {
    if(params){
      event.target.seekTo(params.currentTime, true);
    }
    event.target.playVideo();
  })
}

function updateLoadBar(precetage){
  var timeleft = document.getElementById('timeleft');
  var gamification = '';
  if(precetage < 50){
    gamification = ', Half is passed!'
  }
  else if(precetage < 75){
    gamification = ', Good Job!'
  }
  timeleft.innerText = `${Math.floor(player.getDuration() - player.getCurrentTime())} Seconds${gamification}`;
  var load = document.getElementById('load');
  load.style.width = `${precetage}%`
}

function loadPlayer(videoId) {
    if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubePlayerAPIReady = function() {
        onYouTubePlayer(videoId);
      };

    } else {
      onYouTubePlayer(videoId);
    }
}

function onYouTubePlayer(videoId) {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
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
    return admin == undefined || admin == 1;
}



$(document).ready( function() {
  var params = deparam(window.location.search);
  var {videoid} = params;
  loadPlayer(videoid)

  if(isAdmin()){
    document.getElementById('cover').style.display = 'none';
  }
});