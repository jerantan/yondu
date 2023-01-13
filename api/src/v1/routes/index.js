const express = require('express');
const router = express.Router();

const {
  main, schema, signin
} = require('../controllers');

router.get('/', main);
router.get('/schema', schema);
router.post('/signin', signin);

module.exports = router;