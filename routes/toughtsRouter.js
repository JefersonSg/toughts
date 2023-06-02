var express = require('express');
var router = express.Router();
const ToughtController = require('../controllers/ToughtController');

//Helper
const checkAuth = require('../helpers/auth').checkAuth;

/* GET home page. */
router.get('/', ToughtController.showAll);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/add', checkAuth, ToughtController.createTought);

// POSTS
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.post('/delete', checkAuth, ToughtController.deleteTought);
router.post('/edit', checkAuth, ToughtController.editTought);

module.exports = router;
