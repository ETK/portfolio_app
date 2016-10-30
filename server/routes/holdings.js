'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Promise = require('bluebird');
const Holding = db.model('Holding');
const Account = db.model('Account');
const Price = db.model('Price');
const Ticker = db.model('Ticker');
const Transaction = db.model('Transaction');

module.exports = router;

// get all
router.get('/', function (req, res, next) {
  Holding.findAll({
    where: { ticker: { $ne: 'Cash' } }
  })
  .then(holdings => res.json(holdings))
  .catch(next);
});

// regenerate holdings
router.get('/update', function (req, res, next) {
    Promise.all([
        Transaction.findAll({ include: [{
            model: Account,
            as: 'account'
        }] }),
        Price.latest()
    ])
    .spread((transactions, prices) => Holding.update(transactions, prices[0]))
    .then(updatedHoldings => res.json(updatedHoldings))
    .catch(next);
});
