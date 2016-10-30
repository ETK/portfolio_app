'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Promise = require('bluebird');
const Account = db.model('Account');
const Transaction = db.model('Transaction');
const Holding = db.model('Holding');
const Price = db.model('Price');
const Ticker = db.model('Ticker');

module.exports = router;


// --- /tickers
// view
router.get('/', function (req, res, next) {
  Ticker.findAll({ order: [['ticker','ASC']]})
  .then( tickers => res.json(tickers) )
  .catch(next);
});
// create
router.post('/', function (req, res, next) {
  Ticker.create(req.body)
  .then( ticker => res.json(ticker) )
  .catch(next);
});


// --- /tickers/:ticker
// view
router.get('/:ticker', function (req, res, next) {
  var findingTickers = Ticker.findOne({ where: { ticker: req.params.ticker }, include: [Price] });
  var findingTransactions = Transaction.findAll({
    where: { ticker: req.params.ticker },
    include: [{model: Account, as: 'account'}] });
  var findingHoldings = Holding.findAll({ where: { ticker: req.params.ticker } });
  Promise.all([findingTickers, findingTransactions, findingHoldings])
  .spread(function (ticker, transactions, holdings) {
    res.json({
      ticker: ticker,
      holdings: holdings,
      transactions: transactions
    });
  })
  .catch(next);
});
// edit -- action
router.put('/:ticker', function (req, res, next) {
  Ticker.update(req.body, { where: { ticker: req.params.ticker }, returning: true })
  .then(function () {
    return Ticker.findOne({ where: { ticker: req.params.ticker } });
  })
  .then(ticker => res.json(ticker))
  .catch(next);
});
// delete
router.delete('/:ticker', function (req, res, next) {
  Ticker.destroy({ where: { ticker: req.params.ticker }, returning: true })
  .then(function(numRowsDeleted) {
    console.log('Delete ticker "',req.params.ticker,'": ',numRowsDeleted,' row(s) deleted.');
    res.sendStatus(204);
  })
  .catch(next);
});
