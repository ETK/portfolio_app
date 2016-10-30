'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Price = db.model('Price');
const Ticker = db.model('Ticker');
const Promise = require('bluebird');

module.exports = router;


router.get('/', function(req, res, next) {
    Price.findAll({ order: [['date','ASC']]})
    .then(prices => res.json(prices))
    .catch(next);
});

router.get('/latest', function(req, res, next) {
    db.query('SELECT * FROM Prices INNER JOIN (SELECT px_ticker, MAX(date) AS \'date\' FROM Prices GROUP BY px_ticker) AS latest ON Prices.px_ticker = latest.px_ticker AND Prices.date = latest.date')
    .spread(prices => res.json(prices))
    .catch(next);
});

router.get('/ticker/:ticker', function(req, res, next) {
    Price.findAll({ where: { px_ticker: req.params.ticker }, order: [['date','ASC']]})
    .then(prices => res.json(prices))
    .catch(next);
});

router.get('/update', function(req, res, next) {
    Promise.all([
        Price.destroy({ truncate: true }), // clear old prices
        Ticker.findAll({}) // retrieve list of tickers
    ])
    .spread((destroyResult, dbTickers) => {
        var tickers = [];
        for(var key in dbTickers) {
          tickers.push(dbTickers[key].ticker);
        }
        return Price.update(tickers); // update prices from external API
    })
    .then(prices => res.json(prices))
    .catch(next);
});
