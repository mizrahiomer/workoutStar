const videos = [];

//Here is the magic!
function addVideoToPanel(video){
  var template = jQuery('#video-panel-template').html();
  console.log(video)
  var html = Mustache.render(template,{
    img:video.img,
    title:video.title,
    type:video.type,
  });
  jQuery('#video-container').append(html);
}

function fetchVideos() {
  const ids = videos.join();
  console.log(ids);
  $.get(`/videos/all?alreadyIn=${ids}`,function(data){
    data.forEach(function(video){
      videos.push(video.videoId);
      addVideoToPanel(video)
    })
  }).fail(function(error){
    console.log(error.responseText)
  })
}
$(document).ready(function() {
  fetchVideos();
})


