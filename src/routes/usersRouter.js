var express = require('express');
var multer = require('multer');
var upload = multer();
var router = express.Router();

const userController = require('../controllers/UserController');

router.get('/deleteUser', upload.none(), function (req, res, next) {
  next()
},
  userController.deleteUser
);

router.get('/updateUser', upload.none(), function (req, res, next) {
  next()
},
  userController.updateUser
);

module.exports = router;