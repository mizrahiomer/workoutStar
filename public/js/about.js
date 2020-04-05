const team = [
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Michael L.',
        title: 'Senior Developer',
        link: '#',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    }




]

function updateTeam(){
    var template = jQuery('#team-list').html();
    team.forEach((({title,name, link, pic, desc}) => {
      var html = Mustache.render(template,{title,name, link, pic, desc});
      jQuery('#team').append(html);
    }))
}


function submitForm(event){
    console.log(event)
    const frm = document.getElementById('contact-form');
    frm.reset()
}

$(document).ready(function(){
    updateTeam();
})