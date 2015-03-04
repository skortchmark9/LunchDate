angular.module('lunchDate').directive('setfocus', function() {
  return{
         restrict: 'A',
          scope: {
              setfocus: '@setfocus'
          },
         link: function(scope, element, attrs){
             var focus=!!scope.setfocus && !scope.setfocus.replace(/true/,'');
             if (focus === true){
                 element[0].focus();
             }
         }
     };
})


angular.module('lunchDate').filter('teamSeparator', function() {
  return function(input) {
      var html = '';
      for (idx in input) {
          var inc = parseInt(idx) + 1;
          html += '<div class="prior-pairs">' + inc + ' week ago: ' + (input[idx] ? input[idx] : 'None :(')  + '</div>';
      }
      return html;
  };
});
