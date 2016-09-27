// all accounts
app.controller('AccountsCtrl', function($scope, AccountsFactory, accounts) {

  $scope.accounts = accounts;

});

// single account
app.controller('AccountCtrl', function($scope, AccountsFactory, accountData) {

  $scope.account = accountData.account;
  $scope.holdings = accountData.holdings;
  $scope.transactions = accountData.transactions;

});

// new accounts
app.controller('AccountsFormCtrl', function($scope, AccountsFactory, $state, accountData) {

  $scope.account = accountData.account;

  $scope.createAccount = function() {
    AccountsFactory.create($scope.newAccount)
    .then( function(account) {
      $state.go('account', { accountId: account.id });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

  $scope.editAccount = function(accountId) {
    AccountsFactory.edit(accountId, $scope.newAccount)
    .then( function(account) {
      $state.go('account', { accountId: account.id });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

});
