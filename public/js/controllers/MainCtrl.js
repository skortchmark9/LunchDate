/* This is hackery because we don't know an Angular way to
    deal with menus.*/
function savePairs() {
  angular.element($('#pairs')).scope().savePairs();
}

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
    $location.path('/pairs');
    return;
    $scope.people.pop();
    $scope.people = test;
    People.create($scope.people)
      .success(function(response) {
        console.log(response);
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
