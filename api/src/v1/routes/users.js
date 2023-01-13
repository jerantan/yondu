const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate');
const { admin } = require('../middlewares/access');

const {
  getAll, getOne, create,
  update, delOne, multiDel
} = require('../controllers/users');

router.all('*', auth, admin);
router.get('/', getAll);
router.get('/:userid', getOne);
router.post('/', create);
router.put('/:userid', update);
router.delete('/:userid', delOne);
router.delete('/', multiDel);

module.exports = router;