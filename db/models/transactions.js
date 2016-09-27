module.exports = function(sequelize, DataTypes) {
  console.log(sequelize.NOW)
  var Transaction = sequelize.define('Transaction', {
    ticker: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('buy','sell','deposit','withdraw','div-cash','div-reinvest','lt gain-cash','lt gain-reinvest','st gain-cash','st gain-reinvest','interest')},
    trade_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    num_shares: { type: DataTypes.DECIMAL },
    trade_px: { type: DataTypes.DECIMAL },
    gross_amt: { type: DataTypes.DECIMAL, allowNull: false },
    commission: { type: DataTypes.DECIMAL, defaultValue: 0 },
    total_amt: { type: DataTypes.DECIMAL, allowNull: false },
    notes: { type: DataTypes.TEXT },
    }, {
      classMethods: {
        associate: function(models) {
          Transaction.belongsTo(models.Account, {
            as: 'account'
          });
        },
        types: function() {
          return {  buy: 'add',
                    sell: 'remove',
                    deposit: 'add',
                    withdraw: 'remove',
                    'div-cash': 'to cash',
                    'div-reinvest': 'add',
                    'lt gain-cash': 'to cash',
                    'lt gain-reinvest': 'add',
                    'st gain-cash': 'to cash',
                    'st gain-reinvest': 'add',
                    interest: 'add'
                 }
        }
      },
      getterMethods: {
        route: function () {
          return '/transactions/' + this.id;
        }
      }
    }
  );

  return Transaction;
};
