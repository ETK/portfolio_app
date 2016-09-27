'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Promise = require('bluebird');
const Account = db.model('Account');
const Transaction = db.model('Transaction');
const Holding = db.model('Holding');

module.exports = router;


// --- /accounts
// view
router.get('/', function (req, res, next) {
  Account.findAll({ order: [['account_name','ASC']]})
  .then( accounts => res.json(accounts) )
  .catch(next);
});
// create
router.post('/', function (req, res, next) {
  Account.create(req.body)
  .then( account => res.json(account) )
  .catch(next);
});


// --- /accounts/:id
// view
router.get('/:id', function (req, res, next) {
  var findingAccount = Account.findById(req.params.id);
  var findingTransactions = Transaction.findAll({ where: { accountId: req.params.id } });
  var findingHoldings = Holding.findAll({ where: { accountId: req.params.id, ticker: { $ne: 'Cash' } } });
  Promise.all([findingAccount, findingTransactions, findingHoldings])
  .spread(function (account, transactions, holdings) {
    res.json({
      account: account,
      holdings: holdings,
      transactions: transactions
    });
  })
  .catch(next);
});
// edit -- action
router.put('/:id', function (req, res, next) {
  Account.update(req.body, { where: { id: req.params.id }, returning: true })
  .then(function () {
    return Account.findById(req.params.id);
  })
  .then(account => res.json(account))
  .catch(next);
});
