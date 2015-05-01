
/*
 * Define the main Huna JS module
 */
var app = angular.module('HunaJS', ['ui.router', 'angular-cache'])

/**
 * Get some routes in place
 */
.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to main state on /
  $urlRouterProvider.otherwise('/');
  // Now set up the states
  $stateProvider
    .state('main', {
      url: '/',
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    })

    // error
    .state('error', {
      url: '/error',
      controller: 'ErrorController',
      templateUrl: '/js/app/modules/error/error.html'
    })

    // User Routes
    .state('register', {
      url: '/user/register',
      controller: 'RegisterController',
      templateUrl: '/js/app/modules/user/register.html'
    })
    .state('activate', {
      url: '/user/register/activate',
      controller: 'ActivateController',
      templateUrl: '/js/app/modules/user/activate.html'
    })
    .state('login', {
      url: '/user/login',
      controller: 'LoginController',
      templateUrl: '/js/app/modules/user/login.html'
    })
    .state('recover', {
      url: '/user/password',
      controller: 'RecoverPasswordController',
      templateUrl: '/js/app/modules/user/recoverpassword.html',
      authenticate: true
    })

    // Dashboards
    .state('dashboard', {
      url: '/dashboard',
      controller: 'DashboardController',
      templateUrl: '/js/app/modules/dashboard/dashboard.html',
      authenticate: true
    })
    .state('dashboard.host', {
      url: '^/dashboard/:hostname',
      templateUrl: '/js/app/modules/dashboard/partials/overview.html',
      authenticate: true
    })
    .state('dashboard.addhost', {
      url: '^dashboard/addhost',
      controller: 'HostController',
      templateUrl: '/js/app/modules/dashboard/partials/addhost.html',
      authenticate: true
    });

}) // end state config

.config(function (CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
}) // end cache init

// Run blocks are the closest thing in Angular to the main method
.run(function ($rootScope, $state, $injector, AuthService) {
  // check for authentication on state change
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !AuthService.isAuthenticated()){
      console.log("checking for authentication ...");
      // User is not authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }
  });

  // send token with the http requests
  $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
      if ($rootScope.auth && $rootScope.auth.user)
        headersGetter()['Authorization'] = "Bearer " + $rootScope.auth.user.token; // jshint ignore:line
      if (data) {
        return angular.toJson(data);
      }
  };
});