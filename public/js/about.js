const team = [
    {
        name: 'Michael Lerner',
        team: 'Product Team',
        subtitle: 'Product and team builder',
        link: 'michaellerner10@gmail.com',
        pic: './images/Michael.jpeg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Adi Stein Ben-Nun',
        subtitle: 'Mom | Microsoft DevRel PM | Tech Ecosystem Promoter',
        team: 'Product Team',
        link: '#',
        pic: './images/adi.jpeg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Dor Malka',
        subtitle: 'Software Design Engineer',
        team: 'Server Team',
        link: 'dormalk@gmail.com',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Omer Mizrahi',
        team: 'Client Team',
        title: 'Front-end Developer',
        link: '#',
        pic: './images/omer.jpeg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Sharon David',
        team: 'Product Team',
        title: 'UI / UX Designer',
        link: '#',
        pic: './images/sharon.jpeg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    },
    {
        name: 'Shaina Carlebach Schiff',
        team: 'Client Team',
        title: 'Full Stack Developer, ESL coach.',
        link: 'shainaschiff@outlook.com',
        pic: './images/shaina.jpeg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi delectus, excepturi facilis in iusto magnam modi nulla numquam provident quam quis repudiandae ullam ut.'        
    }
    ,
    {
        name: 'Yaron Shemesh',
        team: 'Server Team',
        title: 'Real Time Embedded Developer',
        link: '#',
        pic: './images/yaron.jpeg',
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