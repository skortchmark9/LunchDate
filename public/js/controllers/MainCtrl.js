angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';

  $scope.people = [''];

  $scope.addPerson = function(caller) {
    $('.email-input').last().animate({
      marginTop: '-22px'
    });
    $scope.people.push('');
  }
  $scope.removePerson = function() {
    console.log($scope.people);
  }
});
