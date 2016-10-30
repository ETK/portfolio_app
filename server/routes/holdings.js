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
        Price.findAll({ where: {
            date: { $gte: new Date(2016,4,12,0,0,0,0),
                    $lte: new Date(2016,4,14,0,0,0,0) },
        }}) // where clause temporary / dev purposes
    ])
    .spread((transactions, prices) => Holding.update(transactions, prices))
    .then(updatedHoldings => res.json(updatedHoldings))
    .catch(next);
});
