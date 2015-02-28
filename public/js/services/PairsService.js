angular.module('PairsService', []).factory('Pairs', ['$http', function($http) {

  return {
          //Get example pairs.
          get : function() {
              return $http.get('/api/pairs');
          },

          //Saves created pairs
          create : function(pairs) {
              return $http.post('/api/pairs/create', pairs);
          },

          delete : function(pairsID) {
              return $http.delete('/api/pairs/' + pairsID);
          }
      }
}]);
