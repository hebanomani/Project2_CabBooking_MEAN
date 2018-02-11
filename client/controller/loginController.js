angular.module('meanApp').controller('loginController', function($scope, $http, AuthenticationService, $location,$rootScope,$cookies) {

    $scope.LoginUser = function() {
        sessionStorage.setItem('checkV',true);
        sessionStorage.setItem('adminCheckV',true);
        sessionStorage.setItem('driverCheckV',true);
        sessionStorage.setItem('userCheckV',true);
        
        $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form loginController : '+$rootScope.LoginName);
                

        $rootScope.check=true;
        $rootScope.userCheck=true;
        $rootScope.adminCheck=true;
        $rootScope.driverCheck=true;
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role=='Admin') {
                  console.log($rootScope.driverCheck);
                  $location.path('/admin');
                  sessionStorage.setItem('checkV',false);
                  sessionStorage.setItem('adminCheckV',false);
                $rootScope.check=false;//sessionStorage.getItem('checkV');
                $rootScope.adminCheck=false;//sessionStorage.getItem('adminCheckV');
                $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form loginController : '+$rootScope.LoginName);
                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Driver') {
                    $location.path('/driverH');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('driverCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.driverCheck=false;//sessionStorage.getItem('driverCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form loginController : '+$rootScope.LoginName);
                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Customer') {
                    $location.path('/bookCab');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('userCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.userCheck=false;//sessionStorage.getItem('userCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form loginController : '+$rootScope.LoginName);
                  }
                  else {
                    console.log('Not authorized');
                  }
        });
    };

function init(){
    AuthenticationService.Logout();
    $rootScope.check=true;
    $rootScope.adminCheck=true;
    $rootScope.driverCheck=true;
    $rootScope.userCheck=true;
    };
    init();
})
