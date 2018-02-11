angular.module('meanApp').controller('bookCabController',function($scope,$http,$rootScope,$location,$cookies,modalProvider)
{
var allMyMarkers = [];
var myMarker,fare,n,custname,mob,name;
$rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');

$(document).ready(function(){
$rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
$rootScope.LoginUser=sessionStorage.getItem('user');
  name=$rootScope.LoginUser;
  custname=$rootScope.LoginName;
  mob=$rootScope.LoginUser.phone;
  console.log(custname);
  console.log(mob);

sessionStorage.setItem('checkV',true);
        sessionStorage.setItem('adminCheckV',true);
        sessionStorage.setItem('driverCheckV',true);
        sessionStorage.setItem('userCheckV',true);

        $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form driverController : '+$rootScope.LoginName);


        $rootScope.check=true;
        $rootScope.userCheck=true;
        $rootScope.adminCheck=true;
        $rootScope.driverCheck=true;


        $rootScope.User=sessionStorage.getItem('userRole');
        console.log('Role from driverController : '+$rootScope.User);
            if ($rootScope.User=='Admin') {
                  console.log($rootScope.driverCheck);
                  // $location.path('/admin');
                  sessionStorage.setItem('checkV',false);
                  sessionStorage.setItem('adminCheckV',false);
                $rootScope.check=false;//sessionStorage.getItem('checkV');
                $rootScope.adminCheck=false;//sessionStorage.getItem('adminCheckV');
                $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                console.log('UserName form driverController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Driver') {
                    // $location.path('/driverH');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('driverCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.driverCheck=false;//sessionStorage.getItem('driverCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form driverController : '+$rootScope.LoginName);
                  }
                  if ($rootScope.User=='Customer') {
                    // $location.path('/bookCab');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    sessionStorage.setItem('checkV',false);
                    sessionStorage.setItem('userCheckV',false);
                    $rootScope.check=false;//sessionStorage.getItem('checkV');
                    $rootScope.userCheck=false;//sessionStorage.getItem('userCheckV');
                    $rootScope.LoginName=sessionStorage.getItem('username');//$cookies.getObject('authUser');
                    console.log('UserName form driverController : '+$rootScope.LoginName);
                  }
                  else {
                    console.log('Not authorized');
                  }





 var today=new Date();
  $('#timepicker').timepicki();
  $( "#datepicker").datepicker({
    minDate: new Date(today),
    maxDate: new Date(today.setDate(today.getDate() + 1))
  });
  //   var s1=document.getElementById('datepicker').value;
// var t1=document.getElementById('timepicker').value;
//     $rootScope.bookDate=s1;
//     $rootScope.bookTime=t1;
//     $rootScope.startPoint=document.getElementById("origin").value;
//     $rootScope.endPoint=document.getElementById("destination").value;
  $('#showDur').hide();
});


$(document).ready(function(){
var date=new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
hours = hours < 10 ? '0'+hours : hours;
minutes = minutes < 10 ? '0'+minutes : minutes;
var strTime = hours + ':' + minutes + +' '+ampm;
$rootScope.bookNow=strTime;
console.log($rootScope.bookNow);

$http.get('/bapi/GetAllRides/'+mob).then(function (response) {
  if(response){
    console.log('inside GetAllRides')
    $scope.GetAllRides=response.data;
    console.log($scope.GetAllRides);
      }
  else {
      console.log('sorry no response');
  }
});

});

var socket=io.connect();
socket = io.connect('http://localhost:3000', {reconnect: false});
  socket.on('NewMessage', function(data) {
  if(data.message.driverArray.length>0){
  var DriverLoc=data.message.driverlocation;
  console.log(DriverLoc);
  driverAddress = DriverLoc
  geocoder = new google.maps.Geocoder();
  if (geocoder) {
  geocoder.geocode({
          'address': driverAddress
      }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var driverLatlng = new google.maps.LatLng(latitude, longitude);
            myMarker=  new google.maps.Marker({
            position: driverLatlng,
            map: map,
            icon: '../public/images/mm2.jpg',
            store_id: data.message.driverId,
            });
            allMyMarkers.push( myMarker );
          }
      });
  }

}
else{
  console.log('no cabs');
    }
  });

  socket.on('MyDriver', function(data) {

  $scope.DriverData=data.msg;
  $scope.DriverName=data.msg.driverName;
  $scope.DriverMobile=data.msg.mobi;
  $scope.DriverCarN=data.msg.carn;
  $scope.DriverCar=data.msg.cart;
    });

  socket.on('DriverArr', function(data) {
  console.log(data.description);
  for (var i = 0; i <= data.description.Arr.length; i++) {
    if (data.description.Arr[i] === data.description.driverId) {
        console.log('yes still there');
    }
    else {
      $scope.DriverData=null;
      $scope.DriverName=null;
      $scope.DriverMobile=null;
      $scope.DriverCarN=null;
      $scope.DriverCar=null;
        for(var i=0;i<allMyMarkers.length;i++){
        if(allMyMarkers[i].store_id === data.description.driverId){
         allMyMarkers[i].setMap(null);
         break;
        }
       }
    }
  }
      });


$scope.getFare=function()
    {
  //var pr;
  var sel=document.getElementById('cabType').value;
  //var sel ='Mini';
  // for(i=0;i<pr.length;i++)
  // {
  //   if(pr[i].checked)
  //   {
  //     sel=pr[i].value;
  //   }
  // }
  $http.get('/tapi/GetSelectedPlan/'+sel).then(function (response) {
  $rootScope.currPlan=response.data;

      if(response.length!=0){

        $rootScope.SelCurrCar=$rootScope.currPlan[0].CabType;
        $rootScope.BaseCurrAmt=$rootScope.currPlan[0].NormalRate;
        $rootScope.PeakCurrAmt=$rootScope.currPlan[0].PeakRate;

        if($rootScope.bookNow>=$rootScope.currPlan[0].StartPeakHour && $rootScope.bookNow<=$rootScope.currPlan[0].EndPeakHour)
        {
          console.log('current time inside peak hour');
          $rootScope.Fare=($rootScope.PeakCurrAmt*$rootScope.di);
        }
        else {
          console.log('current time inside non peak hour');
          $rootScope.Fare=$rootScope.BaseCurrAmt*$rootScope.di;
            }
            fare=$rootScope.Fare;
            console.log(fare);
      }
      else {
        alert('no tariff');
      }
        console.log(fare);

    });
    $("#myFareModal").modal();
}



$scope.sendDetails=function(){
  var sel=document.getElementById('cabType').value;
  console.log(sel);
  console.log(start);
  var end=$('#destination').val();
  console.log(end);

  var BookingDetails={
  startP : start,
  endP : end,
  cust: custname,
  mobi:mob,
  Fare:fare
  };

socket.emit('BookDetail', {
     All: BookingDetails
    });
    $('#myFareModal').modal('hide');
    $rootScope.LoginUser=sessionStorage.getItem('user');
      $scope.Booking=
      {
      user:$rootScope.LoginUser,
      Pickup:start,
      Destination:end,
      BookDate:$rootScope.bookDate,
      BookTime:$rootScope.bookTime,
      Distance:$rootScope.di,
      Duration:$rootScope.tym,
      Amount:$rootScope.Fare,
      BookingType:'Current',
      CabType:$rootScope.SelCurrCar,
      DriverCab:$scope.DriverData
    }
    console.log('Niyaz yeda : '+$scope.DriverData.CabType +" "+$scope.DriverName+" "+$scope.DriverMobile+ " " +$scope.DriverCarN + " "+$scope.DriverCar);
if((($scope.Booking.BookingType =='Current') && ($scope.Booking.DriverCab==null)) || ($scope.DriverCar!=sel))
{
alert('sorry no cabs available');
}
else{
  $http.post('/bapi/AddBooking/',$scope.Booking).then(function(response){
    console.log('Data of confirmBooking submitted successfully');
  });
  alert('Booking successfully done !!!');
    $('#myfinalModal').modal('show');
    $('#myfinalModal').on('hidden.bs.modal', function (e) {

  });
}
n = fare.toFixed(2);
document.getElementById('mon').innerHTML=n;
document.getElementById('st').innerHTML=start;
document.getElementById('en').innerHTML=end;
 //modalProvider.openPopupModal();
 //console.log('Ye line chalass');
 //$("#myDriverModal").modal('show');
}




  function initialize() {
    if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(success);
            }
      else {
          alert("Geo Location is not supported on your current browser!");
           }

        }initialize();

      function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
         myLatlng = new google.maps.LatLng(lat, long);
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
        });
        var myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
           }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        marker=  new google.maps.Marker({
        position: myLatlng,
        map: map,
       icon: '../public/images/mm1.png',
        draggable: true,
        animation:  google.maps.Animation.BOUNCE,
        });

        autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('origin')),
                {types: ['geocode']});

        autocomplete1 = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('destination')),
                {types: ['geocode']});

        google.maps.event.addListener(marker, 'dragend', function() {
        res=marker.getPosition();
        geocoder.geocode({ 'latLng': res }, function (results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
                   if (results[1]) {
                      start=results[1].formatted_address;
                      document.getElementById("origin").value=start;
                   }
               }
          });
        });

        var infoWindow = new google.maps.InfoWindow({map: map});
          // infoWindow.setPosition(myLatlng);
          // infoWindow.setContent('you are here.');
          map.setCenter(myLatlng);

          geocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                       start=results[1].formatted_address;
                       document.getElementById("origin").value=start;
                    }
                }
          });



        google.maps.event.addListenerOnce(directionsDisplay, 'directions_changed', function() {
            var directions = this.getDirections();
            var overview_path = directions.routes[0].overview_path;
            var startingPoint = overview_path[0];
            var destination = overview_path[overview_path.length - 1];
            addMarker(startingPoint, 'start');
            addMarker(destination, 'end');
        });
      }
    function addMarker(position) {
    var marker = new google.maps.Marker({
        position: position,
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map
    });
}

function calcRoute(start, end) {
   var request = {
       origin: start,
       destination: end,
       travelMode: google.maps.DirectionsTravelMode.DRIVING
   };
   directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
           directionsDisplay.setDirections(response);
       }
   });
}

$scope.getEstimate=function(){
  var start = document.getElementById("origin").value;
  var end = document.getElementById("destination").value;
  if ((start.length!=0) && (end.length!=0)) {
   console.log('Button Clicked');
           var start = $('#origin').val();
           var end = $('#destination').val();
         calcRoute(start, end);
         calculateDistances(start,end);
        $('#showDur').show();

  }
}


        function calculateDistances(start,stop) {
          console.log('Calculate Distance Called');
         var service = new google.maps.DistanceMatrixService();
         service.getDistanceMatrix({
             origins: [start],
             destinations: [stop],
             travelMode: google.maps.TravelMode.DRIVING,
             unitSystem: google.maps.UnitSystem.METRIC,
             avoidHighways: false,
             avoidTolls: false
           },
         function (response, status) {
         if (status != google.maps.DistanceMatrixStatus.OK) {
           alert('Error was: ' + status);
         } else {
            var origins = response.originAddresses[0];
          var destinations = response.destinationAddresses[0];
        //   document.getElementById('distance').innerHTML=response.rows[0].elements[0].distance.text;
        $rootScope.dis=response.rows[0].elements[0].distance.text;
        $rootScope.di=response.rows[0].elements[0].distance.value/1000;
        $rootScope.tym=response.rows[0].elements[0].duration.text;
        // document.getElementById('time').innerHTML=response.rows[0].elements[0].duration.text;
        // $rootScope.tym1=response.rows[0].elements[0].duration.value/60;
            var origins = response.originAddresses[0];
          var destinations = response.destinationAddresses[0];
          document.getElementById('spanDistance').innerHTML=response.rows[0].elements[0].distance.text;
        $rootScope.dis=response.rows[0].elements[0].distance.text;
        $rootScope.di=response.rows[0].elements[0].distance.value/1000;
        $rootScope.tym=response.rows[0].elements[0].duration.text;
        document.getElementById('spanTime').innerHTML=response.rows[0].elements[0].duration.text;
        $rootScope.tym1=response.rows[0].elements[0].duration.value/60;

            }
         });
        }








// $('#myModal').on('hidden.bs.modal', function (e) {
//   var s1=document.getElementById('datepicker').value;
// var t1=document.getElementById('timepicker').value;
//     $rootScope.bookDate=s1;
//     $rootScope.bookTime=t1;
//     $rootScope.startPoint=document.getElementById("origin").value;
//     $rootScope.endPoint=document.getElementById("destination").value;
//     calcPrice();
//     window.location.href="/#/book";

// })

// function calcPrice()
// {
//   var sel;
//   var pr=document.getElementsByName("optradio");
//   for(i=0;i<pr.length;i++)
//   {
//     if(pr[i].checked)
//     {
//       sel=pr[i].value;
//     }
//   }
//   $http.get('/tariffapi/GetSelectedPlan/'+sel).then(function (response) {
//       $rootScope.selPlan=response.data;
//       if(response.length!=0)
//    i {
//          $rootScope.SelCar=$rootScope.selPlan[0].Category;
//          $rootScope.BaseAmt=$rootScope.selPlan[0].BaseFare;
//          $rootScope.PeakAmt=$rootScope.selPlan[0].PeakFare;
//          $rootScope.DistAmt=$rootScope.selPlan[0].DistanceFare;
//          $rootScope.RideAmt=$rootScope.selPlan[0].RideTimeFare;
//          $rootScope.StartTym=$rootScope.selPlan[0].StartPeakTime;
//          $rootScope.EndTym=$rootScope.selPlan[0].EndPeakTime;
//          if($rootScope.bookTime>=$rootScope.StartTym && $rootScope.bookTime<=$rootScope.EndTym)
//          {
//         console.log('time inside peak hour');
//         $rootScope.Tot=($rootScope.BaseAmt+($rootScope.DistAmt*$rootScope.di)+($rootScope.RideAmt*$rootScope.tym1))*$rootScope.PeakAmt;
//          }

//          else {
//            console.log('time inside non peak hour');
//           $rootScope.Tot=$rootScope.BaseAmt+($rootScope.DistAmt*$rootScope.di)+($rootScope.RideAmt*$rootScope.tym1);
//          }
//          console.log($rootScope.Tot);

//     }
//     else {
//       alert('no tariff');
//     }
//   });

// };
// }

 });
