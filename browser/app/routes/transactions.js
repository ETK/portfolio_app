app.config( function($stateProvider) {

  // view all transactions
  $stateProvider.state('transactions', {
    resolve: {
      transactions: function(TransactionsFactory) { return TransactionsFactory.fetchAll(); }
    },
    url: '/transactions',
    templateUrl: '/components/transactions/index.html',
    controller: 'TransactionsCtrl'
  });

  // create a new transaction
  $stateProvider.state('transactions#new', {
    resolve: {
      accounts: function(AccountsFactory) { return AccountsFactory.fetchAll(); },
      transactionData: function() {}
    },
    url: '/transactions/new',
    templateUrl: '/components/transactions/new.html',
    controller: 'TransactionsFormCtrl'
  });

  // bulk create new transactions
  $stateProvider.state('transactions#newBulk', {
    resolve: {
      accounts: function(AccountsFactory) { return AccountsFactory.fetchAll(); },
      transactionData: function() {}
    },
    url: '/transactions/new_bulk',
    templateUrl: '/components/transactions/newBulk.html',
    controller: 'TransactionsFormCtrl'
  });

  // view a single transaction
  $stateProvider.state('transaction', {
    resolve: {
      transaction: function(TransactionsFactory, $stateParams) {
        return TransactionsFactory.fetchById($stateParams.transactionId);
      }
    },
    url: '/transactions/:transactionId',
    templateUrl: '/components/transactions/transaction.html',
    controller: 'TransactionCtrl'
  });

  // edit a transaction
  $stateProvider.state('transaction#edit', {
    resolve: {
      transactionData: function(TransactionsFactory, $stateParams) {
        return TransactionsFactory.fetchById($stateParams.transactionId);
      },
      accounts: function () {}
    },
    url: '/transactions/:transactionId/edit',
    templateUrl: '/components/transactions/edit.html',
    controller: 'TransactionsFormCtrl'
  });

});
