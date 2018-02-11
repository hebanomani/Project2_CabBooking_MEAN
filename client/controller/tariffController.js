angular.module('meanApp').controller('tariffController', function($scope, $http,$location,$rootScope)
{
      $scope.tariffData="";
    $scope.getTariff="";
$(document).ready(function(){
  $('#timepicker1').timepicki();
  $('#timepicker2').timepicki();

 sessionStorage.setItem('checkV',true);
        sessionStorage.setItem('adminCheckV',true);
        sessionStorage.setItem('driverCheckV',true);
        sessionStorage.setItem('userCheckV',true);

        $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form TariffController : '+$rootScope.LoginName);


        $rootScope.check=true;
        $rootScope.userCheck=true;
        $rootScope.adminCheck=true;
        $rootScope.driverCheck=true;


        $rootScope.User=sessionStorage.getItem('userRole');
        console.log('Role from tariffController : '+$rootScope.User);
            if ($rootScope.User=='Admin') {
                  console.log($rootScope.driverCheck);
                  //$location.path('/admin');
                  sessionStorage.setItem('checkV',false);
                  sessionStorage.setItem('adminCheckV',false);
                $rootScope.check=false;//sessionStorage.getItem('checkV');
                $rootScope.adminCheck=false;//sessionStorage.getItem('adminCheckV');
                $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form tariffController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Driver') {
                    // $location.path('/driverH');
                  //  $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('driverCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.driverCheck=false;//sessionStorage.getItem('driverCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form tariffController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Customer') {
                    // $location.path('/bookCab');
                  //  $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('userCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.userCheck=false;//sessionStorage.getItem('userCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form tariffController : '+$rootScope.LoginName);
                  }
                  else {
                    console.log('Not authorized');
                  }






  });



    $scope.init = function(){
    $http.get('/tapi/GetTariff').success(function (response) {
      $scope.tariffData=response;
    });
      $('#updateDiv').hide();
  };
  $scope.init();

    $scope.SaveTariff = function() {
      $scope.Tariff.StartPeakHour=$('#timepicker1').val();
  $scope.Tariff.EndPeakHour=$('#timepicker2').val();
        $http.post('/tapi/AddTariff', $scope.Tariff).then(function(response) {
            console.log('Tariff data saved');
        });
        alert('Tariff added successfully .');
        window.location.reload();
    }

$scope.getTariffById=function(tid){
  $http.get('/tapi/getTariffById/'+tid).then(function (response) {
      $scope.getTariff=response.data;
        console.log($scope.getTariff);
  });
};

     $scope.DeleteTariff = function(tariff){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/tapi/DeleteTariff/'+tariff._id).then(function (response)
      {
          console.log('Tariff data deleted .');
          alert('Tariff deleted Successfully');
        });
    }
      window.location.reload();
  }
    $scope.init();

    $scope.UpdateTariff = function(t){
        $scope.getTariffById(t);
        $('#updateDiv').show();
  }

  $scope.UpdateT=function()
  {
    console.log('updateT called .');
      $scope.getTariff.StartPeakHour=$('#timepicker1').val();
  $scope.getTariff.EndPeakHour=$('#timepicker2').val();
    $http.post('/tapi/UpdateTariff/'+$scope.getTariff._id+'/'+$scope.getTariff.CabType+'/'+$scope.getTariff.StartPeakHour+'/'+$scope.getTariff.EndPeakHour+'/'+$scope.getTariff.NormalRate+'/'+$scope.getTariff.PeakRate).then(function (response)
      {alert('Data successfully updated !!!'); });
      console.log('Data updated for tariff .');
          $('#updateDiv').hide();
  }
    $scope.init();


});
