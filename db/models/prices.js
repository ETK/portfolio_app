const yf = require('yahoo-finance');
const sequelize = require('sequelize');
const _ = require('lodash');
var Price;

module.exports = function(sequelize, DataTypes) {
  Price = sequelize.define('Price', {
    px_ticker: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    close_px: { type: DataTypes.INTEGER },
    }, {
      indexes: [
        { fields: ['px_ticker'] }
      ],
      hooks: {
        beforeCreate: function(price) {
          price.fkey_ticker = price.px_ticker;
        }
      },
      classMethods: {
        update: updatePrices,
        current: getCurrentPrices,
        latest: function() {
            return sequelize.query('SELECT * FROM Prices INNER JOIN (SELECT px_ticker, MAX(date) AS \'date\' FROM Prices GROUP BY px_ticker) AS latest ON Prices.px_ticker = latest.px_ticker AND Prices.date = latest.date')
        }
      }
    }
  );

  return Price;
};


function updatePrices(symbols) {
    console.log('Requesting price updates from Yahoo Finance...')
    return yf.historical({
        symbols: symbols,
        from: '2015-12-31',
        to: '2016-10-30',
        period: 'd'
    })
    .then(function (result) {
        var filteredPrices = [];
        _.each(result, function(quotes, symbol) {
            _.each(quotes, function(quote) {
                filteredPrices.push({
                    px_ticker: quote.symbol,
                    date: quote.date,
                    close_px: Math.floor(quote.close * 10000)
                });
            });
        });
        console.log('Saving prices to database...')
        return Price.bulkCreate(filteredPrices);
    });
}

function getCurrentPrices(symbols) {
  var prices = {};

  return yf.snapshot({
    symbols: symbols,
    fields: ['s', 'd1', 'l1']
  })
  .then( function(yfSnapshots) {
    yfSnapshots.forEach( function(yfSnapshot) {
      if(!prices[yfSnapshot.symbol]) prices[yfSnapshot.symbol] = {};
      prices[yfSnapshot.symbol].price = yfSnapshot.lastTradePriceOnly;
      prices[yfSnapshot.symbol].price_date = yfSnapshot.lastTradeDate;
    });
    prices['Cash'] = { price: 1, price_date: null };
    return prices;
  });
}
