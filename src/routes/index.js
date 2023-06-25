const express = require('express')
const router = express.Router()

const { getHomepage, getAboutUspage, getContactpage } = require('../app/controllers/homeController');

//router.Method('/route', handle)
router.get('/', getHomepage);
router.get('/about-us', getAboutUspage);
router.get('/contact', getContactpage);

module.exports = router; //export default 