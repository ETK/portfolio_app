var Ticker;

module.exports = function(sequelize, DataTypes) {
  Ticker = sequelize.define('Ticker', {
    ticker: { type: DataTypes.STRING, primaryKey: true },
    long_name: { type: DataTypes.STRING },
    category_1: { type: DataTypes.ENUM('stocks','bonds','other','cash') },
    category_2: { type: DataTypes.ENUM('stock','stock fund','bond fund','cash') },
    category_3: { type: DataTypes.ENUM('single stock','single sector','broad index','non-us developed markets','emerging markets','high risk bonds','medium risk bonds','low risk bonds','cash') }
    }, {
      classMethods: {
        associate: function(models) {
          Ticker.hasMany(models.Price, {
            foreignKey: 'fkey_ticker'
          });
        },
        allTickers: getTickers
      },
      getterMethods: {
        route: function () {
          return '/tickers/' + this.ticker;
        }
      },
      hooks: {
        beforeValidate: function(ticker) { // validation is creating issues when editting a ticker & categories are not changed
          if(ticker.category_1) ticker.category_1 = ticker.category_1.toLowerCase();
          if(ticker.category_2) ticker.category_2 = ticker.category_2.toLowerCase();
          if(ticker.category_3) ticker.category_3 = ticker.category_3.toLowerCase();
        }
      }
    }
  );

  return Ticker;
};

function getTickers() {
  var symbols = [];

  return Ticker.findAll({})
  .then( function(tickers) {
    for(var key in tickers) {
      symbols.push(tickers[key].ticker);
    }
    return symbols;
  });
}
