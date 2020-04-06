var currUser;

function start() {
    window.gapi.auth2.init({
      client_id: "27295779158-sdqaicgo9l8qmlo8mr0f42um84ve8gkd.apps.googleusercontent.com",
    }).then(() => {
      console.log('signed in', window.gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log('current user ', window.gapi.auth2.getAuthInstance().currentUser.get());
      var signIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
      currUser = window.gapi.auth2.getAuthInstance().currentUser.get()
      if(signIn){
        showSignIn();
      } else {
          showSignOut();
      }
      window.gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn) => {
        if(signedIn){
            showSignIn();
          } else {
              showSignOut();
          }
    
      });

      window.gapi.auth2.getAuthInstance().currentUser.listen((user) => {
        console.log(user);
        currUser = user;
      });
    });
}

  function showSignOut(){
    $("#upload-video").hide()
    $("#signinButton").click(function () {
        window.gapi.auth2.getAuthInstance().grantOfflineAccess().then(signInCallback)
    })
    $("#signinButton").html("Sign In <i class='fa fa-google'></i>");
  }

  function showSignIn(){
    $("#signinButton").click(function () {
        window.gapi.auth2.getAuthInstance().signOut().then(()=>{
            localStorage.removeItem('userId')
        })
    }) 
    $("#signinButton").html("Sign Out <i class='fa fa-sign-out'></i>");
    $("#upload-video").show();
  }

  function signInCallback(authResult) {
    if (authResult["code"]) {
      $("#signinButton").html("Sign Out <i class='fa fa-sign-out'></i>");
      const userName = window.gapi.auth2.getAuthInstance().currentUser
        .get()
        .getBasicProfile()
        .getName();

      const userId = window.gapi.auth2.currentUser.getAuthInstance().get().getId();
      const userEmail = window.gapi.auth2.currentUser
        .get()
        .getBasicProfile()
        .getEmail()

      const userObj = {
        userId,
        userName,
        userEmail
      }

      localStorage.setItem('userId',userId)
      $.post('/user', userObj, function (response) {
        console.log(JSON.parse(response))
      }, 'application/json')
      window.open("./upload_video.html", '_blank');
    }
  }

$(document).ready(function(){
    showSignOut();
})