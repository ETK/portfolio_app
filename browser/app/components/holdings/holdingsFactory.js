'use strict';

app.factory('HoldingsFactory', function($http) {
  return {

    fetchAll: function() {
      return $http.get('/api/holdings')
        .then(res => res.data);
    },

    update: function() {
      return $http.get('/api/holdings/update')
        .then(res => res.data);
    },

    groupHoldings: function(holdings) {
      var groupedHoldings = {},
          // key: group_name
          // value: object:
          //    key: detail // value: array of holdings
          //    key: total // value: object:
          //      key: cost_basis // value: total cost
          //      key: current_value // value: total value
          //      key: p_l // value: total P&L
          group;

      holdings.forEach( function(holding) {
        if(!groupedHoldings[holding.account.group_name]) {
          groupedHoldings[holding.account.group_name] = {};
        }
        if(!groupedHoldings[holding.account.group_name][holding.account.account_name]) {
          groupedHoldings[holding.account.group_name][holding.account.account_name] = {
            total: {
              cost_basis: 0,
              current_value: 0,
              p_l: 0
            },
            detail: []
          };
        }
        group = groupedHoldings[holding.account.group_name][holding.account.account_name];
        group.detail.push(holding);
        group.total.cost_basis += +holding.cost_basis;
        group.total.current_value += +holding.current_value;
        group.total.p_l += +holding.p_l;
      });

      return groupedHoldings;
    }

  }
});
