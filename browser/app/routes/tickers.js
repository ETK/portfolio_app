app.config( function($stateProvider) {

  // view all tickers
  $stateProvider.state('tickers', {
    resolve: {
      tickers: function(TickersFactory) { return TickersFactory.fetchAll(); }
    },
    url: '/tickers',
    templateUrl: '/components/tickers/index.html',
    controller: 'TickersCtrl'
  });

  // create a new ticker
  $stateProvider.state('tickers#new', {
    resolve: { tickerData: function() {} },
    url: '/tickers/new',
    templateUrl: '/components/tickers/new.html',
    controller: 'TickersFormCtrl'
  });

  // view a single ticker
  $stateProvider.state('ticker', {
    resolve: {
      tickerData: function(TickersFactory, $stateParams) {
        return TickersFactory.fetchByTicker($stateParams.ticker);
      },
      priceData: function(TickersFactory, $stateParams) {
        return TickersFactory.fetchPricesForChart($stateParams.ticker);
      }
    },
    url: '/tickers/:ticker',
    templateUrl: '/components/tickers/ticker.html',
    controller: 'TickerCtrl'
  });

  // edit a ticker
  $stateProvider.state('ticker#edit', {
    resolve: {
      tickerData: function(TickersFactory, $stateParams) {
        return TickersFactory.fetchByTicker($stateParams.ticker);
      }
    },
    url: '/tickers/:ticker/edit',
    templateUrl: '/components/tickers/edit.html',
    controller: 'TickersFormCtrl'
  });

});
