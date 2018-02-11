angular.module('meanApp').controller('userController', function($scope, $http,$location)
{


    $scope.SaveUser = function() {

         $http.post('/uapi/AddPeople',$scope.User).then(function(response) {
        console.log('User data saved');
         window.location.reload();
        });
      $scope.User='';
      $location.path('/login');
    }

  $scope.ChangePassword= function(){

      $http.put('/uapi/updatePassword/'+$scope.User.Email+'/'+$scope.User.NPassword).then(function (response) {
        if(response)
        {
          alert('Password changed Successfully!');
          // $scope.usr='';
        }
        $location.path('/login');
      });
  };




});
