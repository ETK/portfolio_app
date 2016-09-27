'use strict';

app.factory('AccountsFactory', function($http) {

  // var cachedAccounts = []; // not sure this is necessary

  return {

    fetchAll: function() {
      return $http.get('/api/accounts')
        .then(function(res) { return res.data; } )
        .then(function(accounts) { return accounts; });
    },

    fetchById: function(id) {
      return $http.get('/api/accounts/' + id)
        .then(function(res) { return res.data; } )
        .then(function(accounts) { return accounts; });
    },

    create: function(accountData) {
      return $http.post('/api/accounts', accountData)
      .then(function(response) {
        var account = response.data;
        // cachedAccounts.push(account);
        return account;
      })
    },

    edit: function(accountId, data) {
      return $http.put('/api/accounts/' + accountId, data)
      .then(function(response) {
        var account = response.data;
        // cachedAccounts.push(account);
        return account;
      })
    }

  }
});
