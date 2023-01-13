const users = require('../services/users');
const {
  min, lenmsg, nummsg,
  reqmsg, body, run,
  response
} = require('../middlewares/validation');

const validation = [
  body('firstname')
  .isLength({min: 1}).withMessage(reqmsg),

  body('lastname')
  .isLength({min: 1}).withMessage(reqmsg),

  body('username')
  .isLength({min: min}).withMessage(lenmsg),

  body('password')
  .isLength({min: min}).withMessage(lenmsg),

  body('level')
  .isLength({min: 1}).withMessage(reqmsg),
  
  body('isactive')
  .isLength({min: 1}).withMessage(reqmsg)
  .isInt().withMessage(nummsg)
];



const getAll = (req, res) => {
  const resgetAll = users.getAll();
  res.send(response(resgetAll));
};

const getOne = (req, res) => {
  const resgetOne = users.getOne(req.params);
  res.send(response(resgetOne));
};

const create = [
  // Validation
  validation,
  run,

  // Function
  (req, res) => {
    const rescreate = users.create(req.body);
    if(rescreate.stat) res.status(201).send(response(rescreate));
    else res.status(400).send(response(rescreate));
  }
];

const update =  [
  // Validation
  validation,
  run,

  // Function
  (req, res) => {
    const resupdate = users.update(req.body, req.params);
    if(resupdate.stat) res.send(response(resupdate));
    else res.status(400).send(response(resupdate));
  }
];

const delOne = (req, res) => {
  const resdelOne = users.delOne(req.params);
  if(resdelOne.stat) res.send(response(resdelOne));
  else res.status(400).send(response(resdelOne));
};

const multiDel = (req, res) => {
  const resmultiDel = users.multiDel(req.query);
  if(resmultiDel.stat) res.send(response(resmultiDel));
  else res.status(400).send(response(resmultiDel));
};

module.exports = {
  getAll, getOne, create,
  update, delOne, multiDel
};