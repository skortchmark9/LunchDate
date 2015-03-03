function popover(elt) {
  $(elt).popover('show')
}

angular.module('PairsCtrl', []).controller('PairsController', function($scope, People, Pairs) {

  $scope.pairs = [
  [{email: 'dude_1@gmail.com', teams: ['team1', 'team2', 'team3'], pairs : ['A', 'B', 'C', 'D']},
   {email: 'dude_2@gmail.com', teams: ['team3'], pairs : ['A', '', 'C', 'D']}],
  [{email: 'dude_3@gmail.com', teams: ['team3'], pairs : ['A', '', 'C', 'D']},
   {email: 'dude_4@gmail.com', teams: ['team2', 'team3'], pairs : ['A', 'B', 'C', 'D']}],
  [{email: 'dude_5@gmail.com', teams: ['team1', 'team3'], pairs : ['A', 'B', 'C', 'D']},
   {email: 'dude_6@gmail.com', teams: ['team2'], pairs : ['', 'B', 'C', 'D']}],
  [{email: 'dude_7@gmail.com', teams: ['team2'], pairs : ['B', 'C', '']},
   {email: 'dude_8@gmail.com', teams: ['team2'], pairs : ['A', 'B', 'C', 'D']}],
  [{email: 'dude_9@gmail.com', teams: ['team2'], pairs : ['A', 'B', 'C', 'D']}, null]];

  $scope.init = function() {
    Pairs.get()
    .success(function(pairs) {
      $scope.pairs = pairs;

      $(function () {
        $('[data-toggle="popover"]').popover();
      });
    })
    .error(function(response) {
      console.error(response);
    })
  }


  // $scope.init();

});
