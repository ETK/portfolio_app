// all tickers
app.controller('TickersCtrl', function($scope, TickersFactory, tickers) {

  $scope.tickers = tickers;

});

// single account
app.controller('TickerCtrl', function($scope, TickersFactory, tickerData, $state, priceData) {

  $scope.ticker = tickerData.ticker;
  $scope.holdings = tickerData.holdings;
  $scope.transactions = tickerData.transactions;

  $scope.deleteTicker = function() {
    TickersFactory.delete($scope.ticker.ticker)
    .then( function() {
      $state.go('tickers');
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

  $scope.prices = priceData;

});

// new tickers
app.controller('TickersFormCtrl', function($scope, TickersFactory, $state, tickerData) {

  if(tickerData) $scope.ticker = tickerData.ticker;

  $scope.createTicker = function() {
    TickersFactory.create($scope.newTicker)
    .then( function(ticker) {
      $state.go('ticker', { ticker: ticker.ticker });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

  $scope.editTicker = function(ticker) {
    TickersFactory.edit(ticker, $scope.newTicker)
    .then( function(updatedTicker) {
      $state.go('ticker', { ticker: updatedTicker.ticker });
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  }

});
