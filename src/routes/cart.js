const express = require('express')
const router = express.Router()

const { getCartAdd } = require('../app/controllers/cartController');

//router.Method('/route', handle)
router.get('/add/:product', getCartAdd);
router.post('/add/:product', getCartAdd);

module.exports = router; //export default 