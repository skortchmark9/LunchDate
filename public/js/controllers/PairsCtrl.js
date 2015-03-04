/* This is hackery because we don't know an Angular way to
    deal with menus.*/
function refreshPairs() {
  check = confirm("Do you want to reshuffle the pairs for this week? (They might look exactly the same)");
  if(!check) return;

  angular.element($('#pairs')).scope().getPairs();
}

function nextWeek() {
  check = confirm("Do you want to confirm these pairs and see next week's? (You can't go back!)");
  if (!check) return;

  angular.element($('#pairs')).scope().nextWeek();
}

function popover(elt) {
  $(elt).popover('show');
}

angular.module('PairsCtrl', []).controller('PairsController', function($scope, Pairs) {

  $scope.pairs;

  $scope.nextWeek = function() {
    Pairs.create($scope.pairs)
    .success(function(resp) {
      $scope.getPairs();
    })
    .error(function (resp) {
      console.error(resp);
    });
  }

  $scope.getPairs = function() {
    Pairs.get()
    .success(function(pairs) {
      $scope.pairs = pairs;

      $(function () {
        $('[data-toggle="popover"]').popover({html : true});
      });
      setTimeout($scope.highlightTeams, 50);
    })
    .error(function(response) {
      console.error(response);
    });
  }


  $scope.init = function() {
    $scope.getPairs();
    $scope.$parent.home = false;
    $scope.$parent.showMenu = true;
  }

  /* I decided against doing multiple highlights but we could if we wanted.*/
  $scope.highlightTeams = function() {
    allColors = ['rgba(110, 127, 114, 1)'];

    var allTeams = _.reduce($scope.pairs, function(memo, pair) {
      return _.union(_.flatten(_.pluck(pair, 'teams')), memo);
    }, []);

    _.each(allTeams, function(team, index) {
      var $team = $('.team-' + team);
      $team.css({
        background : allColors[index % allColors.length]
      });
    })
  }


  $scope.init();

});
