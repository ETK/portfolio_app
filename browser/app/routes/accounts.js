app.config( function($stateProvider) {

  // view all accounts
  $stateProvider.state('accounts', {
    resolve: {
      accounts: function(AccountsFactory) { return AccountsFactory.fetchAll(); }
    },
    url: '/accounts',
    templateUrl: '/components/accounts/index.html',
    controller: 'AccountsCtrl'
  });

  // create a new account
  $stateProvider.state('accounts#new', {
    resolve: { accountData: null },
    url: '/accounts/new',
    templateUrl: '/components/accounts/new.html',
    controller: 'AccountsFormCtrl'
  });

  // view a single account
  $stateProvider.state('account', {
    resolve: {
      accountData: function(AccountsFactory, $stateParams) {
        return AccountsFactory.fetchById($stateParams.accountId);
      }
    },
    url: '/accounts/:accountId',
    templateUrl: '/components/accounts/account.html',
    controller: 'AccountCtrl'
  });

  // edit an account
  $stateProvider.state('account#edit', {
    resolve: {
      accountData: function(AccountsFactory, $stateParams) {
        return AccountsFactory.fetchById($stateParams.accountId);
      }
    },
    url: '/accounts/:accountId/edit',
    templateUrl: '/components/accounts/edit.html',
    controller: 'AccountsFormCtrl'
  });

});
