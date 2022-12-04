const express = require('express')
const {
   listAll,
   listOne,
   create,
   edit,
   delete: _delete
} = require('../controllers/transactions')
const {
   schemaValidator
} = require('../middlewares/schemaValidator');
const {
   createTransaction,
   editTransaction
} = require('../schemas/transaction');

const router = express.Router();

router.get('/', listAll);
router.get('/:id', listOne);
router.post('/', schemaValidator(createTransaction), create);
router.put('/', schemaValidator(editTransaction), edit);
router.delete('/', schemaValidator(editTransaction), _delete);

module.exports = router;
