app.controller('HoldingsCtrl', function($scope, HoldingsFactory, groupedHoldings, $state) {

  $scope.groupedHoldings = groupedHoldings;

  console.log($scope.groupedHoldings);

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
