console.log('direction!');
angular.module('lunchDate').directive('setfocus', function() {
  return{
         restrict: 'A',
          scope: {
              setfocus: '@setfocus'
          },
         link: function(scope, element, attrs){
             var focus=!!scope.setfocus && !scope.setfocus.replace(/true/,'');
             if (focus === true){
                 //alert(element);
                 element[0].focus();
             }
         }
     };
})
