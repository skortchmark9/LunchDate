angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';

  $scope.people = [1];

  $scope.addPerson = function(caller) {
    $('.animate-repeat').animate({marginTop: '-=15px'});
    $scope.people.push(1);
  }
  $scope.removePerson = function() {
    $('.animate-repeat').animate({marginTop: '+=15px'});
    $scope.people.pop();
  }

});

