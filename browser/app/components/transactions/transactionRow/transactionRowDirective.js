app.directive('transactionRow', function () {

  return {
    restrict: 'AE',
    replace: true,
    scope: {
        accounts: '=',
        transaction: '='
    },
    templateUrl: 'components/transactions/transactionRow/transactionRow.html',
    link: function(scope) {
        scope.transaction.gross_amt = 0;
        scope.transaction.total_amt = 0;

        scope.recalculate = function() {
            scope.transaction.gross_amt = (parseFloat(scope.transaction.trade_px) || 0) * (parseFloat(scope.transaction.num_shares) || 0);
            scope.transaction.total_amt = scope.transaction.gross_amt + ((scope.transaction.type === 'buy' ? 1 : -1) * (parseFloat(scope.transaction.commission) || 0));
        }

        scope.recalculate(); // TODO: remove after testing
    }
}

});
