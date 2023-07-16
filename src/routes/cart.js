const express = require('express')
const router = express.Router()

const { getCartAdd, getCheckout, postCartUpdate, getCartDelete, getCartClear } = require('../app/controllers/cartController');

//router.Method('/route', handle)
router.post('/update/:id', postCartUpdate);
router.get('/delete/:id', getCartDelete);
router.get('/add/:id', getCartAdd);
router.post('/add/:id', getCartAdd);
router.get('/clear', getCartClear);
router.get('/checkout', getCheckout);

module.exports = router; //export default 