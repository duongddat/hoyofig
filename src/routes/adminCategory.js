const express = require('express')
const router = express.Router()

const {
    getCategorypage,
    getCategoryAdd,
    postCategoryAdd
} = require('../app/controllers/categoryController');

//router.Method('/route', handle)
router.get('/categories', getCategorypage);
router.get('/categories/add-category', getCategoryAdd);
router.post('/categories/add-category', postCategoryAdd);


module.exports = router; //export default 