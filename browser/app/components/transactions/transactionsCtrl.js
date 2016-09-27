// all transactions
app.controller('TransactionsCtrl', function($scope, TransactionsFactory, transactions) {

  $scope.transactions = transactions;

});

// single transaction
app.controller('TransactionCtrl', function($scope, TransactionsFactory, transaction, $state) {

  $scope.transaction = transaction;

  $scope.deleteTransaction = function() {
    TransactionsFactory.delete($scope.transaction.id)
    .then( function() {
      $state.go('transactions');
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

});

// new accounts
app.controller('TransactionsFormCtrl', function($scope, TransactionsFactory, $state, accounts, transactionData) {

  $scope.accounts = accounts;
  $scope.transaction = transactionData;

  $scope.createTransaction = function() {
    TransactionsFactory.create($scope.newTransaction)
    .then( function(transaction) {
      $state.go('transaction', { transactionId: transaction.id });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

  $scope.editTransaction = function(transactionId) {
    TransactionsFactory.edit(transactionId, $scope.newTransaction)
    .then( function(transaction) {
      $state.go('transaction', { transactionId: transaction.id });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

});
