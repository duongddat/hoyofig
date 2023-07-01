const express = require('express')
const router = express.Router()

const { getCartAdd, getCheckout } = require('../app/controllers/cartController');

//router.Method('/route', handle)
router.get('/add/:id', getCartAdd);
router.post('/add/:id', getCartAdd);
router.get('/checkout', getCheckout);

module.exports = router; //export default 