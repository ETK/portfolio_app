'use strict';
window.app = angular.module('Portfolio', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

app.config(function ($urlRouterProvider, $locationProvider) {
  // remove hashbangs
  $locationProvider.html5Mode(true);

  // go to holdings by default
  $urlRouterProvider.when('/', function($state) {
    $state.go('holdings');
  })
});

app.run(function($rootScope, Title) {
  $rootScope.page = {
    baseTitle: 'Portfolio'
  }

  // reset page title on state change; title may be set by Controllers
  $rootScope.$on('$stateChangeSuccess', function() {
    Title.resetTitle();
  });
});
