app.controller('Subtopic3Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){
//CHRIS’S CODE STARTS HERE

  var self = this;

//displays specific subtopic ideas to view
  self.subtopicIdeas3 = DataFactory.subtopicIdeas3;
//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked');
    $location.path('/comment');
  }

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
