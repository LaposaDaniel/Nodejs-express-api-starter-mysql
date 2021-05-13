var express = require('express');
var multer = require('multer');
var upload = multer();
var router = express.Router();

const userController = require('../controllers/UserController');

/* GET home page. */
router.get('/', function (req, res) {
  res.send('index, { title: Express }');
});

router.get('/test', function (req, res, next) {
  next()
},
  userController.test
);

router.get('/login', upload.none(), function (req, res, next) {
  next()
},
  userController.login
);

router.get('/registration', upload.none(), function (req, res, next) {
  next()
},
  userController.singup
);


module.exports = router;
