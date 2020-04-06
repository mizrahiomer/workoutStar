const videos = [
  {
    videoId: 'g67ggjh9',
    equipment: 'No equipment',
    type: 'Yoga',
    title: 'Test',
    duration: '00:03:15',
    length: 'S',
    url: '#',
    img: 'images/placeholder.jpg',
    userId: '7218hfjisa'
  },
  {
    videoId: 'g67ggjh9',
    equipment: 'No equipment',
    type: 'Yoga',
    title: 'Test',
    duration: '00:03:15',
    length: 'S',
    url: '#',
    img: 'images/placeholder.jpg',
    userId: '7218hfjisa'
  },
  {
    videoId: 'g67ggjh9',
    equipment: 'No equipment',
    type: 'Yoga',
    title: 'Test',
    duration: '00:03:15',
    length: 'S',
    url: '#',
    img: 'images/placeholder.jpg',
    userId: '7218hfjisa'
  },
  {
    videoId: 'g67ggjh9',
    equipment: 'No equipment',
    type: 'Yoga',
    title: 'Test',
    duration: '00:03:15',
    length: 'S',
    url: '#',
    img: 'images/placeholder.jpg',
    userId: '7218hfjisa'
  },
]

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


$(document).ready(function() {
  videos.forEach(function(video){
    addVideoToPanel(video);
  })
})


