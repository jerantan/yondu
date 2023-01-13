const services = require('../services');
const {
  min, lenmsg, nummsg,
  body, run, response
} = require('../middlewares/validation');

const main = (req, res) => {
  res.send(`Welcome to Yondu API ${process.env.npm_package_version}`);
};

const schema = (req, res) => {
  const resschema = services.schema();
  res.send(response(resschema));
};

const signin = [
  // Validation
  [
    body('username')
    .isLength({min: min}).withMessage(lenmsg)
    .isInt().withMessage(nummsg),

    body('password')
    .isLength({min: min}).withMessage(lenmsg)
    .isInt().withMessage(nummsg),
  ],
  run,

  // Function
  (req, res) => {
    const ressignin = services.signin(req.body);
    res.send(response(ressignin));
  }
];

module.exports = {
  main, schema, signin
};