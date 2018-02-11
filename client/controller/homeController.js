angular.module('meanApp').controller('homeController', function($scope,$rootScope, $http) {

    $(document).ready(function(){

 sessionStorage.setItem('checkV',true);
        sessionStorage.setItem('adminCheckV',true);
        sessionStorage.setItem('driverCheckV',true);
        sessionStorage.setItem('userCheckV',true);

        $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form homeController : '+$rootScope.LoginName);


        $rootScope.check=true;
        $rootScope.userCheck=true;
        $rootScope.adminCheck=true;
        $rootScope.driverCheck=true;


        $rootScope.User=sessionStorage.getItem('userRole');
        console.log('Role from homeController : '+$rootScope.User);
            if ($rootScope.User=='Admin') {
                  console.log($rootScope.driverCheck);
                  //$location.path('/admin');
                  sessionStorage.setItem('checkV',false);
                  sessionStorage.setItem('adminCheckV',false);
                $rootScope.check=false;//sessionStorage.getItem('checkV');
                $rootScope.adminCheck=false;//sessionStorage.getItem('adminCheckV');
                $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form homeController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Driver') {
                    // $location.path('/driverH');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('driverCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.driverCheck=false;//sessionStorage.getItem('driverCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form homeController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Customer') {
                    // $location.path('/bookCab');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('userCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.userCheck=false;//sessionStorage.getItem('userCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form homeController : '+$rootScope.LoginName);
                  }
                  else {
                    console.log('Not authorized');
                  }
    });
});
