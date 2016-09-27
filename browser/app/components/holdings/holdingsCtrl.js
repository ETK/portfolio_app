app.controller('HoldingsCtrl', function($scope, HoldingsFactory, holdings, $state) {

  $scope.groupedHoldings = HoldingsFactory.groupHoldings(holdings);

  $scope.displayGroup = function(group_name) {
    $scope.holdings = $scope.groupedHoldings[group_name];
  }

  $scope.updateHoldings = function() {
    HoldingsFactory.update()
    .then( function() {
      $state.go('holdings');
    }); // TODO: need to repull Holdings to get account info ?
  }

});
