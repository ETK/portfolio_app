'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Price = db.model('Price');
const Ticker = db.model('Ticker');

module.exports = router;


router.get('/', function(req, res, next) {
  Price.findAll({ order: [['date','ASC']]})
  .then(prices => res.json(prices))
  .catch(next);
})

router.get('/:ticker', function(req, res, next) {
  Price.findAll({ where: { px_ticker: req.params.ticker }, order: [['date','ASC']]})
  .then(prices => res.json(prices))
  .catch(next);
})

router.get('/update', function(req, res) {
  Price.destroy({ truncate: true }) // clear old prices
  .then( function() {
    return Ticker.findAll({}); // retrieve list of tickers
  })
  .then( function(tickers) {
    var symbols = [];
    for(var key in tickers) {
      symbols.push(tickers[key].ticker);
    }
    return symbols;
  })
  .then( function(symbols) {
    return Price.update(symbols); // update prices from external API
  })
  .then( function() {
    return Price.findAll({}); // find all downloaded prices - not working
  })
  .then(prices => res.json(prices));
})
