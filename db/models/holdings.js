var Holding;

module.exports = function(sequelize, DataTypes) {
    Holding = sequelize.define('Holding',

        // attributes
        {
            ticker: { type: DataTypes.STRING, allowNull: false },
            num_shares: { type: DataTypes.INTEGER },
            avg_trade_px: { type: DataTypes.INTEGER },
            current_px: { type: DataTypes.INTEGER },
            cost_basis: { type: DataTypes.INTEGER },
            total_commission: { type: DataTypes.INTEGER, defaultValue: 0 },
            current_value: { type: DataTypes.INTEGER },
            p_l: { type: DataTypes.INTEGER },
            returns: { type: DataTypes.INTEGER },
        },

        // options
        {
            classMethods: {
                associate: function(models) {
                    Holding.belongsTo(models.Account, {
                        as: 'account'
                    });
                },
                scopes: function(models) {
                    Holding.addScope('defaultScope', {
                        include: [{ model: models.Account, as: 'account'}],
                    }, {
                        override: true
                    });
                },
                update: regenerateHoldings
            }
        }
    );

    return Holding;
};


function regenerateHoldings(dbTxns, dbPrices) {
    var holdings = [], // list of holdings objects to append to database
        holdingsIdx = {}, // lookup of indices for holdings array; format => [ticker][account ID] = index
        txnTypes = { buy: 'add',
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
        },
        index, // temporary index for a given holdings object
        saleCostBasis; // temporary cost basis caching for sell txns

    // build prices object
    var prices = {};
    dbPrices.forEach( function(price) {
        prices[price.px_ticker] = price.close_px;
    });

    // process transaction => build holdings
    dbTxns.forEach( function(txn) {
        // determine appropriate index for this txn in the holdings array
        if(!holdingsIdx[txn.ticker]) holdingsIdx[txn.ticker] = {}; // ticker does not exist
        if(!holdingsIdx[txn.ticker][txn.account.id]) { // ticker + account does not exist
            holdingsIdx[txn.ticker][txn.account.id] = holdings.length + 1; // create new index
        }
        index = holdingsIdx[txn.ticker][txn.account.id];
        if(!holdings[index]) holdings[index] = initializeHolding(txn.ticker, txn.account.id); // initialize holding with 0 balances

        // process transaction
        if( txnTypes[txn.type] === 'add') {
            holdings[index].num_shares += +txn.num_shares;
            holdings[index].cost_basis += +txn.gross_amt;
        } else if( txnTypes[txn.type] === 'remove') { // TODO: issues with cost basis impact from sales
            saleCostBasis = +txn.num_shares * holdings[index].avg_trade_px / 10000; // using avg. cost basis method
            holdings[index].num_shares -= +txn.num_shares;
            holdings[index].cost_basis -= saleCostBasis;
            holdings[index].p_l += (+txn.gross_amt - saleCostBasis); // add realized gains/losses to P&L
        } else if( txnTypes[txn.type] === 'to cash') {
            // unhandled at present
        } else {
            console.log('Unhandled transaction in holdings calculation: txn # ' + txn.id);
        }
        if( holdings[index].num_shares > 0 ) {
            holdings[index].avg_trade_px = Math.floor(holdings[index].cost_basis / holdings[index].num_shares * 10000);
        }


        // calculate current values, P&L, returns
        holdings[index].current_px = (prices[txn.ticker]) ? prices[txn.ticker] : 0;
        holdings[index].current_value =  Math.floor(holdings[index].current_px * holdings[index].num_shares / 10000);
        holdings[index].p_l = holdings[index].current_value - holdings[index].cost_basis;
    });

  // write to database
  return Holding.destroy({ truncate: true })
  .then(() => Holding.bulkCreate(holdings));
}

function initializeHolding( ticker, accountId ) {
  return { ticker: ticker,
            num_shares: 0,
            avg_trade_px: 0,
            current_px: 0,
            cost_basis: 0,
            total_commission: 0,
            current_value: 0,
            p_l: 0,
            returns: 0,
            accountId: accountId
        }
}
