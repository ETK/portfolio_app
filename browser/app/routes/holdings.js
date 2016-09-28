app.config( function($stateProvider) {

    // Holdings summary
    $stateProvider.state('holdings', {
        resolve: {
            groupedHoldings: function(HoldingsFactory) {
                return HoldingsFactory.fetchAll()
                .then(holdings => HoldingsFactory.groupHoldings(holdings));
            }
        },
        url: '/holdings',
        templateUrl: '/components/holdings/holdings.html',
        controller: 'HoldingsCtrl'
    });

});
