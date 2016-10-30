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
  $scope.transactions = [{
    "ticker": "TEST",
    "accountId": 8,
    "trade_date": new Date(),
    "type": "buy",
    "num_shares": Math.floor(Math.random() * (15-1)) + 1,
    "trade_px": Math.floor(Math.random() * (200-10)) + 10,
    "commission": Math.floor(Math.random() * (10-0)) + 0
  },{
    "ticker": "TEST",
    "accountId": 8,
    "trade_date": new Date(),
    "type": "sell",
    "num_shares": Math.floor(Math.random() * (15-1)) + 1,
    "trade_px": Math.floor(Math.random() * (200-10)) + 10,
    "commission": Math.floor(Math.random() * (10-0)) + 0
  },{
    "ticker": "TEST",
    "accountId": 8,
    "trade_date": new Date(),
    "type": "buy",
    "num_shares": Math.floor(Math.random() * (15-1)) + 1,
    "trade_px": Math.floor(Math.random() * (200-10)) + 10,
    "commission": Math.floor(Math.random() * (10-0)) + 0
  }]; // for bulk transactions

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

    // bulk create
    $scope.createTransactions = function() {
        TransactionsFactory.bulkCreate($scope.transactions)
        .then( function(transaction) {
            console.log(transaction)
            // $state.go('transactions');
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
