const express = require('express')
const router = express.Router()

const { getHomepage, getProductsOfCategory, getAboutUspage, getContactpage, getDetailProduct } = require('../app/controllers/homeController');

//router.Method('/route', handle)
router.get('/:category/:product', getDetailProduct);
router.get('/:category', getProductsOfCategory);
router.get('/about-us', getAboutUspage);
router.get('/contact', getContactpage);
router.get('/', getHomepage);

module.exports = router; //export default 