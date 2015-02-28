angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {

  $scope.people = [{email : ''}];
  $scope.teams = [];

  $scope.keyPressed = function(event, index) {
    if (event.which === 13) {
      var person = $scope.people[index];
      if (validateEmail(person.email) && validateTeam($scope.teams)) {
        person.teams = $scope.teams;
        $scope.addPerson();
      }
    }
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
    console.log($scope.people);
    $http.post('/api/submitPeople', $scope.people).
      success(function(response) {
        $location.path('/preview')
      }).
      error(function(error) {
        console.log(error);
      });
  }
});
