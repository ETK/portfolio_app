'use strict';

app.factory('TickersFactory', function($http) {
  return {

    fetchAll: function() {
      return $http.get('/api/tickers')
        .then(res => res.data);
    },

    fetchByTicker: function(ticker) {
      return $http.get('/api/tickers/' + ticker)
        .then(res => res.data);
    },

    create: function(tickerData) {
      return $http.post('/api/tickers', tickerData)
      .then(res => res.data)
    },

    edit: function(ticker, data) {
      return $http.put('/api/tickers/' + ticker, data)
      .then(res => res.data);
    },

    delete: function(ticker) {
      return $http.delete('/api/tickers/' + ticker);
    },

    fetchPrices: function(ticker) {
      return $http.get('/api/prices/' + ticker)
      .then(res => res.data);
    },

    fetchPricesForChart: function(ticker) {
      var convertedPrices = [];
      return this.fetchPrices(ticker)
      .then( function(prices) {
        prices.forEach(function(price) {
          convertedPrices.push({
            date: new Date(price.date),
            price: price.close_px
          });
        });
        return convertedPrices;
      });
    }

  }
});
