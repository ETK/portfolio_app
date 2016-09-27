app.config( function($stateProvider) {

  // Holdings summary
  $stateProvider.state('holdings', {
    resolve: {
      holdings: function(HoldingsFactory) { return HoldingsFactory.fetchAll(); }
    },
    url: '/holdings',
    templateUrl: '/components/holdings/holdings.html',
    controller: 'HoldingsCtrl'
  });

});
