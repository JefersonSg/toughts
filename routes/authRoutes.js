var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');

// helpers
const checkOut = require('../helpers/out').checkOut;

// GET
router.get('/login', checkOut, AuthController.login);
router.get('/register', checkOut, AuthController.register);
router.get('/logout', AuthController.logout);

// POST
router.post('/register', checkOut, AuthController.registerPost);
router.post('/login', checkOut, AuthController.loginPost);

module.exports = router;
