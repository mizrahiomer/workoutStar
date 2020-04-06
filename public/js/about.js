const team = [
    {
        name: 'Michael Lerner',
        team: 'Product Team',
        desc: 'Product and team builder',
        link: 'michaellerner10@gmail.com',
        pic: './images/Michael.jpeg',
    },
    {
        name: 'Adi Stein Ben-Nun',
        desc: 'Mom | Microsoft DevRel PM | Tech Ecosystem Promoter',
        team: 'Product Team',
        link: '#',
        pic: './images/adi.jpeg',
    },
    {
        name: 'Dor Malka',
        desc: 'Software Design Engineer',
        team: 'Server Team',
        link: 'dormalk@gmail.com',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
    },
    {
        name: 'Omer Mizrahi',
        team: 'Client Team',
        desc: 'Front-end Developer',
        link: '#',
        pic: './images/omer.jpeg',
    },
    {
        name: 'Sharon David',
        team: 'Product Team',
        desc: 'UI / UX Designer',
        link: '#',
        pic: './images/sharon.jpeg',
    },
    {
        name: 'Shaina Carlebach Schiff',
        team: 'Client Team',
        desc: 'Full Stack Developer, ESL coach.',
        link: 'shainaschiff@outlook.com',
        pic: './images/shaina.jpeg',
    }
    ,
    {
        name: 'Yaron Shemesh',
        team: 'Server Team',
        desc: 'Real Time Embedded Developer',
        link: '#',
        pic: './images/yaron.jpeg',
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