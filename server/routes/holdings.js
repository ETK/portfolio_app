'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Holding = db.model('Holding');
const Account = db.model('Account');
const Price = db.model('Price');
const Ticker = db.model('Ticker');

module.exports = router;

// get all
router.get('/', function (req, res, next) {
  Holding.findAll({
    include: [{ model: Account, as: 'account'}],
    where: { ticker: { $ne: 'Cash' } }
  })
  .then(holdings => res.json(holdings))
  .catch(next);
});

// regenerate holdings
router.get('/update', function (req, res, next) {
  Ticker.allTickers()
  .then(tickers => Price.current(tickers))
  .then(prices => Holding.update(prices))
  .then(updatedHoldings => res.json(updatedHoldings))
  .catch(next);
});
