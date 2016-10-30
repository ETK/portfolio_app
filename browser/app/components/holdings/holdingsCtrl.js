app.controller('HoldingsCtrl', function($scope, HoldingsFactory, groupedHoldings) {

    $scope.groupedHoldings = groupedHoldings;

    $scope.displayGroup = function(groupName) {
        $scope.groupName = groupName;
        $scope.holdings = $scope.groupedHoldings[groupName];
    }

    $scope.updateHoldings = function() {
        HoldingsFactory.update()
        .then(() => HoldingsFactory.fetchAll())
        .then(rawHoldings => HoldingsFactory.groupHoldings(rawHoldings))
        .then(holdings => { $scope.holdings = holdings[$scope.groupName] });
    }

});
