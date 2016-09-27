const yf = require('yahoo-finance');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Price', {
    px_ticker: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    close_px: { type: DataTypes.FLOAT },
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
        // update: updatePrices,
        // current: getCurrentPrices
      }
    }
  );
};


// function updatePrices(symbols) {
//   return yf.historical({
//     symbols: symbols,
//     from: '2010-12-31',
//     to: '2016-05-14',
//     period: 'd'
//   }).then(function (result) {
//     _.each(result, function(quotes, symbol) {
//       _.each(quotes, function(quote) {
//         db.model('price').create({px_ticker: quote.symbol, date: quote.date, close_px: quote.close });
//       })
//     })
//   })
// }
//
// function getCurrentPrices(symbols) {
//   var prices = {};
//
//   return yf.snapshot({
//     symbols: symbols,
//     fields: ['s', 'd1', 'l1']
//   })
//   .then( function(yfSnapshots) {
//     yfSnapshots.forEach( function(yfSnapshot) {
//       if(!prices[yfSnapshot.symbol]) prices[yfSnapshot.symbol] = {};
//       prices[yfSnapshot.symbol].price = yfSnapshot.lastTradePriceOnly;
//       prices[yfSnapshot.symbol].price_date = yfSnapshot.lastTradeDate;
//     });
//     prices['Cash'] = { price: 1, price_date: null };
//     return prices;
//   });
// }
