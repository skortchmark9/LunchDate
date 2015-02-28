angular.module('PeopleService', []).factory('People', ['$http', function($http) {

  return {
          //Get people saved so far.
          get : function() {
              return $http.get('/api/people');
          },

          //Create new batch of people
          create : function(people) {
              return $http.post('/api/people', people);
          },

          //Update a specific person
          update : function(personID, person) {
              return $http.post('/api/people/update', person);
          },

          delete : function(personID) {
              return $http.delete('/api/people/' + personID);
          }
      }
}]);
