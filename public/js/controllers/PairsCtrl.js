function popover(elt) {
  $(elt).popover('show')
}

angular.module('PairsCtrl', []).controller('PairsController', function($scope, People, Pairs) {

  $scope.pairs = [
  [{email : 'nobody@how.sue', teams: ['jkljs'], pairs: ['ss', 's']}, null],
  [{email: 'dude_1@gmail.com', teams: ['team1', 'team2', 'team3'], pairs : ['A', 'B', 'C', 'D']},
   {email: 'dude_2@gmail.com', teams: ['team3'], pairs : ['A', '', 'C', 'D']}],
  [{email: 'dude_3@gmail.com', teams: ['team3'], pairs : ['A', '', 'C', 'D']},
   {email: 'dude_4@gmail.com', teams: ['team2', 'team3'], pairs : ['A', 'B', 'C', 'D']}],
  [{email: 'dude_5@gmail.com', teams: ['team1', 'team3'], pairs : ['A', 'B', 'C', 'D']},
   {email: 'dude_6@gmail.com', teams: ['team2'], pairs : ['', 'B', 'C', 'D']}],
  [{email: 'dude_7@gmail.com', teams: ['team2'], pairs : ['B', 'C', '']},
   {email: 'dude_8@gmail.com', teams: ['team2'], pairs : ['A', 'B', 'C', 'D']}]];

  /* I decided against doing multiple highlights but we could if we wanted.*/
  $scope.highlightTeams = function() {
    allColors = ['rgba(110, 127, 114, 1)'];

    var allTeams = _.reduce($scope.pairs, function(memo, pair) {
      return _.union(_.flatten(_.pluck(pair, 'teams')), memo);
    }, []);

    _.each(allTeams, function(team, index) {
      $('.team-' + team).css({
        background : allColors[index % allColors.length]
      });
    })
  }

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
    setTimeout($scope.highlightTeams, 100);
  }


  $scope.init();

});
