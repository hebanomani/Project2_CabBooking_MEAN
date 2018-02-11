var app = angular.module('meanApp', ['ngRoute','ngCookies', 'ngStorage']);
app.config(function($routeProvider,$locationProvider) {
      $locationProvider.hashPrefix('');
    $routeProvider.when('/', {
        templateUrl: './views/home.html',
        controller: 'homeController'
    }).when('/login', {
        templateUrl: './views/login.html',
        controller: 'loginController'
    }).when('/user', {
        templateUrl: './views/userCreate.html',
        controller: 'userController'
    }).when('/admin', {
        templateUrl: './views/admin.html',
         controller: 'homeController'
    }).when('/changePassword', {
        templateUrl: './views/changePassword.html',
        controller: 'userController'
    }).when('/driver', {
        templateUrl: './views/driverCreate.html',
        controller: 'driverController'
    }).when('/driverV', {
        templateUrl: './views/driverView.html',
        controller: 'driverController'
    }).when('/driverH', {
        templateUrl: './views/driver.html',
        controller: 'driverController'
    }).when('/booking', {
        templateUrl: './views/booking.html',
        controller: 'driverController'
    }).when('/rides', {
        templateUrl: './views/myrides.html',
        controller: 'bookCabController'
    }).when('/tariff', {
        templateUrl: './views/tariffCreate.html',
        controller: 'tariffController'
    }).when('/tariffV', {
        templateUrl: './views/tariffView.html',
        controller: 'tariffController'
    }).when('/bookCab', {
        templateUrl: './views/bookCab.html',
         controller: 'bookCabController'
    }).when('/error', {
        templateUrl: './views/error.html',
    }).when('/contact', {
        templateUrl: './views/contact.html',
    }).otherwise({
  redirectTo: '/',
});
});


app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails ) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/','/login','/user','/error','/contact'];

        var authUser = $cookies.getObject('authUser');

        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;

        }
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/');
        }
        else
        {
              if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/admin' ){
              $location.path('/error');
             }
             else if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/driver' ){
              $location.path('/error');
            }
            else if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/driverV' ){
              $location.path('/error');
            }
            else if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/tariff' ){
              $location.path('/error');
            }
            else if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/tariffV' ){
              $location.path('/error');
            }
            else if (restrictedPage && (loggedInUser.role!='Driver') && $location.path()=='/booking') {
            $location.path('/error');
        }
        else if (restrictedPage && (loggedInUser.role!='Driver') && $location.path()=='/driverH') {
        $location.path('/error');
    }
        else if (restrictedPage && (loggedInUser.role!='Customer') && $location.path()=='/rides') {
            $location.path('/error');
            }
            else if (restrictedPage && (loggedInUser.role!='Customer') && $location.path()=='/bookCab') {
                $location.path('/error');
                }
            else if (restrictedPage && loggedInUser.role!='Customer' && $location.path()=='/user') {
        $location.path('/error');
            }
            else
            {}
        }
        console.log('RestrictedPage '+restrictedPage);
        console.log('UserName from app.js : '+sessionStorage.getItem('username'));
        console.log($sessionStorage.tokenDetails);
    });
});
