'use strict';
const router = require('express').Router();
const db = require('../../db/models').sequelize;
const Account = db.model('Account');
const Transaction = db.model('Transaction');

module.exports = router;


// get all
router.get('/', function (req, res, next) {
  Transaction.findAll({
    include: [{ model: Account, as: 'account'}],
    order: [['trade_date','DESC']]
  })
  .then(transactions => res.json(transactions))
  .catch(next);
});

// create
router.post('/', function (req, res, next) {
  Account.findOrCreate({ where: { account_name: req.body.account.account_name } })
  .spread(function (account) {
    return Transaction.create(req.body)
    .then(transaction => transaction.setAccount(account));
  })
  .then(transaction => res.json(transaction))
  .catch(next);
});


// SPECIFIC TRANSACTION
// view
router.get('/:id', function (req, res, next) {
  Transaction.findById(req.params.id)
  .then(transaction => res.json(transaction))
  .catch(next);
});

// edit -- action
router.put('/:id', function (req, res, next) {
  Transaction.update(req.body, { where: { id: req.params.id }, returning: true })
  .then(() => Transaction.findById(req.params.id))
  .then(transaction => res.json(transaction))
  .catch(next);
});

// delete
router.delete('/:transactionId', function (req, res, next) {
  Transaction.destroy({ where: { id: req.params.transactionId }, returning: true })
  .then(function(numRowsDeleted) {
    console.log('Delete transaction #"',req.params.transactionId,'": ',numRowsDeleted,' row(s) deleted.');
    res.sendStatus(204);
  })
  .catch(next);
});
