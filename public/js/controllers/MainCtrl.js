angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

  $scope.people = [''];

  $scope.addPerson = function(caller) {
    $('.email-input').last().animate({
      marginTop: '-22px'
    });
    $scope.people.push('');
  }

  $scope.submitPeople = function() {
    $http.post('/api/submitPeople', $scope.people).
      success(function(response) {
        console.log(response);
      }).
      error(function(error) {
        console.log(error);
      });
  }
});
