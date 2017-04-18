app.factory('DataFactory', ['$http', '$firebaseAuth', '$routeParams', function($http, $firebaseAuth, $routeParams){

  console.log('datafactory loading?');

  //Start Kris' Code
  //containers
  var subTopicObject = { list:[] };
  var subtopicIdeas = { list:[] };
  var commentsObject = { list:[] };
  var userMatchObject = { list : [] };
  var userTally = {};
  var ideasTally = {};
  var commentsTally = {};
  var likesTally = {};
  var likes = {};

  //calls functions at startup
  init();

  function init() {
    getUsers();
  }

  //function to display user list on manage users admin view
  function getUsers(){
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      // allUsers.list = response.data;
      // console.log(allUsers.list);
    })
  }

  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init();
      });
    })
    getSubTopics();
    getSubtopicIdeas();
    getComments();
    getUserMatch();
    getTallyInfo();
    getLikes();
  }


  //add new user to DB from login view button click
  function addNewUser(newUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/newUser',
        data: newUser,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // notyf.confirm('Blank Submitted For Approval');
        swal("User Added To Database", "", "success");
        self.newUser = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your address.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //add new idea to DB from button click from idea view
  function addNewIdea(newIdea){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/newIdea',
        data: newIdea,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        getSubtopicIdeas();
        swal("Idea Added To Database", "", "success");
        self.newIdea = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds subtopics1 to idea view select element
  function getSubTopics() {
    $http({
      method: 'GET',
      url: '/data/getSubTopics'
    }).then(function(response) {
      subTopicObject.list = response.data;
    });
  }//end of getSubTopics()

  //adds ideas to subtopic views
  function getSubtopicIdeas(id) {
    $http({
      method: 'GET',
      url: '/data/subtopicIdeas',
      headers: {
        id : id
      }
    }).then(function(response) {
      subtopicIdeas.list = response.data;
    });
  }//end of getSubTopicIdeas()

  //adds loved/idea to DB
  function addLoved(subtopicIdeas){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/addLoved',
        data: subtopicIdeas,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // notyf.confirm('Blank Submitted For Approval');
        swal("Loved Added To Database", "", "success");
        self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds flag/idea to DB
  function addFlag(subtopicIdeas){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/addFlag',
        data: subtopicIdeas,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // notyf.confirm('Blank Submitted For Approval');
        swal("flag Added To Database", "", "success");
        self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of getSubTopicIdeas


  //gets all comments for comment view
  function getComments() {
    $http({
      method: 'GET',
      url: '/data/allComments'
    }).then(function(response) {
      commentsObject.list = response.data;
    });
  }//end of getComments()

  //adds loved/idea to DB
  function addComment(newComment){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/addComment',
        data: newComment,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // notyf.confirm('Blank Submitted For Approval');
        getComments();
        swal("Comment Added To Database", "", "success");
        self.addComment = {};
      }).catch(function(error) {
        swal("Values Are Incorrect", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addComment()
  //End Kris' Code

  function getUserMatch() {
    $http({
      method: 'GET',
      url: '/data/getUserMatch'
    }).then(function(response) {
      userMatchObject.list = response.data;
    });
  }//end of getAllUsers()

  getTallyInfo();

  //function to display tallies on home page
  function getTallyInfo() {
    console.log('inside of get tally?');
    $http({
      method: 'GET',
      url: '/data/userTally'
    }).then(function(response){
      userTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/data/ideasTally'
    }).then(function(response){
      ideasTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/data/commentsTally'
    }).then(function(response){
      commentsTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/data/likesTally'
    }).then(function(response){
      likesTally.count = response.data;
    });
  } // end of getTallyInfo function

  function getLikes() {
    $http({
      method: 'GET',
      url: '/data/getLikes'
    }).then(function(response) {
      likes.count = response.data;
      console.log(likes.count);
    });
  }

  //adds like to DB
  function addLike(ideaId){
    console.log(ideaId);
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/data/addLike/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        console.log(response);
      }).catch(function(error) {
        console.log('error adding like to database', error);
      });
    });
  }

  return {
    userTally: userTally,
    ideasTally: ideasTally,
    commentsTally: commentsTally,
    likesTally: likesTally,
    likes: likes,
    addLike: addLike,
    addNewUser : addNewUser,
    addNewIdea : addNewIdea,
    subTopicObject : subTopicObject,
    subtopicIdeas : subtopicIdeas,
    addComment : addComment,
    commentsObject : commentsObject,
    getSubtopicIdeas : getSubtopicIdeas,
    // allUsers: allUsers,
    deactivateUser: deactivateUser,
    getUserMatch : getUserMatch,
    userMatchObject : userMatchObject,
  }

}]); // end of app.factory
