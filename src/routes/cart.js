const express = require('express')
const router = express.Router()

const { getCartAdd, getCheckout, postCartUpdate } = require('../app/controllers/cartController');

//router.Method('/route', handle)
router.post('/update/:id', postCartUpdate);
router.get('/add/:id', getCartAdd);
router.post('/add/:id', getCartAdd);
router.get('/checkout', getCheckout);

module.exports = router; //export default 