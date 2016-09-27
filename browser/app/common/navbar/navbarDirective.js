app.directive('navbar', function ($state, AuthService, $rootScope, AUTH_EVENTS) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'common/navbar/navbar.html',
    link: function (scope) {


      // User functionality
      scope.user = null;

      scope.isLoggedIn = function () { return AuthService.isAuthenticated(); };

      scope.logout = function () {
        AuthService.logout()
        .then(() => { $state.go('home') });
      };

      function setUser() {
        AuthService.getLoggedInUser()
        .then(user => { scope.user = user });
      };

      function removeUser() { scope.user = null; };

      setUser();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

    }

  };

});
