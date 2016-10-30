module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction',

        // attributes
        {
            ticker: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.ENUM('buy','sell','deposit','withdraw','div-cash','div-reinvest','lt gain-cash','lt gain-reinvest','st gain-cash','st gain-reinvest','interest')},
            trade_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
            num_shares: { type: DataTypes.DECIMAL },
            trade_px: { type: DataTypes.DECIMAL },
            gross_amt: { type: DataTypes.DECIMAL, allowNull: false },
            commission: { type: DataTypes.DECIMAL, defaultValue: 0 },
            total_amt: { type: DataTypes.DECIMAL, allowNull: false },
            notes: { type: DataTypes.TEXT },
        },


        // options
        {
            classMethods: {
                associate: function(models) {
                    Transaction.belongsTo(models.Account, {
                        as: 'account'
                    });
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
