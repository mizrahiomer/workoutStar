const videosIds = [];
const videos = [];

//Here is the magic!
function addVideoToPanel(video){
  var template = jQuery('#video-panel-template').html();
  var html = Mustache.render(template,{
    img:video.img,
    title:video.title,
    type:video.type,
  });
  jQuery('#videos-container').append(html);
}

function fetchVideos() {
  const ids = videos.join();
  console.log(ids);
  $.get(`/videos/all?alreadyIn=${ids}`,function(data){
    data.forEach(function(video){
      videosIds.push(video.videoId);
      videos.push(video)
      addVideoToPanel(video)
    })
  }).fail(function(error){
    console.log(error.responseText)
  })
}
$(document).ready(function() {
  let filters=[];
  fetchVideos();
  $('.list-group-item a').click(function(){
    let displayedVideos =videos;
    const id= $(this).parent().attr("id");
    const catagory = $('#'+id).parent().attr("id");
     if($('#'+id).hasClass('active')){
       $('#'+id).removeClass('active')
       filters.splice( filters.indexOf(id), 1 );
     }else{
       $('#'+id).addClass('active')
       filters.push(id);
     }
    filters.map(filter=>{
     displayedVideos = videos.filter(video => video.type === filter || video.length === filter.charAt(0) || video.dumbbell === filter || video.mat === filter)
  
    })
    console.log(displayedVideos)
    jQuery('#videos-container').empty();
    displayedVideos.forEach(displayedVideo => addVideoToPanel(displayedVideo))
   })
})


