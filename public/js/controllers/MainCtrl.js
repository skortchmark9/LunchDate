

angular.module('MainCtrl', []).controller('MainController', function($scope, $location, People) {

  $scope.people = [{email : ''}];
  $scope.teams = [];

  $scope.home = true;

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
    $scope.people.push({email : ''});
  }

  $scope.submitPeople = function() {
    $scope.people.pop();
    People.create($scope.people)
      .success(function(response) {
        console.log(response);
        $scope.home = false;
        $location.path('/pairs');
      })

      .error(function(response) {
        console.log(response);
      });
  }

var test = [{email: 'paul@mccartney.org', teams : ['The-Beatles']},
{email: 'john@lennon.org', teams : ['The-Beatles']},
{email: 'george@harrison.org', teams : ['The-Beatles']},
{email: 'ringo@starr.org', teams : ['The-Beatles']},
{email :'john@lennon.org', teams: ['The-Quarrymen'] },
{email :'paul@mccartney.org', teams: ['The-Quarrymen'] },
{email :'stu@sutcliffe.org', teams: ['The-Quarrymen'] },
{email :'paul@mccartney.org', teams: ['Wings'] },
{email :'linda@mccartney.org', teams: ['Wings'] },
{email :'john@lennon.org', teams: ['Plastic-Ono-Band'] },
{email :'yoko@ono.org', teams: ['Plastic-Ono-Band'] },
{email :'george@harrison.org', teams: ['Traveling-Wilburys'] },
{email :'tom@petty.org', teams: ['Traveling-Wilburys'] },
{email :'roy@orbison.org', teams: ['Traveling-Wilburys'] }]

});
