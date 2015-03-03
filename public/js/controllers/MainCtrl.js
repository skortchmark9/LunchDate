angular.module('MainCtrl', []).controller('MainController', function($scope, $location, People) {

  $scope.people = [{email : ''}];
  $scope.teams = [];

  $scope.keyPressed = function(event, index) {
    if (event.which === 13) {
      var person = $scope.people[index];
      if (validateEmail(person.email) && validateTeam($scope.teams)) {
        $scope.people[index].teams = getTeams();
        $scope.addPerson();
      }
    }
  }

  function getTeams() {
    return _.pluck($scope.teams, 'text');
  }

  function validateTeam(team) {
    console.log(team);
    return team.length > 0;
  }

  function validateEmail(email) {
    console.log(email);
    return email;
  }

  $scope.addPerson = function(caller) {
    $('.person-input').last().animate({
      marginTop: '-22px',
    });
    $scope.people.push({email : ''});
  }

  $scope.submitPeople = function() {
    // People.create($scope.people)
    //   .success(function(response) {
    //     console.log(response);
    //     $location.path('/pairs');
    //   })

    //   .error(function(response) {
    //     console.log(response);
    //   });
        $location.path('/pairs');

  }
});
