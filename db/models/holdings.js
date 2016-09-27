module.exports = function(sequelize, DataTypes) {
  var Holding = sequelize.define('Holding', {
    ticker: { type: DataTypes.STRING, allowNull: false },
    num_shares: { type: DataTypes.DECIMAL },
    avg_trade_px: { type: DataTypes.DECIMAL },
    current_px: { type: DataTypes.DECIMAL },
    cost_basis: { type: DataTypes.DECIMAL },
    total_commission: { type: DataTypes.DECIMAL, defaultValue: 0 },
    current_value: { type: DataTypes.DECIMAL },
    p_l: { type: DataTypes.DECIMAL },
    returns: { type: DataTypes.DECIMAL },
    }, {
      classMethods: {
        associate: function(models) {
          console.log('associating Holdings to Account')
          Holding.belongsTo(models.Account, {
            as: 'account'
          });
        }
        // update: regenerateHoldings
      },
      getterMethods: {
        route: function () {
          return '/holdings/' + this.id;
        }
      }
    }
  );

  return Holding;
};


// function regenerateHoldings(prices) {
//   console.log('in Holdings.update() function')
//   var holdings  = [], // list of holdings objects to append to database
//       holdingsIdx = {}, // lookup of indices for holdings array; format => [ticker][account ID] = index
//       index, // temporary index for a given holdings object
//       price, // temporary price for a given holdings object
//       transactionTypes = Transaction.types(),
//       saleCostBasis;
//
//   // clear table
//   return db.model('holding').destroy({ truncate: true })
//
//   // get all transactions + accounts, sorted by date
//   .then( function () {
//     console.log('Holdings table destroyed')
//     return db.model('transaction').findAll({});
//   })
//
//   // traverse all transactions
//   .then( function(transactions) {
//     console.log('Transactions downloaded; calculating holdings...')
//     transactions.forEach( function(transaction) {
//       // get appropriate index for this transaction, to add to the holdings array
//       if( holdingsIdx[transaction.ticker] ) { // has the ticker been seen yet?
//         if( holdingsIdx[transaction.ticker][transaction.account.id] ) { // has this account + ticker been seen yet?
//           index = holdingsIdx[transaction.ticker][transaction.account.id]; // index has already been created
//         } else { // ticker exists, but not for this account; create a new index
//           holdingsIdx[transaction.ticker][transaction.account.id] = holdings.length
//           index = holdingsIdx[transaction.ticker][transaction.account.id];
//           holdings[index] = initializeHolding( transaction.ticker, transaction.account.id);
//         }
//       } else { // ticker does not exist
//         holdingsIdx[transaction.ticker] = {};
//         holdingsIdx[transaction.ticker][transaction.account.id] = holdings.length
//         index = holdingsIdx[transaction.ticker][transaction.account.id];
//         holdings[index] = initializeHolding( transaction.ticker, transaction.account.id);
//       }
//
//       // add transaction figures
//       if( transactionTypes[transaction.type] === 'add') {
//         holdings[index].num_shares += +transaction.num_shares;
//         holdings[index].cost_basis += +transaction.gross_amt;
//       } else if( transactionTypes[transaction.type] === 'remove') { // ISSUES WITH COST BASIS IMPACT FROM SALES
//         saleCostBasis = +transaction.num_shares * holdings[index].avg_trade_px; // using avg. cost basis method
//         holdings[index].num_shares -= +transaction.num_shares;
//         holdings[index].cost_basis -= saleCostBasis;
//         holdings[index].p_l += (+transaction.gross_amt - saleCostBasis); // add realized gains/losses to P&L
//       } else if( transactionTypes[transaction.type] === 'to cash') {
//         // unhandled at present
//       }
//       if( holdings[index].num_shares > 0 ) holdings[index].avg_trade_px = holdings[index].cost_basis / holdings[index].num_shares;
//
//
//       // calculate current values, P&L, returns
//       holdings[index].current_px = (prices[transaction.ticker]) ? prices[transaction.ticker].price : 0;
//       holdings[index].current_value = holdings[index].current_px * holdings[index].num_shares;
//       holdings[index].p_l = holdings[index].current_value - holdings[index].cost_basis;
//     });
//
//     console.log('holdings calculation complete')
//
//     return holdings;
//   })
//
//   // save to database
//   .then( function(holdingsToSave) {
//     console.log('savings holdings to Holdings table')
//     return db.model('holding').bulkCreate(holdingsToSave);
//   })
// }
//
// function initializeHolding( ticker, accountId ) {
//   return {  ticker: ticker,
//             num_shares: 0,
//             avg_trade_px: 0,
//             current_px: 0,
//             cost_basis: 0,
//             total_commission: 0,
//             current_value: 0,
//             p_l: 0,
//             returns: 0,
//             accountId: accountId
//         }
// }
