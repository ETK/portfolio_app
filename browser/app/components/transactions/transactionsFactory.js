'use strict';

app.factory('TransactionsFactory', function($http) {
  return {

    fetchAll: function() {
      return $http.get('/api/transactions')
        .then(res => res.data);
    },

    fetchById: function(id) {
      return $http.get('/api/transactions/' + id)
        .then(res => res.data);
    },

    create: function(transaction) {
      return $http.post('/api/transactions', transaction)
      .then(res => res.data);
    },

    bulkCreate: function(transactions) {
        // console.log(transactions)
      return $http.post('/api/transactions', transactions)
      .then(res => res.data);
    },

    edit: function(transactionId, data) {
      return $http.put('/api/transactions/' + transactionId, data)
      .then(res => res.data);
    },

    delete: function(transactionId) {
      return $http.delete('/api/transactions/' + transactionId);
    }

  }
});
