const express = require('express')
const router = express.Router()

const { getHomepage, getTest } = require('../app/controllers/homeController');

//router.Method('/route', handle)
router.get('/', getHomepage);


module.exports = router; //export default 