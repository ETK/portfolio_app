module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction',

        // attributes
        {
            ticker: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.ENUM('buy','sell','deposit','withdraw','div-cash','div-reinvest','lt gain-cash','lt gain-reinvest','st gain-cash','st gain-reinvest','interest')},
            trade_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
            num_shares: {
                type: DataTypes.INTEGER,
                set: function(val) {
                  this.setDataValue('num_shares', val = val * 10000);
                }
            },
            trade_px: {
                type: DataTypes.INTEGER,
                set: function(val) {
                  this.setDataValue('trade_px', val = val * 10000);
                }
             },
            gross_amt: {
                type: DataTypes.INTEGER,
                allowNull: false,
                set: function(val) {
                  this.setDataValue('gross_amt', val = val * 10000);
                }
             },
            commission: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                set: function(val) {
                  this.setDataValue('commission', val = val * 10000);
                }
             },
            total_amt: {
                type: DataTypes.INTEGER,
                allowNull: false,
                set: function(val) {
                  this.setDataValue('total_amt', val = val * 10000);
                }
             },
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
